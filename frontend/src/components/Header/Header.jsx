import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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

export const Header = ({ isAdmin = false, isCustomer = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);

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
  const isCustomerRoute = isCustomer || location.pathname.startsWith('/customer');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src="/images/DH/logo.png" alt="VideoStudio Logo" className="header-logo-image" />
          <span className="header-brand" aria-label="D and H Creatives">
            <span className="header-brand-strong">D &amp; H</span>
            <span className="header-brand-light"> Creatives</span>
          </span>
        </Link>
        {/* Main Navigation */}
        {!isAdmin && !isDashboard && !isCustomerRoute && (
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
        <div className="header-auth">
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        {!isAdmin && !isCustomerRoute && (
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
