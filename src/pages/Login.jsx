import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-container">
          <div className="login-page">
            <div className="login-container">
              <form className="login-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button type="submit" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Logging in…' : 'Login'}
                </button>
                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
