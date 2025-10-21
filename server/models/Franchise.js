import mongoose from "mongoose";

const franchiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Franchise name is required"],
    unique: true,
    trim: true
  },
  shortName: {
    type: String,
    required: true,
    maxlength: 4,
    uppercase: true
  },
  logo: {
    type: String,
    default: "https://via.placeholder.com/200x200?text=Logo"
  },
  primaryColor: {
    type: String,
    default: "#1e40af"
  },
  secondaryColor: {
    type: String,
    default: "#3b82f6"
  },
  assignedTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null
  },
  city: {
    type: String,
    required: true
  },
  isAssigned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Franchise = mongoose.model("Franchise", franchiseSchema);

export default Franchise;