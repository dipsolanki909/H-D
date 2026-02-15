import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { Footer } from '../Footer/Footer';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Header: copied structure/classes from main Header so styling remains identical.
          Main nav links are intentionally omitted/hidden for the Admin panel only. */}
      <header className="header">
        <div className="header-container">
          {/* Logo (identical to main site) */}
          <Link to="/" className="header-logo">
            <span className="logo-icon">🎬</span>
            <h1>VideoStudio</h1>
          </Link>

          {/* Preserve header-nav element and spacing but hide the site navigation for admin */}
          <nav className="header-nav" aria-hidden="true" style={{ visibility: 'hidden' }}>
            {/* intentionally left blank to preserve layout spacing */}
          </nav>

          {/* Auth area (same structure as main Header) */}
          {user ? (
            <div className="header-user">
              <div className="user-info">
                <span className="user-name">{user?.name || 'User'}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <button className="icon-button" title="Settings">
                <FiSettings />
              </button>
              <button className="icon-button logout-btn" onClick={handleLogout} title="Logout">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="header-auth">
              <Link to="/login" className="btn-secondary">Login</Link>
            </div>
          )}
        </div>
      </header>

      <AdminNavbar />

      <div className="admin-main-wrapper">
        <div className="admin-content-inner">
          {children}
        </div>
      </div>

      {/* Footer: reuse the main site's Footer component unchanged */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
