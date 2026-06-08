const startBtn=document.querySelector(".start");
const search=document.querySelector("#inputfield");
const searchIcon=document.querySelector("#searchIcon");
const desc=document.querySelector("#desc");
const temp=document.querySelector("#temp");
const cityName=document.querySelector("#city");
const wind=document.querySelector("#windSpeed");
const humidity=document.querySelector("#humidityPer");
const goHome=document.querySelector(".homeBtn");
const icon=document.querySelector("#icon");
const mainBox1=document.querySelector(".mainBox1");
const mainBox2=document.querySelector(".mainBox2");
const mainBox3=document.querySelector(".mainBox3");

startBtn.addEventListener("click", ()=>{
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
})

function changeIcon(weatherMain){
    let icons={
        Clouds: "/images/clouds.png",
        Rain: "/images/rain.png",
        Mist: "/images/mist.png",
        Haze: "/images/haze.png",
        Snow: "/images/snow.png",
        Clear: "/images/clear.png"
    };

    icon.src=icons[weatherMain] || "/images/clear.png";
}

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apikey = "2f620a94b512dd1f2adee8794e4a9f54";

async function getWeatherData(city) {
    let finalurl = `${url}q=${city}&appid=${apikey}`;
    let weatherData = await fetch(finalurl).then(res=>res.json());
    console.log(weatherData);

    if(weatherData.cod == 404){
        mainBox2.classList.add("inactive");
        mainBox3.classList.remove("inactive");

        desc.innerHTML=description;
        temp.innerHTML="0 °C";
        cityName.innerHTML="New York";
        wind.innerHTML="0 km/hr";
        humidity.innerHTML="0 %";

        search.value="";
        icon.src="/images/clear.png";

        return;
    }

    desc.innerHTML=weatherData.weather[0].description;
    temp.innerHTML=Math.round(weatherData.main.temp-273.13) + "°C";
    cityName.innerHTML=weatherData.name;
    wind.innerHTML=weatherData.wind.speed + "km/hr";
    humidity.innerHTML=weatherData.main.humidity + "%";

    changeIcon(weatherData.weather[0].main);
}

searchIcon.addEventListener("click", ()=>{
    getWeatherData(search.value);
})
search.addEventListener("keypress", (e)=>{
    if(e.key=="Enter"){
        getWeatherData(search.value);
    }
})

goHome.addEventListener("click", ()=>{
    mainBox1.classList.remove("inactive");
    mainBox3.classList.add("inactive");
})