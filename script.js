const apiKey = '87961a08cf77de5c65a8661ee8e1483c'; 
const api = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${api}?q=${city}&appid=${apiKey}&units=metric`);
        
        // If the city isn't found, the API returns a 404.
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

// Simple check: If the API didn't return a city with a name, it's probably invalid
if (!data.name) {
    document.getElementById('weatherResult').innerHTML = "City not found!";
    return;
}

// Display the data
document.getElementById('weatherResult').innerHTML = `...`;
        
        // Success: Update the UI
        document.getElementById('weatherResult').innerHTML = `
            <h3>${data.name}</h3>
            <p>Temp: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        // Handle errors gracefully
        document.getElementById('weatherResult').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error(error);
    }

});
