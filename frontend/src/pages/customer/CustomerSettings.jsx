import React, { useState } from 'react';
import CustomerDashboardLayout from '../../components/CustomerDashboard/CustomerDashboardLayout';
import { FiAlertTriangle, FiBell, FiLock, FiMoon, FiSave, FiShield, FiUser } from 'react-icons/fi';
import './CustomerSettings.css';

const TABS = [
  { key: 'profile', label: 'Profile Info', icon: <FiUser /> },
  { key: 'security', label: 'Security', icon: <FiLock /> },
  { key: 'notifications', label: 'Notifications', icon: <FiBell /> },
  { key: 'appearance', label: 'Appearance', icon: <FiMoon /> },
];

export const CustomerSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    fullName: 'sohel',
    email: 'sohel@dhcreatives.com',
    company: 'D & H Creatives',
    phone: '+91 98765 43210',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    productUpdates: true,
    billingAlerts: true,
    weeklyReport: false,
    exportFinished: true,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const simulateSave = async (message) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      window.alert(message);
    } catch (err) {
      window.alert('Something went wrong. Please try again.');
    }
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderProfileTab = () => (
    <section className="settings-card">
      <h3>Profile Information</h3>
      <div className="settings-form-grid">
        <label>
          Full Name
          <input name="fullName" value={profile.fullName} onChange={handleProfileChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={profile.email} onChange={handleProfileChange} />
        </label>
        <label>
          Company
          <input name="company" value={profile.company} onChange={handleProfileChange} />
        </label>
        <label>
          Phone
          <input name="phone" value={profile.phone} onChange={handleProfileChange} />
        </label>
      </div>
      <button type="button" className="settings-save-btn" onClick={() => simulateSave('Profile updated successfully')}>
        <FiSave /> Save Changes
      </button>
    </section>
  );

  const renderSecurityTab = () => (
    <section className="settings-card">
      <h3>Security</h3>
      <p className="settings-subtext">Change your account password regularly for better security.</p>
      <div className="settings-form-grid">
        <label>
          Current Password
          <input name="currentPassword" type="password" value={passwords.currentPassword} onChange={handlePasswordChange} />
        </label>
        <label>
          New Password
          <input name="newPassword" type="password" value={passwords.newPassword} onChange={handlePasswordChange} />
        </label>
        <label>
          Confirm Password
          <input name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={handlePasswordChange} />
        </label>
      </div>
      <button
        type="button"
        className="settings-save-btn"
        onClick={() => {
          if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
            window.alert('Please fill all password fields.');
            return;
          }
          if (passwords.newPassword !== passwords.confirmPassword) {
            window.alert('New password and confirm password do not match.');
            return;
          }
          simulateSave('Password changed successfully');
        }}
      >
        <FiShield /> Change Password
      </button>
    </section>
  );

  const renderNotificationsTab = () => (
    <section className="settings-card">
      <h3>Notifications</h3>
      <div className="settings-toggle-list">
        <label className="settings-toggle-row">
          <span>Product updates</span>
          <input type="checkbox" checked={notifications.productUpdates} onChange={() => toggleNotification('productUpdates')} />
        </label>
        <label className="settings-toggle-row">
          <span>Billing alerts</span>
          <input type="checkbox" checked={notifications.billingAlerts} onChange={() => toggleNotification('billingAlerts')} />
        </label>
        <label className="settings-toggle-row">
          <span>Weekly report</span>
          <input type="checkbox" checked={notifications.weeklyReport} onChange={() => toggleNotification('weeklyReport')} />
        </label>
        <label className="settings-toggle-row">
          <span>Export completed alerts</span>
          <input type="checkbox" checked={notifications.exportFinished} onChange={() => toggleNotification('exportFinished')} />
        </label>
      </div>
      <button type="button" className="settings-save-btn" onClick={() => simulateSave('Notification preferences saved successfully')}>
        <FiSave /> Save Preferences
      </button>
    </section>
  );

  const renderAppearanceTab = () => (
    <section className="settings-card">
      <h3>Appearance</h3>
      <div className="settings-toggle-list">
        <label className="settings-toggle-row">
          <span>Enable Dark Mode</span>
          <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode((prev) => !prev)} />
        </label>
      </div>
      <button type="button" className="settings-save-btn" onClick={() => simulateSave('Appearance settings saved successfully')}>
        <FiSave /> Save Theme
      </button>
    </section>
  );

  return (
    <CustomerDashboardLayout>
      <div className="customer-settings-page">
        <header className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your profile, privacy and preferences.</p>
        </header>

        <nav className="settings-tabs" aria-label="Settings tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`settings-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="settings-content">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'appearance' && renderAppearanceTab()}

          <section className="settings-card danger-zone">
            <h3>Danger Zone</h3>
            <p>Permanently delete your account and all associated data.</p>
            <button
              type="button"
              className="delete-account-btn"
              onClick={() => {
                const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
                if (confirmed) {
                  window.alert('Account deletion request submitted successfully.');
                }
              }}
            >
              <FiAlertTriangle /> Delete Account
            </button>
          </section>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
