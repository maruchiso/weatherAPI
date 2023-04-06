const conteiner = document.querySelector('.conteiner');
const search_button = document.querySelector('.search-box button');
const weather_box = document.querySelector('.weather-box');
const weather_details = document.querySelector('.wether-details');
const error = document.querySelector('.not-found');

search_button.addEventListener('click', () => {

    const APIKey = '454af17f1cd332161021bcb83851ab63';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={APIKey}`).then(response => response.json()).then(json => {

        if(json.cod === '404'){
            conteiner.style.height = '400px';
            weather_box.style.display = 'none';
            weather_details.style.display = 'none';
            error.style.display = 'block';
            error.classList.add('fadeIn');
            return;
        }

        error.style.display = 'none';
        error.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                break;

                case 'Clouds':
                image.src = 'images/cloud.png';
                break;

                case 'Mist':
                image.src = 'images/mist.png';
                break;

                case 'Rain':
                image.src = 'images/rain.png';
                break;

                case 'Snow':
                image.src = 'images/snow.png';
                break;

                default:
                    image.src = '';
        }

        temperature.innerHTML = '${parseInt(json.main.temp)}<span>℃</span>';
        description.innerHTML = '${json.weather[0].description}';
        humidity.innerHTML = '${json.main.humidity}%';
        wind.innerHTML = '${parseInt(json.wind.speed)}Km/h';

        weather_box.style.display = '';
        weather_details.style.display = '';
        weather_box.classList.add('fadeIn');
        weather_details.classList.add('fadeIn');
        conteiner.style.height = '600px';
    });
});