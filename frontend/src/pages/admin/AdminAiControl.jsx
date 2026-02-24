import React, { useMemo, useState } from 'react';
import {
  FiActivity,
  FiAlertOctagon,
  FiBarChart2,
  FiClock,
  FiCpu,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import './AdminAiControl.css';

const initialTools = [
  { id: 'caption', name: 'AI Caption Generator', enabled: true, creditCost: 8, dailyLimit: 3200, usageToday: 2860 },
  { id: 'upscale', name: '4K Upscaler', enabled: true, creditCost: 20, dailyLimit: 1200, usageToday: 940 },
  { id: 'remove-noise', name: 'Noise Cleanup', enabled: true, creditCost: 14, dailyLimit: 1800, usageToday: 1335 },
  { id: 'script', name: 'AI Script Assistant', enabled: false, creditCost: 6, dailyLimit: 1500, usageToday: 480 },
];

const dailyUsage = [
  { day: 'Mon', credits: 10200 },
  { day: 'Tue', credits: 10980 },
  { day: 'Wed', credits: 11840 },
  { day: 'Thu', credits: 12550 },
  { day: 'Fri', credits: 13240 },
  { day: 'Sat', credits: 12190 },
  { day: 'Sun', credits: 12760 },
];

const highUsageUsers = [
  { id: 'u-201', name: 'Riya Patel', email: 'riya@brandlane.io', creditsToday: 1940, tool: '4K Upscaler' },
  { id: 'u-202', name: 'Arjun Mehta', email: 'arjun@streamlabs.ai', creditsToday: 1780, tool: 'Noise Cleanup' },
  { id: 'u-203', name: 'Nidhi Shah', email: 'nidhi@creatorpro.in', creditsToday: 1625, tool: 'AI Caption Generator' },
];

const suspiciousAlerts = [
  { id: 'a-1', severity: 'high', message: 'Burst usage pattern detected from single IP for 4K Upscaler.' },
  { id: 'a-2', severity: 'medium', message: 'Repeated failed requests against AI Script Assistant endpoint.' },
  { id: 'a-3', severity: 'high', message: 'Unusual midnight spike in caption generation credits.' },
];

export const AdminAiControl = () => {
  const [tools, setTools] = useState(initialTools);

  const totalCreditsUsed = useMemo(
    () => tools.reduce((sum, tool) => sum + Number(tool.usageToday || 0), 0),
    [tools]
  );

  const mostUsedTool = useMemo(() => {
    if (!tools.length) return '—';
    return [...tools].sort((left, right) => right.usageToday - left.usageToday)[0].name;
  }, [tools]);

  const peakUsage = Math.max(...dailyUsage.map((entry) => entry.credits));

  const updateToolValue = (id, field, value) => {
    setTools((prev) => prev.map((tool) => (tool.id === id ? { ...tool, [field]: value } : tool)));
  };

  return (
    <AdminLayout>
      <section className="admin-ai-page">
        <header className="admin-ai-header">
          <div>
            <h1>AI System Control Panel</h1>
            <p>Configure AI limits, monitor real-time usage and detect abuse activity.</p>
          </div>
          <div className="admin-ai-header-tag">
            <FiCpu /> AI Ops Center
          </div>
        </header>

        <article className="admin-ai-section">
          <div className="admin-ai-title-row">
            <h2>AI Usage Overview</h2>
          </div>

          <div className="admin-ai-overview-grid">
            <div className="admin-ai-metric-card">
              <span><FiZap /> Total AI Credits Used</span>
              <h3>{totalCreditsUsed.toLocaleString()}</h3>
              <small><FiTrendingUp /> +8.4% from yesterday</small>
            </div>

            <div className="admin-ai-metric-card">
              <span><FiBarChart2 /> Daily Usage Graph</span>
              <div className="admin-ai-bars">
                {dailyUsage.map((entry) => (
                  <div key={entry.day} className="admin-ai-bar-item">
                    <div
                      className="admin-ai-bar"
                      style={{ height: `${Math.max(12, Math.round((entry.credits / peakUsage) * 100))}%` }}
                      title={`${entry.credits.toLocaleString()} credits`}
                    />
                    <em>{entry.day}</em>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-ai-metric-card">
              <span><FiActivity /> Most Used AI Tool</span>
              <h3>{mostUsedTool}</h3>
              <small><FiClock /> Synced every 15 minutes</small>
            </div>
          </div>
        </article>

        <article className="admin-ai-section">
          <div className="admin-ai-title-row">
            <h2>AI Tool Control</h2>
          </div>

          <div className="admin-ai-tool-table-wrap">
            <table className="admin-ai-tool-table">
              <thead>
                <tr>
                  <th>AI Tool</th>
                  <th>Enable / Disable</th>
                  <th>Credit Cost / Use</th>
                  <th>Daily Usage Limit</th>
                  <th>Usage Today</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id}>
                    <td>{tool.name}</td>
                    <td>
                      <label className="ai-toggle" htmlFor={`toggle-${tool.id}`}>
                        <input
                          id={`toggle-${tool.id}`}
                          type="checkbox"
                          checked={tool.enabled}
                          onChange={(event) => updateToolValue(tool.id, 'enabled', event.target.checked)}
                        />
                        <span>{tool.enabled ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={tool.creditCost}
                        onChange={(event) => updateToolValue(tool.id, 'creditCost', Number(event.target.value || 0))}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={tool.dailyLimit}
                        onChange={(event) => updateToolValue(tool.id, 'dailyLimit', Number(event.target.value || 0))}
                      />
                    </td>
                    <td>
                      <span className={`ai-usage-pill ${tool.usageToday > tool.dailyLimit * 0.8 ? 'warn' : ''}`}>
                        {tool.usageToday.toLocaleString()} / {tool.dailyLimit.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="admin-ai-section">
          <div className="admin-ai-title-row">
            <h2>Abuse Detection Panel</h2>
          </div>

          <div className="admin-ai-abuse-grid">
            <div className="admin-ai-abuse-card">
              <h3><FiUsers /> High usage users list</h3>
              <ul>
                {highUsageUsers.map((user) => (
                  <li key={user.id}>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                    <em>{user.creditsToday.toLocaleString()} credits · {user.tool}</em>
                  </li>
                ))}
              </ul>
            </div>

            <div className="admin-ai-abuse-card">
              <h3><FiShield /> Suspicious activity alerts</h3>
              <ul>
                {suspiciousAlerts.map((alert) => (
                  <li key={alert.id} className={alert.severity === 'high' ? 'high' : 'medium'}>
                    <FiAlertOctagon />
                    <span>{alert.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>
    </AdminLayout>
  );
};
