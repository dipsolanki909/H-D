import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiSettings, FiChevronDown } from 'react-icons/fi';
import './Header.css';

const CATEGORIES = [
  { id: 'youtube', label: 'YouTube Videos', icon: '📺' },
  { id: 'instagram', label: 'Instagram Reels', icon: '📱' },
  { id: 'wedding', label: 'Wedding Videos', icon: '💒' },
  { id: 'birthday', label: 'Birthday Videos', icon: '🎂' },
  { id: 'business', label: 'Business Promo', icon: '💼' },
  { id: 'education', label: 'Education Videos', icon: '🎓' },
];

export const Header = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleCategorySelect = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setIsCategoryOpen(false);
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isCategoryActive = () => {
    return location.pathname.startsWith('/category') ? 'active' : '';
  };

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src="/images/DH/logo.png" alt="VideoStudio Logo" style={{ height: '60px', borderRadius: '50%' }} />
        </Link>
        {/* Main Navigation */}
        {!isAdmin && !isDashboard && (
          <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
            <Link
              to="/"
              className={`nav-link ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/templates"
              className={`nav-link ${isActive('/templates')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              to="/editing"
              className={`nav-link ${isActive('/editing')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Editing
            </Link>

            {/* Categories Dropdown */}
            <div className={`nav-dropdown ${isCategoryActive()}`}>
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                Categories
                <FiChevronDown className="dropdown-icon" />
              </button>
              <div
                className={`dropdown-menu ${isCategoryOpen ? 'active' : ''}`}
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    className="dropdown-item"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-label">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="nav-link"
              onClick={() => {
                navigate('/pricing');
                setIsMenuOpen(false);
              }}
            >
              Pricing
            </button>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}

        {/* Auth Section */}
        {user ? (
          <div className="header-user">
            {!isAdmin && (
              <>
                <div className="user-info">
                  <span className="user-name">{user?.name || 'User'}</span>
                  <span className="user-role">{user?.role}</span>
                </div>
                <button className="icon-button" title="Settings">
                  <FiSettings />
                </button>
              </>
            )}
            <button className="btn-secondary btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          !isAdmin && (
            <div className="header-auth">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            </div>
          )
        )}

        {/* Mobile Menu Toggle */}
        {!isAdmin && (
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        )}
      </div>
    </header>
  );
};
