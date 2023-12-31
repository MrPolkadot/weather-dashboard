$(document).ready(function () {

    //Grabs the p tag to enter our city name and date
    let currentCityWeather = document.getElementById("city-name-and-date");

    //The input bar
    let city = document.querySelector("#city");



    const APIKEY = "ee3bdd85ae12cf0b59312c7a5aa514bb"; //This key will allow us to "fetch" the data from the weather api

    //Will be used to input a city name and run our function to get coordinates, get our weather data and save our city names into local storage
    let submit = $("#submit");
    submit.click(function (event) {
        event.preventDefault;
        event.stopPropagation();
        api.getLocation();
        city.value = ""; //Clears the input text after the click
    });


    //Created an object of functions
    const api = {
        //Grabs the coordinates of the city entered
        getLocation: () => {
            let geoApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&appid=" + APIKEY;
            fetch(geoApi)
                .then(function (response) {
                    console.log(response);
                    if (!response.ok) throw new Error(response.statusText);
                    currentCityWeather.textContent = "N/A";
                    return response.json();
                })
                .then(function (coord) {
                    console.log(coord);
                    currentCityWeather.textContent = coord[0].name + " " + dayjs().format("(MMMM DD, YYYY hh:mm a)");
                    let latitude = coord[0].lat;
                    let longitude = coord[0].lon;

                    //We can concatenate variables into our url and use them as parameters
                    let weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKEY;
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
            let weatherDate;
            let iconImage;
            let iconURL = "https://openweathermap.org/img/wn/"; //URL to fetch the icon images.
            let imageAlt;
            let weatherDescription;
            let temp;
            let windSpeed;
            let humidityStat;
            let cityName = resp.city.name;
            let savedCityItem = document.querySelector("#saved-city"); //An empty unordered list to add our list items of saved cities

            //Sets the value of the key in "cityName"
            localStorage.setItem("cityNames", cityName);

            let cityList = localStorage.getItem("cityNames");

            //Creates list items with the city submitted on search click
            let li = document.createElement("li");
            li.textContent = cityList;
            savedCityItem.appendChild(li);

            li.addEventListener("click", function (event) {
                event.preventDefault();
                api.displayWeather(resp);
                savedCityItem.removeChild(li);
                currentCityWeather.textContent = cityName + " " + dayjs().format("(MMMM DD, YYYY hh:mm a)");
            });

            let currentWeatherData = resp.list[0].dt;
            if (currentWeatherData) {
                temp = $("#current-weather-main").children().eq(0).text("Temp: " + resp.list[0].main.temp + " °F");
                windSpeed = $("#current-weather-main").children().eq(1).text("Wind Speed: " + resp.list[0].wind.speed + "mph");
                humidityStat = $("#current-weather-main").children().eq(2).text("Humidity: " + resp.list[0].main.humidity + "%");
                iconImage = $("#main-weather-img").attr("src", iconURL + resp.list[0].weather[0].icon + "@4x.png");
            }


            //Iterates through the "list" data so we can choose an index of the list
            for (let i = 0; i < resp.list.length; i++) {
                let unix = resp.list[i].dt; //Grabs the list of unix timestamps
                let stringUnix = unix.toString(); //converts the unix timestamp into a string
                let date = dayjs.unix(stringUnix).format("MMMM DD YYYY"); //formats the converted unix timestamp date

                //Adds our dates to our  weather cards

                //If statement that adds a specific amount of days to our current day and compares it to date contained in the indexed dt_txt
                if (dayjs().add(1, "day").format("YYYY-MM-DD 18:00:00") === resp.list[i].dt_txt) {
                    weatherDate = $("#date-01").html(date); //Sets the date text using dayjs
                    iconImage = $("#icon-01").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png"); //Adds icon image
                    imageAlt = $(".img-alt-01").attr("alt", resp.list[i].weather[0].description); //Alt text for the image
                    weatherDescription = $("#weather-description-01").html(resp.list[i].weather[0].description.toUpperCase()); //Text description for the weather
                    temp = $("#current-weather-01").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-01").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidityStat = $("#current-weather-01").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(2, "day").format("YYYY-MM-DD 18:00:00") === resp.list[i].dt_txt) {
                    weatherDate = $("#date-02").html(date);
                    iconImage = $("#icon-02").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-02").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-02").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-02").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-02").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidityStat = $("#current-weather-02").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(3, "day").format("YYYY-MM-DD 18:00:00") === resp.list[i].dt_txt) {
                    weatherDate = $("#date-03").html(date);
                    iconImage = $("#icon-03").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-03").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-03").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-03").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-03").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidityStat = $("#current-weather-03").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(4, "day").format("YYYY-MM-DD 18:00:00") === resp.list[i].dt_txt) {
                    weatherDate = $("#date-04").html(date);
                    iconImage = $("#icon-04").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-04").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-04").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-04").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-04").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidityStat = $("#current-weather-04").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");

                }
                if (dayjs().add(5, "day").format("YYYY-MM-DD 00:00:00") === resp.list[i].dt_txt) {
                    weatherDate = $("#date-05").html(date);
                    iconImage = $("#icon-05").attr("src", iconURL + resp.list[i].weather[0].icon + "@4x.png")
                    imageAlt = $(".img-alt-05").attr("alt", resp.list[i].weather[0].description);
                    weatherDescription = $("#weather-description-05").html(resp.list[i].weather[0].description.toUpperCase());
                    temp = $("#current-weather-05").children().eq(0).text("Temp: " + resp.list[i].main.temp + " °F");
                    windSpeed = $("#current-weather-05").children().eq(1).text("Wind Speed: " + resp.list[i].wind.speed + "mph");
                    humidityStat = $("#current-weather-05").children().eq(2).text("Humidity: " + resp.list[i].main.humidity + "%");
                }
            }
        },
    }
});



