$(document).ready(function () {



    $("#city-search").on("click", function () {
        let city = $("#location").val();
        getWeather(city);
        searchHistory(city);
    });

    $("#e-submit").on('submit', function (e) {
        e.preventDefault()
        let city = $("#location").val();
        getWeather(city);
        searchHistory(city);
    });

    $("#sH").on("click", "div", function () {
        let prevSearch = $(this).attr("data-city");
        if (prevSearch != $("#cityName").text()) {
            console.log($("#cityName").text())
            getWeather(prevSearch);
        }
    })

    function searchHistory(currC) {
        let searchRow = $('<div>');
        searchRow.addClass("row pl-3 searchRow");
        searchRow.css({ "background-color": "#7698B3", "cursor": "pointer" });
        searchRow.attr("data-city", currC)
        searchRow.text(currC);
        $("#sH").append(searchRow);
    }


    function getWeather(city) {
        console.log(city)

        const api = '773470a2496008d31462265d05fc9252';
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + api;
        $.ajax({
            type: "GET",
            url: queryURL
        }).then(function (response) {
            console.log(response)
            //city
            let city = response.name;
            let cityName = $("#cityName");
            cityName.addClass("cityNStyle");
            cityName.append(city + " ");
            //date
            let currentTime = moment().format("MMM, Do, YYYY");
            let currTimeEl = $("#date");
            currTimeEl.append(currentTime);
            //current weather
            let currtWeath = response.main.temp;
            let currentW = $("#currentW");
            currentW.addClass("currentWStyle");
            currentW.append("It is currently: <span class='font-weight-bold mx-1'>" + currtWeath + "</span>\u00B0F");
            //current cond
            let condition = response.weather[0].icon
            let iconURL = 'http://openweathermap.org/img/wn/' + condition + '.png';
            $("#condImg").attr("src", iconURL);
            console.log(condition);
            //humidity %
            let humidity = response.main.humidity;
            let curHum = $("#curHum");
            curHum.addClass("curHumStyle");
            curHum.append("Humidity:<span class='font-weight-bold mx-1'>" + humidity + "</span>%");
            //wind speed mph 
            let windSpeed = response.wind.speed;
            let curWind = $("#curWind");
            curWind.addClass("curWindStyle");
            curWind.append("Wind<span class='font-weight-bold mx-1'>" + windSpeed + "</span>MPH");
            //uv , 5 day , previous searches call stuff
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            oneCall(lat, lon);


        });
    }

    function oneCall(lat, lon) {
        const api = '773470a2496008d31462265d05fc9252';
        let queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + api;
        $.ajax({
            type: "GET",
            url: queryURL
        }).then(function (response) {
            console.log(response)
        });
    }

    searchHistory();

})

