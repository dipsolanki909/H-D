import React from 'react';
import CustomerDashboardLayout from '../components/CustomerDashboard/CustomerDashboardLayout';
import '../components/CustomerDashboard/CustomerDashboard.css';
import Dashboard from '../components/CustomerDashboard/Dashboard';

const CustomerDashboard = () => {
  return (
    <CustomerDashboardLayout>
      <Dashboard />
    </CustomerDashboardLayout>
  );
};

export default CustomerDashboard;
