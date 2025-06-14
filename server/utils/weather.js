// utils/weather.js
import axios from 'axios';

export const getWeatherByCoordinates = async (latitude, longitude) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error("Weather API error:", error.message);
    throw new Error("Failed to fetch weather data");
  }
};
