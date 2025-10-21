import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const FranchiseAssignment = () => {
  const [teams, setTeams] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsRes, franchisesRes] = await Promise.all([
        api.get('/teams'),
        api.get('/franchises')
      ]);
      setTeams(teamsRes.data.data);
      setFranchises(franchisesRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAssign = async (franchiseId, teamId) => {
    if (!teamId) {
      setMessage('Please select a team');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await api.post(`/franchises/${franchiseId}/assign`, { teamId });
      setMessage('Franchise assigned successfully! ✅');
      fetchData(); // Refresh data
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error assigning franchise:', error);
      setMessage(error.response?.data?.message || 'Failed to assign franchise ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Assign Franchises to Teams
        </h1>

        {message && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`p-4 rounded-lg mb-6 text-center ${
              message.includes('✅') 
                ? 'bg-green-500/20 border border-green-500 text-green-200'
                : 'bg-red-500/20 border border-red-500 text-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {franchises.map((franchise) => (
            <motion.div
              key={franchise._id}
              className="card p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mr-4"
                  style={{ 
                    backgroundColor: franchise.primaryColor,
                    color: 'white'
                  }}
                >
                  {franchise.shortName}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{franchise.name}</h3>
                  <p className="text-sm text-gray-400">{franchise.city}</p>
                </div>
              </div>

              {franchise.isAssigned && franchise.assignedTeam ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-400">Currently Assigned To:</p>
                  <p className="font-bold text-green-400">
                    {franchise.assignedTeam.teamName}
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 mb-4">
                  <p className="text-yellow-400">Not Assigned</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm text-gray-400">
                  {franchise.isAssigned ? 'Reassign to:' : 'Assign to:'}
                </label>
                <select
                  className="w-full px-3 py-2 bg-blue-800 border border-white/30 rounded-lg text-white"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAssign(franchise._id, e.target.value);
                    }
                  }}
                  disabled={loading}
                >
                  <option value="">Select a team...</option>
                  {teams.map((team) => (
                    <option 
                      key={team._id} 
                      value={team._id}
                      disabled={team.franchise && team.franchise._id !== franchise._id}
                    >
                      {team.teamName}
                      {team.franchise ? ` (Has ${team.franchise.name})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Teams Without Franchises</h2>
          <div className="space-y-2">
            {teams.filter(t => !t.franchise).length === 0 ? (
              <p className="text-gray-400">All teams have been assigned franchises! ✅</p>
            ) : (
              teams.filter(t => !t.franchise).map((team) => (
                <div 
                  key={team._id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <span className="font-bold">{team.teamName}</span>
                  <span className="text-sm text-gray-400">{team.email}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FranchiseAssignment;