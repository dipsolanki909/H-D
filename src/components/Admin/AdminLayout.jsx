import React from 'react';
import AdminNavbar from './AdminNavbar';

// Admin layout: Sidebar + main content only. Header and Footer removed from admin panel per request.
const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <aside className="sidebar">
      <AdminNavbar />
    </aside>

    <div className="main-container">
      <main className="admin-content">
        {children}
      </main>
    </div>
  </div>
);

export default AdminLayout;
