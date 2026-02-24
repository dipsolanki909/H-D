import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

const AdminLayout = ({ children }) => (
  <div>
    <Header isAdmin={true} />
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
    <Footer />
  </div>
);

export default AdminLayout;
