import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <AdminNavbar />
    <div className="admin-main-wrapper">
      <div className="admin-content-inner">
        {children}
      </div>
    </div>
  </div>
);

export default AdminLayout;
