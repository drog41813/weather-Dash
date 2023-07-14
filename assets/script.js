var APIKey = "c9c5f2198d392ad0dcd826401ee823a1";
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCity);
searchButton.addEventListener('click', searchCity);
var listHistory = document.getElementById('history');

var allSearch = [];

function searchCity() {
  var inputCity = document.getElementById('search-bar').value;
  allSearch.push(inputCity);
  localStorage.setItem("Search-History", JSON.stringify(allSearch));

  document.getElementById('search-bar').value = " ";
}

function cityHistory() {
  var storedCities = JSON.parse(localStorage.getItem('Search-History'));
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
  var inputCity = document.getElementById('search-bar').value;
  //console.log(userInput);
  //console.log(searchButton.textContent);
  var cityAPI = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&APPID=c9c5f2198d392ad0dcd826401ee823a1";

  fetch(cityAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Fetch Response \n-------------');
      console.log(data);
      var lat = (data.coord.lat);
      var lon =(data.coord.lon);
      console.log(lat,lon);
      getCoor(lat, lon);
  })
};

var currentDay = document.getElementById('currentDay');

function getCoor(lat, lon) {
  var coordinateAPI = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=c9c5f2198d392ad0dcd826401ee823a1";

  fetch(coordinateAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data);

      currentDay.innerHTML = ""; 
      
      var temp = (data.list[0].main.temp);
      faren = (temp-273.15)*(9/5)+32;
      var humidity = (data.list[0].main.humidity);
      var wind = (data.list[0].wind.speed);
      var date = (data.list[0].dt_txt);
      var formatDate = dayjs(date).format("M/D/YYYY");
      var place = (data.city.name);
      var weather = (data.list[0].weather[0].main);

      var leCity = document.getElementById("leCity");
      leCity.innerText = place + "" + formatDate;

      var leTemp = document.createElement("li");
      leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

      var leWind = document.createElement("li");
      leWind.textContent = "Wind: " + wind + "MPH";

      var leHumidity = document.createElement("li");
      leHumidity.textContent = "Humidity: " + humidity;


      currentDay.appendChild(leTemp);
      currentDay.appendChild(leWind);
      currentDay.appendChild(leHumidity);
    })
};

