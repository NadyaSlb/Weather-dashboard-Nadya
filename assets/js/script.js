var apikey = "827872d8b7d2aff6bb0c70ca4245ef14";
var userFormEl = document.querySelector("#user-form");
var searchInputEl = document.querySelector("#userSearch");
var cityName = document.querySelector('#cityName');
var liTempCurrent = document.querySelector('#tempCurrent');
var liWindCurrent = document.querySelector('#windCurrent');

var formSearchHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    var city = searchInputEl.value.trim();
    console.log(city);
  
    if (city) {
      getCoordinates(city);
      cityName.textContent = city;
  
      // clear old content
      searchInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

  var getCoordinates = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apikey;
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
              var cityLat = data[0].lat;
              var cityLon = data[0].lon;
              console.log(cityLat);
              console.log(cityLon);
              getWeather(cityLat, cityLon);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to GitHub");
      });
  };

  var getWeather = function(cityLat, cityLon){
    var apiUr2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apikey;
    fetch(apiUr2)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
       console.log(data);
       var tempCurrent = data.current.temp;
       liTempCurrent.textContent = "Temp: " + tempCurrent + " F";
       var windCurrent = data.current.wind_speed;
       liWindCurrent.textContent = "Wind: " + windCurrent + " MPH";

        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });
  };

  userFormEl.addEventListener("submit", formSearchHandler);