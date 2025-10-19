import express from "express";
import { listTeams, approveTeam } from "../controllers/adminController.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/teams", requireAdmin, listTeams);
router.post("/teams/:id/approve", requireAdmin, approveTeam);

export default router;
