import mongoose from "mongoose";

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, default: "" },
  color: { type: String, default: "#ffffff" },
  basePrice: { type: Number, default: 0 },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
}, { timestamps: true });

export default mongoose.model("Franchise", franchiseSchema);
