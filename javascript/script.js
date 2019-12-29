function buildQueryUrl() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?";

    var queryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    queryParams.q = $("#search-term")
        .val()
        .trim();
    queryParams.units = "imperial"
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}
function buildFiveDayQueryUrl() {
    var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?";
    var fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    fiveDayQueryParams.id = data.id;
    fiveDayQueryParams.units = "imperial";
    console.log(fiveDayQueryURL + $.param(fiveDayQueryParams));
    return fiveDayQueryURL + $.param(fiveDayQueryParams);
}
$(".search-button").on("click", function (event) {
    event.preventDefault();
    console.log("hello")
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    var queryURL = buildQueryUrl();
    var fiveDayQueryURL;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data.coord.lon);
        console.log(data.coord.lat);
        console.log(data.name);
        console.log(data)
        function buildCurrentWeatherCard() {
            var date = moment().format("MMM Do YY");
            var weatherData = data;
            var currentWeatherIcon = data.weather[0].icon;
            console.log(currentWeatherIcon)
            var weatherCard = $("<div>").addClass("card weather-card current-day-weather rounded-lg").attr("style", "width: 18rem");
            var cityDateEl = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
            var tempEl = $("<p>").addClass("card-text").text("Temperature: " + weatherData.main.temp + "F");
            var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + weatherData.main.humidity);
            var windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed);
            $(weatherCard).append(cityDateEl);
            $(weatherCard).append(tempEl);
            $(weatherCard).append(humidityEl);
            $(weatherCard).append(windspeedEl);
            $("#current-day-forecast").append(weatherCard);
        }
        function buildFiveDayQueryUrl() {
            var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?";
            var fiveDayQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
            fiveDayQueryParams.id = data.id;
            fiveDayQueryParams.units = "imperial";
            console.log(fiveDayQueryURL + $.param(fiveDayQueryParams));
            return fiveDayQueryURL + $.param(fiveDayQueryParams);
        }
        fiveDayQueryURL = buildFiveDayQueryUrl();
        // five day forecast ajax call
        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (fiveData) {
            var fiveDayList = fiveData.list;
            console.log(fiveDayList)
            //    each day is going to get its own var
            var dayOne = fiveDayList[4]
            var dayOneIcon = dayOne.weather[0].icon;
            console.log(dayOneIcon)
            var dayOneCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayOneDate = $("<h5>").addClass("card-title").text(moment().add(1, 'days').format('L'));
            var dayOneTemp = $("<p>").addClass("card-text").text("Temperature: " + dayOne.main.temp + "F");
            var dayOneHum = $("<p>").addClass("card-text").text("Humidity: " + dayOne.main.humidity);
            $(dayOneCard).append(dayOneDate);
            $(dayOneCard).append(dayOneTemp);
            $(dayOneCard).append(dayOneHum);
            $("#five-day-forecast").append(dayOneCard);
            // ------------------------
            var dayTwo = fiveDayList[12]
            var dayTwoCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayTwoDate = $("<h5>").addClass("card-title").text(moment().add(2, 'days').format('L'));
            var dayTwoTemp = $("<p>").addClass("card-text").text("Temperature: " + dayTwo.main.temp + "F");
            var dayTwoHum = $("<p>").addClass("card-text").text("Humidity: " + dayTwo.main.humidity);
            $(dayTwoCard).append(dayTwoDate);
            $(dayTwoCard).append(dayTwoTemp);
            $(dayTwoCard).append(dayTwoHum);
            $("#five-day-forecast").append(dayTwoCard);
            // ------------------------
            var dayThree = fiveDayList[20]
            var dayThreeCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayThreeDate = $("<h5>").addClass("card-title").text(moment().add(3, 'days').format('L'));
            var dayThreeTemp = $("<p>").addClass("card-text").text("Temperature: " + dayThree.main.temp + "F");
            var dayThreeHum = $("<p>").addClass("card-text").text("Humidity: " + dayThree.main.humidity);
            $(dayThreeCard).append(dayThreeDate);
            $(dayThreeCard).append(dayThreeTemp);
            $(dayThreeCard).append(dayThreeHum);
            $("#five-day-forecast").append(dayThreeCard);
            // ------------------------
            var dayFour = fiveDayList[28]
            var dayFourCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayFourDate = $("<h5>").addClass("card-title").text(moment().add(4, 'days').format('L'));
            var dayFourTemp = $("<p>").addClass("card-text").text("Temperature: " + dayFour.main.temp + "F");
            var dayFourHum = $("<p>").addClass("card-text").text("Humidity: " + dayFour.main.humidity);
            $(dayFourCard).append(dayFourDate);
            $(dayFourCard).append(dayFourTemp);
            $(dayFourCard).append(dayFourHum);
            $("#five-day-forecast").append(dayFourCard);
            // ------------------------
            var dayFive = fiveDayList[36]
            var dayFiveCard = $("<div>").addClass("card weather-card col bg-info text-white").attr("style", "width: 18rem");
            var dayFiveDate = $("<h5>").addClass("card-title").text(moment().add(5, 'days').format('L'));
            var dayFiveTemp = $("<p>").addClass("card-text").text("Temperature: " + dayFive.main.temp + "F");
            var dayFiveHum = $("<p>").addClass("card-text").text("Humidity: " + dayFive.main.humidity);
            $(dayFiveCard).append(dayFiveDate);
            $(dayFiveCard).append(dayFiveTemp);
            $(dayFiveCard).append(dayFiveHum);
            $("#five-day-forecast").append(dayFiveCard);
            // ------------------------


        })
        var uvIndexEl;
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0d2a570544db7d02e47387057bd868ca"
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
    });
})