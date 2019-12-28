





// function buildUvQueryUrl() {
//     var longitude = this.coord.lon;
//     var latitude = data.coord.lat;
//     var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?";
//     var uvQueryParams = { "appid": "0d2a570544db7d02e47387057bd868ca" };
//     uvQueryParams.lat = longitude;
//     uvQueryParams.lon = latitude;
// };

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



$(".search-button").on("click", function (event) {

    event.preventDefault();
    console.log("hello")
    $("#current-day-forecast").empty();
    var queryURL = buildQueryUrl();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data.coord.lon);
        console.log(data.coord.lat);
        console.log(data.name);
        function buildCurrentWeatherCard() {
            var date = moment().format("MMM Do YY");
            var weatherData = data;
            var weatherCard = $("<div>").addClass("card weather-card").attr("style", "width: 18rem");
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
        var uvIndexEl;
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0d2a570544db7d02e47387057bd868ca"
        buildCurrentWeatherCard();

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {

            uvIndexEl = response.value


            uvIndexTag = $("<p>").text("UV Index: " + uvIndexEl)
            $(".weather-card").append(uvIndexTag)
        })


    });
})