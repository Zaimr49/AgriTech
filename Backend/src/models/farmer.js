import mongoose from "mongoose";
import bcrypt from "bcrypt";

const farmerSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  location: {
    lat: { type: Number, required: [true, "Latitude is required"] },
    lon: { type: Number, required: [true, "Longitude is required"] }
  }
});

// Pre Hash Password Function
farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Hashed Password Validity Check Function
farmerSchema.methods.isPasswordValid = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
