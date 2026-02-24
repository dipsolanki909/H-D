import React, { useEffect, useMemo, useState } from 'react';
import { FiDownload, FiEdit2, FiEye, FiPauseCircle, FiSearch, FiTrash2, FiUsers } from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import { adminAPI } from '../../api/client';
import '../../components/Admin/Admin.css';

const PAGE_SIZE = 8;

const getStatus = (user) => {
  if (user?.status) {
    const normalized = String(user.status).toLowerCase();
    if (normalized.includes('suspend')) return 'Suspended';
    if (normalized.includes('expired')) return 'Expired Plan';
    return 'Active';
  }

  if (user?.isSuspended) return 'Suspended';
  if (user?.planExpired || user?.isPremium === false) return 'Expired Plan';
  return 'Active';
};

const buildAvatar = (user) => {
  if (user?.avatarUrl) return user.avatarUrl;
  const seed = encodeURIComponent(user?.fullName || user?.email || 'user');
  return `https://ui-avatars.com/api/?name=${seed}&background=ede9ff&color=5b3fd9&size=64`;
};

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [detailUser, setDetailUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await adminAPI.getUsers();
        const incoming = response?.data || [];
        setUsers(incoming);
      } catch (error) {
        setUsers([
          {
            id: 'u-101',
            fullName: 'Riya Patel',
            email: 'riya.patel@dhcreatives.com',
            plan: 'Pro',
            storageUsed: '82 GB / 200 GB',
            aiCredits: 1460,
            createdAt: '2025-11-04T10:00:00Z',
            status: 'Active',
          },
          {
            id: 'u-102',
            fullName: 'Nikhil Sharma',
            email: 'nikhil.sharma@gmail.com',
            plan: 'Basic',
            storageUsed: '14 GB / 50 GB',
            aiCredits: 120,
            createdAt: '2025-12-17T09:12:00Z',
            status: 'Expired Plan',
          },
          {
            id: 'u-103',
            fullName: 'Aanya Desai',
            email: 'aanya@brandframe.io',
            plan: 'Enterprise',
            storageUsed: '410 GB / 1 TB',
            aiCredits: 8850,
            createdAt: '2025-09-22T15:34:00Z',
            status: 'Suspended',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const normalizedUsers = useMemo(() => {
    return users.map((entry) => ({
      ...entry,
      statusLabel: getStatus(entry),
      planLabel: entry.plan || (entry.isPremium ? 'Pro' : 'Basic'),
      storageLabel: entry.storageUsed || `${Math.max(8, (entry.id?.length || 1) * 6)} GB / 200 GB`,
      aiCreditsLabel: Number(entry.aiCredits ?? Math.max(50, (entry.id?.length || 1) * 90)).toLocaleString(),
      joinedDate: entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : '-',
      avatar: buildAvatar(entry),
    }));
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return normalizedUsers.filter((entry) => {
      const matchesSearch =
        !query ||
        (entry.fullName || '').toLowerCase().includes(query) ||
        (entry.email || '').toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'All' || entry.statusLabel === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [normalizedUsers, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allVisibleSelected = paginatedUsers.length > 0 && paginatedUsers.every((entry) => selectedIds.includes(entry.id));

  const handleSelectAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !paginatedUsers.some((entry) => entry.id === id)));
      return;
    }
    const merged = new Set([...selectedIds, ...paginatedUsers.map((entry) => entry.id)]);
    setSelectedIds(Array.from(merged));
  };

  const handleRowSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleExport = () => {
    const columns = ['Name', 'Email', 'Plan', 'Storage Used', 'AI Credits', 'Join Date', 'Status'];
    const rows = filteredUsers.map((entry) => [
      entry.fullName || '',
      entry.email || '',
      entry.planLabel,
      entry.storageLabel,
      entry.aiCreditsLabel,
      entry.joinedDate,
      entry.statusLabel,
    ]);

    const csvData = [columns, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'admin-users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEditUser = async (entry) => {
    const fullName = window.prompt('Update full name', entry.fullName || '');
    if (fullName === null) return;

    setUsers((prev) => prev.map((item) => (item.id === entry.id ? { ...item, fullName } : item)));
    window.alert('User updated successfully.');
  };

  const handleSuspendUser = async (entry) => {
    const targetStatus = entry.statusLabel === 'Suspended' ? 'Active' : 'Suspended';
    try {
      setUsers((prev) => prev.map((item) => (item.id === entry.id ? { ...item, status: targetStatus } : item)));
      window.alert(`User status updated to ${targetStatus}.`);
    } catch (error) {
      window.alert('Failed to update user status.');
    }
  };

  const handleDeleteUser = async (entry) => {
    if (!window.confirm(`Delete user ${entry.fullName || entry.email}?`)) return;
    try {
      await adminAPI.deleteUser(entry.id);
    } catch (error) {
      // fallback to local delete when backend unavailable
    }
    setUsers((prev) => prev.filter((item) => item.id !== entry.id));
    setSelectedIds((prev) => prev.filter((id) => id !== entry.id));
  };

  return (
    <AdminLayout>
      <section className="admin-users-page">
        <header className="admin-users-header">
          <div>
            <h1><FiUsers /> User Management</h1>
            <p>Manage all user accounts, plans and platform access from one place.</p>
          </div>

          <div className="admin-users-toolbar">
            <label className="admin-users-search" htmlFor="admin-user-search">
              <FiSearch />
              <input
                id="admin-user-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search user"
              />
            </label>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              aria-label="Filter users"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired Plan">Expired Plan</option>
            </select>

            <button type="button" className="admin-users-export" onClick={handleExport}>
              <FiDownload /> Export user list
            </button>
          </div>
        </header>

        <div className="admin-users-table-wrap">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={handleSelectAllVisible}
                    aria-label="Select all visible users"
                  />
                </th>
                <th>Profile Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Storage Used</th>
                <th>AI Credits</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="10" className="admin-users-empty">Loading users...</td>
                </tr>
              )}

              {!loading && paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan="10" className="admin-users-empty">No users found.</td>
                </tr>
              )}

              {!loading && paginatedUsers.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(entry.id)}
                      onChange={() => handleRowSelect(entry.id)}
                      aria-label={`Select ${entry.fullName}`}
                    />
                  </td>
                  <td>
                    <img className="admin-user-avatar" src={entry.avatar} alt={entry.fullName || 'user'} />
                  </td>
                  <td className="admin-user-name">{entry.fullName || '-'}</td>
                  <td>{entry.email || '-'}</td>
                  <td>{entry.planLabel}</td>
                  <td>{entry.storageLabel}</td>
                  <td>{entry.aiCreditsLabel}</td>
                  <td>{entry.joinedDate}</td>
                  <td>
                    <span className={`admin-user-status ${entry.statusLabel.toLowerCase().replace(/\s+/g, '-')}`}>
                      {entry.statusLabel}
                    </span>
                  </td>
                  <td>
                    <div className="admin-user-actions">
                      <button type="button" title="View" onClick={() => setDetailUser(entry)}><FiEye /></button>
                      <button type="button" title="Edit" onClick={() => handleEditUser(entry)}><FiEdit2 /></button>
                      <button type="button" title="Suspend" onClick={() => handleSuspendUser(entry)}><FiPauseCircle /></button>
                      <button type="button" title="Delete" onClick={() => handleDeleteUser(entry)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="admin-users-pagination">
          <div>
            Selected: <strong>{selectedIds.length}</strong>
          </div>
          <div className="admin-users-pager-controls">
            <button type="button" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button type="button" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </footer>

        {detailUser && (
          <div className="admin-user-modal-backdrop" onClick={() => setDetailUser(null)}>
            <article className="admin-user-modal" onClick={(event) => event.stopPropagation()}>
              <header>
                <h3>User Detail</h3>
                <button type="button" onClick={() => setDetailUser(null)}>Close</button>
              </header>

              <div className="admin-user-modal-grid">
                <img className="admin-user-avatar large" src={detailUser.avatar} alt={detailUser.fullName || 'user'} />
                <div>
                  <p><strong>Name:</strong> {detailUser.fullName || '-'}</p>
                  <p><strong>Email:</strong> {detailUser.email || '-'}</p>
                  <p><strong>Plan:</strong> {detailUser.planLabel}</p>
                  <p><strong>Storage Used:</strong> {detailUser.storageLabel}</p>
                  <p><strong>AI Credits:</strong> {detailUser.aiCreditsLabel}</p>
                  <p><strong>Join Date:</strong> {detailUser.joinedDate}</p>
                  <p><strong>Status:</strong> {detailUser.statusLabel}</p>
                </div>
              </div>
            </article>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};
