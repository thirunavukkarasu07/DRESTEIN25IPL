import jwt from "jsonwebtoken";
import Team from "../models/Team.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const team = await Team.findById(decoded.id).select("-passwordHash");
    if (!team) return res.status(401).json({ message: "Unauthorized" });

    req.team = team;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.team || req.team.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
};
