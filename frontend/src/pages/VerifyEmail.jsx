import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../api/client';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import './VerifyEmail.css';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('Verifying your email...');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token found in URL');
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully! Redirecting to login...');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Failed to verify email. Token may be expired.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <div className={`verify-email-card ${status}`}>
          {status === 'loading' && (
            <div className="verify-content">
              <FiLoader className="verify-icon loading" />
              <h1>Verifying Email</h1>
              <p>{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="verify-content">
              <FiCheckCircle className="verify-icon success" />
              <h1>Email Verified!</h1>
              <p>{message}</p>
              <p className="redirect-text">Redirecting to login...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="verify-content">
              <FiAlertCircle className="verify-icon error" />
              <h1>Verification Failed</h1>
              <p>{message}</p>
              <button className="verify-btn-retry" onClick={() => navigate('/register')}>
                Register Again
              </button>
              <button className="verify-btn-login" onClick={() => navigate('/login')}>
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
