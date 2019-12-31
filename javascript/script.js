function buildQueryUrl() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    var dataIndex = $()
    var queryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    if ($("#searchterm").val() === "") {
        queryParams.q = $(this).data("index").val();
    }
    queryParams.q = $("#search-term")
        .val()
        .trim();

    queryParams.units = "imperial"
    return queryURL + $.param(queryParams);
}
function buildFiveDayQueryUrl() {
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    fiveDayQueryParams.id = data.id;
    fiveDayQueryParams.units = "imperial";
    console.log(fiveDayQueryURL + $.param(fiveDayQueryParams));
    return fiveDayQueryURL + $.param(fiveDayQueryParams);
}
var citiesListEl = $("#city-list")
var cities = []


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
        button.addClass("btn shadow-box btn-info search-button");
        li.append(button);
        $("#city-list").prepend(li);
        $("#city-list").prepend("<br>");
    }
}
function init() {
    $("#city-list").empty();
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedCities !== null) {
        cities = storedCities;
    }

    // Render todos to the DOM
    renderCities();
}

$(".search-button").on("click", function (event) {
    event.preventDefault();

    var searchHistory = $("#search-term").val().trim();
    if (searchHistory === "") {
        return;
    };
    console.log(searchHistory)
    cities.push(searchHistory)
    localStorage.setItem("cities", JSON.stringify(cities));


    console.log("hello");
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    var queryURL = buildQueryUrl();
    var fiveDayQueryURL;
    // ---------------------Beginning of AJAX Call---------------------------
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        function buildCurrentWeatherCard() {
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
            console.log(currentTemp)
            var weatherCard = $("<div>").addClass("card weather-card current-day-weather").attr("style", "width: 18rem");
            var cityDateEl = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
            var tempEl = $("<p>").addClass("card-text").text("Temp: " + currentTemp + " F");
            var humidityEl = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + weatherData.main.humidity + " %");
            var windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed + " mph");
            $(weatherCard).append(cityDateEl);
            $(weatherCard).append(weathericon)
            $(weatherCard).append(tempEl);
            $(weatherCard).append(humidityEl);
            $(weatherCard).append(windspeedEl);
            $("#current-day-forecast").append(weatherCard);
        }
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
            var fiveDayList = fiveData.list;

            //    each day is going to get its own var
            var dayOne = fiveDayList[7]
            var dayOneIcon = dayOne.weather[0].icon;
            var dayOneWeatherIcon = "https://openweathermap.org/img/wn/" + dayOneIcon + ".png";
            dayOneIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayOneWeatherIcon,
                width: 50
            })
            var dayOneTempEl = Math.floor(dayOne.main.temp);
            var dayOneCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3").attr("style", "width: 18rem");
            var dayOneDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(1, 'days').format('L'));
            var dayOneTemp = $("<p>").addClass("card-text").text("Temp: " + dayOneTempEl + " F");
            var dayOneHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + dayOne.main.humidity);
            $(dayOneCard).append(dayOneDate);
            $(dayOneCard).append(dayOneIconEl)
            $(dayOneCard).append(dayOneTemp);
            $(dayOneCard).append(dayOneHum);
            $("#five-day-forecast").append(dayOneCard);
            // ------------------------
            var dayTwo = fiveDayList[15]
            var dayTwoIcon = dayTwo.weather[0].icon;
            var dayTwoWeatherIcon = "https://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
            dayTwoIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayTwoWeatherIcon,
                width: 50
            })
            var dayTwoTempEl = Math.floor(dayTwo.main.temp);
            var dayTwoCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3").attr("style", "width: 18rem");
            var dayTwoDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(2, 'days').format('L'));
            var dayTwoTemp = $("<p>").addClass("card-text").text("Temp: " + dayTwoTempEl + " F");
            var dayTwoHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + dayTwo.main.humidity);
            $(dayTwoCard).append(dayTwoDate);
            $(dayTwoCard).append(dayTwoIconEl);
            $(dayTwoCard).append(dayTwoTemp);
            $(dayTwoCard).append(dayTwoHum);
            $("#five-day-forecast").append(dayTwoCard);
            // ------------------------
            var dayThree = fiveDayList[23]
            var dayThreeIcon = dayThree.weather[0].icon;
            var dayThreeWeatherIcon = "https://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
            dayThreeIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayThreeWeatherIcon,
                width: 50
            })
            var dayThreeTempEl = Math.floor(dayThree.main.temp)
            var dayThreeCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3").attr("style", "width: 18rem");
            var dayThreeDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(3, 'days').format('L'));
            var dayThreeTemp = $("<p>").addClass("card-text").text("Temp: " + dayThreeTempEl + " F");
            var dayThreeHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + dayThree.main.humidity);
            $(dayThreeCard).append(dayThreeDate);
            $(dayThreeCard).append(dayThreeIconEl);
            $(dayThreeCard).append(dayThreeTemp);
            $(dayThreeCard).append(dayThreeHum);
            $("#five-day-forecast").append(dayThreeCard);
            // ------------------------
            var dayFour = fiveDayList[31]
            var dayFourIcon = dayFour.weather[0].icon;
            var dayFourWeatherIcon = "https://openweathermap.org/img/wn/" + dayFourIcon + ".png";
            dayFourIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayFourWeatherIcon,
                width: 50
            })
            var dayFourTempEl = Math.floor(dayFour.main.temp);
            var dayFourCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mr-md-2 mb-3").attr("style", "width: 18rem");
            var dayFourDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(4, 'days').format('L'));
            var dayFourTemp = $("<p>").addClass("card-text").text("Temp: " + dayFourTempEl + " F");
            var dayFourHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + dayFour.main.humidity);
            $(dayFourCard).append(dayFourDate);
            $(dayFourCard).append(dayFourIconEl);
            $(dayFourCard).append(dayFourTemp);
            $(dayFourCard).append(dayFourHum);
            $("#five-day-forecast").append(dayFourCard);
            // ------------------------
            var dayFive = fiveDayList[39]
            var dayFiveIcon = dayFive.weather[0].icon;
            var dayFiveWeatherIcon = "https://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
            dayFiveIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayFiveWeatherIcon,
                width: 50
            })
            var dayFiveTempEl = Math.floor(dayFive.main.temp);
            var dayFiveCard = $("<div>").addClass("card weather-card col-lg bg-info text-white mb-3").attr("style", "width: 18rem");
            var dayFiveDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(5, 'days').format('L'));
            var dayFiveTemp = $("<p>").addClass("card-text").text("Temp: " + dayFiveTempEl + " F");
            var dayFiveHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + dayFive.main.humidity);
            $(dayFiveCard).append(dayFiveDate);
            $(dayFiveCard).append(dayFiveIconEl);
            $(dayFiveCard).append(dayFiveTemp);
            $(dayFiveCard).append(dayFiveHum);
            $("#five-day-forecast").append(dayFiveCard);
            // ------------------------
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
        $("#search-term").val(" ")
        init();
    });
    // ----------------END OF AJAX CALL-----------------------------
})