import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import TemplateIcon from '@mui/icons-material/Description';
import PriceIcon from '@mui/icons-material/MonetizationOn';
import './Admin.css';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
  { to: '/admin', label: 'Users', icon: <PeopleIcon fontSize="small" /> },
  { to: '/admin/templates', label: 'Templates', icon: <TemplateIcon fontSize="small" /> },
  { to: '/admin/pricing', label: 'Pricing', icon: <PriceIcon fontSize="small" /> },
  { to: '/admin/projects', label: 'Projects', icon: <FolderIcon fontSize="small" /> },
];

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="admin-navbar" aria-label="Admin navigation">
      <div className="admin-navbar-header">
        <h3>Admin</h3>
        <small className="admin-sub">Control center</small>
      </div>

      <ul className="admin-navbar-links">
        {links.map(l => (
          <li key={l.to} className={location.pathname === l.to || (l.to === '/admin' && location.pathname === '/admin') ? 'active' : ''}>
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

export default AdminNavbar;
