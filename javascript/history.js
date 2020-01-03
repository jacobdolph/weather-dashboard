var cityName, fiveDayQueryURL, weatherData, currentWeatherIcon, currentWeatherIconEl, weathericon, currentTemp, weatherCard, cityDateEl, tempEl, humidityEl, windspeedEl, fiveDayQueryParams, fiveDayList;

function buildQueryUrlHist() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    var queryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    queryParams.q = cityName;
    queryParams.units = "imperial"
    return queryURL + $.param(queryParams);
}
function buildCurrentWeatherCardHist() {
    $(weatherCard).append(cityDateEl);
    $(weatherCard).append(weathericon)
    $(weatherCard).append(tempEl);
    $(weatherCard).append(humidityEl);
    $(weatherCard).append(windspeedEl);
    $("#current-day-forecast").append(weatherCard);
}
$(".hist-button").on("click", function (event) {
    event.preventDefault();
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    cityName = $(this).text();
    var queryURL = buildQueryUrlHist();
    $.ajax({
        url: queryURL,
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
        buildCurrentWeatherCardHist()
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndexEl = response.value
            uvIndexTag = $("<p>").text("UV Index: " + uvIndexEl)
            $(".current-day-weather").append(uvIndexTag)
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
                $(dayCard).append(dayIconEl)
                $(dayCard).append(dayTemp);
                $(dayCard).append(dayHum);
                $("#five-day-forecast").append(dayCard);
            }
        })
    })
})