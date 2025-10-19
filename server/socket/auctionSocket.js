import Player from "../models/Player.js";
import Team from "../models/Team.js";
import Sale from "../models/Sale.js";
import mongoose from "mongoose";

export default function initAuctionSocket(io) {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('admin:pick-random', async (payload) => {
      try {
        const { tag } = payload || {};
        const filter = { isSold: false };
        if (tag) {
          // allow matching role or set field
          filter.$or = [{ role: tag }, { set: tag }];
        }
        const count = await Player.countDocuments(filter);
        if (!count) return socket.emit('auction:error', { message: 'No available players in that set' });
        const rand = Math.floor(Math.random() * count);
        const player = await Player.findOne(filter).skip(rand).lean();
        if (!player) return socket.emit('auction:error', { message: 'No player found' });

        io.emit('auction:currentPlayer', { player });
      } catch (err) {
        console.error('admin:pick-random error', err);
        socket.emit('auction:error', { message: err.message });
      }
    });

    socket.on('admin:mark-sold', async (payload) => {
      const { playerId, teamId, price } = payload || {};
      if (!playerId || !teamId || typeof price !== 'number') return socket.emit('auction:error', { message: 'playerId, teamId and numeric price required' });

      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        const player = await Player.findById(playerId).session(session);
        if (!player) {
          await session.abortTransaction();
          return socket.emit('auction:error', { message: 'Player not found' });
        }
        if (player.isSold) {
          await session.abortTransaction();
          return socket.emit('auction:error', { message: 'Player already sold' });
        }

        const team = await Team.findById(teamId).session(session);
        if (!team) {
          await session.abortTransaction();
          return socket.emit('auction:error', { message: 'Team not found' });
        }
        if (team.purseRemaining < price) {
          await session.abortTransaction();
          return socket.emit('auction:error', { message: 'Insufficient purse' });
        }

        player.isSold = true;
        player.soldTo = team._id.toString();
        player.soldPrice = price;
        await player.save({ session });

        team.purseRemaining -= price;
        team.players = team.players || [];
        team.players.push(player._id);
        await team.save({ session });

        const sale = new Sale({ player: player._id, team: team._id, price });
        await sale.save({ session });

        await session.commitTransaction();
        session.endSession();

        io.emit('auction:playerSold', { playerId: player._id, teamId: team._id, price });
        io.emit('auction:purseUpdate', { teamId: team._id, purseRemaining: team.purseRemaining });
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error('admin:mark-sold error', err);
        socket.emit('auction:error', { message: err.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}
