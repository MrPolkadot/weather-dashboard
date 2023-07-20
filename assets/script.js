$(document).ready(function () {
    let city;
    const APIKEY = "ee3bdd85ae12cf0b59312c7a5aa514bb";
    let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKEY;
    let badStatus = "Error: ";
  
    function getApi() {
        fetch(queryURL)
            .then(function (response) {
                console.log(response);
                if(response.status === 400) {
                    console.log(response.status);
                    $("#error").text(badStatus + response.status);
                } else {
                    return response.json();
                }
            })
            .then(function (data) {
                console.log(data);
            });
    }

    getApi();





});

