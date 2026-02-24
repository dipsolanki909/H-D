import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';
import InsightsIcon from '@mui/icons-material/Insights';
import './CustomerDashboard.css';

const links = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
  { to: '/customer/projects', label: 'Projects', icon: <FolderIcon fontSize="small" /> },
  { to: '/customer/ai-tools', label: 'AI Tools', icon: <SmartToyIcon fontSize="small" /> },
  { to: '/customer/analytics', label: 'Analytics', icon: <InsightsIcon fontSize="small" /> },
  { to: '/customer/billing', label: 'Billing', icon: <ReceiptLongIcon fontSize="small" /> },
  { to: '/customer/settings', label: 'Settings', icon: <SettingsIcon fontSize="small" /> },
];

const CustomerDashboardNavbar = () => {
  const location = useLocation();

  return (
    <nav className="customer-dashboard-navbar" aria-label="Customer dashboard navigation">
      <div className="customer-dashboard-navbar-header">
        <h3>Dashboard</h3>
        <small className="customer-dashboard-sub">Your space</small>
      </div>

      <ul className="customer-dashboard-navbar-links">
        {links.map(l => (
          <li key={l.to} className={location.pathname === l.to ? 'active' : ''}>
            <Link to={l.to}>
              <span className="nav-icon">{l.icon}</span>
              <span className="nav-text">{l.label}</span>
              <span className="nav-arrow"><FiChevronRight /></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomerDashboardNavbar;
