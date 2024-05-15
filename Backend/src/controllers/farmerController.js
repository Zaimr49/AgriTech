import { StatusCodes } from "http-status-codes";
import Farmer from "../models/farmer.js"; // Assuming you have a Farmer model similar to Student

// Get one specific farmer
const getOneFarmer = async (req, res) => {
  try {
    console.log("In get 1 farmer function");
    const farmerId = req.query.id;
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Farmer not found" });
    }
    res.status(StatusCodes.OK).json(farmer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Get all farmers
const getAllFarmers = async (req, res) => {
  try {
    console.log("In farmer getall");
    const farmers = await Farmer.find();
    res.status(StatusCodes.OK).json(farmers);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Farmer signup
const signupFarmer = async (req, res) => {
  try {
    console.log("In farmer signup");
    const { email, password, username, location } = req.body;

    // Check if the location data includes latitude and longitude
    if (!location || location.lat === undefined || location.lon === undefined) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Latitude and longitude are required." });
    }

    // Check if a farmer with the given email already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already in use" });
    }

    // Create a new farmer with the provided details and location
    const newFarmer = new Farmer({
      username,
      email,
      password, // Password will be hashed in the pre-save hook in the Farmer model
      location
    });

    // Save the new farmer to the database
    await newFarmer.save();

    // Respond with the created farmer's information, excluding the password
    const farmerResponse = {
      _id: newFarmer._id,
      username: newFarmer.username,
      email: newFarmer.email,
      location: newFarmer.location
    };
    res.status(StatusCodes.CREATED).json(farmerResponse);
  } catch (error) {
    console.log("Cannot Signup", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};


// Farmer login
const loginFarmer = async (req, res) => {
  try {
    console.log("In farmer login");
    const { email, password } = req.body;
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    const validPassword = await farmer.isPasswordValid(password);
    if (!validPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    res.status(StatusCodes.OK).json(farmer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

export { getOneFarmer, getAllFarmers, signupFarmer, loginFarmer };
