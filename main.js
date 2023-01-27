const key = "&units=metric&appid=6d8d685969d439d8178c3b7a901ebcf4";
const urlStart = "https://api.openweathermap.org/data/2.5/weather?q=";

const citySearch = document.querySelector(".search-bar input");
const cityName = document.querySelector(".city");
const date = document.querySelector(".date");
const degree = document.querySelector(".degree");
const weatherName = document.querySelector(".weather-name");
const iconText = document.querySelector(".icon");
const body = document.querySelector("body");

const searchBtn = document.querySelector("button");

const cities = document.querySelector(".cities");

const newYork = document.querySelector(".cities :nth-child(1)");
const istanbul = document.querySelector(".cities :nth-child(2)");
const london = document.querySelector(".cities :nth-child(3)");
const toronto = document.querySelector(".cities :nth-child(4)");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const url = `${urlStart + citySearch.value + key}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      weather(data);
    });
  citySearch.closest("form").reset();
});

const weather = (info) => {
  changeCityName(info);
  weatherStatus(info);
  bgChange(info);
};

const changeCityName = (city) => {
  const { sys } = city;
  const { country } = sys;

  //! ******* CITY NAME *******

  cityName.innerHTML = `${city.name},${country}`;
};

const weatherStatus = (data) => {
  const { main, weather } = data;
  const { humidity, temp } = main;
  console.log(humidity, Math.floor(temp));

  //! ******* DEGREE *******

  const { main: mainWeather, description, icon } = weather[0];
  degree.innerHTML = `${Math.floor(temp)}°`;

  //! ******* ICON *******

  iconText.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" />`;

  //! ******* WEATHER NAME *******

  weatherName.innerHTML = `${mainWeather}`;
};

const bgChange = (city) => {
  const { name } = city;
  body.style.backgroundImage = `url('https://source.unsplash.com/1080x720/?${name})`;
};

cities.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cities")) {
    let listedName = e.target.closest("li").innerHTML;
    citySearch.value = listedName;
    weather(e);
    return;
  }
});
