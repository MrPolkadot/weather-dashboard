$(document).ready(function () {
    let city = "Salt Lake City"; //Will be used to input a city name

    const APIKEY = "ee3bdd85ae12cf0b59312c7a5aa514bb";






    let geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKEY;

    fetch(geoApi)
        .then(function (response) {
            console.log(response);
            // if (response.status === 400) {
            //     console.log(response.status);
            //     $("#error").text(badStatus + response.status);
            // } else {
            return response.json();
        })
        .then(function (coord) {
            for (let i = 0; i < coord.length; i++) {
                let lat = coord[i].lat;
                let lon = coord[i].lon;
                console.log(lat);
                console.log(lon);
                async function getWeatherApi() {
                    let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY;
                    const response = await fetch(weatherApi);
                    const data = await response.json();
                    console.log(data);
                }
                getWeatherApi().catch(error => {
                    console.log("error");
                    console.error(error);
                });
            }
        });
})
