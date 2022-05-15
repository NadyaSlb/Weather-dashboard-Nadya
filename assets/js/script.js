var apikey = "fe1121c51a5a34e148de8210e569b694";
var userFormEl = document.querySelector("#user-form");
var searchInputEl = document.querySelector("#userSearch");
var cityName = document.querySelector('#cityName');
var liTempCurrent = document.querySelector('#tempCurrent');
var liWindCurrent = document.querySelector('#windCurrent');
var liHumCurrent = document.querySelector('#humCurrent');
var liUvCurrent = document.querySelector('#uvCurrent');
var textUV = document.querySelector('#textUV');
var currentDay = document.querySelector('#currentDay');
var afterFour = moment().add(5, 'days').format("[(]M/D/YYYY[)]");
var afterThree = moment().add(4, 'days').format("[(]M/D/YYYY[)]");
var afterTwo = moment().add(3, 'days').format("[(]M/D/YYYY[)]");
var afterOne = moment().add(2, 'days').format("[(]M/D/YYYY[)]");
var tomorrow = moment().add(1, 'days').format("[(]M/D/YYYY[)]");
var moment = moment().format("[(]M/D/YYYY[)]");
var icon = document.querySelector('#icon');
var forecastH = document.querySelector('#forecastH');
var dateOne = document.querySelector('#dateOne');
var iconOne = document.querySelector('#iconOne');
var tempOne = document.querySelector('#tempOne');
var windOne = document.querySelector('#windOne');
var humOne = document.querySelector('#humOne');
var dateTwo = document.querySelector('#dateTwo');
var iconTwo = document.querySelector('#iconTwo');
var tempTwo = document.querySelector('#tempTwo');
var windTwo = document.querySelector('#windTwo');
var humTwo = document.querySelector('#humTwo');
var dateThree = document.querySelector('#dateThree');
var iconThree = document.querySelector('#iconThree');
var tempThree = document.querySelector('#tempThree');
var windThree = document.querySelector('#windThree');
var humThree = document.querySelector('#humThree');
var dateFour = document.querySelector('#dateFour');
var iconFour = document.querySelector('#iconFour');
var tempFour = document.querySelector('#tempFour');
var windFour = document.querySelector('#windFour');
var humFour = document.querySelector('#humFour');
var dateFive = document.querySelector('#dateFive');
var iconFive = document.querySelector('#iconFive');
var tempFive = document.querySelector('#tempFive');
var windFive = document.querySelector('#windFive');
var humFive = document.querySelector('#humFive');
var searchHistory = document.querySelector('#searchHistory');
var citiesList = document.querySelector('#citiesList');
var currentDayDiv = document.querySelector('#currentDayDiv');

