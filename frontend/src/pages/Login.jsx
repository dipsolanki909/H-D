import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/client';
import { FiMail, FiLock, FiEye, FiEyeOff, FiFilm } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
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

      const response = await authAPI.login(username, password);
      const { accessToken, user } = response.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', user.role);

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
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
              <label htmlFor="username">Email or Username</label>
              <span className="input-icon"><FiMail /></span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email or username"
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
