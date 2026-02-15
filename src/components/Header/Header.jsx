import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
import { CATEGORIES } from '../../constants';
import './Header.css';

export const Header = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Hide Navbar on admin routes unless explicitly asked to render for admin via `isAdmin`.
  // Default behavior for the public site remains unchanged.
  if (!isAdmin && location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-icon">🎬</span>
          <h1>VideoStudio</h1>
        </Link>

        {/* Main Navigation (hidden when rendered for Admin via `isAdmin`) */}
        <nav className="header-nav">
          {!isAdmin && (
            <>
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>

              <Link
                to="/templates"
                className={`nav-link ${location.pathname === '/templates' ? 'active' : ''}`}
              >
                Templates
              </Link>

              <Link
                to="/editing"
                className={`nav-link ${location.pathname === '/editing' ? 'active' : ''}`}
              >
                Editing
              </Link>

              {/* Categories Dropdown */}
              <div className={`nav-dropdown ${location.pathname.startsWith('/category') ? 'active' : ''}`}>
                <button
                  className="nav-link dropdown-toggle"
                >
                  Categories
                  <FiChevronDown className="dropdown-icon" />
                </button>
                <div
                  className="dropdown-menu"
                >
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      className="dropdown-item"
                      onClick={() => navigate(`/category/${category.id}`)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-label">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/pricing"
                className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
            </>
          )}
        </nav>

        {/* Auth Section */}
        {user ? (
          <div className="header-user">
            <div className="user-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button className="icon-button" title="Settings">
              <FiSettings />
            </button>
            <button className="icon-button logout-btn" onClick={() => { logout(); navigate('/login'); }} title="Logout">
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div className="header-auth">
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
