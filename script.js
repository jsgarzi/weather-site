let city = "boston";

const api = '773470a2496008d31462265d05fc9252';

let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + api; 

let currentTime = moment().format("MMM, Do, YYYY");


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response){
    console.log(response)
    //city
    console.log(response.name)
    
    //current weather
    console.log(response.main.temp)
    //current cond
    console.log(response.weather[0].main)
    //humidity %
    console.log(response.main.humidity)
    //wind speed mph 
    console.log(response.wind.speed)  
    //uv

});

console.log("("+currentTime+")");