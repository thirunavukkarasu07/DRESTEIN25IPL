import Player from "../models/Player.js";

// GET /api/players?role=Batsman&available=true
export const listPublicPlayers = async (req, res) => {
  try {
    const { role, available } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (available === 'true') filter.isSold = false;
    const players = await Player.find(filter).sort({ createdAt: 1 });
    res.json({ players });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json({ player });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
