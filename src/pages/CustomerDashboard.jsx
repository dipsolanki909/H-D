import React from 'react';
import CustomerDashboardLayout from '../components/CustomerDashboard/CustomerDashboardLayout';
import '../components/CustomerDashboard/CustomerDashboard.css';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const CustomerDashboard = () => {
  return (
    <CustomerDashboardLayout>
      <Box className="customer-dashboard-header-top">
        <Typography component="h1" variant="h5">Dashboard</Typography>
      </Box>

      <Grid container spacing={3} className="stats-grid">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Total Projects</Typography>
              <Typography className="stat-value">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Videos in Progress</Typography>
              <Typography className="stat-value">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Exported Videos</Typography>
              <Typography className="stat-value">9</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Storage Used</Typography>
              <Typography className="stat-value">45%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default CustomerDashboard;
