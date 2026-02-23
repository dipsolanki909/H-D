import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
          <div className="text-center">
            Don't have an account? <Link to="/signup">Register here</Link>
          </div>
          <div className="text-center">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
