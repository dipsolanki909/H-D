import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from './AdminNavbar';
import { Footer } from '../Footer/Footer';

// Structural admin layout using explicit sidebar + main-container
// Only restructure containers and minimal duplicated header markup for visual parity.

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <AdminNavbar />
      </aside>

      <div className="main-container">
        <header className="admin-header">
          <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" className="header-logo" onClick={() => { navigate('/'); }}>
              <span className="logo-icon">🎬</span>
              <h1 style={{ margin: 0 }}>VideoStudio</h1>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {user ? (
                <>
                  <div className="user-info" style={{ textAlign: 'right' }}>
                    <div className="user-name">{user?.name || 'User'}</div>
                    <div className="user-role">{user?.role}</div>
                  </div>
                  <button className="icon-button" title="Settings" onClick={() => navigate('/dashboard')}></button>
                  <button className="icon-button logout-btn" onClick={handleLogout} title="Logout"></button>
                </>
              ) : (
                <div className="header-auth">
                  <Link to="/login" className="btn-secondary">Login</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>

        <footer className="admin-footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
