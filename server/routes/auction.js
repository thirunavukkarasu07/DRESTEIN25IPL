import express from "express";
import {
  getAuctionStatus,
  spinWheel,
  getCurrentPlayer,
  sellPlayer,
  markUnsold,
  resetAuction
} from "../controllers/auctioncontroller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/status", protect, getAuctionStatus);
router.post("/spin", protect, adminOnly, spinWheel);
router.post("/get-player", protect, adminOnly, getCurrentPlayer);
router.post("/sell", protect, adminOnly, sellPlayer);
router.post("/unsold", protect, adminOnly, markUnsold);
router.post("/reset", protect, adminOnly, resetAuction);

export default router;
