import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const TeamDashboard = () => {
  const { user } = useAuth();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchTeamData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchTeamData = async () => {
    try {
      const response = await api.get(`/teams/${user._id}`);
      setTeamData(response.data.data);
    } catch (error) {
      console.error('Error fetching team data:', error);
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

  const overseasCount = teamData?.players?.filter(p => p.isOverseas).length || 0;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Team Dashboard
          </h1>

          {/* Team Info Card */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="card p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg text-gray-400 mb-2">Team Name</h3>
              <p className="text-2xl font-bold">{teamData?.teamName}</p>
            </motion.div>

            <motion.div 
              className="card p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg text-gray-400 mb-2">Remaining Purse</h3>
              <p className="text-3xl font-bold text-green-400">
                ₹{teamData?.purse} Cr
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Spent: ₹{(125 - (teamData?.purse || 0)).toFixed(2)} Cr
              </p>
            </motion.div>

            <motion.div 
              className="card p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg text-gray-400 mb-2">Players</h3>
              <p className="text-3xl font-bold text-blue-400">
                {teamData?.players?.length || 0}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Overseas: {overseasCount}/4
              </p>
            </motion.div>
          </div>

          {/* Franchise Info */}
          {teamData?.franchise ? (
            <div className="card p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Franchise</h2>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                  style={{ 
                    backgroundColor: teamData.franchise.primaryColor || '#3b82f6',
                    color: 'white'
                  }}
                >
                  {teamData.franchise.shortName}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{teamData.franchise.name}</h3>
                  <p className="text-gray-400">{teamData.franchise.city}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6 mb-8 text-center">
              <p className="text-gray-400">No franchise assigned yet. Admin will assign franchises soon.</p>
            </div>
          )}

          {/* Players List */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Your Squad</h2>
            {teamData?.players?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamData.players.map((player) => (
                  <motion.div
                    key={player._id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{player.name}</h3>
                      {player.isOverseas && (
                        <span className="text-xs bg-blue-500 px-2 py-1 rounded">
                          {player.country}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{player.category}</p>
                    <p className="text-lg font-bold text-green-400">
                      ₹{player.soldPrice} Cr
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No players purchased yet</p>
                <p className="text-sm mt-2">Start bidding in the auction to build your squad!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamDashboard;