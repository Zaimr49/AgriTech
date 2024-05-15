// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Portal() {
//   const [weatherInfo, setWeatherInfo] = useState(null);
//   const userId = localStorage.getItem("userId"); // Example: Fetching from localStorage

//   useEffect(() => {
//     const fetchWeatherInfo = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:5010/api/weather/weather-info",
//           { userId }
//         );
//         setWeatherInfo(response.data);
//       } catch (error) {
//         console.error("Failed to fetch weather data:", error);
//       }
//     };

//     fetchWeatherInfo();
//   }, [userId]);

//   return (
//     <div>
//       {weatherInfo ? (
//         <>
//           <div>
//             <h3>Current Weather</h3>
//             {weatherInfo.currentWeather && (
//               <>
//                 <p>Temperature: {weatherInfo.currentWeather.main.temp}°C</p>
//                 <p>
//                   Description:{" "}
//                   {weatherInfo.currentWeather.weather[0].description}
//                 </p>
//                 <p>Humidity: {weatherInfo.currentWeather.main.humidity}%</p>
//                 <p>Wind Speed: {weatherInfo.currentWeather.wind.speed} km/h</p>
//                 <p>Pressure: {weatherInfo.currentWeather.main.pressure} hPa</p>
//               </>
//             )}
//           </div>
//         </>
//       ) : (
//         <p>Loading weather information...</p>
//       )}
//     </div>
//   );
// }

// export default Portal;

// Portal.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
// import CropLifeCycleDisplay from "../CropLifeCycleDisplay/CropLifeCycleDisplay";
// import cropData from "./cropData.json"; // Import the JSON data

// function Portal() {
//   const [weatherInfo, setWeatherInfo] = useState(null);
//   const [cropInfo, setCropInfo] = useState(null);

//   const userId = localStorage.getItem("userId");
//   useEffect(() => {
//     const fetchWeatherInfo = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:5010/api/weather/weather-info",
//           { userId }
//         );
//         setWeatherInfo(response.data);

//         // Use the end point
//         // const cropResponse = await axios.get("http://localhost:5010/api/crop/crop-info", { params: { userId } });
//         // setCropInfo(cropResponse.data);
//         setCropInfo(cropData);

//       } catch (error) {
//         console.error("Failed to fetch weather data:", error);
//       }
//     };

//     fetchWeatherInfo();
//   }, [userId]);

//   return (
//     <div className="m-5">
//       {weatherInfo ? (
//         <WeatherDisplay weather={weatherInfo.currentWeather} />
//       ) : (
//         <p>Loading weather information...</p>
//       )}
//       {cropInfo ? (
//         <CropLifeCycleDisplay cropData={cropInfo} />
//       ) : (
//         <p>Loading crop life cycle information...</p>
//       )}
//     </div>
//   );
// }

// export default Portal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import CropLifeCycleDisplay from "../CropLifeCycleDisplay/CropLifeCycleDisplay";
import IrrigationRequirementsDisplay from "../IrrigationRequirementsDisplay/IrrigationRequirementsDisplay";
import cropData from "./cropLifeCycleData.json"; // Import the JSON data
import cropIrrigationData from "./cropIrrigationData.json"; // Assuming the data is stored in a file
import Navbar from "../Navbar/Navbar.jsx"
import { Row, Col } from "react-bootstrap"; // Make sure to import Row and Col from react-bootstrap
import { useNavigate } from 'react-router-dom';


function Portal() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [cropInfo, setCropInfo] = useState(null);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchWeatherInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5010/api/weather/weather-info",
          { userId }
        );
        setWeatherInfo(response.data);
        setCropInfo(cropData); // Using static data for now
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherInfo();
  }, [userId]);


  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear user token/session
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
    <div className="m-5">

      
      <Row>
        <Col md={6} className="d-flex align-items-start justify-content-center">
          {weatherInfo ? (
            <WeatherDisplay weather={weatherInfo.currentWeather} />
          ) : (
            <p>Loading weather information...</p>
          )}
        </Col>
        <Col md={6}>
          {" "}
          {/* Adjust the size as needed */}
          {cropInfo ? (
            <CropLifeCycleDisplay cropData={cropInfo} />
          ) : (
            <p>Loading crop life cycle information...</p>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={2}></Col>
        <Col md={8}>
          <IrrigationRequirementsDisplay data={cropIrrigationData} />
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
    </>
  );
}

export default Portal;
