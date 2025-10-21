import express from "express";
import {
  getAllFranchises,
  getFranchise,
  createFranchise,
  updateFranchise,
  deleteFranchise,
  assignFranchise
} from "../controllers/franchisecontroller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAllFranchises);
router.get("/:id", protect, getFranchise);
router.post("/", protect, adminOnly, createFranchise);
router.put("/:id", protect, adminOnly, updateFranchise);
router.delete("/:id", protect, adminOnly, deleteFranchise);
router.post("/:id/assign", protect, adminOnly, assignFranchise);

export default router;
