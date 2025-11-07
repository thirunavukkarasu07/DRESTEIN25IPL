import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const AdminPanel = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalPlayers: 0,
    soldPlayers: 0,
    availablePlayers: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsRes, playersRes, franchisesRes] = await Promise.all([
        api.get('/teams'),
        api.get('/players'),
        api.get('/franchises')
      ]);
     
      
      setTeams(teamsRes.data.data);
      
      setPlayers(playersRes.data.data);
      
      setFranchises(franchisesRes.data.data);

      const sold = playersRes.data.data.filter(p => p.status === 'sold').length;
      const available = playersRes.data.data.filter(p => p.status === 'available').length;

      setStats({
        totalTeams: teamsRes.data.count,
        totalPlayers: playersRes.data.count,
        soldPlayers: sold,
        availablePlayers: available
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResetAuction = async () => {
    if (window.confirm('Are you sure you want to reset the auction? This will clear all player assignments and reset team purses.')) {
      try {
        await api.post('/auction/reset');
        alert('Auction reset successfully!');
        fetchData();
      } catch (error) {
        console.error('Error resetting auction:', error);
        alert('Failed to reset auction');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin Control Panel
          </h1>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="text-gray-400 mb-2">Total Teams</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.totalTeams}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-400 mb-2">Total Players</h3>
              <p className="text-3xl font-bold text-purple-400">{stats.totalPlayers}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-400 mb-2">Players Sold</h3>
              <p className="text-3xl font-bold text-green-400">{stats.soldPlayers}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-400 mb-2">Available</h3>
              <p className="text-3xl font-bold text-yellow-400">{stats.availablePlayers}</p>
            </div>
          </div>

          {/* Action Buttons */}
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
            <Link to="/franchise-assignment">
                <motion.button 
                    className="w-full btn-primary py-6 text-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🏆 Assign Franchises
                </motion.button>
            </Link>   
            <Link to="/spin-wheel">
              <motion.button 
                className="w-full btn-primary py-6 text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎯 Spin Wheel
              </motion.button>
            </Link>

            <Link to="/player-display">
              <motion.button 
                className="w-full btn-primary py-6 text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👤 Player Display
              </motion.button>
            </Link>

            <motion.button 
              onClick={handleResetAuction}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 text-xl rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Reset Auction
            </motion.button>
          </div>

          {/* Teams Table */}
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Registered Teams</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3">Team Name</th>
                    <th className="text-left py-3">Email</th>
                    <th className="text-left py-3">Franchise</th>
                    <th className="text-left py-3">Purse</th>
                    <th className="text-left py-3">Players</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3">{team.teamName}</td>
                      <td className="py-3 text-gray-400">{team.email}</td>
                      <td className="py-3">
                        {team.franchise ? team.franchise.name : 
                          <span className="text-yellow-400">Not Assigned</span>
                        }
                      </td>
                      <td className="py-3 font-bold text-green-400">₹{team.purse} Cr</td>
                      <td className="py-3">{team.players?.length || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Player Stats by Category */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">Players by Category</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {['Batsman', 'Bowler', 'All-Rounder', 'Wicket-keeper'].map((category) => {
                const categoryPlayers = players.filter(p => p.category === category);
                
                const sold = categoryPlayers.filter(p => p.status === 'sold').length;
                const available = categoryPlayers.filter(p => p.status === 'available').length;
                
                return (
                  <div key={category} className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">{category}</h3>
                    <p className="text-sm text-gray-400">Total: {categoryPlayers.length}</p>
                    <p className="text-sm text-green-400">Sold: {sold}</p>
                    <p className="text-sm text-yellow-400">Available: {available}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;