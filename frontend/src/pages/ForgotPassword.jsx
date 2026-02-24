import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import './Auth.css';
import './ForgotPassword.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="login-page login-page-bg forgot-page-modern">
      <div className="login-container">
        <form className="login-form forgot-card-modern" onSubmit={handleSubmit}>
          <div className="forgot-card-logo">
            <img src="/images/DH/logo.png" alt="D & H Creatives" />
            <span><strong>D &amp; H</strong> Creatives</span>
          </div>

          <h2>Reset Your Password 🔐</h2>
          <p className="forgot-subtext">Enter your email address and we’ll send you a reset link.</p>

          <div className="form-group forgot-field">
            <label htmlFor="email">Email Address</label>
            <span className="forgot-input-icon"><FiMail /></span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              disabled={submitted}
            />
          </div>

          <button type="submit" className="forgot-submit-btn" disabled={submitted}>
            {submitted ? 'Reset Link Sent' : 'Send Reset Link'}
          </button>

          <div className={`forgot-success ${submitted ? 'active' : ''}`} aria-live="polite">
            <p><FiCheckCircle /> Reset link sent successfully!</p>
            <small>Please check your inbox and spam folder for the reset email.</small>
          </div>

          <div className="text-center forgot-login-link">
            Remembered your password? <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
