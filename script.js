$(document).ready(function () {

    // localStorage.clear();


    let cityH = JSON.parse(localStorage.getItem('cityH'));
    // console.log(cityH)

    if (cityH != null ){
        for ( let i = 0 ; i <= cityH.length ; i++){
            searchHistory(cityH[i]);
        }
    } else {
        cityH = [];
    }

    function clear() {
        let currW = $(".clearable");
        currW.empty();
    }

    $("#city-search").on("click", function () {
        let city = $("#location").val();
        getWeather(city);
        // searchHistory(city);
    });

    $("#e-submit").on('submit', function (e) {
        e.preventDefault()
        let city = $("#location").val();
        getWeather(city);
        // searchHistory(city);
    });

    $("#sH").on("click", "div", function () {
        let prevSearch = $(this).attr("data-city");
        if (prevSearch != $("#cityName").text()) {
            getWeather(prevSearch);
        }
    })

    function searchHistory(currC) {
        let searchRow = $('<div>');
        searchRow.addClass("row pl-3 searchRow border-top");
        searchRow.css({ "background-color": "#7698B3", "cursor": "pointer" , "font-size" : "20px" , "font-weight" : "bold"});
        searchRow.attr("data-city", currC)
        searchRow.text(currC);
        $("#sH").append(searchRow);
        console.log(cityH);
    }


    function getWeather(city) {
        const api = '773470a2496008d31462265d05fc9252';
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + api;
        $.ajax({
            type: "GET",
            url: queryURL
        }).then(function (response) {
            clear();
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
            let newCity = true;
            for (let i = 0; i < cityH.length; i++) {
                if (city == cityH[i]) {
                    newCity = false
                }
            }
            if (newCity == true) {
                cityH.push(city);
                localStorage.setItem('cityH',JSON.stringify(cityH));
                searchHistory(city);
            }
        });
    }

    function oneCall(lat, lon) {
        const api = '773470a2496008d31462265d05fc9252';
        let queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + api;
        $.ajax({
            type: "GET",
            url: queryURL
        }).then(function (response) {
            console.log(response);
            //uv
            let UVI = response.current.uvi;
            const UVICont = $("#UVICont");
            console.log(UVI);
            if (UVI <= 2) {
                UVICont.css("color", "#33673B");
                UVICont.append("UV Index: " + UVI);
            }
            else if (UVI > 2 && UVI <= 6) {
                UVICont.css("color", "#C36F09");
                UVICont.append("UV Index: " + UVI);
            }
            else {
                UVICont.css("color", "#91171F");
                UVICont.append("UV Index: " + UVI);
            }
            //5 day (1 , 2, 3, 4, 5)

            console.log(response.daily[1])
            for (let i = 1; i <= 5; i++) {
                const dayEl = $('<div>');
                dayEl.addClass('col');
                //time
                let dateEl = $('<div>');
                dateEl.addClass('col-12');
                let timeA = response.daily[i].dt * 1000;
                let fullDate = new Date(timeA);
                let mo = fullDate.getUTCMonth() + 1;
                let day = fullDate.getUTCDate();
                let yr = fullDate.getUTCFullYear();
                let betterDate = mo + '/' + day + '/' + yr;
                console.log(betterDate);
                dateEl.append(betterDate);
                dayEl.append(dateEl);
                //icon
                let iconEl = $('<div>');
                iconEl.addClass('col-12');
                let condition = response.daily[i].weather[0].icon;
                let iconURL = 'http://openweathermap.org/img/wn/' + condition + '.png';
                let imgEl = $('<img>')
                imgEl.attr('src', iconURL);
                iconEl.append(imgEl);
                dayEl.append(iconEl);
                //temp
                let tempEl = $('<div>');
                tempEl.addClass('col-12');
                let dailyTemp = response.daily[i].temp.day
                tempEl.append('Temp: ' + dailyTemp);
                dayEl.append(tempEl);
                let humEl = $('<div>');
                humEl.addClass('col-12');
                let dailyHum = response.daily[i].humidity;
                humEl.append('Humidity: ' + dailyHum +'%');
                dayEl.append(humEl);
                $('#5day').append(dayEl);

            }
        });
    }
    getWeather('New Brunswick');
})

