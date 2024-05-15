// // src/routes/weatherRoute.js
// import express from 'express';
// import weather from 'openweather-apis';

// const router = express.Router();

// weather.setAPPID('1a4e84608c702bdff1d86fdd43ab5366');
// weather.setUnits('metric');
// weather.setLang('en');

// router.get('/', async (req, res) => {
//   const { city, lat, lon } = req.query;
//   if (city) {
//     weather.setCity(city);
//   } else if (lat && lon) {
//     weather.setCoordinate(lat, lon);
//   } else {
//     return res.status(400).json({ error: 'Location parameters are missing.' });
//   }

//   weather.getAllWeather((err, JSONObj) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to fetch weather data', details: err });
//     }
//     res.json(JSONObj);
//   });
// });

// export default router;

// src/routes/weatherRoute.js
// import express from 'express';
// import weather from 'openweather-apis';

// const router = express.Router();


// weather.setAPPID('1a4e84608c702bdff1d86fdd43ab5366');
// weather.setUnits('metric'); // Using metric units for temperature in Celsius
// weather.setLang('en'); // English language for the descriptions

// router.post('/', async (req, res) => {
//   const { city, lat, lon } = req.body; // Getting data from the request body
//   console.log(req.body)
//   if (city) {
//     weather.setCity(city);
//   } else if (lat && lon) {
//     weather.setCoordinate(lat, lon);
//   } else {
//     return res.status(400).json({ error: 'Location parameters are missing.' });
//   }

//   weather.getAllWeather((err, JSONObj) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to fetch weather data', details: err });
//     }
//     res.json(JSONObj);
//   });
// });

// export default router;

// src/routes/weatherRoute.js
// import express from 'express';
// import weather from 'openweather-apis';

// const router = express.Router();

// weather.setAPPID('1a4e84608c702bdff1d86fdd43ab5366');
// weather.setUnits('metric'); // Using metric units for temperature in Celsius
// weather.setLang('en'); // Setting the language to English

// router.post('/', async (req, res) => {
//   const { lat, lon } = req.body; // Extracting latitude and longitude from the request body

//   if (lat && lon) {
//     weather.setCoordinate(lat, lon); // Setting the coordinates

//     weather.getAllWeather((err, JSONObj) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to fetch weather data', details: err });
//       }
//       res.json(JSONObj); // Sending the weather data as a response
//     });
//   } else {
//     return res.status(400).json({ error: 'Latitude and longitude are required.' });
//   }
// });

// export default router;
// src/routes/weatherRoute.js

// WORKING
// import express from 'express';
// import weather from 'openweather-apis';
// import Farmer from '../models/farmer.js'; // Assuming your farmer model is correctly set up

// const router = express.Router();

// weather.setAPPID('1a4e84608c702bdff1d86fdd43ab5366');
// weather.setUnits('metric');
// weather.setLang('en');

// router.post('/weather-info', async (req, res) => {
//   const { userId } = req.body; // Assume you pass the user's ID to find their location

//   try {
//     const farmer = await Farmer.findById(userId);
//     if (!farmer || !farmer.location) {
//       return res.status(404).json({ message: "Farmer location not found" });
//     }

//     const { lat, lon } = farmer.location;
//     weather.setCoordinate(lat, lon);

//     // Get both current weather and forecast
//     weather.getAllWeather((err, currentWeather) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to fetch current weather', details: err });
//       }
//     //   weather.getWeatherForecastForDays(3, (err, forecast) => {
//     //     if (err) {
//     //       return res.status(500).json({ error: 'Failed to fetch weather forecast', details: err });
//     //     }
//         res.json({ currentWeather });
//     //   });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error", details: error });
//   }
// });

// export default router;

// weatherRoutes.js
import express from 'express';
import { getWeatherInfo } from '../controllers/weatherController.js'; // Import your controller

const router = express.Router();

// Set up route for getting weather information
router.post('/weather-info', getWeatherInfo);

export default router;

