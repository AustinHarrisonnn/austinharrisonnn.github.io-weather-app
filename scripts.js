const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '1a26cd73fd052534b7b9c3d138093296'; // OpenWeatherMap API Key
    const unsplashAccessKey = 'B-Df8du24m0IkRim7w5UIUkts-CMTLLyUaXVyJWglVs'; // Unsplash API Access Key
    const cityInput = document.querySelector('.search input');
    const city = cityInput.value;

    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/sun_10961028.png'
                break;
            case 'Rain':
                image.src = 'images/thunderstorm_4724097.png'
                break;
            case 'Snow':
                image.src = 'images/snow_4724105.png'
                break;
            case 'Clouds':
                image.src = 'images/weather_12953626.png'
                break;
            case 'Storm':
                image.src = 'images/thunderbolt_4724101.png'
                break;
            default:
                image.src = 'images/weather_12953626.png'
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashAccessKey}`)
        .then(response => response.json())
        .then(unsplashJson => {
            if (unsplashJson.results && unsplashJson.results.length > 0) {
                const imageUrl = unsplashJson.results[0].urls.regular;
                document.body.style.backgroundImage = `url(${imageUrl})`;
            }
        });
    });
});