// press search button
var formSearchHandler = function(event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
  
    if (city) {
      getCoordinates(city);
      SaveCities(city);
      clearList();
      displayCities();
      cityName.textContent = city;
      currentDay.textContent = moment;
      dateOne.textContent = tomorrow;
      dateTwo.textContent = afterOne;
      dateThree.textContent = afterTwo;
      dateFour.textContent = afterThree;
      dateFive.textContent = afterFour;
      searchInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

  // get coordinates
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
              geticoncode(cityLat, cityLon);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });
  };

  // display weather
  var getWeather = function(cityLat, cityLon){
    var apiUr2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apikey;
    fetch(apiUr2)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
       var tempCurrent = data.current.temp;
       liTempCurrent.textContent = "Temp: " + tempCurrent + " F";
       var windCurrent = data.current.wind_speed;
       liWindCurrent.textContent = "Wind: " + windCurrent + " MPH";
       var humCurrent = data.current.humidity;
       liHumCurrent.textContent = "Humidity: " + humCurrent + " %";
       forecastH.textContent = "5-Day Forecast:";
      var iconDayOne = data.daily[0].weather[0].icon;
      iconOne.setAttribute("src", "http://openweathermap.org/img/wn/" + iconDayOne + ".png");
      var iconDayTwo = data.daily[1].weather[0].icon;
      iconTwo.setAttribute("src", "http://openweathermap.org/img/wn/" + iconDayTwo + ".png");
      var iconDayThree = data.daily[2].weather[0].icon;
      iconThree.setAttribute("src", "http://openweathermap.org/img/wn/" + iconDayThree + ".png");
      var iconDayFour = data.daily[3].weather[0].icon;
      iconFour.setAttribute("src", "http://openweathermap.org/img/wn/" + iconDayFour + ".png");
      var iconDayFive = data.daily[4].weather[0].icon;
      iconFive.setAttribute("src", "http://openweathermap.org/img/wn/" + iconDayFive + ".png");
      var tempDayOne = data.daily[0].temp.day;
      tempOne.textContent = "Temp: " + tempDayOne + " F";
      var tempDayTwo = data.daily[1].temp.day;
      tempTwo.textContent = "Temp: " + tempDayTwo + " F";
      var tempDayThree = data.daily[2].temp.day;
      tempThree.textContent = "Temp: " + tempDayThree + " F";
      var tempDayFour = data.daily[3].temp.day;
      tempFour.textContent = "Temp: " + tempDayFour + " F";
      var tempDayFive = data.daily[4].temp.day;
      tempFive.textContent = "Temp: " + tempDayFive + " F";
      var windDayOne = data.daily[0].wind_speed;
      windOne.textContent = "Wind: " + windDayOne + " MPH";
      var windDayTwo = data.daily[1].wind_speed;
      windTwo.textContent = "Wind: " + windDayTwo + " MPH";
      var windDayThree = data.daily[2].wind_speed;
      windThree.textContent = "Wind: " + windDayThree + " MPH";
      var windDayFour = data.daily[3].wind_speed;
      windFour.textContent = "Wind: " + windDayFour + " MPH";
      var windDayFive = data.daily[4].wind_speed;
      windFive.textContent = "Wind: " + windDayFive + " MPH";
      var humDayOne = data.daily[0].humidity;
      humOne.textContent = "Humidity: " + humDayOne + " %";
      var humDayTwo = data.daily[1].humidity;
      humTwo.textContent = "Humidity: " + humDayTwo + " %";
      var humDayThree = data.daily[2].humidity;
      humThree.textContent = "Humidity: " + humDayThree + " %";
      var humDayFour = data.daily[3].humidity;
      humFour.textContent = "Humidity: " + humDayFour + " %";
      var humDayFive = data.daily[4].humidity;
      humFive.textContent = "Humidity: " + humDayFive + " %";
       var uvCurrent = data.current.uvi;
       textUV.textContent = "UV Index ";
       liUvCurrent.textContent = uvCurrent;
       if (uvCurrent < 3){
         liUvCurrent.classList.add("bg-success");
       }else if (uvCurrent >= 3 && uvCurrent < 6){
         liUvCurrent.classList.add("bg-warning");
       }else if (uvCurrent >= 6){
         liUvCurrent.classList.add("bg-danger");
       }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });
  };

  // get icon
  var geticoncode = function(cityLat, cityLon){
    var apiUr3 = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apikey;
    fetch(apiUr3)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
       var iconcode = data.weather[0].icon;
       icon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconcode + ".png");
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });
  };
 
  // save cities to local storage
  var SaveCities = function(city){
    var newCities = [];
    newCities = JSON.parse(localStorage.getItem("cities")) || [];
    newCities.push(city);
    console.log(newCities);
    localStorage.setItem("cities", JSON.stringify(newCities));
  }

// list of saved cities
var displayCities = function(savedCity){
  var cities = [];
  cities = JSON.parse(localStorage.getItem("cities")) || [];
  for (var i = 0; i < cities.length; i++) {
    var savedCity = cities[i];
    var cityE1 = document.createElement("li");
    citiesList.appendChild(cityE1);
    cityE1.textContent = savedCity;
    cityE1.classList = "list";
    cityE1.setAttribute("id", savedCity);
  }
}

// weather from search history
var savedWeather = function(event){
  city = event.target.getAttribute("id");
  getCoordinates(city);
  cityName.textContent = city;
  currentDay.textContent = moment;
      dateOne.textContent = tomorrow;
      dateTwo.textContent = afterOne;
      dateThree.textContent = afterTwo;
      dateFour.textContent = afterThree;
      dateFive.textContent = afterFour;
}

// clear previous search history
var clearList = function(){
  citiesList.innerHTML = "";
}

// display search history
displayCities();

// event handlers
  userFormEl.addEventListener("submit", formSearchHandler);
  citiesList.addEventListener("click", savedWeather);