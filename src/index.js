//current date
function getCurrentDate() {
  let now = new Date();
  let day = now.getDay();
  let month = now.getMonth();
  let hour = now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return `${days[day]}, ${months[month]} at ${hour}:${minutes}`;
}

let currentDate = getCurrentDate();
let today = document.querySelector("#today");
today.innerHTML = currentDate;
let apiKey = "2837999d85cfe966fe1b8c08a26fa0de";

//city search
let location = document.querySelector("#location");
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityInput = event.target[0];
  let city = cityInput.value;
  let openWeatherByCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  axios.get(openWeatherByCityApiUrl).then(showTemp);
  location.innerHTML = city.toUpperCase();
  cityInput.value = "";
}

//get weather information via api
function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let p = document.getElementById("current-temp");
  p.innerHTML = `${temp}°`;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  axios.get(openWeatherApiUrl).then(showTemp);
}

navigator.geolocation.getCurrentPosition(getLocation);
