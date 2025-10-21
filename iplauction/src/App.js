import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import FranchiseAssignment from './pages/FranchiseAssignment';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TeamDashboard from './pages/TeamDashboard';
import AdminPanel from './pages/AdminPanel';
import SpinWheel from './pages/SpinWheel';
import PlayerDisplay from './pages/PlayerDisplay';
import Leaderboard from './pages/Leaderboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/team-dashboard" 
              element={
                <PrivateRoute>
                  <TeamDashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } 
            />

            <Route 
              path="/franchise-assignment" 
              element={
                <AdminRoute>
                  <FranchiseAssignment />
                </AdminRoute>
              } 
            />
            
            <Route 
              path="/spin-wheel" 
              element={
                <AdminRoute>
                  <SpinWheel />
                </AdminRoute>
              } 
            />
            
            <Route 
              path="/player-display" 
              element={
                <PrivateRoute>
                  <PlayerDisplay />
                </PrivateRoute>
              } 
            />
            
            
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
