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
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();

  const spinWheel = async () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);
    setShowConfetti(false);

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

    // Call API to get random category
    try {
      const response = await api.post('api/auction/spin');
      const selectedCategory = response.data.data.category;
      setResult(selectedCategory);
      setShowConfetti(true);
      
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    } catch (error) {
      console.error('Error spinning wheel:', error);
      alert('Failed to spin wheel. Please check your connection and try again.');
    } finally {
      setSpinning(false);
    }
  };

  const handleGetPlayer = async () => {
    if (!result) return;

    try {
      const response = await api.post('api/auction/get-player', { category: result });
      navigate('/player-display', { state: { player: response.data.data.player } });
    } catch (error) {
      console.error('Error getting player:', error);
      alert('Failed to get player');
    }
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
              Spin the Wheel
            </h1>
            <p className="text-xl text-slate-400">
              Let destiny decide the next category!
            </p>
            <div className="divider"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Wheel Container */}
            <motion.div 
              className="card-premium p-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* 3D Wheel */}
              <div className="relative mx-auto" style={{ width: '500px', height: '500px', perspective: '1000px' }}>
                {/* Outer Ring Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
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
                    background: `conic-gradient(
                      ${categories[0].color} 0deg 90deg,
                      ${categories[1].color} 90deg 180deg,
                      ${categories[2].color} 180deg 270deg,
                      ${categories[3].color} 270deg 360deg
                    )`
                  }}
                />

                {/* Main Wheel */}
                <motion.div
                  ref={scope}
                  className="absolute inset-4 rounded-full overflow-hidden"
                  style={{
                    background: `conic-gradient(
                      ${categories[0].color} 0deg 90deg,
                      ${categories[1].color} 90deg 180deg,
                      ${categories[2].color} 180deg 270deg,
                      ${categories[3].color} 270deg 360deg
                    )`,
                    boxShadow: '0 0 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Inner Circle */}
                  <div 
                    className="absolute inset-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/20"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-6xl font-black text-white text-shadow"
                        animate={{
                          rotate: spinning ? 360 : 0,
                        }}
                        transition={{
                          duration: 2,
                          repeat: spinning ? Infinity : 0,
                          ease: "linear"
                        }}
                      >
                        🎯
                      </motion.div>
                    </div>
                  </div>

                  {/* Category Labels with 3D effect */}
                  {categories.map((cat, index) => {
                    const angle = (index * 90) + 45;
                    const radius = 165;
                    const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 250 + radius * Math.sin((angle * Math.PI) / 180);

                    return (
                      <div
                        key={cat.name}
                        className="absolute"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                        }}
                      >
                        <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                          <div className="text-5xl mb-1">{cat.emoji}</div>
                          <div className="text-sm font-bold text-white whitespace-nowrap">{cat.name}</div>
                        </div>
                      </div>
                    );
                  })}
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
                      <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[60px] border-l-transparent border-r-transparent border-t-gradient-to-b from-gold-400 to-gold-600"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-500 rounded-full border-2 border-gold-300"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                <div className="absolute inset-2 rounded-full border-2 border-white/5"></div>
              </div>

              {/* Spin Button */}
              <div className="text-center mt-12">
                <motion.button
                  onClick={spinWheel}
                  disabled={spinning}
                  className="btn-premium text-2xl px-16 py-6 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={!spinning ? { scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' } : {}}
                  whileTap={!spinning ? { scale: 0.95 } : {}}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {spinning ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⚡
                        </motion.span>
                        Spinning...
                      </>
                    ) : (
                      <>
                        🎰 SPIN THE WHEEL!
                      </>
                    )}
                  </span>
                  {!spinning && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Result Display */}
            <div className="space-y-6">
              {result ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="card-premium p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold mb-6 gradient-text-gold">
                      🎊 Selected Category 🎊
                    </h2>
                    <motion.div 
                      className="text-9xl mb-6"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3
                      }}
                    >
                      {categories.find(c => c.name === result)?.emoji}
                    </motion.div>
                    <motion.p 
                      className="text-5xl font-black mb-8"
                      style={{ 
                        color: categories.find(c => c.name === result)?.color 
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    >
                      {result}
                    </motion.p>
                    
                    <motion.button
                      onClick={handleGetPlayer}
                      className="btn-gold text-xl px-10 py-4"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Get Random Player →
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card p-10 text-center"
                >
                  <div className="text-6xl mb-4">🎲</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-300">
                    Ready to Spin?
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Click the button to spin the wheel and let fate decide which category of player comes up next in the auction!
                  </p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {categories.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        className={`p-4 rounded-xl bg-gradient-to-br ${cat.gradient} bg-opacity-20 border border-white/10`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-3xl mb-2">{cat.emoji}</div>
                        <div className="text-sm font-bold text-white">{cat.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <h4 className="text-lg font-bold mb-4 gradient-text">How It Works</h4>
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">1️⃣</span>
                    <p>Click the spin button to start the wheel</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">2️⃣</span>
                    <p>Wait for the wheel to stop and reveal the category</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-400 text-xl">3️⃣</span>
                    <p>Click "Get Random Player" to see who's up for auction</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpinWheel;