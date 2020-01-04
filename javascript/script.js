

var citiesListEl = $("#city-list")
var cities = []
var cityName, fiveDayQueryURL, weatherData, currentWeatherIcon, currentWeatherIconEl, weathericon, currentTemp, weatherCard, cityDateEl, tempEl, humidityEl, windspeedEl, fiveDayQueryParams, fiveDayList;
function buildQueryUrl() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    var queryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    queryParams.q = $("#search-term").val().trim();
    queryParams.units = "imperial"
    return queryURL + $.param(queryParams);
}
function buildFiveDayQueryUrl() {
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    fiveDayQueryParams.id = data.id;
    fiveDayQueryParams.units = "imperial";
    return fiveDayQueryURL + $.param(fiveDayQueryParams);
}
init();
function renderCities() {
    if (cities.length > 5) {
        cities.shift();
    }
    // citiesListEl.innerHTML = "";
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var li = $("<li>")
        var button = $("<button>");
        button.text(city);
        button.attr("data-index", i);
        button.attr("style", "width: 100%")
        button.addClass("btn shadow-box btn-info hist-button");
        li.append(button);
        $("#city-list").prepend(li);
        $("#city-list").prepend("<br>");
    }
}
function init() {
    $("#city-list").empty();
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
}
$(".search-button").on("click", function (event) {
    event.preventDefault();
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    var searchHistory = $("#search-term").val().trim();
    if (searchHistory === "") {
        return;
    };
    cities.push(searchHistory)
    localStorage.setItem("cities", JSON.stringify(cities));
    queryURL = buildQueryUrl();
    var fiveDayQueryURL;
    // ---------------------Beginning of AJAX Call---------------------------
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        function buildCurrentWeatherCard() {
            $(weatherCard).append(cityDateEl);
            $(weatherCard).append(weathericon)
            $(weatherCard).append(tempEl);
            $(weatherCard).append(humidityEl);
            $(weatherCard).append(windspeedEl);
            $("#current-day-forecast").append(weatherCard);
        }
        var date = moment().format("MMM Do YY");
        var weatherData = data;
        var currentWeatherIcon = data.weather[0].icon;
        var currentWeatherIconEl = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
        var weathericon = $("<img/>", {
            id: "weather-icon",
            src: currentWeatherIconEl,
            width: 75
        });
        var currentTemp = Math.floor(weatherData.main.temp);
        var weatherCard = $("<div>").addClass("card weather-card current-day-weather");
        var cityDateEl = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
        var tempEl = $("<p>").addClass("card-text").text("Temp: " + currentTemp + " F");
        var humidityEl = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + weatherData.main.humidity + " %");
        var windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed + " mph");
        buildCurrentWeatherCard();
        function buildFiveDayQueryUrl() {
            var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
            var fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
            fiveDayQueryParams.id = data.id;
            fiveDayQueryParams.units = "imperial";
            return fiveDayQueryURL + $.param(fiveDayQueryParams);
        }
        fiveDayQueryURL = buildFiveDayQueryUrl();
        // five day forecast ajax call
        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (fiveData) {
            fiveDayList = fiveData.list;
            for (var i = 4; i < fiveDayList.length; i += 8) {
                var day = fiveDayList[i];
                var dayIcon = day.weather[0].icon;
                var dayWeatherIcon = "https://openweathermap.org/img/wn/" + dayIcon + ".png";
                var dayIconEl = $("<img/>", {
                    id: "weather-icon",
                    src: dayWeatherIcon,
                    width: 50
                })
                var dayTempEl = Math.floor(day.main.temp);
                var dayCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3");
                var dayDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(1, 'days').format('L'));
                var dayTemp = $("<p>").addClass("card-text").text("Temp: " + dayTempEl + " F");
                var dayHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + day.main.humidity);
                $(dayCard).append(dayDate);
                $(dayCard).append(dayIconEl)
                $(dayCard).append(dayTemp);
                $(dayCard).append(dayHum);
                $("#five-day-forecast").append(dayCard);
            }
        })
        var uvIndexEl;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0d2a570544db7d02e47387057bd868ca"
        buildCurrentWeatherCard();
        // uv index ajax call
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndexEl = response.value
            uvIndexTag = $("<p>").text("UV Index: " + uvIndexEl)
            $(".current-day-weather").append(uvIndexTag)
        })
        $("#search-term").val(null)
        init();
    });
    // ----------------END OF AJAX CALL-----------------------------
});

