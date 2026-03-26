import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../utils/appStore';
import { FiPlus, FiPlay, FiTrash2, FiSettings, FiLogOut } from 'react-icons/fi';
import { projectAPI, videoAPI } from '../api/client';
import '../components/Dashboard/Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const store = useAppStore();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, videosRes] = await Promise.all([
        projectAPI.getProjects(),
        videoAPI.getVideos(),
      ]);
      setProjects(projectsRes.data || []);
      setVideos(videosRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    const name = prompt('Enter project name:');
    if (name) {
      // In real app, make API call
      store.createProject(name);
      fetchData();
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await projectAPI.deleteProject(id);
        store.deleteProject(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await videoAPI.deleteVideo(id);
        store.deleteVideo(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🎬 VideoStudio</h1>
          <p>Welcome back, {user?.fullName || 'Guest'}!</p>
        </div>
        <div className="header-right">
          {user?.role === 'admin' && (
            <button className="btn-icon" onClick={() => navigate('/admin')}>
              <FiSettings size={20} />
              Admin
            </button>
          )}
          <button className="btn-icon" onClick={handleLogout}>
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              My Projects
            </button>
            <button
              className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              My Videos
            </button>
            <button
              className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Recent Activity
            </button>
          </nav>

          <button className="btn-primary-lg" onClick={() => navigate('/upload')}>
            <FiPlus size={20} />
            New Project
          </button>
        </aside>

        {/* Main Panel */}
        <main className="dashboard-main">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <section className="tab-section">
                  <div className="section-header">
                    <h2>My Projects</h2>
                    <button className="btn-secondary" onClick={handleCreateProject}>
                      <FiPlus size={18} />
                      New Project
                    </button>
                  </div>

                  {projects.length === 0 ? (
                    <div className="empty-state">
                      <p>No projects yet. Create one to get started!</p>
                    </div>
                  ) : (
                    <div className="projects-grid">
                      {projects.map(project => (
                        <div key={project.id} className="project-card">
                          <div className="project-header">
                            <h3>{project.name}</h3>
                            <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="project-info">
                            {project.videos?.length || 0} videos
                          </p>
                          <div className="project-actions">
                            <button
                              className="btn-small"
                              onClick={() => navigate(`/editor/${project.id}`)}
                            >
                              <FiPlay size={16} />
                              Edit
                            </button>
                            <button
                              className="btn-small-danger"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Videos Tab */}
              {activeTab === 'videos' && (
                <section className="tab-section">
                  <div className="section-header">
                    <h2>My Videos</h2>
                    <button className="btn-secondary" onClick={() => navigate('/upload')}>
                      <FiPlus size={18} />
                      Upload Video
                    </button>
                  </div>

                  {videos.length === 0 ? (
                    <div className="empty-state">
                      <p>No videos uploaded yet. Upload one to get started!</p>
                    </div>
                  ) : (
                    <div className="videos-list">
                      {videos.map(video => (
                        <div key={video.id} className="video-item">
                          <div className="video-thumb">
                            <FiPlay size={32} />
                          </div>
                          <div className="video-info">
                            <h4>{video.name}</h4>
                            <p>Uploaded: {new Date(video.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="video-actions">
                            <button className="btn-small" onClick={() => navigate(`/preview/${video.id}`)}>
                              <FiPlay size={16} />
                              Play
                            </button>
                            <button className="btn-small" onClick={() => navigate(`/editor?videoId=${video.id}`)}>
                              <FiSettings size={16} />
                            </button>
                            <button
                              className="btn-small-danger"
                              onClick={() => handleDeleteVideo(video.id)}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <section className="tab-section">
                  <h2>Recent Activity</h2>
                  <div className="activity-timeline">
                    <div className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <p>Account created</p>
                        <time>{new Date().toLocaleDateString()}</time>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
