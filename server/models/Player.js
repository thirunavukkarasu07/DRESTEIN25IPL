import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Player name is required"],
    trim: true
  },
  category: {
    type: String,
    enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
    required: true
  },
  setNumber: {
    type: Number,
    required: [true, "Set number is required"],
    min: 1,
    max: 20 // Assuming max 20 sets per category
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0.5,
    max: 10
  },
  soldPrice: {
    type: Number,
    default: null
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null
  },
  status: {
    type: String,
    enum: ["available", "sold", "unsold"],
    default: "available"
  },
  isOverseas: {
    type: Boolean,
    default: false
  },
  country: {
    type: String,
    default: "India"
  },
  age: {
    type: Number,
    min: 18,
    max: 45
  },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/300x400?text=Player"
  },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for faster queries
playerSchema.index({ category: 1, setNumber: 1, status: 1 });

export default mongoose.model("Player", playerSchema);