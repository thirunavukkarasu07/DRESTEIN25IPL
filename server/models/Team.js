import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, "Team name is required"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6
  },
  franchise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Franchise",
    default: null
  },
  purse: {
    type: Number,
    default: 125 // Starting purse in crores
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player"
  }],
  role: {
    type: String,
    enum: ["team", "admin"],
    default: "team"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
teamSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
teamSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Team = mongoose.model("Team", teamSchema);

export default Team;