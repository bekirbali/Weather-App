// ********************************* OOOO *************************************

const key = "&units=metric&appid=6d8d685969d439d8178c3b7a901ebcf4";
const urlStart = "https://api.openweathermap.org/data/2.5/weather?q=";

const citySearch = document.querySelector(".search-bar input");
const cityName = document.querySelector(".city");
const date = document.querySelector(".date");
const day = document.querySelector(".day");
const degree = document.querySelector(".degree");
const weatherName = document.querySelector(".weather-name");
const iconText = document.querySelector(".icon");
const body = document.querySelector("body");
const humidityP = document.querySelector(".humidity");
const weatherDetails = document.querySelector(".weather-description");
const windP = document.querySelector(".wind");

const searchBtn = document.querySelector("button");

const cities = document.querySelector(".cities");

const firstCity = document.querySelector(".cities :nth-child(1)");
const secondCity = document.querySelector(".cities :nth-child(2)");
const thirdCity = document.querySelector(".cities :nth-child(3)");
const lastCity = document.querySelector(".cities :nth-child(4)");
console.log(lastCity);

// ********************************* OOOO *************************************

let cityData = JSON.parse(localStorage.getItem("cityData")) || [];

// ********************************* OOOO *************************************

window.addEventListener("load", () => {
  cityData.length > 4 && cityData.shift();
  let SuggestedCities = [firstCity, secondCity, thirdCity, lastCity];
  let DBCities = [];
  for (let v of Object.values(cityData)) {
    let arr = v.lastCityName.split(",");
    DBCities.unshift(arr[0]);
    console.log(arr);
  }
  for (let i = 0; i < DBCities.length; i++) {
    if (DBCities[i]) {
      SuggestedCities[i].innerHTML = DBCities[i];
    }
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${firstCity.innerHTML}&units=metric&appid=6d8d685969d439d8178c3b7a901ebcf4`
  )
    .then((res) => res.json())
    .then((data) => {
      weather(data);
    });
});

//? WITH SEARCH BUTTON

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

//? WITH CITY NAMES

cities.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("cities")) {
    let listedName = e.target.closest("button").innerHTML;
    const url = `${urlStart + listedName + key}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        weather(data);
        citySearch.closest("form").reset();
      });
    return;
  }
});

//? MAIN FUNCTION

const weather = (data) => {
  changeCityName(data);
  weatherStatus(data);
  bgChange(data);
  timeStamp(data);
  const allData = {
    lastCityName: cityName.innerHTML,
    lastDegree: degree.innerHTML,
    lastDay: day.innerHTML,
    lastIconUrl: iconText.innerHTML,
    lastWeatherName: weatherName.innerHTML,
  };
  cityData.push(allData);
  localStorage.setItem("cityData", JSON.stringify(cityData));
  console.log(cityData.length);
  cityData.length > 4 && cityData.shift();
  let SuggestedCities = [firstCity, secondCity, thirdCity, lastCity];
  let DBCities = [];
  for (let v of Object.values(cityData)) {
    let arr = v.lastCityName.split(",");
    DBCities.unshift(arr[0]);
    console.log(arr);
  }
  for (let i = 0; i < DBCities.length; i++) {
    if (DBCities[i]) {
      if (SuggestedCities[i].innerHTML != DBCities[i]) {
        SuggestedCities[i].innerHTML = DBCities[i];
      } else {
        console.log("you already have this one");
      }
    }
  }
  console.log(DBCities);
};

const weatherOnLoad = (data) => {
  changeCityName(data);
  weatherStatus(data);
  timeStamp(data);
};

//! ******* CITY NAME *******

const changeCityName = (data) => {
  const { sys } = data;
  const { country } = sys;
  cityName.innerHTML = `${data.name}, ${country}`;
};

//! ******* WEATHER STATUS *******

const weatherStatus = (data) => {
  const { main, weather, wind } = data;
  const { humidity, temp } = main;
  humidityP.innerHTML = `${humidity}%`;

  //* ******* DEGREE *******

  const { main: mainWeather, description, icon } = weather[0];
  degree.innerHTML = `${Math.round(temp)}°`;

  let newDescription = description
    .split(" ")
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(" ");

  weatherDetails.lastElementChild.innerHTML = `${newDescription}`;

  const { speed } = wind;
  windP.innerHTML = `${speed}km/h`;

  //* ******* ICON *******

  iconText.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" />`;

  //* ******* WEATHER NAME *******

  weatherName.innerHTML = `${mainWeather}`;
};

//! BACKGROUND CHANGE

const bgChange = (city) => {
  const { name } = city;
  body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name})`;
};

//! TIME STAMP

const timeStamp = (data) => {
  let cityTime = data.dt;
  cityTime = new Date(cityTime * 1000);
  let today = new Date().getDay();
  switch (today) {
    case 0:
      day.innerHTML = "Sunday";
      break;
    case 1:
      day.innerHTML = "Monday";
      break;
    case 2:
      day.innerHTML = "Tuesday";
      break;
    case 3:
      day.innerHTML = "Wednesday";
      break;
    case 4:
      day.innerHTML = "Thursday";
      break;
    case 5:
      day.innerHTML = "Friday";
      break;
    case 6:
      day.innerHTML = "Saturday";
      break;
  }
};
