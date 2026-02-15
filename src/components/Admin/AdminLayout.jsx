import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from './AdminNavbar';
import { Footer } from '../Footer/Footer';

// AdminLayout: keep changes limited to this file only. Do NOT modify Header/Footer components.
// We duplicate the header's markup here (logo + auth area) but intentionally omit the main nav links
// so the admin header matches the site header visually while hiding the site nav for admin pages.

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* --- Header (duplicated markup from site Header, nav links intentionally hidden for admin) --- */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="header-logo" onClick={() => { navigate('/'); }}>
            <span className="logo-icon">🎬</span>
            <h1>VideoStudio</h1>
          </Link>

          {/* keep header-nav element present but empty so spacing/styling matches site header */}
          <nav className="header-nav" aria-hidden="true" style={{ visibility: 'hidden' }}>
            {/* intentionally hidden navigation items for admin */}
          </nav>

          {/* Auth area (same structure as site Header) */}
          {user ? (
            <div className="header-user">
              <div className="user-info">
                <span className="user-name">{user?.name || 'User'}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <button className="icon-button" title="Settings" onClick={() => navigate('/dashboard')}>
                {/* visually same icon/button as site header */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"></path>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.47 18.2l.06-.06c.48-.48.6-1.2.33-1.82a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.66 0 1.24-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82L4.3 3.8A2 2 0 1 1 7.13 1l.06.06c.62.27 1.34.15 1.82-.33.51-.51 1.32-.51 1.83 0l.06.06c.48.48 1.2.6 1.82.33.6-.27 1-.85 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.4 1.24 1 1.51.62.27 1.34.15 1.82-.33l.06-.06A2 2 0 1 1 23.53 5.8l-.06.06c-.27.62-.15 1.34.33 1.82.48.48.6 1.2.33 1.82.27.66.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.24.4-1.51 1z"></path>
                </svg>
              </button>
              <button className="icon-button logout-btn" onClick={handleLogout} title="Logout">
                {/* Logout icon (keeps appearance consistent with site) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          ) : (
            <div className="header-auth">
              <Link to="/login" className="btn-secondary">Login</Link>
            </div>
          )}
        </div>
      </header>

      {/* --- Admin area: sidebar + content only inside the flex container --- */}
      <div className="admin-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
        <div className="admin-layout" style={{ flex: '0 0 auto' }}>
          <AdminNavbar />
          <div className="admin-main-wrapper">
            <main className="admin-content" style={{ flex: 1, padding: 20 }}>
              <div className="admin-content-inner">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Footer must remain outside the admin flex container */}
      <Footer />
    </>
  );
};

export default AdminLayout;
