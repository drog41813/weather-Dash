var APIKey = "c9c5f2198d392ad0dcd826401ee823a1";
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCity);
searchButton.addEventListener('click', searchCity);
var listHistory = document.getElementById('history');

var allSearch = [];

function searchCity() {
  var cityInput = document.getElementById('search-bar').value;
  allSearch.push(cityInput);
  localStorage.setItem("Search-History", JSON.stringify(allSearch));
}

function cityHistory() {
  var storedCities = JSON.parse(localStorage.getItem("Search-History"));
  if (storedCities !== null) {
    allSearch = storedCities;

    for(i = 0; i < storedCities.length; i++) {
      var cityPlacement = storedCities[i];
      var li = document.createElement('button');
      li.textContent = cityPlacement;
      li.setAttribute('data-index', i);
      listHistory.appendChild(li);
    }
  }
}

cityHistory(); 

function getCity() {
  var cityInput = document.getElementById('search-bar').value;
  //console.log(userInput);
  //console.log(searchButton.textContent);
  var cityAPI = "https://api.openweathermap.org/data/2.5/forecast?q=%22"+cityInput+"%22&appid=c9c5f2198d392ad0dcd826401ee823a1";


  fetch(cityAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Fetch Response \n-------------');
      var lat = (data.city.coord.lat);
      var lon =(data.city.coord.lon);
      console.log(lat,lon);
      getCoor(lat,lon);
  })
};

function getCoor(lat, lon) {
  var coordinateAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=%22"+lat+"%22&lon=%22"+lon+"%22&appid=c9c5f2198d392ad0dcd826401ee823a1";

  fetch(coordinateAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var temp = (data.list[0].main.temp);
      var humidity = (data.list[0].main.humidity);
      var wind = (data.list[0].wind.gust);
      var date = (data.list[0].dt_txt);
      var place = (data.city.name);
      var weather = (data.list[0].weather[0].main);
      // var temp =(data.);
    })
};