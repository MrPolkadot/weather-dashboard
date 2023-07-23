$(document).ready(function () {


    let currentCityWeather = document.getElementById("city-name-and-date");
    let city = document.querySelector("#city");


    const APIKEY = "ee3bdd85ae12cf0b59312c7a5aa514bb"; //This key will allow us to "fetch" the data from the weather api

    //Will be used to input a city name
    let submit = $("#submit");
    submit.on("click", function () {
        api.getLocation();
        //currentCityWeather.innerText = data.city.name;
    });

    const api = {
        getLocation: () => {
            let geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&appid=" + APIKEY;

            fetch(geoApi)
                .then(function (response) {
                    console.log(response);
                    if (!response.ok) throw new Error(response.statusText);
                    return response.json();
                })
                .then(function (coord) {
                    console.log(coord);
                    currentCityWeather.textContent = coord[0].name;
                    let latitude = coord[0].lat;
                    let longitude = coord[0].lon;
                    let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?current&lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKEY;
                    fetch(weatherApi)
                        .then(function (resp) {
                            return resp.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            api.displayWeather(data);
                        })
                })


        },
        displayWeather: (resp) => {

        }
    }




});
    // getWeatherApi().catch(error => {
    //     console.log("error");
    //     console.error(error);
    // });



    // function getCoords(lat, lon) {
    //     fetch(geoApi)
    //         .then(function (response) {
    //             console.log(response);
    //             return response.json();
    //         })
    //         .then(function (coord) {
    //             for (let i = 0; i < coord.length; i++) {
    //                 lat = coord[i].lat;
    //                 lon = coord[i].lon;
    //                 //console.log(lat);
    //                 //console.log(lon);
    //             }
    //             let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat  + "&lon=" + lon + "&appid=" + APIKEY;
    //             return weatherApi;
    //         });
    // }

    // getCoords();

    // function getWeatherApi() {
    //     fetch(weatherApi)
    //         .then(function (response) {
    //             if (response.ok) {
    //                 response.json()
    //                     .then(function (data) {
    //                         console.log(data);
    //                     })

    //                 for (let i = 0; i < data.length; i++) {
    //                     showData.textContent = data.city;
    //                 }
    //             }
    //         });
    //     }

    //      getWeatherApi()//.catch(error => {
    //          console.log("error");
    //         console.error(error);
    //      });





