document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherContainer = document.getElementById('weather-container');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');

    const sampleWeatherData = {
        location: "New York",
        current: {
            temp: 72,
            feels_like: 74,
            humidity: 65,
            wind_speed: 8,
            pressure: 1012,
            condition: "Partly Cloudy",
            icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/81d7e59b-1136-44b5-9697-ee97ff428ffe.png",
            date: "Monday, June 5, 2023"
        },
        forecast: [
            {
                day: "Tue",
                max_temp: 75,
                min_temp: 62,
                condition: "Sunny",
                icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ebaad1b6-7cbb-4220-9ae6-ad4b989f2f9a.png"
            },
            {
                day: "Wed",
                max_temp: 78,
                min_temp: 65,
                condition: "Cloudy",
                icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/56ef5074-d3dc-458f-af97-1ece2a3e9883.png"
            },
            {
                day: "Thu",
                max_temp: 80,
                min_temp: 68,
                condition: "Rain",
                icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bd560cbf-47c5-41cc-846e-600b5f920aa3.png"
            },
            {
                day: "Fri",
                max_temp: 76,
                min_temp: 64,
                condition: "Partly Cloudy",
                icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/82d87ef8-05b9-44e5-8182-7812fb9a4454.png"
            },
            {
                day: "Sat",
                max_temp: 74,
                min_temp: 61,
                condition: "Sunny",
                icon: "https://placehold.co/50x50?text=☀️"
            }
        ]
    };

    displayWeather(sampleWeatherData);

    searchBtn.addEventListener('click', searchWeather);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });

    function searchWeather() {
        const city = searchInput.value.trim();
        if (city === '') return;

        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        weatherContainer.innerHTML = '';

        setTimeout(() => {
            loading.style.display = 'none';

            if (city.toLowerCase() === 'error') {
                errorMessage.style.display = 'block';
            } else {
                const updatedWeather = { ...sampleWeatherData, location: city };
                displayWeather(updatedWeather);
            }
        }, 1000);
    }

    function displayWeather(data) {
        const { location, current, forecast } = data;

        const weatherHTML = `
            <div class="weather-card fade-in">
                <div class="current-weather">
                    <h2 class="location">${location}</h2>
                    <p class="date">${current.date}</p>
                    <div class="weather-main">
                        <div class="temperature">${current.temp}°F</div>
                        <img class="weather-icon" src="${current.icon}" alt="${current.condition} weather icon">
                    </div>
                    <p class="weather-description">${current.condition}</p>
                    <div class="weather-details">
                        <div class="detail-item">
                            <div class="detail-label">Feels Like</div>
                            <div class="detail-value">${current.feels_like}°F</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Humidity</div>
                            <div class="detail-value">${current.humidity}%</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Wind Speed</div>
                            <div class="detail-value">${current.wind_speed} mph</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Pressure</div>
                            <div class="detail-value">${current.pressure} hPa</div>
                        </div>
                    </div>
                </div>
                <div class="forecast-container">
                    ${forecast.map(day => `
                        <div class="forecast-card fade-in">
                            <div class="forecast-day">${day.day}</div>
                            <img class="forecast-icon" src="${day.icon}" alt="${day.condition} weather icon">
                            <div class="forecast-temp">
                                <span class="forecast-max">${day.max_temp}°</span>
                                <span class="forecast-min">${day.min_temp}°</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        weatherContainer.innerHTML = weatherHTML;
    }
});
