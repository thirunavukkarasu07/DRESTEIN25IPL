import Franchise from "../models/Franchise.js";

export const listFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    res.json({ franchises });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFranchise = async (req, res) => {
  try {
    const franchise = new Franchise(req.body);
    await franchise.save();
    res.status(201).json({ franchise });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFranchise = async (req, res) => {
  try {
    const { id } = req.params;
    const franchise = await Franchise.findByIdAndUpdate(id, req.body, { new: true });
    if (!franchise) return res.status(404).json({ message: "Franchise not found" });
    res.json({ franchise });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFranchise = async (req, res) => {
  try {
    const { id } = req.params;
    await Franchise.findByIdAndDelete(id);
    res.json({ message: "Franchise deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
