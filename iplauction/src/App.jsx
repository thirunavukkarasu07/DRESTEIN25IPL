import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/hero";
import LiveDisplay from "./pages/liveDisplay";
import AdminAuction from "./pages/adminAuction";
import TeamDashboard from "./pages/teamDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/live" element={<LiveDisplay />} />
          <Route path="/admin" element={<AdminAuction />} />
          <Route path="/team" element={<TeamDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
// cleaned duplicate content
