const apiKey = '7d858e11b39e63bc0ee3ce792ce6c65f'; 

document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Icon Mapping
        const iconMap = {
            'Clouds': 'fa-cloud',
            'Clear': 'fa-sun',
            'Rain': 'fa-cloud-rain',
            'Snow': 'fa-snowflake',
            'Mist': 'fa-smog'
        };

        const iconClass = iconMap[data.weather[0].main] || 'fa-cloud-sun';

        weatherResult.innerHTML = `
            <i class="fa-solid ${iconClass}" id="weatherIcon"></i>
            <h2>${data.name}</h2>
            <h1>${Math.round(data.main.temp)}°C</h1>
            <p>${data.weather[0].description}</p>
        `;
    } catch (err) {
        weatherResult.innerHTML = `<p>City not found.</p>`;
    }
});
