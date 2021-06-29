const COORDS_LS = 'coords';
const API_KEY = '8f4f6497ca12224410395f3cbe52376d';

const weatherContainer = document.querySelector('.js-weather');

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weatherContainer.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(positionObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj));
}

function GeoSuccessHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
        latitude,
        longitude
    };
    saveCoords(positionObj);
    getWeather(latitude, longitude);
}

function GeoErrorHandler() {
    console.log('Ошибка определения геопозиции');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(GeoSuccessHandler, GeoErrorHandler);
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LS);
    if (coords == null) {
        askForCoords();
    } else {
        const loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}


function init() {
    getCoords();
}

init();