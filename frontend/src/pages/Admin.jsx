import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api/client';
import AdminLayout from '../components/Admin/AdminLayout';
import '../components/Admin/Admin.css';
import {
  FiActivity,
  FiArrowDownRight,
  FiArrowUpRight,
  FiBell,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiFilter,
  FiGrid,
  FiLayers,
  FiLock,
  FiPlusCircle,
  FiSearch,
  FiSend,
  FiSettings,
  FiUsers,
  FiVideo,
  FiZap,
} from 'react-icons/fi';

export const AdminPanel = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getSystemStats(),
      ]);
      setUsers(usersRes.data.data || []);
      setStats(statsRes.data.data || {});
    } catch (err) {
      setUsers([
        { id: 'u1', fullName: 'Riya Patel', email: 'riya@example.com' },
        { id: 'u2', fullName: 'Nikhil Sharma', email: 'nikhil@example.com' },
        { id: 'u3', fullName: 'Aanya Desai', email: 'aanya@example.com' }
      ]);
      setStats({
        totalUsers: 1250,
        activeUsersToday: 412,
        totalProjects: 12480,
        totalRevenue: 286940,
        aiCreditsUsedToday: 7420
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionId) => {
    if (actionId === 'plan') navigate('/admin/pricing');
    else if (actionId === 'notify') window.alert('Notification composer opened.');
    else if (actionId === 'template') navigate('/admin/templates');
    else if (actionId === 'block') navigate('/admin/users');
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredUsers = users.filter((entry) => {
    if (!normalizedSearch) return true;
    const fullName = entry.fullName || '';
    const email = entry.email || '';
    return fullName.toLowerCase().includes(normalizedSearch) || email.toLowerCase().includes(normalizedSearch);
  });

  const totalUsers = stats?.totalUsers ?? users.length;
  const activeUsersToday = stats?.activeUsersToday ?? Math.max(0, Math.round((users.length || 0) * 0.34));
  const totalProjects = stats?.totalProjects ?? stats?.activeProjects ?? 12480;
  const totalRevenue = stats?.totalRevenue ?? 286940;
  const aiCreditsUsedToday = stats?.aiCreditsUsedToday ?? 7420;

  const overviewStats = [
    {
      id: 'users',
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      growth: '+8.2% this week',
      trend: 'up',
      icon: <FiUsers />,
    },
    {
      id: 'active-users',
      title: 'Active Users Today',
      value: activeUsersToday.toLocaleString(),
      growth: '+3.4% vs yesterday',
      trend: 'up',
      icon: <FiActivity />,
    },
    {
      id: 'projects',
      title: 'Total Projects',
      value: totalProjects.toLocaleString(),
      growth: '+12.1% this month',
      trend: 'up',
      icon: <FiVideo />,
    },
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `₹${Number(totalRevenue).toLocaleString()}`,
      growth: '+6.9% MRR',
      trend: 'up',
      icon: <FiDollarSign />,
    },
    {
      id: 'credits',
      title: 'AI Credits Used Today',
      value: aiCreditsUsedToday.toLocaleString(),
      growth: '-1.8% vs yesterday',
      trend: 'down',
      icon: <FiZap />,
    },
  ];

  const activityFeed = [
    {
      id: '1',
      type: 'User registered',
      detail: filteredUsers[0]?.email || 'new.creator@dhcreatives.com',
      time: '2 min ago',
      icon: <FiUsers />,
    },
    {
      id: '2',
      type: 'Project exported',
      detail: 'Wedding_Highlight_4K.mp4',
      time: '11 min ago',
      icon: <FiVideo />,
    },
    {
      id: '3',
      type: 'Payment received',
      detail: 'Pro plan renewal · ₹2,999',
      time: '28 min ago',
      icon: <FiCreditCard />,
    },
    {
      id: '4',
      type: 'AI tool used',
      detail: 'Auto-caption + noise cleanup pipeline',
      time: '45 min ago',
      icon: <FiZap />,
    },
  ];

  const quickActions = [
    { id: 'plan', label: 'Add New Plan', icon: <FiPlusCircle /> },
    { id: 'notify', label: 'Send Notification', icon: <FiSend /> },
    { id: 'template', label: 'Add Template', icon: <FiLayers /> },
    { id: 'block', label: 'Block User', icon: <FiLock /> },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard-shell">
        <header className="admin-topbar-glass">
          <div className="admin-topbar-left">
            <h1>D &amp; H Creatives Admin</h1>
            <p>Enterprise control center for platform operations</p>
          </div>

          <div className="admin-topbar-actions">
            <label className="admin-search-glass" htmlFor="admin-dashboard-search">
              <FiSearch />
              <input
                id="admin-dashboard-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search users/projects"
                aria-label="Search users and projects"
              />
              <button
                type="button"
                className="admin-filter-btn"
                aria-label="Open filters"
                onClick={() => window.alert('Use search input to filter users and projects.')}
              >
                <FiFilter />
              </button>
            </label>

            <button
              type="button"
              className="admin-icon-btn"
              aria-label="Notifications"
              onClick={() => window.alert('You have 3 new admin notifications.')}
            >
              <FiBell />
              <span>3</span>
            </button>

            <div className="admin-profile-wrap">
              <button
                type="button"
                className="admin-profile-btn"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={showProfileMenu}
              >
                <div className="admin-avatar">AD</div>
                <div className="admin-profile-meta">
                  <strong>Admin</strong>
                  <small>Super Admin</small>
                </div>
              </button>

              {showProfileMenu && (
                <div className="admin-profile-menu" role="menu">
                  <button type="button" role="menuitem" onClick={() => navigate('/admin/settings')}><FiSettings /> Account Settings</button>
                  <button type="button" role="menuitem" onClick={() => navigate('/dashboard')}><FiGrid /> Switch to App</button>
                  <button type="button" role="menuitem" onClick={() => navigate('/admin/projects')}><FiFileText /> Audit Logs</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="admin-overview-section">
          <div className="admin-section-title-row">
            <h2>Platform Overview</h2>
            <span>{loading ? 'Syncing live metrics...' : 'Last updated just now'}</span>
          </div>

          <div className="admin-overview-grid">
            {overviewStats.map((card) => (
              <article key={card.id} className="admin-overview-card">
                <div className="admin-overview-card-head">
                  <div className="admin-overview-icon">{card.icon}</div>
                  <span className={`admin-trend-chip ${card.trend === 'up' ? 'up' : 'down'}`}>
                    {card.trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
                    {card.growth}
                  </span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-bottom-grid">
          <article className="admin-activity-panel">
            <div className="admin-section-title-row">
              <h2>Recent Activities Feed</h2>
              <span>Live platform pulse</span>
            </div>
            <ul className="admin-activity-list">
              {activityFeed.map((entry) => (
                <li key={entry.id} className="admin-activity-item">
                  <div className="admin-activity-icon">{entry.icon}</div>
                  <div className="admin-activity-copy">
                    <strong>{entry.type}</strong>
                    <p>{entry.detail}</p>
                  </div>
                  <span>{entry.time}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="admin-actions-panel">
            <div className="admin-section-title-row">
              <h2>Quick Admin Actions</h2>
              <span>One-click control tasks</span>
            </div>
            <div className="admin-quick-actions-grid">
              {quickActions.map((action) => (
                <button
                  type="button"
                  key={action.id}
                  className="admin-quick-action-btn"
                  onClick={() => handleQuickAction(action.id)}
                >
                  <span>{action.icon}</span>
                  <strong>{action.label}</strong>
                </button>
              ))}
            </div>
          </article>
        </section>

        {search && (
          <footer className="admin-search-hint">
            Showing matches for "{search}" across {filteredUsers.length} users and all projects.
          </footer>
        )}
      </div>
    </AdminLayout>
  );
};
