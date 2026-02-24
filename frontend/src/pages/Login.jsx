import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiFilm } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
        navigate(demoMatch.role === 'admin' ? '/admin' : '/customer/dashboard');
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
      navigate('/customer/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page login-page-bg login-page-modern">
      <div className="login-split-shell">
        <section className="login-showcase" aria-hidden="true">
          <div className="showcase-overlay"></div>
          <div className="showcase-shape shape-1"></div>
          <div className="showcase-shape shape-2"></div>
          <div className="showcase-shape shape-3"></div>
          <div className="showcase-content">
            <h1>Welcome Back, Creator 🎬</h1>
            <p>Continue creating amazing videos with AI-powered tools.</p>
          </div>
        </section>

        <div className="login-container">
          <form className="login-form login-card-modern" onSubmit={handleSubmit}>
            <div className="login-card-logo">
              <img src="/images/DH/logo.png" alt="D & H Creatives" />
              <span><strong>D &amp; H</strong> Creatives</span>
            </div>

            <h2>Sign In</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group modern-field">
              <label htmlFor="username">Email</label>
              <span className="input-icon"><FiMail /></span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group modern-field">
              <label htmlFor="password">Password</label>
              <span className="input-icon"><FiLock /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="login-meta-row">
              <label className="remember-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading} className="login-submit-btn">
              <FiFilm />
              {loading ? 'Logging in…' : 'Login'}
            </button>

            <div className="login-divider"><span>OR</span></div>

            <button type="button" className="google-btn">
              <FcGoogle />
              Continue with Google
            </button>

            <div className="text-center signup-line">
              Don&apos;t have account? <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
