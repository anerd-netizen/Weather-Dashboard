// 1. Log to console to verify the script is actually loading
console.log("Script.js loaded successfully!");

document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    // 2. Input Validation
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        // 3. Fetching data using the variable 'apiKey' from config.js
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        // 4. Handle 404 or other errors
        if (!response.ok) {
            throw new Error("City not found or API error.");
        }

        const data = await response.json();

        // 5. Update UI
        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (err) {
        // 6. Display error on the page
        weatherResult.innerHTML = `<p style="color: red;">${err.message}</p>`;
        console.error(err);
    }
});
