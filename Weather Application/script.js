const API_KEY = window.OPENWEATHER_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const forecastContainer = document.getElementById("forecast-cards");

// Fetch Current Weather
async function fetchWeather(city) {
  try {
    const res = await fetch(`${BASE_URL}weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error(res.status === 404 ? "City not found" : `Weather request failed (${res.status})`);
    const data = await res.json();
    displayCurrentWeather(data);
  } catch (err) {
    alert(err.message);
  }
}

// Fetch Forecast
async function fetchForecast(city) {
  try {
    const res = await fetch(`${BASE_URL}forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error(res.status === 404 ? "City not found" : `Forecast request failed (${res.status})`);
    const data = await res.json();
    displayForecast(data);
  } catch (err) {
    console.error(err.message);
  }
}

// Display Current Weather
function displayCurrentWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  description.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  wind.textContent = data.wind.speed;
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
}

// Display Forecast
function displayForecast(data) {
  forecastContainer.innerHTML = "";
  const daily = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date] && item.dt_txt.includes("12:00:00")) {
      daily[date] = item;
    }
  });

  Object.values(daily).forEach(day => {
    const div = document.createElement("div");
    div.classList.add("forecast-day");
    div.innerHTML = `
      <h4>${new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</h4>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
      <p>${Math.round(day.main.temp)} °C</p>
      <p>${day.weather[0].description}</p>
    `;
    forecastContainer.appendChild(div);
  });
}

// Search Handler
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
    cityInput.value = "";
  }
});

// Default city on load
fetchWeather("Delhi");
fetchForecast("Delhi");
