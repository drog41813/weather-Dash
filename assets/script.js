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
      getFuture(lat, lon);
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

      if(weather == "Clouds")
      {
        var emoji = "☁️";
      }
      else if(weather == "Clear")
      {
        var emoji = "🌥️";
      }
      else if(weather == "Rain")
      {
        var emoji = "🌧️";
      }

      var leCity = document.getElementById("leCity");
      leCity.innerText = place + "" + formatDate + emoji;

      var leTemp = document.createElement("li");
      leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

      var leWind = document.createElement("li");
      leWind.textContent = "Wind: " + wind + "MPH";

      var leHumidity = document.createElement("li");
      leHumidity.textContent = "Humidity: " + humidity + " %";


      currentDay.appendChild(leTemp);
      currentDay.appendChild(leWind);
      currentDay.appendChild(leHumidity);
    })
};

function getFuture(lat, lon) {
  var coordinateAPI = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+ "&appid=c9c5f2198d392ad0dcd826401ee823a1";

  fetch(coordinateAPI)
  .then(function (response) {
      return response.json();
  })
  .then(function (data){
    console.log(data);
    var day1 = document.getElementById('day1-list');
    day1.innerHTML="";

    var date = (data.list[8].dt_txt);
    var formatDate = dayjs(date).format('M/D/YYYY');
    var temp = (data.list[8].main.temp);
    var faren = (temp-273.15)*(9/5)+32;
    var wind = (data.list[8].wind.speed);
    var humidity = (data.list[8].main.humidity);
    var weather = (data.list[8].weather[0].main);
    var emoji = document.getElementById('emoji1');

    if(weather == "Clouds")
      {
        emoji.innerText = "☁️";
      }
      else if(weather == "Clear")
      {
        emoji.innerText = "🌥️";
      }
      else if(weather == "Rain")
      {
        emoji.innerHTML = "🌧️";
      }

    var date1 = document.getElementById('day1');
    date1.innerText = formatDate;

    var leTemp = document.createElement('li');
    leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

    var leWind = document.createElement('li');
    leWind.textContent = "Wind: " + wind + " MPH";

    var leHumidity = document.createElement('li');
    leHumidity.textContent = "Humidity: " + humidity + " %";

    day1.appendChild(leTemp);
    day1.appendChild(leWind);
    day1.appendChild(leHumidity);

    
})
fetch(coordinateAPI)
  .then(function (response) {
      return response.json();
  })
  .then(function (data){
    console.log(data);
    var day2 = document.getElementById('day2-list');
    day2.innerHTML="";

    var date = (data.list[16].dt_txt);
    var formatDate = dayjs(date).format('M/D/YYYY');
    var temp = (data.list[16].main.temp);
    var faren = (temp-273.15)*(9/5)+32;
    var wind = (data.list[16].wind.speed);
    var humidity = (data.list[16].main.humidity);
    var weather = (data.list[16].weather[0].main);
    var emoji = document.getElementById('emoji2');

    if(weather == "Clouds")
      {
        emoji.innerText = "☁️";
      }
      else if(weather == "Clear")
      {
        emoji.innerText = "🌥️";
      }
      else if(weather == "Rain")
      {
        emoji.innerHTML = "🌧️";
      }

    var date2 = document.getElementById('day2');
    date2.innerText = formatDate;

    var leTemp = document.createElement('li');
    leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

    var leWind = document.createElement('li');
    leWind.textContent = "Wind: " + wind + " MPH";

    var leHumidity = document.createElement('li');
    leHumidity.textContent = "Humidity: " + humidity + " %";

    day2.appendChild(leTemp);
    day2.appendChild(leWind);
    day2.appendChild(leHumidity);
 
})
fetch(coordinateAPI)
  .then(function (response) {
      return response.json();
  })
  .then(function (data){
    console.log(data);
    var day3 = document.getElementById('day3-list');
    day3.innerHTML="";

    var date = (data.list[24].dt_txt);
    var formatDate = dayjs(date).format('M/D/YYYY');
    var temp = (data.list[24].main.temp);
    var faren = (temp-273.15)*(9/5)+32;
    var wind = (data.list[24].wind.speed);
    var humidity = (data.list[24].main.humidity);
    var weather = (data.list[24].weather[0].main);
    var emoji = document.getElementById('emoji3');

    if(weather == "Clouds")
      {
        emoji.innerText = "☁️";
      }
      else if(weather == "Clear")
      {
        emoji.innerText = "🌥️";
      }
      else if(weather == "Rain")
      {
        emoji.innerHTML = "🌧️";
      }

    var date3 = document.getElementById('day3');
    date3.innerText = formatDate;

    var leTemp = document.createElement('li');
    leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

    var leWind = document.createElement('li');
    leWind.textContent = "Wind: " + wind + " MPH";

    var leHumidity = document.createElement('li');
    leHumidity.textContent = "Humidity: " + humidity + " %";

    day3.appendChild(leTemp);
    day3.appendChild(leWind);
    day3.appendChild(leHumidity);
 
})
fetch(coordinateAPI)
  .then(function (response) {
      return response.json();
  })
  .then(function (data){
    console.log(data);
    var day4 = document.getElementById('day4-list');
    day4.innerHTML="";

    var date = (data.list[32].dt_txt);
    var formatDate = dayjs(date).format('M/D/YYYY');
    var temp = (data.list[32].main.temp);
    var faren = (temp-273.15)*(9/5)+32;
    var wind = (data.list[32].wind.speed);
    var humidity = (data.list[32].main.humidity);
    var weather = (data.list[32].weather[0].main);
    var emoji = document.getElementById('emoji4');

    if(weather == "Clouds")
      {
        emoji.innerText = "☁️";
      }
      else if(weather == "Clear")
      {
        emoji.innerText = "🌥️";
      }
      else if(weather == "Rain")
      {
        emoji.innerHTML = "🌧️";
      }

    var date4 = document.getElementById('day4');
    date4.innerText = formatDate;

    var leTemp = document.createElement('li');
    leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

    var leWind = document.createElement('li');
    leWind.textContent = "Wind: " + wind + " MPH";

    var leHumidity = document.createElement('li');
    leHumidity.textContent = "Humidity: " + humidity + " %";

    day4.appendChild(leTemp);
    day4.appendChild(leWind);
    day4.appendChild(leHumidity);
 
})
fetch(coordinateAPI)
  .then(function (response) {
      return response.json();
  })
  .then(function (data){
    console.log(data);
    var day5 = document.getElementById('day5-list');
    day5.innerHTML="";

    var date = (data.list[39].dt_txt);
    var formatDate = dayjs(date).format('M/D/YYYY');
    var temp = (data.list[39].main.temp);
    var faren = (temp-273.15)*(9/5)+32;
    var wind = (data.list[39].wind.speed);
    var humidity = (data.list[39].main.humidity);
    var weather = (data.list[39].weather[0].main);
    var emoji = document.getElementById('emoji5');

    if(weather == "Clouds")
      {
        emoji.innerText = "☁️";
      }
      else if(weather == "Clear")
      {
        emoji.innerText = "🌥️";
      }
      else if(weather == "Rain")
      {
        emoji.innerHTML = "🌧️";
      }

    var date5 = document.getElementById('day5');
    date5.innerText = formatDate;

    var leTemp = document.createElement('li');
    leTemp.textContent = "Temp: " + Math.floor(faren) + " F";

    var leWind = document.createElement('li');
    leWind.textContent = "Wind: " + wind + " MPH";

    var leHumidity = document.createElement('li');
    leHumidity.textContent = "Humidity: " + humidity + " %";

    day5.appendChild(leTemp);
    day5.appendChild(leWind);
    day5.appendChild(leHumidity);
})
}
