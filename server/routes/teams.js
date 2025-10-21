import express from "express";
import {
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  getLeaderboard
} from "../controllers/teamController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAllTeams);
router.get("/leaderboard", getLeaderboard);
router.get("/:id", protect, getTeam);
router.put("/:id", protect, adminOnly, updateTeam);
router.delete("/:id", protect, adminOnly, deleteTeam);

export default router;
