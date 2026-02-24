import React, { useState } from 'react';
import { FiGlobe, FiKey, FiLock, FiMail, FiServer, FiSettings, FiShield, FiToggleLeft, FiUploadCloud } from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import './AdminSettings.css';

export const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert('Settings saved successfully.');
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleGenerateKey = () => {
    window.alert('New API key generated (demo).');
  };

  return (
    <AdminLayout>
      <section className="admin-settings-page">
        <header className="admin-settings-header">
          <div>
            <h1>Admin Settings</h1>
            <p>Manage platform configuration, security, and system preferences.</p>
          </div>
          <div className="admin-settings-tag">
            <FiSettings /> Enterprise Controls
          </div>
        </header>

        <form className="admin-settings-form" onSubmit={handleSubmit}>
          <div className="admin-settings-section">
            <h2><FiGlobe /> Platform Name</h2>
            <div className="field-row">
              <label>
                Platform name
                <input type="text" placeholder="D & H Creatives" defaultValue="D & H Creatives" />
              </label>
              <label>
                Support domain
                <input type="text" placeholder="support.dhcreatives.com" defaultValue="support.dhcreatives.com" />
              </label>
            </div>
          </div>

          <div className="admin-settings-section">
            <h2><FiUploadCloud /> Logo Upload</h2>
            <div className="field-row">
              <label>
                Primary logo
                <input type="file" accept="image/*" />
              </label>
              <label>
                Favicon
                <input type="file" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="admin-settings-section">
            <h2><FiMail /> SMTP Email Settings</h2>
            <div className="field-row">
              <label>
                SMTP host
                <input type="text" placeholder="smtp.mailserver.com" />
              </label>
              <label>
                SMTP port
                <input type="number" placeholder="587" />
              </label>
              <label>
                Username
                <input type="text" placeholder="noreply@dhcreatives.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="••••••••" />
              </label>
            </div>
          </div>

          <div className="admin-settings-section">
            <h2><FiServer /> Payment Gateway Settings</h2>
            <div className="field-row">
              <label>
                Provider
                <select defaultValue="razorpay">
                  <option value="razorpay">Razorpay</option>
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                </select>
              </label>
              <label>
                Public key
                <input type="text" placeholder="pk_live_***" />
              </label>
              <label>
                Secret key
                <input type="password" placeholder="sk_live_***" />
              </label>
              <label>
                Webhook URL
                <input type="text" placeholder="https://api.dhcreatives.com/webhooks/payments" />
              </label>
            </div>
          </div>

          <div className="admin-settings-section">
            <h2><FiKey /> API Key Management</h2>
            <div className="field-row">
              <label>
                Public API key
                <input type="text" defaultValue="public_live_dh_920384" />
              </label>
              <label>
                Secret API key
                <input type="password" defaultValue="secret_live_dh_****" />
              </label>
              <label>
                Rotate keys
                <button type="button" className="ghost-btn" onClick={handleGenerateKey}>Generate New Key</button>
              </label>
            </div>
          </div>

          <div className="admin-settings-section">
            <h2><FiToggleLeft /> Maintenance Mode Toggle</h2>
            <div className="field-row">
              <label className="toggle-field">
                Maintenance mode
                <button
                  type="button"
                  className={maintenanceMode ? 'toggle active' : 'toggle'}
                  onClick={() => setMaintenanceMode((prev) => !prev)}
                >
                  <span />
                </button>
                <small>{maintenanceMode ? 'Enabled' : 'Disabled'}</small>
              </label>
            </div>
          </div>

          <div className="admin-settings-section">
            <h2><FiShield /> Security Settings</h2>
            <div className="field-row">
              <label>
                Session timeout (minutes)
                <input type="number" placeholder="30" defaultValue="30" />
              </label>
              <label>
                Two-factor authentication
                <select defaultValue="required">
                  <option value="required">Required</option>
                  <option value="optional">Optional</option>
                  <option value="disabled">Disabled</option>
                </select>
              </label>
              <label>
                IP allowlist
                <input type="text" placeholder="203.0.113.0/24, 198.51.100.0/24" />
              </label>
              <label>
                Security contact
                <input type="email" placeholder="security@dhcreatives.com" />
              </label>
            </div>
          </div>

          <footer className="admin-settings-actions">
            <button type="button" className="ghost-btn" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="primary-btn"><FiLock /> Save Settings</button>
          </footer>
        </form>
      </section>
    </AdminLayout>
  );
};
