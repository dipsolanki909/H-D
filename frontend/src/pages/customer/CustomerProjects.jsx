import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI } from '../../api/client';
import CustomerDashboardLayout from '../../components/CustomerDashboard/CustomerDashboardLayout';
import {
  FiSearch,
  FiPlus,
  FiGrid,
  FiList,
  FiEdit2,
  FiCopy,
  FiDownload,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import './CustomerProjects.css';

export const CustomerProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await projectAPI.getProjects();
      const apiProjects = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
          ? res.data
          : [];

      const normalizedProjects = apiProjects.map((project, index) => ({
        id: project._id || project.id || `project-${index}`,
        ...project,
        name: project.name || `Untitled Project ${index + 1}`,
        status: normalizeStatus(project.status, index),
        thumbnail: '/images/DH/bg2.jpg',
        duration: project.duration || getDurationFromIndex(index),
        resolution: project.resolution || getResolutionFromIndex(index),
        lastEdited: project.updatedAt || project.createdAt || new Date().toISOString(),
      }));

      setProjects(normalizedProjects);
      setError(null);
    } catch (err) {
      setProjects([]);
      setError('Failed to load projects. Please try again.');
      console.error('Error fetching user projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  const normalizeStatus = (status, index) => {
    if (!status) {
      const fallback = ['Draft', 'Completed', 'Rendering'];
      return fallback[index % fallback.length];
    }

    const source = String(status).toLowerCase();
    if (source.includes('render')) return 'Rendering';
    if (source.includes('complete') || source.includes('done')) return 'Completed';
    return 'Draft';
  };

  const getDurationFromIndex = (index) => {
    const list = ['00:42', '01:15', '02:08', '03:22', '00:58', '01:47'];
    return list[index % list.length];
  };

  const getResolutionFromIndex = (index) => {
    const list = ['1080p', '4K', '720p', '1080x1920'];
    return list[index % list.length];
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

  const handleDuplicateProject = (id) => {
    setProjects((prev) => {
      const target = prev.find((item) => item.id === id);
      if (!target) return prev;

      const duplicate = {
        ...target,
        id: `${target.id}-copy-${Date.now()}`,
        name: `${target.name} (Copy)`,
        status: 'Draft',
        lastEdited: new Date().toISOString(),
      };

      return [duplicate, ...prev];
    });
  };

  const handleCreateProject = async () => {
    try {
      const projectName = `Untitled Project ${projects.length + 1}`;
      const res = await projectAPI.create(projectName, '');
      const createdProject = res?.data?.data;

      if (!createdProject) {
        throw new Error('Create project API did not return project data.');
      }

      const normalizedProject = {
        id: createdProject._id || createdProject.id,
        ...createdProject,
        name: createdProject.name || projectName,
        status: normalizeStatus(createdProject.status, 0),
        thumbnail: '/images/DH/bg2.jpg',
        duration: createdProject.duration || '00:00',
        resolution: createdProject.resolution || '1080p',
        lastEdited: createdProject.updatedAt || createdProject.createdAt || new Date().toISOString(),
      };

      setProjects((prev) => [normalizedProject, ...prev]);
      setCurrentPage(1);
      setError(null);
    } catch (err) {
      setError('Failed to create project. Please try again.');
      console.error('Error creating project:', err);
    }
  };

  const handleEditProject = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleExportProject = (id) => {
    navigate('/export', { state: { projectId: id } });
  };

  const filteredProjects = projects
    .filter((project) => {
      const matchSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || project.status?.toLowerCase() === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((left, right) => {
      if (sortBy === 'name') {
        return (left.name || '').localeCompare(right.name || '');
      }
      return new Date(right.lastEdited).getTime() - new Date(left.lastEdited).getTime();
    });

  const itemsPerPage = viewMode === 'grid' ? 6 : 5;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(pageStart, pageStart + itemsPerPage);

  const formatDate = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '—';
    return parsed.toLocaleDateString();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy, viewMode]);

  return (
    <CustomerDashboardLayout>
      <div className="customer-projects-page">
        <header className="page-header">
          <h1>My Projects</h1>
          <p>Manage your video edits with a clean and powerful workspace.</p>
        </header>

        {loading && <div className="loading-state">Loading projects...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && (
          <>
            <section className="projects-toolbar" aria-label="Projects controls">
              <div className="search-wrap">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="filters-wrap">
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">All</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                  <option value="rendering">Rendering</option>
                </select>

                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                </select>

                <div className="view-toggle" role="group" aria-label="View mode">
                  <button
                    type="button"
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <FiGrid />
                  </button>
                  <button
                    type="button"
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <FiList />
                  </button>
                </div>

                <button type="button" className="btn-create-project" onClick={handleCreateProject}>
                  <FiPlus /> Create Project
                </button>
              </div>
            </section>

            {paginatedProjects.length === 0 ? (
              <div className="empty-state-card">No projects found.</div>
            ) : (
              <section className={`projects-content ${viewMode}`}>
                {paginatedProjects.map((project) => (
                  <article className="project-card" key={project.id}>
                    <div className="project-thumb-wrap">
                      <img src={project.thumbnail} alt={project.name} className="project-thumb" />
                      <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span>

                      <div className="project-overlay">
                        <button type="button" onClick={() => handleEditProject(project.id)}>
                          <FiEdit2 /> Edit
                        </button>
                        <button type="button" onClick={() => handleDuplicateProject(project.id)}>
                          <FiCopy /> Duplicate
                        </button>
                        <button type="button" onClick={() => handleExportProject(project.id)}>
                          <FiDownload /> Export
                        </button>
                        <button type="button" className="danger" onClick={() => handleDeleteProject(project.id)}>
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>

                    <div className="project-meta-wrap">
                      <h3>{project.name}</h3>
                      <p>Last edited: {formatDate(project.lastEdited)}</p>
                      <div className="project-meta-line">
                        <span>{project.duration}</span>
                        <span>{project.resolution}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}

            <footer className="pagination-wrap" aria-label="Projects pagination">
              <button
                type="button"
                onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                disabled={safeCurrentPage === 1}
              >
                <FiChevronLeft /> Previous
              </button>

              <span>Page {safeCurrentPage} of {totalPages}</span>

              <button
                type="button"
                onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                disabled={safeCurrentPage === totalPages}
              >
                Next <FiChevronRight />
              </button>
            </footer>
          </>
        )}
      </div>
    </CustomerDashboardLayout>
  );
};
