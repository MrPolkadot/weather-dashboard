$(document).ready(function () {

    console.log(dayjs().add(1, "day").format("YYYY-MM-DD 12:00:00"));
    let currentCityWeather = document.getElementById("city-name-and-date");
    let city = document.querySelector("#city");


    const APIKEY = "ee3bdd85ae12cf0b59312c7a5aa514bb"; //This key will allow us to "fetch" the data from the weather api

    //Will be used to input a city name and run our function to get coordinates
    let submit = $("#submit");
    submit.on("click", function () {
        api.getLocation();
    });


    //Created an object of functions
    const api = {
        //Grabs the coordinates of the city entered
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
                    //We can concatenate variables into our url and use them as parameters
                    let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?current&lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKEY;
                    fetch(weatherApi)
                        .then(function (resp) {
                            return resp.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            api.displayWeather(data); //<--Will run the function below and passes the data that was fetched here to that function
                        })
                })
        },
        //This runs through all the data and "handpicks" what we want to then add it to our html elements
        displayWeather: (resp) => {
            console.log(resp);
            for (let i = 0; i < resp.list.length; i++) {
                let unix = resp.list[i].dt; //Grabs the list of unix timestamps
                let stringUnix = unix.toString(); //converts the unix timestamp into a string
                let date = dayjs.unix(stringUnix).format("MMMM DD YYYY"); //formats the converted unix timestamp date
                let weatherDate;
                let iconImage;
                let iconURL = "https://openweathermap.org/img/wn/";
                let imageAlt;
                let weatherDescription;
                let temp;
                let windSpeed;
                let humidity;

                console.log(date);


                //Adds our dates to our  weather cards
                if (dayjs().add(1, "day").format("YYYY-MM-DD 12:00:00") === resp.list[i].dt_txt) {
                    weatherDate = $("#date-01").html(date);
                    iconImage = $("#icon-01").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png");
                    imageAlt = $(".img-alt-01").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-01").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-01").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-01").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidity = $("#current-weather-01").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(2, "day").format("YYYY-MM-DD 12:00:00") === resp.list[i].dt_txt) {
                    weatherDateTwo = $("#date-02").html(date);
                    iconImage = $("#icon-02").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-02").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-02").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-02").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-02").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidity = $("#current-weather-02").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(3, "day").format("YYYY-MM-DD 12:00:00") === resp.list[i].dt_txt) {
                    weatherDateOne = $("#date-03").html(date);
                    iconImage = $("#icon-03").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-03").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-03").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-03").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-03").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidity = $("#current-weather-03").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(4, "day").format("YYYY-MM-DD 12:00:00") === resp.list[i].dt_txt) {
                    weatherDateTwo = $("#date-04").html(date);
                    iconImage = $("#icon-04").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-04").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-04").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-04").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-04").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidity = $("#current-weather-04").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(5, "day").format("YYYY-MM-DD 12:00:00") === resp.list[i].dt_txt) {
                    weatherDateTwo = $("#date-05").html(date);
                    iconImage = $("#icon-05").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-05").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-05").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-05").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-05").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidity = $("#current-weather-05").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }





            }
        }
        //resp[i].list)
    }

    //

    //let dateOne = resp.list[5].dt;






    // let weatherData = $("#weather-card");
    // weatherData.html(resp.list.map((day, index) => {
    //     if (index === 0) { 
    //         let date = new Date(day.dt * 1000);






    //         return `<div class="column is-4 is-desktop">
    //         <div class="card">
    //         <header class="card-header">
    //         <p class="card-header-title has-text-white">${date.toDateString()}</p>
    //     </header>
    //     <div class="card-image">
    //         <figure class="image">
    //             <img src="https://openweathermap.org/img/wn/" alt="" class="src">
    //         </figure>
    //     </div>
    //     <div class="card-content pb-6 pl-0">
    //         <div class="content has-text-white">
    //             <ul>
    //                 <li>Temp: </li>
    //                 <li>Wind: </li>
    //                 <li>Humidity: </li>
    //             </ul>
    //         </div>
    //     </div>
    // </div>
    // </div>`
    //     }
    // }).join(" "));






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