function buildQueryUrlHist() {
    var queryURLHist = "https://api.openweathermap.org/data/2.5/weather?";
    var queryParamsHist = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    queryParamsHist.q = cityName;
    queryParamsHist.units = "imperial"
    return queryURLHist + $.param(queryParamsHist);
};
function buildCurrentWeatherCardHist() {
    $(weatherCard).append(cityDateEl);
    $(weatherCard).append(weathericon)
    $(weatherCard).append(tempEl);
    $(weatherCard).append(humidityEl);
    $(weatherCard).append(windspeedEl);
    $("#current-day-forecast").append(weatherCard);
};

// This is the line i changed
// it used to be
// $(.hist-button).click(function(){
// ---code went here---
// })
// #city-list is the parent id --- button is the child element that
// the click function will delegate to.
$("#city-list").on("click", "button", function () {
    // event.preventDefault();
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    cityName = $(this).text();
    queryURLHist = buildQueryUrlHist();
    $.ajax({
        url: queryURLHist,
        method: "GET"
    }).then(function (data) {
        // Current Day Card ------------------------------------------------
        weatherData = data;
        // current weather card
        currentWeatherIcon = data.weather[0].icon;
        date = moment().format("MMM Do YY");
        currentWeatherIconEl = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
        weathericon = $("<img/>", {
            id: "weather-icon",
            src: currentWeatherIconEl,
            width: 75
        });
        currentTemp = Math.floor(weatherData.main.temp);
        weatherCard = $("<div>").addClass("card weather-card current-day-weather");
        cityDateEl = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
        tempEl = $("<p>").addClass("card-text").text("Temp: " + currentTemp + " F");
        humidityEl = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + weatherData.main.humidity + " %");
        windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed + " mph");
        var uvIndexEl;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0d2a570544db7d02e47387057bd868ca"
        buildCurrentWeatherCardHist();
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndexEl = response.value;
            uvIndexTag = $("<p>").text("UV Index: " + uvIndexEl);
            $(".current-day-weather").append(uvIndexTag);
        })
        // Current Day Card  ---------------------------------------------------------
        // Five Day Forecast ---------------------------------------------------------
        function buildFiveDayQueryUrlHist() {
            var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
            var fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
            fiveDayQueryParams.id = data.id;
            fiveDayQueryParams.units = "imperial";
            return fiveDayQueryURL + $.param(fiveDayQueryParams);
        }
        fiveDayQueryURL = buildFiveDayQueryUrlHist();
        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (fiveData) {
            fiveDayList = fiveData.list;
            for (var i = 4; i < fiveDayList.length; i += 8) {
                var day = fiveDayList[i];
                var dayIcon = day.weather[0].icon;
                var dayWeatherIcon = "https://openweathermap.org/img/wn/" + dayIcon + ".png";
                var dayIconEl = $("<img/>", {
                    id: "weather-icon",
                    src: dayWeatherIcon,
                    width: 50
                })
                var dayTempEl = Math.floor(day.main.temp);
                var dayCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3");
                var dayDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(1, 'days').format('L'));
                var dayTemp = $("<p>").addClass("card-text").text("Temp: " + dayTempEl + " F");
                var dayHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + day.main.humidity);
                $(dayCard).append(dayDate);
                $(dayCard).append(dayIconEl);
                $(dayCard).append(dayTemp);
                $(dayCard).append(dayHum);
                $("#five-day-forecast").append(dayCard);
            }
        })
    })
})
