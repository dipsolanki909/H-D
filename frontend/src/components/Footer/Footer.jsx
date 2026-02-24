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
        <div className="footer-main" role="contentinfo">
          <section className="footer-col footer-about" aria-label="About company">
            <h4>About Company</h4>
            <p className="footer-about-text">
              VideoStudio helps creators and businesses craft professional video content quickly with modern templates and easy editing tools.
            </p>
            <div className="social-icons" aria-label="Social links">
              <a href="https://youtube.com/@dhcreatives?si=i2lvia1b8K0CE4N4" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube" aria-label="YouTube">
                <FiFacebook />
              </a>
              <a href="https://x.com/dhcreatives101?s=11" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter (X)" aria-label="Twitter (X)">
                <FiTwitter />
              </a>
              <a href="https://www.instagram.com/d_and_h_creatives?igsh=MXMwZDE2NmRsbmQ3cA==" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://youtube.com/@dhcreatives?si=i2lvia1b8K0CE4N4" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube Channel" aria-label="YouTube Channel">
                <FiLinkedin />
              </a>
              <a href="mailto:d.and.hcreatives101@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Email" aria-label="Email">
                <FiMail />
              </a>
            </div>
          </section>

          <nav className="footer-col" aria-label="Quick links">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><button className="footer-link-button" onClick={() => navigate('/about')}>About</button></li>
              <li><a href="#templates">Templates</a></li>
              <li><button className="footer-link-button" onClick={() => navigate('/pricing')}>Pricing</button></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <section className="footer-col" aria-label="Services">
            <h4>Services</h4>
            <ul className="footer-links-list">
              <li><a href="#video-editing">Video Editing</a></li>
              <li><a href="#template-library">Template Library</a></li>
              <li><a href="#brand-kits">Brand Kits</a></li>
              <li><a href="#support">Creator Support</a></li>
            </ul>
          </section>

          <section className="footer-col" aria-label="Contact information">
            <h4>Contact Information</h4>
            <address className="footer-contact">
              <p>hello@videostudio.com</p>
              <p>+91 98765 43210</p>
              <p>Ahmedabad, Gujarat, India</p>
            </address>
          </section>
        </div>

        <div className="footer-bottom" role="presentation">
          <p className="footer-copyright">&copy; {currentYear} VideoStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
