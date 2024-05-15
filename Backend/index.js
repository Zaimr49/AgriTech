import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/DB/Connect.js";
import farmerRouter from "./src/routes/farmerRoute.js";
import weatherRouter from './src/routes/weatherRoute.js';
import { FarmerRoute,WeatherRoute } from "./Constant.js"; // Make sure Constant.js exports FarmerRoute using ES6 syntax

dotenv.config();

const app = express();
const port = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());

// Farmer Routes
app.use(FarmerRoute, farmerRouter);
app.use(WeatherRoute, weatherRouter);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// Not working
