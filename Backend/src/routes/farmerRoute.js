import express from "express";
const router = express.Router();

// Controllers
import { signupFarmer, loginFarmer, getOneFarmer, getAllFarmers } from "../controllers/farmerController.js"; // Ensure this points to your actual farmerController file using ES6 export

// SignUp Route for Farmers
router.post("/signup", signupFarmer);

// Log In Route for Farmers
router.post("/login", loginFarmer);

// Get a Specific Farmer
router.get("/one", getOneFarmer);

// Get All Farmers
router.get("/all", getAllFarmers);

export default router;
