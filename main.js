const city = document.querySelector('#cities');
const boutton = document.querySelector("#bouton");
const temp = document.querySelector("#temp");
const tableauTemperatures = [];
const tableauDates = [];

async function fetchMeteo(ville) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=d3854dd70fde502690b690c8603617ce`;
    const response = await fetch(url);
    const weather = await response.json();

    console.log(weather.main.temp - 273.15);
    getMap(weather.coord.lat, weather.coord.lon);
    console.log(weather.coord.lat);
    console.log(weather.coord.lon);
    temp.insertAdjacentHTML('beforeEnd', Math.round(weather.main.temp - 273.15));

    const url5Jours = `http://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=d3854dd70fde502690b690c8603617ce`;
    const response2 = await fetch(url5Jours);
    const temp5Jours = await response2.json();

    console.log(temp5Jours);
    temp5Jours.list.forEach((index) => {
        let heure = index.dt_txt.split(" ");
        if (heure[1] === "12:00:00") {
            tableauTemperatures.push(Math.round(index.main.temp - 273.15));
            tableauDates.push(index.dt_txt);
        }
    });
    getGraph(tableauDates, tableauTemperatures);


}

boutton.addEventListener('click', (event) => {
    event.preventDefault();
    fetchMeteo(city.value);
})

















const city = document.querySelector('#cities');
const boutton = document.querySelector("#bouton");
const temp = document.querySelector("#temp");

// data liste 
const list = document.querySelector('#liste');

const tableauTemperatures = [];
const tableauDates = [];

const url2 = "https://places-dsn.algolia.net/1/places/query"; 


async function fetchMeteo(ville) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=1ce64129da731d692308f766613a1037`;
    const response = await fetch(url);
    const weather = await response.json();
    console.log(weather.main.temp - 273.15);
    getMap(weather.coord.lat, weather.coord.lon);
    console.log(weather.coord.lat);
    console.log(weather.coord.lon);
    temp.insertAdjacentHTML('beforeEnd', Math.round(weather.main.temp - 273.15));

    const url5Jours = `http://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=1ce64129da731d692308f766613a1037`;
    const response2 = await fetch(url5Jours);
    const temp5Jours = await response2.json();
    console.log(temp5Jours);
    temp5Jours.list.forEach((index) => {
        let heure = index.dt_txt.split(" ");
        if (heure[1] === "12:00:00") {
            tableauTemperatures.push(Math.round(index.main.temp - 273.15));
            tableauDates.push(index.dt_txt);
        }
    });
    getGraph(tableauDates, tableauTemperatures);
}


city.addEventListener('keyup', (event) => {
        list.innerHTML='';
    console.log(event.currentTarget.value);
      //  var nameCity = event.currentTarget.value;
    fetch(url2, {
        method: 'POST',
        body: JSON.stringify({query: event.currentTarget.value})
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data.hits);
        data.hits.forEach(ville => { 
//      console.log(ville.locale_names.default[0]);
list.insertAdjacentHTML('beforeend', `<option value="${ville.locale_names.default[0]}">`);         
 })
    })
    .catch((err) => {
        console.log(err);
    })
    
    if (event.keyCode === 13) {
        fetchMeteo(city.value);
    }
})


city.addEventListener('change', (event) => {
    fetchMeteo(city.value)
}) 
