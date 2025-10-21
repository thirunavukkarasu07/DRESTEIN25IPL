import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/teams.js";
import playerRoutes from "./routes/players.js";
import franchiseRoutes from "./routes/Franchises.js";
import auctionRoutes from "./routes/auction.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function(origin,callback){
    if (!origin) return callback(null, true);
    return callback(null, true);
  },
  // origin:['http://localhost:3000','http://localhost:3000/login'],
  credentials: true,
  method:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders:["Content-Type","Authorization","X-Requested-With","Accept"],
  optionsSuccessStatus:200
}));
app.options('*',cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);  
  });

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "🏏 Hammer Time IPL Auction API is running...",
    status: "active",
    version: "1.0.0"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/franchises", franchiseRoutes);
app.use("/api/auction", auctionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Something went wrong!", 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
});