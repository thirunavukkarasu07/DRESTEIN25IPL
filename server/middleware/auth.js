import jwt from "jsonwebtoken";
import Team from "../models/Team.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get team from token
    req.team = await Team.findById(decoded.id).select("-password");

    if (!req.team) {
      return res.status(401).json({
        success: false,
        message: "Team not found"
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed"
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.team && req.team.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only."
    });
  }
};