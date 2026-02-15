import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api/client';
import AdminLayout from '../components/Admin/AdminLayout';
import '../components/Admin/Admin.css';

// MUI components (used where available) — keeps integration light and progressive
import { Box, Grid, Card, CardContent, Typography, IconButton, TextField, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getSystemStats(),
      ]);
      setUsers(usersRes.data || []);
      setStats(statsRes.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.fullName || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q) || (u.role || '').toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleRoleChange = async (id, role) => {
    try {
      await adminAPI.updateUserRole(id, role);
      setUsers(s => s.map(u => (u.id === id ? { ...u, role } : u)));
    } catch (e) {
      console.error(e);
      alert('Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers(s => s.filter(u => u.id !== id));
    } catch (e) {
      console.error(e);
      alert('Failed to delete user');
    }
  };

  const handleExport = () => {
    const cols = ['id', 'fullName', 'email', 'role', 'isPremium', 'createdAt'];
    const rows = users.map(u => cols.map(c => JSON.stringify(u[c] ?? '')).join(','));
    const csv = [cols.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      id: `u-${Date.now()}`,
      fullName: form.fullName.value,
      email: form.email.value,
      role: form.role.value,
      isPremium: !!form.isPremium.checked,
      createdAt: new Date().toISOString(),
    };
    // backend create-user endpoint is not available in adminAPI — keep add local (consistent with prior behavior)
    setUsers(s => [newUser, ...s]);
    setShowAddUser(false);
  };

  return (
    <AdminLayout>
      <Box className="admin-header-top">
        <Typography component="h1" variant="h5">Admin Dashboard</Typography>
        <div className="admin-actions">
          <TextField
            size="small"
            placeholder="Search users..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            InputProps={{ startAdornment: <SearchIcon fontSize="small" /> }}
          />
          <Button variant="contained" color="primary">Overview</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} disabled={loading}>Export</Button>
          <IconButton onClick={handleLogout} title="Logout"><LogoutIcon /></IconButton>
        </div>
      </Box>

      <Grid container spacing={2} className="stats-grid">
        <Grid item xs={12} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Total Users</Typography>
              <Typography className="stat-value">{stats?.totalUsers ?? users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Storage Used</Typography>
              <Typography className="stat-value">{stats?.storageUsed ?? '0 GB'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="subtitle2">Active Projects</Typography>
              <Typography className="stat-value">{stats?.activeProjects ?? 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users management (primary admin CRUD backed by existing adminAPI) */}
      <Box className="admin-section" sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6">Users</Typography>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button className="btn-ghost" onClick={() => setShowAddUser(true)}>Add User</Button>
            <Button className="btn-ghost" onClick={handleExport}>Export CSV</Button>
          </div>
        </Box>

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
              {paginated.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.fullName}</strong></td>
                  <td>{u.email}</td>
                  <td>
                    <select className="role-select" value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}>
                      <option value="user">User</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td><span className={`status-badge ${u.isPremium ? 'premium' : 'free'}`}>{u.isPremium ? 'Premium' : 'Free'}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-row">
          <div>Showing {filtered.length ? ( (page-1)*pageSize + 1) : 0} - {Math.min(page*pageSize, filtered.length)} of {filtered.length}</div>
          <div className="pagination-controls">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>Prev</button>
            <span>Page {page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>Next</button>
          </div>
        </div>

        {showAddUser && (
          <div className="modal-backdrop" onClick={() => setShowAddUser(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>Add User</h3>
              <form onSubmit={handleAddUser} className="add-user-form">
                <label>Full Name<input name="fullName" required /></label>
                <label>Email<input name="email" required /></label>
                <label>Role<select name="role"><option value="user">User</option><option value="editor">Editor</option><option value="admin">Admin</option></select></label>
                <label style={{display:'flex',alignItems:'center',gap:12}}><span>Premium</span><input type="checkbox" name="isPremium"/></label>
                <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
                  <button type="button" className="btn-ghost" onClick={() => setShowAddUser(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Box>
    </AdminLayout>
  );
};
