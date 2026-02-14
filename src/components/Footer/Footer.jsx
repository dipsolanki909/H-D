import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Columns */}
        <div className="footer-columns">
          {/* Product Links */}
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#templates">Templates</a></li>
              <li><button onClick={() => navigate('/pricing')} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9ca3af'}}>Pricing</button></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><button onClick={() => navigate('/about')} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9ca3af'}}>About</button></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#tutorials">Tutorials</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Social Section */}
        <div className="footer-social-section">
          <div className="footer-social">
            <div className="footer-brand">
              <div className="footer-logo">🎬 VideoStudio</div>
              <p className="footer-tagline">Create professional videos in minutes</p>
            </div>
            
            <div className="social-icons">
              <a href="#facebook" className="social-icon" title="Facebook">
                <FiFacebook />
              </a>
              <a href="#twitter" className="social-icon" title="Twitter">
                <FiTwitter />
              </a>
              <a href="#instagram" className="social-icon" title="Instagram">
                <FiInstagram />
              </a>
              <a href="#linkedin" className="social-icon" title="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="#email" className="social-icon" title="Email">
                <FiMail />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} VideoStudio. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
