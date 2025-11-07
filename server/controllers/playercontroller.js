import Player from "../models/Player.js";

// @desc    Get all players
// @route   GET /api/players
// @access  Private
export const getAllPlayers = async (req, res) => {
  try {
    const { category, status } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const players = await Player.find(query)
      .populate("team")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    console.error("Get all players error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching players",
      error: error.message
    });
  }
};

// @desc    Get random player from a category
// @route   GET /api/players/random
// @access  Private/Admin
export const getRandomPlayer = async (req, res) => {
  try {
    const { set } = req.query;

    if (!set) {
      return res.status(400).json({
        success: false,
        message: "Please provide a set/category"
      });
    }

    // Find all available players in this category
    const players = await Player.find({
      category: set,
      status: "available"
    });

    if (players.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No available players in ${set} category`
      });
    }

    // Pick a random player
    const randomIndex = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomIndex];

    res.status(200).json({
      success: true,
      data: randomPlayer
    });
  } catch (error) {
    console.error("Get random player error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching random player",
      error: error.message
    });
  }
};

// @desc    Get single player
// @route   GET /api/players/:id
// @access  Private
export const getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("team");

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    res.status(200).json({
      success: true,
      data: player
    });
  } catch (error) {
    console.error("Get player error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching player",
      error: error.message
    });
  }
};

// @desc    Create new player
// @route   POST /api/players
// @access  Private/Admin
export const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);

    res.status(201).json({
      success: true,
      data: player
    });
  } catch (error) {
    console.error("Create player error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating player",
      error: error.message
    });
  }
};

// @desc    Update player
// @route   PUT /api/players/:id
// @access  Private/Admin
export const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("team");

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    res.status(200).json({
      success: true,
      data: player
    });
  } catch (error) {
    console.error("Update player error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating player",
      error: error.message
    });
  }
};

// @desc    Delete player
// @route   DELETE /api/players/:id
// @access  Private/Admin
export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    await player.deleteOne();

    res.status(200).json({
      success: true,
      message: "Player deleted successfully"
    });
  } catch (error) {
    console.error("Delete player error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting player",
      error: error.message
    });
  }
};

// @desc    Bulk create players
// @route   POST /api/players/bulk
// @access  Private/Admin
export const bulkCreatePlayers = async (req, res) => {
  try {
    const { players } = req.body;

    if (!Array.isArray(players) || players.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of players"
      });
    }

    const createdPlayers = await Player.insertMany(players);

    res.status(201).json({
      success: true,
      count: createdPlayers.length,
      data: createdPlayers
    });
  } catch (error) {
    console.error("Bulk create players error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating players in bulk",
      error: error.message
    });
  }
};

// ============= NEW SET-BASED FUNCTIONS FOR SPIN WHEEL =============

// @desc    Get all sets for a category with player count
// @route   GET /api/players/sets/:category
// @access  Private/Admin
export const getSetsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    console.log(`📊 Fetching sets for category: ${category}`);
    
    // Validate category
    const validCategories = ["Batsman", "Bowler", "All-Rounder", "Wicket-keeper"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be: Batsman, Bowler, All-Rounder, or Wicket-keeper"
      });
    }
    
    // Get all available players in this category grouped by set
    const sets = await Player.aggregate([
      {
        $match: {
          category: category,
          status: 'available'
        }
      },
      {
        $group: {
          _id: '$setNumber',
          playerCount: { $sum: 1 },
          players: { $push: '$name' }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          setNumber: '$_id',
          playerCount: 1,
          players: 1,
          _id: 0
        }
      }
    ]);
    
    console.log(`✅ Found ${sets.length} sets for ${category}`);
    
    res.status(200).json({
      success: true,
      category: category,
      totalSets: sets.length,
      data: sets
    });
  } catch (error) {
    console.error('❌ Error fetching sets:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sets',
      error: error.message
    });
  }
};

// @desc    Get random player from specific category and set
// @route   GET /api/players/random/:category/:setNumber
// @access  Private/Admin
export const getRandomPlayerFromSet = async (req, res) => {
  try {
    const { category, setNumber } = req.params;
    
    console.log(`🎲 Getting random player from ${category} Set ${setNumber}`);
    
    // Validate category
    const validCategories = ["Batsman", "Bowler", "All-Rounder", "Wicket-keeper"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be: Batsman, Bowler, All-Rounder, or Wicket-keeper"
      });
    }
    
    // Get all available players from this category and set
    const players = await Player.find({
      category: category,
      setNumber: parseInt(setNumber),
      status: 'available'
    });
    
    if (players.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No available players found in ${category} Set ${setNumber}`
      });
    }
    
    // Get random player
    const randomIndex = Math.floor(Math.random() * players.length);
    const selectedPlayer = players[randomIndex];
    
    console.log(`✅ Selected player: ${selectedPlayer.name}`);
    
    res.status(200).json({
      success: true,
      category: category,
      setNumber: parseInt(setNumber),
      totalPlayersInSet: players.length,
      data: selectedPlayer
    });
  } catch (error) {
    console.error('❌ Error getting random player:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting random player',
      error: error.message
    });
  }
};