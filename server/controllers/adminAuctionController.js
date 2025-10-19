import mongoose from "mongoose";
import Player from "../models/Player.js";
import Team from "../models/Team.js";
import Sale from "../models/Sale.js";

export const markSold = async (req, res) => {
  const { playerId, teamId, price } = req.body;
  if (!playerId || !teamId || typeof price !== 'number') return res.status(400).json({ message: 'playerId, teamId and numeric price are required' });

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const player = await Player.findById(playerId).session(session);
    if (!player) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Player not found' });
    }
    if (player.isSold) {
      await session.abortTransaction();
      return res.status(409).json({ message: 'Player already sold' });
    }

    const team = await Team.findById(teamId).session(session);
    if (!team) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.purseRemaining < price) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Insufficient purse' });
    }

    // update player
    player.isSold = true;
    player.soldTo = team._id.toString();
    player.soldPrice = price;
    await player.save({ session });

    // update team
    team.purseRemaining -= price;
    team.players = team.players || [];
    team.players.push(player._id);
    await team.save({ session });

    // create sale log
    const sale = new Sale({ player: player._id, team: team._id, price, admin: req.team?._id });
    await sale.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Player marked sold', sale: { id: sale._id, player: player._id, team: team._id, price } });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('markSold error:', err);
    res.status(500).json({ message: err.message });
  }
};
