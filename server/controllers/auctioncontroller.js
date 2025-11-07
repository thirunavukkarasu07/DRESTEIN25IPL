import Auction from "../models/Auction.js";
import Player from "../models/Player.js";
import Team from "../models/Team.js";

// @desc    Get auction status
// @route   GET /api/auction/status
// @access  Private
export const getAuctionStatus = async (req, res) => {
  try {
    let auction = await Auction.findOne()
      .populate("currentPlayer")
      .populate({
        path: "auctionHistory.player",
        model: "Player"
      })
      .populate({
        path: "auctionHistory.soldTo",
        model: "Team",
        select: "-password"
      });

    // Create if doesn't exist
    if (!auction) {
      auction = await Auction.create({});
    }

    res.status(200).json({
      success: true,
      data: auction
    });
  } catch (error) {
    console.error("Get auction status error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching auction status",
      error: error.message
    });
  }
};

// @desc    Spin wheel to select category
// @route   POST /api/auction/spin
// @access  Private/Admin
export const spinWheel = async (req, res) => {
  try {
    const categories = ["Batsman", "Bowler", "All-Rounder", "Wicket-keeper"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    let auction = await Auction.findOne();
    if (!auction) {
      auction = await Auction.create({});
    }

    auction.currentSet = randomCategory;
    auction.spinHistory.push({
      category: randomCategory,
      timestamp: new Date()
    });

    await auction.save();

    res.status(200).json({
      success: true,
      data: {
        category: randomCategory,
        auction
      }
    });
  } catch (error) {
    console.error("Spin wheel error:", error);
    res.status(500).json({
      success: false,
      message: "Error spinning wheel",
      error: error.message
    });
  }
};

// @desc    Get random player from current set
// @route   POST /api/auction/get-player
// @access  Private/Admin
export const getCurrentPlayer = async (req, res) => {
  try {
    const { category } = req.body;
    console.log(req.body);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category"
      });
    }

    // Normalize category input to match stored enum values (case/spacing/hyphen tolerant)
    const allowedCategories = ["Batsman", "Bowler", "All-Rounder", "Wicket-keeper"];
    const normalize = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const incoming = normalize(category);
    const canonical = allowedCategories.find(c => normalize(c) === incoming);

    if (!canonical) {
      return res.status(400).json({
        success: false,
        message: `Unknown category '${category}'`
      });
    }

    // Find available players in this category (use canonical enum value)
    const availablePlayers = await Player.find({
      category: canonical,
      status: "available"
    });

    if (availablePlayers.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No available players in ${category} category`
      });
    }

    // Pick random player
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];

    // Update auction
    let auction = await Auction.findOne();
    if (!auction) {
      auction = await Auction.create({});
    }

    auction.currentPlayer = randomPlayer._id;
    auction.isActive = true;
    await auction.save();

    const updatedAuction = await Auction.findById(auction._id).populate("currentPlayer");

    res.status(200).json({
      success: true,
      data: {
        player: randomPlayer,
        auction: updatedAuction
      }
    });
  } catch (error) {
    console.error("Get current player error:", error);
    res.status(500).json({
      success: false,
      message: "Error getting player",
      error: error.message
    });
  }
};

// @desc    Sell player to team
// @route   POST /api/auction/sell
// @access  Private/Admin
export const sellPlayer = async (req, res) => {
  try {
    const { playerId, teamId, soldPrice } = req.body;
    console.log(req.body);
    
    if (!playerId || !teamId || !soldPrice) {
      return res.status(400).json({
        success: false,
        message: "Please provide playerId, teamId, and soldPrice"
      });
    }

    const player = await Player.findById(playerId);
    const team = await Team.findById(teamId).populate("franchise");

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // Check if team has enough purse
    if (team.purse < soldPrice) {
      return res.status(400).json({
        success: false,
        message: "Insufficient purse balance"
      });
    }

    // Check overseas player limit (max 4)
    if (player.isOverseas) {
      const overseasCount = await Player.countDocuments({
        team: teamId,
        isOverseas: true
      });

      if (overseasCount >= 4) {
        return res.status(400).json({
          success: false,
          message: "Maximum overseas player limit (4) reached"
        });
      }
    }

    // Update player
    player.soldPrice = soldPrice;
    player.team = teamId;
    player.status = "sold";
    await player.save();

    // Update team
    team.purse -= soldPrice;
    team.players.push(playerId);
    await team.save();

    // Update auction history
    let auction = await Auction.findOne();
    if (!auction) {
      auction = await Auction.create({});
    }

    auction.auctionHistory.push({
      player: playerId,
      soldTo: teamId,
      soldPrice,
      timestamp: new Date()
    });
    auction.currentPlayer = null;
    auction.isActive = false;
    await auction.save();

    const updatedTeam = await Team.findById(teamId)
      .select("-password")
      .populate("franchise")
      .populate("players");

    res.status(200).json({
      success: true,
      message: "Player sold successfully",
      data: {
        player,
        team: updatedTeam,
        auction
      }
    });
  } catch (error) {
    console.error("Sell player error:", error);
    res.status(500).json({
      success: false,
      message: "Error selling player",
      error: error.message
    });
  }
};

// @desc    Mark player as unsold
// @route   POST /api/auction/unsold
// @access  Private/Admin
export const markUnsold = async (req, res) => {
  try {
    const { playerId } = req.body;

    if (!playerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide playerId"
      });
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    player.status = "unsold";
    await player.save();

    // Update auction
    let auction = await Auction.findOne();
    if (auction) {
      auction.currentPlayer = null;
      auction.isActive = false;
      await auction.save();
    }

    res.status(200).json({
      success: true,
      message: "Player marked as unsold",
      data: player
    });
  } catch (error) {
    console.error("Mark unsold error:", error);
    res.status(500).json({
      success: false,
      message: "Error marking player as unsold",
      error: error.message
    });
  }
};

// @desc    Reset auction
// @route   POST /api/auction/reset
// @access  Private/Admin
export const resetAuction = async (req, res) => {
  try {
    // Reset all players to available
    await Player.updateMany(
      {},
      { 
        status: "available", 
        team: null, 
        soldPrice: null 
      }
    );

    // Reset all teams
    await Team.updateMany(
      {},
      { 
        purse: 125, 
        players: [] 
      }
    );

    // Reset auction
    await Auction.deleteMany({});
    const newAuction = await Auction.create({});

    res.status(200).json({
      success: true,
      message: "Auction reset successfully",
      data: newAuction
    });
  } catch (error) {
    console.error("Reset auction error:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting auction",
      error: error.message
    });
  }
};