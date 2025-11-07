// backend/routes/set-routes.js (with debugging)
import express from "express";
const router = express.Router();
import playersData from "../data/players_by_sets.json" with { type: "json" };

// Add this at the top to verify the route file is loaded
console.log("✅ Set routes file loaded successfully!");
console.log(`📊 Total sets loaded: ${Object.keys(playersData).length}`);

// Test route to verify the router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Set routes are working!', timestamp: new Date() });
});

// Get all sets
router.get('/sets', (req, res) => {
  console.log("📍 GET /api/sets/sets endpoint hit");
  try {
    const sets = Object.keys(playersData).map((setName, index) => ({
      id: index + 1,
      name: setName,
      playerCount: playersData[setName].length
    }));
    console.log(`✅ Returning ${sets.length} sets`);
    res.json(sets);
  } catch (error) {
    console.error('❌ Error fetching sets:', error);
    res.status(500).json({ message: 'Error fetching sets' });
  }
});

// Get random player from a specific set
router.get('/player/:setName', (req, res) => {
  const { setName } = req.params;
  console.log(`📍 GET /api/sets/player/${setName} endpoint hit`);
  
  try {
    // Check if set exists
    if (!playersData[setName]) {
      console.log(`❌ Set not found: ${setName}`);
      console.log(`Available sets: ${Object.keys(playersData).join(', ')}`);
      return res.status(404).json({ 
        message: 'Set not found',
        availableSets: Object.keys(playersData)
      });
    }

    const playersInSet = playersData[setName];
    
    if (playersInSet.length === 0) {
      console.log(`❌ No players in set: ${setName}`);
      return res.status(404).json({ message: 'No players in this set' });
    }

    // Get random player
    const randomIndex = Math.floor(Math.random() * playersInSet.length);
    const selectedPlayer = playersInSet[randomIndex];

    console.log(`✅ Returning player: ${selectedPlayer.name} from ${setName}`);
    res.json({
      player: selectedPlayer,
      setName: setName,
      totalPlayersInSet: playersInSet.length
    });
  } catch (error) {
    console.error('❌ Error fetching player:', error);
    res.status(500).json({ message: 'Error fetching player' });
  }
});

// Get all players from a specific set
router.get('/players/:setName', (req, res) => {
  const { setName } = req.params;
  console.log(`📍 GET /api/sets/players/${setName} endpoint hit`);
  
  try {
    if (!playersData[setName]) {
      console.log(`❌ Set not found: ${setName}`);
      return res.status(404).json({ message: 'Set not found' });
    }

    console.log(`✅ Returning ${playersData[setName].length} players from ${setName}`);
    res.json({
      setName: setName,
      players: playersData[setName],
      totalPlayers: playersData[setName].length
    });
  } catch (error) {
    console.error('❌ Error fetching players:', error);
    res.status(500).json({ message: 'Error fetching players' });
  }
});

export default router;  