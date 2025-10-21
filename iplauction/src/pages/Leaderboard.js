import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/teams/leaderboard');
      setLeaderboard(response.data.data);
      
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>

          <div className="card p-6 mb-8 text-center">
            <p className="text-gray-400">
              Rankings based on purse spent and squad composition
            </p>
          </div>

          <div className="space-y-4">
            {leaderboard.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400 text-lg">No teams have made purchases yet</p>
              </div>
            ) : (
              leaderboard.map((team, index) => {
                const getMedalEmoji = (rank) => {
                  if (rank === 1) return '🥇';
                  if (rank === 2) return '🥈';
                  if (rank === 3) return '🥉';
                  return '';
                };

                return (
                  <motion.div
                    key={team.teamName}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`card p-6 ${index < 3 ? 'border-2' : ''} ${
                      index === 0 ? 'border-yellow-500' :
                      index === 1 ? 'border-gray-400' :
                      index === 2 ? 'border-orange-600' : ''
                    }`}
                  >
                    <div className=" md:flex md:items-center md:justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="text-4xl font-bold w-16 text-center">
                          {getMedalEmoji(team.rank) || `#${team.rank}`}
                        </div>
                        
                        <div>
                          <h3 className="text-lg md:text-2xl text-blue-400 font-bold">{team.teamName}</h3>
                          {team.franchise && (
                            <p className="text-purple-500 font-semibold text-sm">{team.franchise.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-4 gap-8 text-center">
                        <div>
                          <p className="text-gray-400 text-sm">Spent</p>
                          <p className="text-xl font-bold text-red-400">
                            ₹{team.spent.toFixed(2)} Cr
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Remaining</p>
                          <p className="text-xl font-bold text-green-400">
                            ₹{team.purse.toFixed(2)} Cr
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm">Players</p>
                          <p className="text-xl font-bold text-blue-400">
                            {team.playerCount}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm">Overseas</p>
                          <p className="text-xl font-bold text-purple-400">
                            {team.overseasCount}/4
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {leaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="card p-6 mt-8"
            >
              <h2 className="text-2xl font-bold mb-4">Statistics</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Teams</p>
                  <p className="text-2xl font-bold">{leaderboard.length}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-red-400">
                    ₹{leaderboard.reduce((sum, team) => sum + team.spent, 0).toFixed(2)} Cr
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Players Bought</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {leaderboard.reduce((sum, team) => sum + team.playerCount, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Avg Purse Left</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹{(leaderboard.reduce((sum, team) => sum + team.purse, 0) / leaderboard.length).toFixed(2)} Cr
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;