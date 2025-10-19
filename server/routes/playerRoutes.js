import express from "express";
import { listPublicPlayers, getPlayerById } from "../controllers/playerPublicController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import Team from "../models/Team.js";

const router = express.Router();

router.get("/", listPublicPlayers);
router.get("/:id", getPlayerById);

// team dashboard
router.get("/team/me", authenticate, async (req, res) => {
  try {
    const team = await Team.findById(req.team._id).populate('players');
    res.json({ team });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
