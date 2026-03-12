import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/client';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiFilm } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';
import './Signup.css';

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreed, setAgreed] = useState(false);

  const getPasswordStrength = (value) => {
    if (!value) return { label: 'Weak', score: 0 };
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    if (score <= 1) return { label: 'Weak', score: 1 };
    if (score <= 3) return { label: 'Medium', score: 2 };
    return { label: 'Strong', score: 3 };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate inputs
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (!agreed) {
        setError('Please agree to the terms and conditions');
        setLoading(false);
        return;
      }

      await authAPI.register(email, password, name);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page login-page-bg signup-page-modern">
      <div className="signup-split-shell">
        <section className="signup-showcase" aria-hidden="true">
          <div className="signup-showcase-overlay"></div>
          <div className="signup-shape signup-shape-1"></div>
          <div className="signup-shape signup-shape-2"></div>
          <div className="signup-shape signup-shape-3"></div>
          <div className="signup-showcase-content">
            <h1>Start Your Creative Journey 🎬</h1>
            <p>Create stunning videos with AI-powered tools and professional templates.</p>
          </div>
        </section>

        <div className="login-container">
          <form className="login-form signup-card-modern" onSubmit={handleSubmit}>
            <div className="signup-card-logo">
              <img src="/images/DH/logo.png" alt="D & H Creatives" />
              <span><strong>D &amp; H</strong> Creatives</span>
            </div>

            <h2>Create Account</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group modern-signup-field">
              <label htmlFor="name">Full Name</label>
              <span className="signup-input-icon"><FiUser /></span>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group modern-signup-field">
              <label htmlFor="email">Email Address</label>
              <span className="signup-input-icon"><FiMail /></span>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group modern-signup-field">
              <label htmlFor="password">Password</label>
              <span className="signup-input-icon"><FiLock /></span>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
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
            </div>

            <div className="password-strength" aria-live="polite">
              <div className="strength-bars">
                <span className={passwordStrength.score >= 1 ? 'active weak' : ''}></span>
                <span className={passwordStrength.score >= 2 ? 'active medium' : ''}></span>
                <span className={passwordStrength.score >= 3 ? 'active strong' : ''}></span>
              </div>
              <span className="strength-label">Strength: {passwordStrength.label}</span>
            </div>

            <div className="form-group modern-signup-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span className="signup-input-icon"><FiLock /></span>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="terms-checkbox signup-terms-check">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={loading}
                />
                <span>I agree to the <Link to="/terms">Terms &amp; Conditions</Link></span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="signup-submit-btn">
              <FiFilm />
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="signup-divider"><span>OR</span></div>

            <button type="button" className="signup-google-btn">
              <FcGoogle />
              Continue with Google
            </button>

            <div className="text-center signup-login-line">
              Already have account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// Export as Register as well for /register route
export const Register = Signup;
