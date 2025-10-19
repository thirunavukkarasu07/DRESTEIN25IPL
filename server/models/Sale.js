import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  price: { type: Number, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Sale", saleSchema);
