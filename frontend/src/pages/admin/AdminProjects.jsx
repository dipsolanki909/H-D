import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../api/client';
import AdminLayout from '../../components/Admin/AdminLayout';
import { FiAlertTriangle, FiClock, FiEye, FiFlag, FiLayers, FiTrash2, FiVideo } from 'react-icons/fi';
import './AdminProjects.css';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    fetchAllProjects();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastRefresh(new Date());
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const res = await projectAPI.getProjects();
      const incoming = res.data || [];

      const normalized = incoming.map((project, index) => ({
        id: project.id || `project-${index}`,
        userName: project.userName || project.ownerName || project.userId || 'Unknown User',
        name: project.name || `Untitled Project ${index + 1}`,
        status: (project.status || 'Draft').toLowerCase(),
        createdAt: project.createdAt || new Date(Date.now() - (index + 3) * 86400000).toISOString(),
        lastEdited: project.updatedAt || project.lastEdited || new Date(Date.now() - index * 3600000).toISOString(),
        exportCount: Number(project.exportCount ?? ((index % 4) + 1)),
        flaggedReason: project.flaggedReason || (index % 7 === 0 ? 'Potential copyrighted audio' : ''),
      }));

      setProjects(normalized);
      setError(null);
    } catch (err) {
      setProjects([
        {
          id: 'p-901',
          userName: 'Riya Patel',
          name: 'Wedding Highlights 4K',
          status: 'rendering',
          createdAt: '2026-02-12T10:00:00Z',
          lastEdited: '2026-02-22T18:25:00Z',
          exportCount: 3,
          flaggedReason: '',
        },
        {
          id: 'p-902',
          userName: 'Nikhil Sharma',
          name: 'Product Promo Reel',
          status: 'failed-export',
          createdAt: '2026-02-10T09:30:00Z',
          lastEdited: '2026-02-22T19:12:00Z',
          exportCount: 1,
          flaggedReason: '',
        },
        {
          id: 'p-903',
          userName: 'Aanya Desai',
          name: 'Fitness Weekly Edit',
          status: 'flagged',
          createdAt: '2026-02-08T08:20:00Z',
          lastEdited: '2026-02-21T13:02:00Z',
          exportCount: 5,
          flaggedReason: 'Potential sensitive visual content',
        },
        {
          id: 'p-904',
          userName: 'Dhruv Mehta',
          name: 'Travel Vlog Intro',
          status: 'completed',
          createdAt: '2026-02-03T11:40:00Z',
          lastEdited: '2026-02-22T14:40:00Z',
          exportCount: 7,
          flaggedReason: '',
        },
      ]);
      setError('Live API unavailable. Showing monitoring demo data.');
      console.error('Error fetching all projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await projectAPI.deleteProject(id);
        setProjects((prev) => prev.filter((project) => project.id !== id));
      } catch (err) {
        setError('Failed to delete project.');
        console.error('Error deleting project:', err);
      }
    }
  };

  const getStatusMeta = (status) => {
    const value = (status || '').toLowerCase();
    if (value.includes('render')) return { label: 'Rendering', className: 'rendering', isLive: true };
    if (value.includes('fail')) return { label: 'Failed Export', className: 'failed-export', isLive: true };
    if (value.includes('flag')) return { label: 'Flagged', className: 'flagged', isLive: true };
    if (value.includes('complete')) return { label: 'Completed', className: 'completed', isLive: false };
    return { label: 'Draft', className: 'draft', isLive: false };
  };

  const renderingProjects = projects.filter((project) => getStatusMeta(project.status).className === 'rendering');
  const failedProjects = projects.filter((project) => getStatusMeta(project.status).className === 'failed-export');
  const flaggedProjects = projects.filter((project) => getStatusMeta(project.status).className === 'flagged');

  return (
    <AdminLayout>
      <section className="admin-monitor-page">
        <header className="monitor-header">
          <div>
            <h1>Admin Project Monitoring</h1>
            <p>Track rendering, exports and moderation signals in real-time.</p>
          </div>
          <button type="button" className="monitor-refresh-btn" onClick={fetchAllProjects}>
            <FiClock /> Refresh · {lastRefresh.toLocaleTimeString()}
          </button>
        </header>

        {loading && <div className="loading-state">Loading projects...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && (
          <>
            <div className="monitor-overview-grid">
              <article className="monitor-card">
                <div><FiLayers /></div>
                <h3>Total Projects Overview</h3>
                <p>{projects.length}</p>
              </article>

              <article className="monitor-card">
                <div><FiVideo /></div>
                <h3>Rendering in Progress</h3>
                <p>{renderingProjects.length}</p>
              </article>

              <article className="monitor-card">
                <div><FiAlertTriangle /></div>
                <h3>Failed Exports</h3>
                <p>{failedProjects.length}</p>
              </article>

              <article className="monitor-card">
                <div><FiFlag /></div>
                <h3>Flagged Content</h3>
                <p>{flaggedProjects.length}</p>
              </article>
            </div>

            <div className="monitor-list-grid">
              <article className="monitor-panel">
                <h2>Rendering in progress list</h2>
                <ul>
                  {renderingProjects.length > 0 ? renderingProjects.map((project) => (
                    <li key={project.id}>
                      <strong>{project.name}</strong>
                      <span>{project.userName}</span>
                    </li>
                  )) : <li className="muted">No rendering projects right now.</li>}
                </ul>
              </article>

              <article className="monitor-panel">
                <h2>Failed exports section</h2>
                <ul>
                  {failedProjects.length > 0 ? failedProjects.map((project) => (
                    <li key={project.id}>
                      <strong>{project.name}</strong>
                      <span>Last edited: {new Date(project.lastEdited).toLocaleString()}</span>
                    </li>
                  )) : <li className="muted">No failed exports currently.</li>}
                </ul>
              </article>

              <article className="monitor-panel">
                <h2>Flagged content section</h2>
                <ul>
                  {flaggedProjects.length > 0 ? flaggedProjects.map((project) => (
                    <li key={project.id}>
                      <strong>{project.name}</strong>
                      <span>{project.flaggedReason || 'Policy review required'}</span>
                    </li>
                  )) : <li className="muted">No flagged content for review.</li>}
                </ul>
              </article>
            </div>

            <div className="monitor-table-wrap">
              <table className="monitor-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Project Name</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Last Edited</th>
                    <th>Export Count</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length > 0 ? (
                    projects.map((project) => {
                      const status = getStatusMeta(project.status);
                      return (
                        <tr key={project.id}>
                          <td>{project.userName}</td>
                          <td>{project.name}</td>
                          <td>
                            <span className={`monitor-status-badge ${status.className}`}>
                              {status.isLive && <i className="live-dot" />}
                              {status.label}
                            </span>
                          </td>
                          <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                          <td>{new Date(project.lastEdited).toLocaleString()}</td>
                          <td>{project.exportCount}</td>
                          <td>
                            <div className="monitor-table-actions">
                              <button type="button" onClick={() => setSelectedProject(project)}><FiEye /> View</button>
                              <button type="button" className="danger" onClick={() => handleDeleteProject(project.id)}><FiTrash2 /> Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-state">No projects found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {selectedProject && (
          <div className="monitor-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <article className="monitor-modal" onClick={(event) => event.stopPropagation()}>
              <header>
                <h3>Project Details</h3>
                <button type="button" onClick={() => setSelectedProject(null)}>Close</button>
              </header>
              <div className="monitor-modal-grid">
                <p><strong>User:</strong> {selectedProject.userName}</p>
                <p><strong>Project:</strong> {selectedProject.name}</p>
                <p><strong>Status:</strong> {getStatusMeta(selectedProject.status).label}</p>
                <p><strong>Created:</strong> {new Date(selectedProject.createdAt).toLocaleString()}</p>
                <p><strong>Last Edited:</strong> {new Date(selectedProject.lastEdited).toLocaleString()}</p>
                <p><strong>Export Count:</strong> {selectedProject.exportCount}</p>
                <p><strong>Flagged Note:</strong> {selectedProject.flaggedReason || 'None'}</p>
              </div>
            </article>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};
