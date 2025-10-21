import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-4">
                <span className="gradient-text">Hammer Time</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text-gold">
                IPL Auction Experience
              </h2>
            </motion.div>
            
            <div className="divider"></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl mb-6 text-slate-300"
            >
              Experience the thrill of IPL Auction like never before
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-12 text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              Build your dream team, compete with friends, and experience the real auction drama 
              with our cutting-edge auction platform
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 mb-20"
            >
              <Link to="/signup">
                <motion.button 
                  className="btn-premium text-lg px-10 py-4"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Your Team →
                </motion.button>
              </Link>
              
              <Link to="/leaderboard">
                <motion.button 
                  className="btn-secondary text-lg px-10 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Leaderboard
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div 
                className="card-premium p-8 group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="text-6xl mb-4 animate-float">🎯</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Spin the Wheel</h3>
                <p className="text-slate-400 leading-relaxed">
                  Dynamic category selection ensures fair gameplay and exciting unpredictability
                </p>
              </motion.div>

              <motion.div 
                className="card-premium p-8 group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-6xl mb-4 animate-float">💰</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Build Your Dream Team</h3>
                <p className="text-slate-400 leading-relaxed">
                  ₹125 Crore purse to strategically build your championship squad
                </p>
              </motion.div>

              <motion.div 
                className="card-premium p-8 group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="text-6xl mb-4 animate-float">🏆</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Live Leaderboard</h3>
                <p className="text-slate-400 leading-relaxed">
                  Real-time rankings and statistics to track your performance
                </p>
              </motion.div>
            </div>

            {/* Rules Section */}
            <motion.div 
              className="card p-10 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl font-bold mb-8 gradient-text">Auction Rules</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Starting Purse</h4>
                    <p className="text-slate-400">Each team gets ₹100 Crore</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Overseas Limit</h4>
                    <p className="text-slate-400">Maximum 4 foreign players</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Random Selection</h4>
                    <p className="text-slate-400">Spin wheel selects category</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Live Tracking</h4>
                    <p className="text-slate-400">Real-time dashboard updates</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;