import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [String],
  department: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  approved: { type: Boolean, default: false },
  role: { type: String, enum: ["team", "admin"], default: "team" },
  franchise: { type: String, default: "" },
  purseRemaining: { type: Number, default: 125 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
