import React from 'react';
import CustomerDashboardNavbar from './CustomerDashboardNavbar';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

const CustomerDashboardLayout = ({ children }) => (
  <div>
    <Header isCustomer={true} />
    <div className="customer-dashboard-layout">
      <aside className="sidebar">
        <CustomerDashboardNavbar />
      </aside>

      <div className="main-container">
        <main className="customer-dashboard-content">
          {children}
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default CustomerDashboardLayout;
