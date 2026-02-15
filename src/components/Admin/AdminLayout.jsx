import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    {/* Render the existing site Header here for Admin pages only; pass isAdmin to let Header hide its main nav items */}
    <Header isAdmin />

    {/* Admin sidebar + content (unchanged structure) */}
    <div className="admin-main-area">
      <AdminNavbar />
      <div className="admin-main-wrapper">
        <div className="admin-content-inner">
          {children}
        </div>
      </div>
    </div>

    {/* Reuse the exact same Footer component used across the site */}
    <Footer />
  </div>
);

export default AdminLayout;
