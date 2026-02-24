import React from 'react';
import CustomerDashboardLayout from '../../components/CustomerDashboard/CustomerDashboardLayout';
import AnalyticsPanel from '../../components/CustomerDashboard/AnalyticsPanel';

export const CustomerAnalytics = () => {
  return (
    <CustomerDashboardLayout>
      <AnalyticsPanel />
    </CustomerDashboardLayout>
  );
};
