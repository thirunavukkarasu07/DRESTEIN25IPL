import express from "express";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import { listPlayers, createPlayer, updatePlayer, deletePlayer } from "../controllers/adminPlayerController.js";
import { listFranchises, createFranchise, updateFranchise, deleteFranchise } from "../controllers/adminFranchiseController.js";
import { markSold } from "../controllers/adminAuctionController.js";
import { upload, importPlayers, importTeams } from "../controllers/adminImportController.js";

const router = express.Router();

router.use(authenticate, requireAdmin);

// Players
router.get("/players", listPlayers);
router.post("/players", createPlayer);
router.put("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);

// Franchises
router.get("/franchises", listFranchises);
router.post("/franchises", createFranchise);
router.put("/franchises/:id", updateFranchise);
router.delete("/franchises/:id", deleteFranchise);

// Auction actions
router.post("/auction/mark-sold", markSold);

// Import endpoints (multipart/form-data)
router.post('/players/import', upload.single('file'), importPlayers);
router.post('/teams/import', upload.single('file'), importTeams);

export default router;
