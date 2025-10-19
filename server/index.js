import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminResourceRoutes from "./routes/adminResourceRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import http from "http";
import { Server } from "socket.io";
import initAuctionSocket from "./socket/auctionSocket.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/resources", adminResourceRoutes);
app.use("/api/players", playerRoutes);

// test route
app.get("/", (req, res) => {
  res.send("✅ Hammer Time API running successfully!");
});

// connect database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB connection failed:", err));

// start server with socket.io
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
initAuctionSocket(io);

// start server with port retry in case port is in use
const startServer = (startPort, maxTries = 10) => {
  let port = startPort;
  let attempts = 0;

  const tryListen = () => {
    server.listen(port)
      .once('listening', () => console.log(`🚀 Server + sockets live on port ${port}`))
      .once('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempts < maxTries) {
          console.warn(`Port ${port} in use, trying ${port + 1}...`);
          attempts += 1;
          port += 1;
          setTimeout(tryListen, 200);
          return;
        }
        console.error('Server failed to start:', err);
        process.exit(1);
      });
  };

  tryListen();
};

startServer(DEFAULT_PORT, 10);
