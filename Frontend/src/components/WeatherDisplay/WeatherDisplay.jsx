// // WeatherDisplay.js
// import React from "react";

// const WeatherDisplay = ({ weather }) => {
//   return (
//     <div>
//       <h3>Current Weather</h3>
//       {weather ? (
//         <>
//           <p>Temperature: {weather.main.temp}°C</p>
//           <p>Description: {weather.weather[0].description}</p>
//           <p>Humidity: {weather.main.humidity}%</p>
//           <p>Wind Speed: {weather.wind.speed} km/h</p>
//           <p>Pressure: {weather.main.pressure} hPa</p>
//         </>
//       ) : (
//         <p>No weather data available.</p>
//       )}
//     </div>
//   );
// };

// export default WeatherDisplay;
// WeatherDisplay.js

// import React from "react";
// import Card from 'react-bootstrap/Card';
// import styles from './WeatherDisplay.module.css'; // Import your CSS module

// const WeatherDisplay = ({ weather }) => {
//   const getWeatherEmoji = (description) => {
//     description = description.toLowerCase();
//     if (description.includes("cloud")) return "☁️";
//     if (description.includes("rain")) return "🌧️";
//     if (description.includes("clear")) return "☀️";
//     if (description.includes("snow")) return "❄️";
//     if (description.includes("thunderstorm")) return "⛈️";
//     return "🌍"; // Generic fallback for other conditions
//   };

//   return (
//     <Card border="dark" style={{ width: '18rem' }}>
//       <Card.Header className={styles.weatherHeader}>Weather Details</Card.Header>
//       <Card.Body>
//         {weather ? (
//           <>
//             <Card.Text>Temperature: {weather.main.temp}°C</Card.Text>
//             <Card.Text>Description: {weather.weather[0].description} {getWeatherEmoji(weather.weather[0].description)}</Card.Text>
//             <Card.Text>Humidity: {weather.main.humidity}%</Card.Text>
//             <Card.Text>Wind Speed: {weather.wind.speed} km/h</Card.Text>
//             <Card.Text>Pressure: {weather.main.pressure} hPa</Card.Text>
//           </>
//         ) : (
//           <Card.Text>No weather data available.</Card.Text>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default WeatherDisplay;
// WeatherDisplay.js
import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./WeatherDisplay.module.css"; // Ensure the CSS module is correctly linked

const WeatherDisplay = ({ weather }) => {
  // Helper function to determine weather emoji based on description
  const getWeatherEmoji = (description) => {
    description = description.toLowerCase();
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain")) return "🌧️";
    if (description.includes("clear")) return "☀️";
    if (description.includes("snow")) return "❄️";
    if (description.includes("thunderstorm")) return "⛈️";
    return "🌍"; // Fallback for other conditions
  };

  // Additional emojis based on the weather conditions
  const getHumidityEmoji = (humidity) => {
    if (humidity > 80) return "💦";
    if (humidity < 30) return "🌵";
    return "🌫️"; // Moderate humidity
  };

  const getWindEmoji = (speed) => {
    if (speed > 25) return "🌬️"; // High wind
    if (speed > 10) return "🍃"; // Moderate wind
    return "🌀"; // Low wind
  };

  const getPressureEmoji = (pressure) => {
    if (pressure > 1020) return "🔼"; // High pressure
    if (pressure < 1000) return "🔽"; // Low pressure
    return "⏹️"; // Normal pressure
  };

  return (
    <Card border="secondary" style={{ width: "18rem" }}>
      <Card.Header className={styles.weatherHeader}>
        Weather Details
      </Card.Header>
      <Card.Body>
        {weather ? (
          <>
            <Card.Text>Temperature: {weather.main.temp}°C</Card.Text>
            <Card.Text>
              Description: {weather.weather[0].description}{" "}
              {getWeatherEmoji(weather.weather[0].description)}
            </Card.Text>
            <Card.Text>
              Humidity: {weather.main.humidity}%{" "}
              {getHumidityEmoji(weather.main.humidity)}
            </Card.Text>
            <Card.Text>
              Wind Speed: {weather.wind.speed} km/h{" "}
              {getWindEmoji(weather.wind.speed)}
            </Card.Text>
            <Card.Text>
              Pressure: {weather.main.pressure} hPa{" "}
              {getPressureEmoji(weather.main.pressure)}
            </Card.Text>
          </>
        ) : (
          <Card.Text>No weather data available.</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherDisplay;
