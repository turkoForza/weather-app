//! Dom related defs
const searchBar = document.getElementById("search-bar");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const minmax = document.getElementById("minmax");

//! Api related defs
const geoUrl = "https://api.openweathermap.org/geo/1.0/";

const weatherUrl = "https://api.openweathermap.org/data/2.5/";

const apiKey = "5cd07c4bfaaa1f4b27825a62021ad969";

//! when entering a city works functions
const getWeather = (cityName) => {
    getCityGeoCoords(cityName); 
}

//! get entered city geo coords via geoApi
const getCityGeoCoords = (_cityName) =>{
    let query = `${geoUrl}direct?q=${_cityName}&appid=${apiKey}`;

    fetch(query)
    .then((response)=>response.json())
    .then((data)=>sendCityGeoCodes(data))
    .catch((error)=>console.log(error))
};

//! send the geo coords to weatherApi
const sendCityGeoCodes = (data) => {
    let query = `${weatherUrl}weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${apiKey}`;
    fetch(query)
    .then((response)=> response.json())
    .then ((data)=>writeInfosToUI(data))
    .catch((error)=>console.log(error))
};

//! show returned infos on UI
const writeInfosToUI = (data) => {
    city.innerText = `${data.name} , ${data.sys.country}`;
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    desc.innerText = data.weather[0].description;
    minmax.innerText = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

    searchBar.value = "";
}

//! check if enter a city, so works a fnc.
const setQuery = (e) => {
    if(e.keyCode == "13"){
    getWeather(searchBar.value);
    }
}

searchBar.addEventListener("keypress", setQuery);
