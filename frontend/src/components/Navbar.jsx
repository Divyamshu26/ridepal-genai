import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Custom CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">🚕 RidePal</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/contact" className="nav-item">Contact Us</Link>
        <Link to="/login" className="nav-item">Login</Link>
        {/* Toggle with logout later */}
      </div>
    </nav>
  );
};

export default Navbar;
