// 45602c4421051b01cfbbf1ad93d3f71c
// http://api.weatherstack.com/current?access_key=45602c4421051b01cfbbf1ad93d3f71c&query=New%20York
const weatherApi = {
    key: "45602c4421051b01cfbbf1ad93d3f71c",
    baseurl: "http://api.weatherstack.com/current"

}
const searchInput = document.getElementById('inputBox');
searchInput.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInput.value);
        getWeather(searchInput.value);
        document.querySelector('.weatherBody').style.display="block";
    }

});
function getWeather(city) {
    fetch(`${weatherApi.baseurl}?access_key=${weatherApi.key}&query=${city}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}
function showWeather(weather) {
    console.log(weather);
    let city = document.getElementById('city');
    let date = document.getElementById('date');
    let temp = document.getElementById('temp');
    let humid = document.getElementById('minMax');
    let weatherst = document.getElementById('weatherst');
    temp.innerHTML = `${weather.current.temperature} *C`;
    city.innerHTML = `${weather.location.name},${weather.location.country}`;
    date.innerText = DateManage(new Date());
    humid.innerHTML = `Humidity: ${weather.current.humidity}% <br />Pressure: ${weather.current.pressure} hPa`;
    weatherst.innerText = `${weather.current.weather_descriptions[0]}`;
    if(weatherst.textContent=='Clear'){
        document.body.style.backgroundImage="url('clear.jpg')";
    }else if(weatherst.textContent=='Haze' || weatherst.textContent=='Mist'){
        document.body.style.backgroundImage="url('hazy.jpg')";
    }else if(weatherst.textContent=='Cloud' || weatherst.textContent=='Partly cloudy'){
        document.body.style.backgroundImage="url('cloud.png')";
    }else if(weatherst.textContent=='Rain' || weatherst.textContent=='Heavy rain' || weatherst.textContent=='Light Rain'){
        document.body.style.backgroundImage="url('MoreRain.jpg')";
    }
}
function DateManage(DateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = DateArg.getFullYear();
    let month = months[DateArg.getMonth()];
    let day = days[DateArg.getDay()];
    let date = DateArg.getDate();
    return `${date} ${month} (${day}),${year} `;
}