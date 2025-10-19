import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <header className="nav bg-primary text-white">
      <div className="container nav-inner">
        <div className="brand">Mock IPL Auction</div>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/live" className="nav-link">Live</Link>
          <Link to="/team" className="nav-link">Team</Link>
          
        </nav>
      </div>
    </header>
  )
}
