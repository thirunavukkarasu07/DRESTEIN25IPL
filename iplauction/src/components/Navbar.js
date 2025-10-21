import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

// No import needed - logo is in public folder

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  // Build navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { name: 'HOME', path: '/' },
      { name: 'LEADERBOARD', path: '/leaderboard' },
    ];

    if (isAuthenticated) {
      if (isAdmin) {
        return [
          ...baseLinks,
          { name: 'ADMIN PANEL', path: '/admin' },
          { name: 'FRANCHISES', path: '/franchise-assignment' },
          { name: 'SPIN WHEEL', path: '/spin-wheel' },
          { name: 'PLAYER DISPLAY', path: '/player-display' },
        ];
      } else {
        return [
          ...baseLinks,
          { name: 'DASHBOARD', path: '/team-dashboard' },
        ];
      }
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a] shadow-2xl">
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LEFT SIDE - Premium IPL-Style Logo Design */}
            <div className="flex items-center space-x-3">
              {/* Decorative Flame/Lightning Pattern Left */}
              <div className="hidden lg:flex items-center">
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-cyan-400">
                  <motion.path
                    d="M10 30 L20 15 L25 25 L35 10 L40 20 L50 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.path
                    d="M10 40 L20 55 L25 45 L35 58 L40 48 L50 60"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Main Logo Container */}
              <Link to="/" className="flex items-center space-x-4 group">
                {/* Logo Image with Premium Design */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {/* Outer Glow Ring */}
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full blur-xl opacity-60"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  
                  {/* Main Logo */}
                  <div className="relative">
                    <img 
                      src="/IT_Events_logo.png"
                      alt="Hammer Time Logo" 
                      className="w-16 h-16 object-contain relative z-10 filter drop-shadow-2xl"
                      onError={(e) => {
                        console.error('Logo failed to load from public folder');
                        console.error('Tried to load:', e.target.src);
                      }}
                      onLoad={() => {
                        console.log('✅ Logo loaded successfully from public folder!');
                      }}
                    />
                  </div>
                </motion.div>

                {/* Text Branding */}
                <div className="hidden md:block">
                  {/* Main Title */}
                  <motion.h1 
                    className="text-2xl md:text-3xl font-black tracking-tight leading-none"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(6, 182, 212, 0.3))'
                    }}
                  >
                    HAMMER TIME
                  </motion.h1>
                  
                  {/* Subtitle with Animated Underline */}
                  <div className="relative">
                    <p className="text-xs font-bold tracking-[0.25em] text-white/90 uppercase">
                      IPL Edition
                    </p>
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-green-400 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                </div>
              </Link>

              {/* Decorative Lightning/Energy Pattern Right */}
              <div className="hidden lg:flex items-center">
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-green-400">
                  <motion.path
                    d="M50 30 L40 15 L35 25 L25 10 L20 20 L10 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.path
                    d="M50 40 L40 55 L35 45 L25 58 L20 48 L10 60"
                    stroke="url(#gradient2)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* CENTER - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group px-4 py-2 text-white font-bold text-sm tracking-wide hover:text-yellow-400 transition-all duration-300"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE - User Menu & Actions */}
            <div className="flex items-center space-x-4">

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="hidden lg:flex items-center space-x-3">
                  {/* User Badge */}
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full border-2 border-blue-400">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.teamName?.[0] || 'U'}
                    </div>
                    <span className="text-white font-bold text-sm">
                      {user?.teamName || 'User'}
                    </span>
                    {isAdmin && (
                      <span className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-full">
                        ADMIN
                      </span>
                    )}
                  </div>

                  {/* Logout Button */}
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg border border-red-500"
                  >
                    LOGOUT
                  </motion.button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg border border-blue-400"
                    >
                      LOGIN
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-black px-6 py-2 rounded-lg transition-all duration-300 shadow-lg border-2 border-yellow-300"
                    >
                      SIGN UP
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white hover:text-yellow-400 transition-colors"
              >
                {mobileMenuOpen ? (
                  <FiX className="w-7 h-7" />
                ) : (
                  <FiMenu className="w-7 h-7" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-gradient-to-b from-[#1b263b] to-[#0d1b2a] border-t-2 border-yellow-400"
            >
              <div className="px-4 py-6 space-y-3">
                {/* Mobile Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white font-bold text-lg py-3 px-4 hover:bg-blue-900 rounded-lg transition-colors border-l-4 border-transparent hover:border-yellow-400"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="pt-4 border-t-2 border-gray-700 space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user?.teamName?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-white font-bold">{user?.teamName}</p>
                        {isAdmin && (
                          <span className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-full">
                            ADMIN
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-4 rounded-lg"
                    >
                      LOGOUT
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t-2 border-gray-700 space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center"
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-3 px-4 rounded-lg text-center"
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;