import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api/client';
import { FiUsers, FiHardDrive, FiActivity, FiLogOut, FiPlus, FiSearch, FiDownload } from 'react-icons/fi';
import '../components/Admin/Admin.css';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user?.role, navigate]);

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getSystemStats(),
      ]);
      setUsers(usersRes.data || []);
      setStats(statsRes.data || {});
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      alert('User role updated');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await adminAPI.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        alert('User deleted');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // optional helper to reset demo data (if provided by dataService)
  const resetData = () => {
    try {
      // lazy import to avoid circular deps
      const ds = require('../api/dataService');
      if (ds && ds.resetDataToDefaults) {
        ds.resetDataToDefaults();
        // refresh users/stats if needed
        setUsers(getUsersFromStore());
        window.location.reload();
      }
    } catch (e) {
      console.warn('reset not available', e);
    }
  };

  const getUsersFromStore = () => {
    try {
      // read users from store if adminAPI isn't providing
      const store = (require('../api/dataService')).getTemplates ? [] : [];
      return [];
    } catch (e) { return []; }
  };

  // Client-side searching + pagination helpers
  const filteredUsers = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.role || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    // reset to page 1 when search or page size changes
    setCurrentPage(1);
  }, [search, pageSize]);

  const changePage = (dir) => {
    setCurrentPage(p => Math.min(Math.max(1, p + dir), totalPages));
  };

  const handleExportCSV = () => {
    const cols = ['id', 'fullName', 'email', 'role', 'isPremium', 'createdAt'];
    const rows = users.map(u => cols.map(c => JSON.stringify(u[c] ?? '')).join(','));
    const csv = [cols.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    if (!fullName) return alert('Enter name');
    const newUser = {
      id: `u-${Date.now()}`,
      fullName,
      email,
      role: form.role.value,
      isPremium: form.isPremium.checked,
      createdAt: new Date().toISOString(),
    };
    setUsers(u => [newUser, ...u]);
    setShowAddUser(false);
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1>🛡️ Admin Panel</h1>
        <button className="btn-icon" onClick={handleLogout}>
          <FiLogOut size={20} />
          Logout
        </button>
      </header>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-brand">Admin</div>
          <nav className="sidebar-nav">
            <button className={`side-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => { setActiveTab('users'); navigate('/admin/dashboard'); }}>&#128101; Users</button>
            <button className={`side-link`} onClick={() => navigate('/admin/templates')}>&#127909; Templates</button>
            <button className={`side-link`} onClick={() => navigate('/admin/pricing')}>&#128176; Pricing</button>
            <button className={`side-link`} onClick={() => { setActiveTab('storage'); navigate('/admin/dashboard'); }}>&#128190; Storage</button>
            <button className={`side-link`} onClick={() => { setActiveTab('logs'); navigate('/admin/dashboard'); }}>&#128221; Logs</button>
            <button className="side-link" onClick={() => { resetData && resetData(); }}>Reset Data</button>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="admin-main">
          {/* Stats Cards */}
          <div className="stats-grid">
        <div className="stat-card">
          <FiUsers size={32} />
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <FiHardDrive size={32} />
          <h3>Storage Used</h3>
          <p className="stat-value">{stats?.storageUsed || '0 GB'}</p>
        </div>
        <div className="stat-card">
          <FiActivity size={32} />
          <h3>Active Projects</h3>
          <p className="stat-value">{stats?.activeProjects || 0}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers size={18} /> Users Management
        </button>
        <button
          className={`tab ${activeTab === 'storage' ? 'active' : ''}`}
          onClick={() => setActiveTab('storage')}
        >
          <FiHardDrive size={18} /> Storage
        </button>
        <button
          className={`tab ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <FiActivity size={18} /> Activity Logs
        </button>
      </nav>

      {/* Content */}
      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {/* Users Tab */}
            {activeTab === 'users' && (
              <section className="admin-section">
                <h2>User Management</h2>
                <div className="users-controls">
                  <div className="search-row">
                    <div className="search-input">
                      <FiSearch />
                      <input
                        placeholder="Search by name, email or role"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="controls-right">
                      <label className="page-size">
                        Show
                        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                          <option value={5}>5</option>
                          <option value={8}>8</option>
                          <option value={12}>12</option>
                        </select>
                        /page
                      </label>
                      <button className="btn-ghost" onClick={() => setShowAddUser(true)}>
                        <FiPlus /> Add User
                      </button>
                      <button className="btn-ghost" onClick={handleExportCSV}>
                        <FiDownload /> Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map(user => (
                        <tr key={user.id}>
                          <td>
                            <strong>{user.fullName}</strong>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handleUserRoleChange(user.id, e.target.value)
                              }
                              className="role-select"
                            >
                              <option value="user">User</option>
                              <option value="editor">Editor</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td>
                            <span
                              className={`status-badge ${user.isPremium ? 'premium' : 'free'}`}
                            >
                              {user.isPremium ? 'Premium' : 'Free'}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn-danger"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination-row">
                  <div className="pagination-info">Showing {filteredUsers.length ? ((currentPage-1)*pageSize + 1) : 0} - {Math.min(currentPage*pageSize, filteredUsers.length)} of {filteredUsers.length}</div>
                  <div className="pagination-controls">
                    <button onClick={() => changePage(-1)} disabled={currentPage === 1}>Prev</button>
                    <span>Page {currentPage} / {totalPages}</span>
                    <button onClick={() => changePage(1)} disabled={currentPage === totalPages}>Next</button>
                  </div>
                </div>

                {/* Add User Modal */}
                {showAddUser && (
                  <div className="modal-backdrop" onClick={() => setShowAddUser(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                      <h3>Add New User</h3>
                      <form onSubmit={handleAddUser} className="add-user-form">
                        <label>Full Name<input name="fullName" /></label>
                        <label>Email<input name="email" /></label>
                        <label>Role<select name="role"><option value="user">User</option><option value="editor">Editor</option><option value="admin">Admin</option></select></label>
                        <label className="checkbox-inline"><input type="checkbox" name="isPremium" /> Premium</label>
                        <div className="modal-actions">
                          <button type="button" onClick={() => setShowAddUser(false)} className="btn-ghost">Cancel</button>
                          <button type="submit" className="btn-primary">Create</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                </div>
              </section>
            )}

            {/* Storage Tab */}
            {activeTab === 'storage' && (
              <section className="admin-section">
                <h2>Storage Management</h2>
                <div className="storage-info">
                  <div className="storage-item">
                    <p>Total Storage Available</p>
                    <h3>500 GB</h3>
                  </div>
                  <div className="storage-item">
                    <p>Used Storage</p>
                    <h3>{stats?.storageUsed || '0 GB'}</h3>
                  </div>
                  <div className="storage-item">
                    <p>Free Storage</p>
                    <h3>{stats?.freeStorage || '500 GB'}</h3>
                  </div>
                </div>
                <div className="storage-progress">
                  <div className="progress-label">
                    <span>Usage: {stats?.storagePercent || 0}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${stats?.storagePercent || 0}%` }}
                    ></div>
                  </div>
                </div>
              </section>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <section className="admin-section">
                <h2>Activity Logs</h2>
                <div className="logs-list">
                  <div className="log-item">
                    <span className="log-time">Today 2:30 PM</span>
                    <span className="log-action">User 'John' created a new project</span>
                  </div>
                  <div className="log-item">
                    <span className="log-time">Today 1:45 PM</span>
                    <span className="log-action">Payment processed for 'Sarah'</span>
                  </div>
                  <div className="log-item">
                    <span className="log-time">Today 12:00 PM</span>
                    <span className="log-action">New user registration</span>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
        </main>
      </div>
    </div>
  );
};
