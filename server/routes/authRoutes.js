import express from "express";
import { registerTeam, loginTeam } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerTeam);
router.post("/login", loginTeam);

export default router;
