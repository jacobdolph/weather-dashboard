function buildQueryUrl(searchHistory) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    let queryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    queryParams.q = searchHistory
    queryParams.units = "imperial"
    return queryURL + $.param(queryParams);
}

function buildFiveDayQueryUrl(data) {
    let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    let fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    fiveDayQueryParams.id = data.id;
    fiveDayQueryParams.units = "imperial";
    return fiveDayQueryURL + $.param(fiveDayQueryParams);
}

function buildCurrentWeatherCard(data, weatherData, weatherCard, cityDateEl, tempEl, humidityEl, windspeedEl, weathericon) {
    $(weatherCard).append(cityDateEl);
    $(weatherCard).append(weathericon)
    $(weatherCard).append(tempEl);
    $(weatherCard).append(humidityEl);
    $(weatherCard).append(windspeedEl);
    $("#current-day-forecast").append(weatherCard);
}

function buildFiveDayForecast(fiveData) {

    fiveDayList = fiveData.list;
    for (var i = 4; i < fiveDayList.length; i += 8) {
        let day = fiveDayList[i];
        let dateYear = day.dt_txt.slice(0, 4);
        let dateMonth = day.dt_txt.slice(5, 7);
        let dateDay = day.dt_txt.slice(8, 10)
        let dayIcon = day.weather[0].icon;
        let dayWeatherIcon = "https://openweathermap.org/img/wn/" + dayIcon + ".png";
        let dayIconEl = $("<img/>", {
            id: "weather-icon",
            src: dayWeatherIcon,
            width: 50
        })
        let dayTempEl = Math.floor(day.main.temp);
        let dayCard = $("<div>").addClass("card weather-card col-lg border border-white opacity-4 text-black font-weight-bold mr-md-2 mb-3");
        let dayDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(`${dateMonth}/${dateDay}/${dateYear}`);
        let dayTemp = $("<p>").addClass("card-text").text("Temp: " + dayTempEl + " F");
        let dayHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + day.main.humidity);
        $(dayCard).append(dayDate);
        $(dayCard).append(dayIconEl)
        $(dayCard).append(dayTemp);
        $(dayCard).append(dayHum);
        $("#five-day-forecast").append(dayCard);
    }
}

function buildWeatherCardData(data) {
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
    var weatherCard = $("<div>").addClass("card weather-card opacity-4 text-black font-weight-bold border border-white current-day-weather");
    var cityDateEl = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
    var tempEl = $("<p>").addClass("card-text").text("Temp: " + currentTemp + " F");
    var humidityEl = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + weatherData.main.humidity + " %");
    var windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed + " mph");

    buildCurrentWeatherCard(data, weatherData, weatherCard, cityDateEl, tempEl, humidityEl, windspeedEl, weathericon);
}