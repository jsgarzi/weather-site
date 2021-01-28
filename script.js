// let city;
$(document).ready(function(){


$("#city-search").on("click", function () {
    let city = $("#location").val();    
    getWeather(city);
});

$("#e-submit").on('submit',function(e){
    e.preventDefault()
    let city = $("#location").val();
    getWeather(city);
});

// let currentTime = moment().format("MMM, Do, YYYY");
// const currTimeEl = $("#current-WTI");
// currTimeEl.append("("+currentTime+") ");
// console.log("("+currentTime+")");

// need to call weather for next 5 day 

function getWeather(city){
    console.log(city)

    const api = '773470a2496008d31462265d05fc9252';
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + api;
    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function (response) {
        console.log(response)
        //city
        let city = response.name
        const cityEl = $("#current-WTI")
        cityEl.append(city + " ")
        //date
        let currentTime = moment().format("MMM, Do, YYYY");
        const currTimeEl = $("#current-WTI");
        currTimeEl.append("(" + currentTime + ") ");
        console.log("(" + currentTime + ")");
        //current weather
        let currtWeath = response.main.temp
        console.log("Temperature: " + currtWeath + " °F")
        //current cond
        let condition = response.weather[0].main
        console.log(condition)
        //humidity %
        let humidity = response.main.humidity
        console.log(humidity + "% Humidity")
        //wind speed mph 
        let windSpeed = response.wind.speed
        console.log(windSpeed + " mph")
        //uv??
    });
}
})

