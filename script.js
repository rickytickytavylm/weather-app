const apiKey = "c60e66ef02e19a1aa6478606c06a9173";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather");

searchBtn.addEventListener("click",startAppWork)
  

function startAppWork(){

    if (searchBox.value.length === 0) {
        alert("Введите название города");
        searchBox.value = ""
    } else {
        checkWeather(searchBox.value);
        searchBox.value = "";
    }
}

function cityNameCheck(data){
    console.log(data)
    if(data === undefined){
        weatherInfo.style.display = "none";
        setTimeout(()=>{
            alert("Неверный формат записи")
        },100)
    }else{
        weatherInfo.style.display = "block"
        return data
    }
}


async function checkWeather(city) {


//   weatherInfo.style.display = "block";

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  document.querySelector(".city").innerHTML = cityNameCheck(data.name);
  document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "img/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "img/mist.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "img/snow.png";
  }
}
