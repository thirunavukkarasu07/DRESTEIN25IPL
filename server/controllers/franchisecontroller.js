import Franchise from "../models/Franchise.js";
import Team from "../models/Team.js";

// @desc    Get all franchises
// @route   GET /api/franchises
// @access  Private
export const getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find()
      .populate("assignedTeam", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: franchises.length,
      data: franchises
    });
  } catch (error) {
    console.error("Get all franchises error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching franchises",
      error: error.message
    });
  }
};

// @desc    Get single franchise
// @route   GET /api/franchises/:id
// @access  Private
export const getFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id)
      .populate("assignedTeam", "-password");

    if (!franchise) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    res.status(200).json({
      success: true,
      data: franchise
    });
  } catch (error) {
    console.error("Get franchise error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching franchise",
      error: error.message
    });
  }
};

// @desc    Create franchise
// @route   POST /api/franchises
// @access  Private/Admin
export const createFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.create(req.body);

    res.status(201).json({
      success: true,
      data: franchise
    });
  } catch (error) {
    console.error("Create franchise error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating franchise",
      error: error.message
    });
  }
};

// @desc    Update franchise
// @route   PUT /api/franchises/:id
// @access  Private/Admin
export const updateFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("assignedTeam", "-password");

    if (!franchise) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    res.status(200).json({
      success: true,
      data: franchise
    });
  } catch (error) {
    console.error("Update franchise error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating franchise",
      error: error.message
    });
  }
};

// @desc    Delete franchise
// @route   DELETE /api/franchises/:id
// @access  Private/Admin
export const deleteFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id);

    if (!franchise) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    await franchise.deleteOne();

    res.status(200).json({
      success: true,
      message: "Franchise deleted successfully"
    });
  } catch (error) {
    console.error("Delete franchise error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting franchise",
      error: error.message
    });
  }
};

// @desc    Assign franchise to team
// @route   POST /api/franchises/:id/assign
// @access  Private/Admin
export const assignFranchise = async (req, res) => {
  try {
    const { teamId } = req.body;

    if (!teamId) {
      return res.status(400).json({
        success: false,
        message: "Please provide teamId"
      });
    }

    const franchise = await Franchise.findById(req.params.id);
    const team = await Team.findById(teamId);

    if (!franchise) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // Check if franchise already assigned
    if (franchise.isAssigned) {
      return res.status(400).json({
        success: false,
        message: "Franchise already assigned to another team"
      });
    }

    // Check if team already has a franchise
    if (team.franchise) {
      return res.status(400).json({
        success: false,
        message: "Team already has a franchise"
      });
    }

    // Assign franchise
    franchise.assignedTeam = teamId;
    franchise.isAssigned = true;
    await franchise.save();

    team.franchise = franchise._id;
    await team.save();

    const updatedFranchise = await Franchise.findById(franchise._id)
      .populate("assignedTeam", "-password");

    res.status(200).json({
      success: true,
      data: updatedFranchise
    });
  } catch (error) {
    console.error("Assign franchise error:", error);
    res.status(500).json({
      success: false,
      message: "Error assigning franchise",
      error: error.message
    });
  }
};
