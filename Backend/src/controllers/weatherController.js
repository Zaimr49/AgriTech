// weatherController.js
import weather from 'openweather-apis';
import Farmer from '../models/farmer.js';

weather.setAPPID('1a4e84608c702bdff1d86fdd43ab5366');
weather.setUnits('metric');
weather.setLang('en');

const getWeatherInfo = async (req, res) => {
  const { userId } = req.body;

  try {
    const farmer = await Farmer.findById(userId);
    if (!farmer || !farmer.location) {
      return res.status(404).json({ message: "Farmer location not found" });
    }

    const { lat, lon } = farmer.location;
    weather.setCoordinate(lat, lon);

    // Get both current weather and forecast
    weather.getAllWeather((err, currentWeather) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch current weather', details: err });
      }
      res.json({ currentWeather });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export { getWeatherInfo };
