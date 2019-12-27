


function buildCurrentWeatherCard() {
    var weatherCard = $("<div>").addClass("card").attr("style", "width: 18rem");
    var cityDateEl = $("<h5>").addClass("card-title").text(data.name);
    var tempEl = $("<p>").addClass("card-text").text("Temperature: " + data.temp + "F")
    var humidityEl
    var windspeedEl
}


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

    var queryURL = buildQueryUrl();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data.coord.lon);
        console.log(data.coord.lat);
        console.log(data.base);
        var uvIndexEl;
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0d2a570544db7d02e47387057bd868ca"
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.value)
            uvIndexEl = response.value
            console.log(uvIndexEl)

        })

    });
})