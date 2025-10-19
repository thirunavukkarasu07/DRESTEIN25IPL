import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Team from "../models/Team.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const email = "thiru07122006@gmail.com";
    const existing = await Team.findOne({ email });
    if (existing) {
      existing.role = "admin";
      existing.approved = true;
      await existing.save();
      console.log(`Updated existing user ${email} to admin`);
      process.exit(0);
    }

    const tempPassword = Math.random().toString(36).slice(-10) + "A1!";
    const hash = await bcrypt.hash(tempPassword, 10);

    const admin = new Team({
      teamName: "Admin",
      members: ["Organizer"],
      department: "Org",
      email,
      passwordHash: hash,
      approved: true,
      role: "admin",
      purseRemaining: 125,
    });

    await admin.save();
    console.log("Admin user created:", email);
    console.log("Temporary password:", tempPassword);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
