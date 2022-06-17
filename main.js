
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

  
function updatedisplay(latitude,longitude){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${API_KEY}`).then(res => res.json()).then(data => {
        var presentdiv = document.getElementById("current-temp")
        var divcontainer = document.getElementById("weather-forecast")
        presentdiv.innerHTML=""
        divcontainer.innerHTML=""
        console.log(data)
        const d = new Date();
        let cday = days[d.getDay()];
        data.daily.forEach((day, idx) => {
            
            console.log(day)
                if(idx == 0){
                    presentdiv.innerHTML = `
                    <div class="day">${cday}</div>
                    <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                    <div class="other">
                        <div class="temp">Night - ${day.temp.night}&#176;C</div>
                        <div class="temp">Day - ${day.temp.day}&#176;C</div>
                    </div>
                    `
                }
                if(idx<7 && cday!=days[idx]){
                    divcontainer.innerHTML += `
                    <div class="weather-forecast-item">
                        <div class="day">${days[idx]}</div>
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                        <div class="temp">Night - ${day.temp.night}&#176;C</div>
                        <div class="temp">Day - ${day.temp.day}&#176;C</div>
                    </div>
                    
                    `
                }
            })
        })
}


function getWeatherData () {
    var search = document.getElementById("loc")
    
        console.log(search.value);
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=1&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data,data[0].lat)
            let latitude = data[0].lat
            let longitude = data[0].lon
            updatedisplay(latitude,longitude)
        })

}
currentloc()
function currentloc(){
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude } = success.coords;
        updatedisplay(latitude,longitude)
    })
}