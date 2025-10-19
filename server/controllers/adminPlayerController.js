import Player from "../models/Player.js";

export const listPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ players });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const data = req.body;
    const player = new Player(data);
    await player.save();
    res.status(201).json({ player });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(id, req.body, { new: true });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json({ player });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    await Player.findByIdAndDelete(id);
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
