function update_city_name(city) {
  document.querySelector(".city").innerHTML = city.cname;
}

function append_weather_today(today) {
  document.querySelector("#weather-today").innerHTML = today.map(f => {
    return `<div class="col-12">
              <div class="font-size-30">${f.day}</div>
                <div class="vertical-align">
                  <i class="vertical-align-middle wi ${weather_icon[f.code][0]} font-size-20 mt-10"></i>
                </div>
              </div>
              <div class="col-12 mt-10">
              <span class="font-size-20">${f.high}°</span>
              <span class="font-size-10">C</span>
              <span class="font-size-10 blue-grey-700">/</span> 
              <span class="font-size-20">${f.low}°</span>
              <span class="font-size-10">C</span>
            </div>`;
  }).join("");

}

function append_weather_week(forecast) {
  document.querySelector("#weather-week").innerHTML = forecast.map(f => {
    return `<div class="col-2">
              <div class="weather-day vertical-align">
                <div class="vertical-align-middle font-size-16">
                  <div class="mb-10">${f.day}</div>
                    <i class="wi ${weather_icon[f.code][0]} font-size-24 mb-10"></i>
                    <div>
                      <span class="font-size-14">${f.high}°</span>
                      <span class="font-size-8">C</span>
                      <span class="font-size-10 blue-grey-700">/</span> 
                      <span class="font-size-14">${f.low}°</span>
                      <span class="font-size-8">C</span>
                    </div>
                  <div style="display:none;">${f.code} | ${f.text} </div>
                </div>
              </div>
            </div>`;
  }).join("");
}

function fetch_forecast(woeid) {
  const query = escape("select * from weather.forecast where woeid ='" + woeid + "' and u='c'");
  const endpoint = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
      let result = data.query.results.channel.item.forecast;
      forecast.length = 0;
      forecast.push(...result);
    });
}

const forecast = [];

function update_weather(city) {
  fetch_forecast(city.woeid);
  setTimeout(() => {
    update_city_name(city);
    append_weather_today(forecast.slice(0, 1));
    append_weather_week(forecast.slice(1, 7));
  }, 500);
}

function findMatches(input, cities) {
  return cities.filter(place => {
    return place.woeid == input || place.cname == input;
  });
}

function displayMatches(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=city]')).value;
  if (!text) return;
  const matchedArry = findMatches(text, cities);
  if (matchedArry.length > 0) {
    update_weather(matchedArry.pop());
  } else {
    const city = {
      cname: "查無資料"
    }
    update_city_name(city);
  }
  this.reset();
}

const searchInput = document.querySelector(".search-form");
searchInput.addEventListener('submit', displayMatches);

const default_city = cities[0];
update_weather(default_city);