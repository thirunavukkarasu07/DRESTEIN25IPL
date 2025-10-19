import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Team from "../models/Team.js";

export const registerTeam = async (req, res) => {
  try {
    const { teamName, members, department, email, password } = req.body;

    const existingTeam = await Team.findOne({ email });
    if (existingTeam) return res.status(400).json({ message: "Team already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeam = new Team({
      teamName,
      members,
      department,
      email,
      passwordHash: hashedPassword,
    });

    await newTeam.save();
    res.status(201).json({ message: "Team registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginTeam = async (req, res) => {
  try {
    const { email, password } = req.body;

    const team = await Team.findOne({ email });
    if (!team) return res.status(404).json({ message: "Team not found" });

    const isPasswordValid = await bcrypt.compare(password, team.passwordHash);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: team._id, email: team.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, team: { id: team._id, teamName: team.teamName, email: team.email, approved: team.approved, role: team.role, purseRemaining: team.purseRemaining } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
