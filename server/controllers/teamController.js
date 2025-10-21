import Team from "../models/Team.js";
import Franchise from "../models/Franchise.js";

// @desc    Get all teams
// @route   GET /api/teams
// @access  Private
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .select("-password")
      .populate("franchise")
      .populate("players")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    console.error("Get all teams error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching teams",
      error: error.message
    });
  }
};

// @desc    Get single team
// @route   GET /api/teams/:id
// @access  Private
export const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .select("-password")
      .populate("franchise")
      .populate("players");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error("Get team error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching team",
      error: error.message
    });
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private/Admin
export const updateTeam = async (req, res) => {
  try {
    const { teamName, purse } = req.body;

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // Update fields
    if (teamName) team.teamName = teamName;
    if (purse !== undefined) team.purse = purse;

    await team.save();

    const updatedTeam = await Team.findById(team._id)
      .select("-password")
      .populate("franchise")
      .populate("players");

    res.status(200).json({
      success: true,
      data: updatedTeam
    });
  } catch (error) {
    console.error("Update team error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating team",
      error: error.message
    });
  }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private/Admin
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: "Team deleted successfully"
    });
  } catch (error) {
    console.error("Delete team error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting team",
      error: error.message
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/teams/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    const teams = await Team.find()
      .select("-password")
      .populate("franchise")
      .populate("players")
      .sort({ purse: 1 }); // Teams with less purse spent more

    const leaderboard = teams.map((team, index) => ({
      rank: index + 1,
      teamName: team.teamName,
      franchise: team.franchise,
      purse: team.purse,
      spent: 125 - team.purse,
      playerCount: team.players.length,
      overseasCount: team.players.filter(p => p.isOverseas).length
    }));

    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leaderboard",
      error: error.message
    });
  }
};
