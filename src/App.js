import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Signup } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { VideoUpload } from './pages/Upload';
import { Templates } from './pages/Templates';
import { VideoEditor } from './pages/Editor';
import { VideoPreview } from './pages/Preview';
import { Payment } from './pages/Payment';
import { Export } from './pages/Export';
import { AdminPanel } from './pages/Admin';
import { AdminTemplates } from './pages/admin/AdminTemplates';
import { AdminPricing } from './pages/admin/AdminPricing';
import { AdminProjects } from './pages/admin/AdminProjects';
import CustomerDashboard from './pages/CustomerDashboard';
import { CustomerProjects } from './pages/customer/CustomerProjects';
import { Category } from './pages/Category';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Pricing } from './pages/Pricing';
import { Editing } from './pages/Editing';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register" element={<Register />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/editing" element={<Editing />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <VideoUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor"
        element={
          <ProtectedRoute>
            <VideoEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor/:projectId"
        element={
          <ProtectedRoute>
            <VideoEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preview"
        element={
          <ProtectedRoute>
            <VideoPreview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preview/:videoId"
        element={
          <ProtectedRoute>
            <VideoPreview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/export"
        element={
          <ProtectedRoute>
            <Export />
          </ProtectedRoute>
        }
      />

      {/* Customer Routes */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/projects"
        element={
          <ProtectedRoute>
            <CustomerProjects />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/templates"
        element={
          <AdminRoute>
            <AdminTemplates />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/pricing"
        element={
          <AdminRoute>
            <AdminPricing />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <AdminRoute>
            <AdminProjects />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppContent />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
