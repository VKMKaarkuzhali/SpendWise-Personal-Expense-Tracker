import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Navbar Component
 * Displays brand logo and navigation links with active state highlighting.
 * Includes a responsive hamburger menu for mobile devices.
 */
const Navbar = ({ totalBalance = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <span className="brand-icon">💰</span>
          <span className="brand-text">
            Spend<span className="brand-accent">Wise</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📊</span> Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">💳</span> Transactions
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📈</span> Reports
          </NavLink>

          {/* Quick Balance Pill on Mobile inside menu */}
          <div className="mobile-balance-pill">
            <span>Balance: </span>
            <strong className={totalBalance >= 0 ? 'text-positive' : 'text-negative'}>
              ₹{Number(totalBalance).toLocaleString('en-IN')}
            </strong>
          </div>
        </nav>

        {/* Right side balance badge (Desktop) */}
        <div className="nav-right">
          <div className="navbar-badge">
            <span className="badge-label">Net Balance:</span>
            <span className={`badge-value ${totalBalance >= 0 ? 'positive' : 'negative'}`}>
              ₹{Number(totalBalance).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            type="button"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
