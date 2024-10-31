const apiKey = 'f3b979916cb400672bf838bdfceddc56';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to fetch current weather data
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
        // Fetch forecast data after getting current weather
        getForecast(city);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        document.getElementById('content').innerText = error.message;
    }
}

// Function to fetch weather forecast data
async function getForecast(city) {
    try {
        const response = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error('Forecast data not found');
        }

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching the forecast data:', error);
    }
}

// Function to display current weather data
function displayWeather(data) {
    const weather = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById('content').innerHTML = weather;
}

// Function to display weather forecast data
function displayForecast(data) {
    let forecastHTML = '<h3>Weather Forecast</h3>';
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = item.main.temp;
        const description = item.weather[0].description;
        forecastHTML += `
            <p>${date}: ${temp} °C, ${description}</p>
        `;
    });
    document.getElementById('content').innerHTML += forecastHTML;
}

// Event listener for fetching weather on button click
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Fetch default weather on page load
document.addEventListener('DOMContentLoaded', () => {
    const city = 'Reykjavik'; // Default city
    getWeather(city);
});
