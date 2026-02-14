import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!username || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Validate credentials against demo accounts and persisted users
      const demoAccounts = [
        { username: 'admin', password: 'admin123', id: 'admin-1', email: 'admin@videostudio.com', role: 'admin', token: 'admintoken-xyz' },
        { username: 'demo', password: 'demo123', id: '1', email: undefined, role: 'user', token: 'usertoken-abc' },
      ];

      const demoMatch = demoAccounts.find(a => (a.username === username || a.email === username) && a.password === password);
      if (demoMatch) {
        const user = { id: demoMatch.id, name: demoMatch.username, email: demoMatch.email, role: demoMatch.role, isPremium: false };
        login(user, demoMatch.token);
        navigate(demoMatch.role === 'admin' ? '/admin' : '/dashboard');
        return;
      }

      // Try persisted users (accept username or email as identifier)
      const authService = require('../api/authService');
      const persisted = authService.authenticate(username, password);
      if (!persisted) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      login(persisted, 'usertoken-abc');
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="branding-icon">🎬</div>
            <h2>Welcome Back</h2>
            <p>Create amazing videos with VideoStudio</p>
            
            <div className="features-list">
              <div className="feature-item">✨ Professional Templates</div>
              <div className="feature-item">🎨 Advanced Editor</div>
              <div className="feature-item">⚡ Fast Export</div>
              <div className="feature-item">☁️ Cloud Storage</div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-container">
          <div className="form-wrapper">
            <h1>Sign In</h1>
            <p className="form-subtitle">Login to your account</p>

            {error && (
              <div className="error-message">
                <div className="error-icon">⚠️</div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>Don't have an account?</span>
            </div>

            {/* Sign Up Link */}
            <Link to="/signup" className="btn-signup">
              Create Account
            </Link>

            {/* Demo Credentials */}
            <div className="demo-info">
              <p>Demo accounts (use these credentials):</p>
              <p><strong>Admin:</strong> username: admin / password: admin123</p>
              <p><strong>User:</strong> username: demo / password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
