$(document).ready(function () {
    
    //Will be used to input a city name
    let submit = $("#submit");
    submit.on("click", function () {
        getApi();
    })

    let showData = $("#data");
    const APIKEY = "ee3bdd85ae12cf0b59312c7a5aa514bb"; //This key will allow us to "fetch" the data from the weather api



    function getApi() {
        let city = $("#city").val();
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
                        let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKEY;
                        const response = await fetch(weatherApi);
                        console.log(response);
                        const data = await response.json();
                        
                        console.log(data);
                        if (data) {
                            for (let j = 0; j < data.length; i++) {
                                console.log(data[i].city.name);
                            }
                        }
                        return data;
                    }
                    getWeatherApi().catch(error => {
                        console.log("error");
                        console.error(error);
                    });
                }
            });
    }
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







})




