import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({
  user = null,        // later comes from auth
  isAdmin = false     // later comes from backend
}) {
  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          PuzzPlay
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <Link to="/live">Live</Link>
        <Link to="/explore">Explore</Link>

        {user && (
          <Link to="/go-live" className="go-live-btn">
            🔴 Go Live
          </Link>
        )}

        {isAdmin && (
          <Link to="/admin" className="admin-link">
            Admin
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        ) : (
          <Link to="/profile">
            {user.username || 'Profile'}
          </Link>
        )}
      </div>
    </nav>
  );
}