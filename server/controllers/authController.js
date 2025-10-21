import jwt from "jsonwebtoken";
import Team from "../models/Team.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// @desc    Register a new team
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  try {
    const { teamName, email, password } = req.body;

    // Validation
    if (!teamName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Check if team already exists
    const teamExists = await Team.findOne({ 
      $or: [{ email }, { teamName }] 
    });

    if (teamExists) {
      return res.status(400).json({
        success: false,
        message: "Team with this email or name already exists"
      });
    }

    // Create team
    const team = await Team.create({
      teamName,
      email,
      password
    });

    // Return team data with token
    res.status(201).json({
      success: true,
      data: {
        _id: team._id,
        teamName: team.teamName,
        email: team.email,
        role: team.role,
        purse: team.purse,
        token: generateToken(team._id)
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating team",
      error: error.message
    });
  }
};

// @desc    Login team
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Find team by email
    const team = await Team.findOne({ email }).populate("franchise").populate("players");

    if (!team) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check password
    const isPasswordCorrect = await team.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Return team data with token
    res.status(200).json({
      success: true,
      data: {
        _id: team._id,
        teamName: team.teamName,
        email: team.email,
        role: team.role,
        franchise: team.franchise,
        purse: team.purse,
        players: team.players,
        token: generateToken(team._id)
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};

// @desc    Get current logged in team
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const team = await Team.findById(req.team._id)
      .select("-password")
      .populate("franchise")
      .populate("players");

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching team data",
      error: error.message
    });
  }
};
