import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../api/client';
import AdminLayout from '../../components/Admin/AdminLayout';
import { FiTrash2 } from 'react-icons/fi';
import './AdminProjects.css';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const res = await projectAPI.getAllProjects(); // Assuming this function exists
      setProjects(res.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects. Please try again.');
      console.error('Error fetching all projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await projectAPI.deleteProject(id);
        fetchAllProjects(); // Refresh the list after deletion
      } catch (err) {
        setError('Failed to delete project.');
        console.error('Error deleting project:', err);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="admin-projects-page">
        <header className="page-header">
          <h1>All Projects</h1>
          <p>View and manage all user-created projects across the platform.</p>
        </header>

        {loading && <div className="loading-state">Loading projects...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && !error && (
          <div className="table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>User ID</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map(project => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.userId}</td>
                      <td>
                        <span className={`status-badge status-${project.status?.toLowerCase().replace(' ', '-')}`}>
                          {project.status || 'N/A'}
                        </span>
                      </td>
                      <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-icon-danger"
                          onClick={() => handleDeleteProject(project.id)}
                          aria-label={`Delete project ${project.name}`}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
