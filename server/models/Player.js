import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  set: String, // Batsman, Bowler, All-Rounder, etc.
  basePrice: Number,
  country: String,
  imageURL: String,
  soldTo: { type: String, default: null },
  soldPrice: { type: Number, default: 0 },
  isSold: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Player", playerSchema);
