import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const PlayerDisplay = () => {
  const location = useLocation();
  const [player, setPlayer] = useState(location.state?.player || null);
  const [teams, setTeams] = useState([]);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [soldPrice, setSoldPrice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
    if (!player) {
      fetchCurrentAuctionPlayer();
    }
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get('api/teams');
      setTeams(response.data.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const fetchCurrentAuctionPlayer = async () => {
    try {
      const response = await api.get('api/auction/status');
      if (response.data.data.currentPlayer) {
        setPlayer(response.data.data.currentPlayer);
      }
    } catch (error) {
      console.error('Error fetching current player:', error);
    }
  };

  const handleSell = async (e) => {
    e.preventDefault();
    if (!selectedTeam || !soldPrice) {
      alert('Please select a team and enter sold price');
      return;
    }

    setLoading(true);
    try {
      await api.post('api/auction/sell', {
        playerId: player._id,
        teamId: selectedTeam,
        soldPrice: parseFloat(soldPrice)
      });

      alert('Player sold successfully!');
      setShowSellModal(false);
      setPlayer(null);
      setSelectedTeam('');
      setSoldPrice('');
    } catch (error) {
      console.error('Error selling player:', error);
      alert(error.response?.data?.message || 'Failed to sell player');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsold = async () => {
    if (!window.confirm('Mark this player as unsold?')) return;

    try {
      await api.post('api/auction/unsold', { playerId: player._id });
      alert('Player marked as unsold');
      setPlayer(null);
    } catch (error) {
      console.error('Error marking unsold:', error);
      alert('Failed to mark player as unsold');
    }
  };

  if (!player) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="card p-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🏏</div>
            <h2 className="text-3xl font-bold mb-4">No Player Selected</h2>
            <p className="text-gray-400 mb-6">
              Spin the wheel to select a category and get a random player
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Current Player
          </h1>

          <div className="card p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Player Image */}
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-64 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl flex items-center justify-center text-8xl"
                >
                  {player.category === 'Batsman' && '🏏'}
                  {player.category === 'Bowler' && '⚡'}
                  {player.category === 'All-Rounder' && '⭐'}
                  {player.category === 'Wicket-Keeper' && '🧤'}
                </motion.div>
              </div>

              {/* Player Details */}
              <div>
                <motion.h2 
                  className="text-4xl font-bold mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {player.name}
                </motion.h2>

                <motion.div 
                  className="space-y-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Category:</span>
                    <span className="font-bold text-lg">{player.category}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Base Price:</span>
                    <span className="font-bold text-lg text-green-400">₹{player.basePrice} Cr</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Country:</span>
                    <span className="font-bold text-lg">
                      {player.country}
                      {player.isOverseas && <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded">Overseas</span>}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Age:</span>
                    <span className="font-bold text-lg">{player.age} years</span>
                  </div>

                  {player.stats && (
                    <div className="mt-6 bg-white/5 p-4 rounded-lg">
                      <h3 className="font-bold mb-3">Career Stats</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Matches: {player.stats.matches}</div>
                        <div>Runs: {player.stats.runs}</div>
                        <div>Wickets: {player.stats.wickets}</div>
                        <div>Average: {player.stats.average}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={() => setShowSellModal(true)}
                className="flex-1 btn-primary text-xl py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SOLD ✓
              </motion.button>

              <motion.button
                onClick={handleUnsold}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                UNSOLD ✗
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Sell Modal */}
        <AnimatePresence>
          {showSellModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSellModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="card p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-6">Sell Player</h2>
                
                <form onSubmit={handleSell} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Team</label>
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="input-field bg-blue-800"
                      required
                    >
                      <option value="">Choose a team...</option>
                      {teams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.teamName} (₹{team.purse} Cr available)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sold Price (in Crores)</label>
                    <input
                      type="number"
                      step="0.01"
                      min={player.basePrice}
                      value={soldPrice}
                      onChange={(e) => setSoldPrice(e.target.value)}
                      className="input-field"
                      placeholder="Enter sold price"
                      required
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 btn-primary disabled:opacity-50"
                    >
                      {loading ? 'Selling...' : 'Confirm Sale'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSellModal(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayerDisplay;