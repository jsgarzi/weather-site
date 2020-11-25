let city = "boston";

const api = '773470a2496008d31462265d05fc9252';

let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + api; 


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response){
    console.log(response)
});