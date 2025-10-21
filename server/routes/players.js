import express from "express";
import {
  getAllPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getRandomPlayer,
  bulkCreatePlayers
} from "../controllers/playercontroller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAllPlayers);
router.get("/random", protect, adminOnly, getRandomPlayer);
router.get("/:id", protect, getPlayer);
router.post("/", protect, adminOnly, createPlayer);
router.post("/bulk", protect, adminOnly, bulkCreatePlayers);
router.put("/:id", protect, adminOnly, updatePlayer);
router.delete("/:id", protect, adminOnly, deletePlayer);

export default router;
