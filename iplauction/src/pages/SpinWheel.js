import React, { useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const categories = [
  { 
    name: 'Batsman', 
    color: '#3b82f6', 
    gradient: 'from-blue-600 to-blue-400',
    emoji: '🏏',
    shadow: 'shadow-blue-500/50'
  },
  { 
    name: 'Bowler', 
    color: '#ef4444', 
    gradient: 'from-red-600 to-red-400',
    emoji: '⚡',
    shadow: 'shadow-red-500/50'
  },
  { 
    name: 'All-Rounder', 
    color: '#10b981', 
    gradient: 'from-green-600 to-green-400',
    emoji: '⭐',
    shadow: 'shadow-green-500/50'
  },
  { 
    name: 'Wicket-Keeper', 
    color: '#f59e0b', 
    gradient: 'from-amber-600 to-amber-400',
    emoji: '🧤',
    shadow: 'shadow-amber-500/50'
  }
];

const SpinWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [player, setPlayer] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();

  // Handle category button click
  const handleCategoryClick = async (category) => {
    if (spinning) return;

    setSelectedCategory(category);
    setPlayer(null);
    setShowConfetti(false);
    setSpinning(true);

    // Wait for React to render the wheel element before animating
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check if element exists before animating
    if (scope.current) {
      // Animate the wheel with realistic physics
      const spins = 8 + Math.random() * 4; // 8-12 full rotations
      const finalRotation = spins * 360;
      
      await animate(scope.current, 
        { 
          rotate: [0, finalRotation],
          scale: [1, 1.05, 1]
        },
        { 
          duration: 5,
          ease: [0.34, 1.56, 0.64, 1], // Custom easing for dramatic effect
        }
      );
    }

    // Call API to get random player from selected category
    try {
      const response = await api.post('/auction/get-player', { category: category.name });
      setPlayer(response.data.data.player);
      setShowConfetti(true);
      
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    } catch (error) {
      console.error('Error getting player:', error);
      alert('Failed to get player. Please check your connection and try again.');
    } finally {
      setSpinning(false);
    }
  };

  const handleViewPlayer = () => {
    if (!player) return;
    navigate('/player-display', { state: { player } });
  };

  const handleSpinAgain = () => {
    setSelectedCategory(null);
    setPlayer(null);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                backgroundColor: categories[Math.floor(Math.random() * 4)].color,
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{ 
                y: window.innerHeight + 100,
                opacity: 0,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4 gradient-text">
              Player Selection Wheel
            </h1>
            <p className="text-xl text-slate-400">
              Choose a category to spin for a player!
            </p>
            <div className="divider"></div>
          </motion.div>

          {/* Category Selection Buttons */}
          {!selectedCategory && !player && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat)}
                  disabled={spinning}
                  className={`card-premium p-8 text-center hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${cat.shadow}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-20`}
                    whileHover={{ opacity: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-7xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {cat.emoji}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-400">Click to spin</p>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Wheel Container - Only show when category is selected */}
            {selectedCategory && (
              <motion.div 
                className="card-premium p-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {/* Selected Category Display */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 border border-white/20">
                    <span className="text-3xl">{selectedCategory.emoji}</span>
                    <span className="text-xl font-bold" style={{ color: selectedCategory.color }}>
                      {selectedCategory.name}
                    </span>
                  </div>
                </motion.div>

                {/* 3D Wheel */}
                <div className="relative mx-auto" style={{ width: '500px', height: '500px', perspective: '1000px' }}>
                  {/* Outer Ring Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${selectedCategory.color}40 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Wheel Background Shadow */}
                  <div 
                    className="absolute inset-8 rounded-full blur-2xl opacity-50"
                    style={{
                      background: selectedCategory.color
                    }}
                  />

                  {/* Main Wheel */}
                  <motion.div
                    ref={scope}
                    className="absolute inset-4 rounded-full overflow-hidden"
                    style={{
                      background: `conic-gradient(
                        ${selectedCategory.color} 0deg 90deg,
                        ${selectedCategory.color}CC 90deg 180deg,
                        ${selectedCategory.color} 180deg 270deg,
                        ${selectedCategory.color}CC 270deg 360deg
                      )`,
                      boxShadow: '0 0 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Inner Circle */}
                    <div 
                      className="absolute inset-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/20 flex items-center justify-center"
                      style={{
                        boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      <motion.div
                        className="text-8xl"
                        animate={{
                          rotate: spinning ? [0, 360] : 0,
                          scale: spinning ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                          scale: { duration: 0.5, repeat: Infinity }
                        }}
                      >
                        {selectedCategory.emoji}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* 3D Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
                    <motion.div
                      animate={{
                        y: spinning ? [0, -10, 0] : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: spinning ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <div 
                        className="relative"
                        style={{
                          filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))'
                        }}
                      >
                        <div 
                          className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[60px] border-l-transparent border-r-transparent"
                          style={{ borderTopColor: selectedCategory.color }}
                        ></div>
                        <div 
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2"
                          style={{ 
                            backgroundColor: selectedCategory.color,
                            borderColor: `${selectedCategory.color}CC`
                          }}
                        ></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Circles */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                  <div className="absolute inset-2 rounded-full border-2 border-white/5"></div>
                </div>

                {/* Spinning Status */}
                {spinning && (
                  <div className="text-center mt-8">
                    <motion.p
                      className="text-2xl font-bold gradient-text-gold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Finding your player...
                    </motion.p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Result Display */}
            <div className="space-y-6">
              {player ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="card-premium p-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold mb-6 gradient-text-gold text-center">
                      🎊 Player Selected 🎊
                    </h2>
                    
                    {/* Category Badge */}
                    <div className="flex justify-center mb-6">
                      <div 
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${selectedCategory.gradient}`}
                      >
                        <span className="text-2xl">{selectedCategory.emoji}</span>
                        <span className="text-lg font-bold text-white">{selectedCategory.name}</span>
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="bg-slate-800/50 rounded-2xl p-8 mb-8 border border-white/10">
                      <motion.p 
                        className="text-5xl font-black mb-4 text-center gradient-text"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      >
                        {player.name}
                      </motion.p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                          <p className="text-sm text-slate-400 mb-1">Base Price</p>
                          <p className="text-2xl font-bold text-gold-400">₹{player.basePrice}Cr</p>
                        </div>
                        {player.country && (
                          <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                            <p className="text-sm text-slate-400 mb-1">Country</p>
                            <p className="text-2xl font-bold text-primary-400">{player.country}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                      <motion.button
                        onClick={handleViewPlayer}
                        className="btn-gold text-xl px-10 py-4 w-full"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Full Details & Start Bidding →
                      </motion.button>
                      
                      <motion.button
                        onClick={handleSpinAgain}
                        className="btn-premium text-lg px-8 py-3 w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ← Select Another Category
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : !selectedCategory ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card p-10 text-center"
                >
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-300">
                    Choose Your Category
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    Select a player category from the buttons above. The wheel will spin automatically to find a random player from that category!
                  </p>
                  
                  {/* Instructions */}
                  <div className="space-y-3 text-sm text-slate-400 text-left max-w-md mx-auto">
                    <div className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">1️⃣</span>
                      <p>Click on any category button (Batsman, Bowler, etc.)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">2️⃣</span>
                      <p>Watch the wheel spin and select a player automatically</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary-400 text-xl">3️⃣</span>
                      <p>View player details and proceed to bidding</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpinWheel;