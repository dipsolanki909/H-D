import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiActivity, FiBell, FiFolderPlus, FiImage, FiPieChart, FiZap, FiX } from 'react-icons/fi';
import StatsCards from './StatsCards';
import ProjectsSection from './ProjectsSection';
import RecentActivityPanel from './RecentActivityPanel';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: 'p1', name: 'YouTube Intro Promo', lastEdited: '22 Feb 2026', thumbnail: '/images/DH/bg2.jpg', status: 'Draft', duration: '01:45', resolution: '1080p' },
    { id: 'p2', name: 'Wedding Highlights Reel', lastEdited: '20 Feb 2026', thumbnail: '/images/DH/bg2.jpg', status: 'Completed', duration: '03:12', resolution: '4K' },
    { id: 'p3', name: 'Instagram Product Ad', lastEdited: '18 Feb 2026', thumbnail: '/images/DH/bg2.jpg', status: 'Rendering', duration: '00:58', resolution: '1080x1920' },
  ]);

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState('');

  const now = new Date();
  const currentHour = now.getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const currentUserName = 'User';

  const stats = useMemo(() => ([
    { key: 'projects', label: 'Total Projects', value: String(projects.length), trend: '↑ 12% this month', subtext: 'Active workspace projects' },
    { key: 'videos', label: 'Total Videos Created', value: '128', trend: '↑ 8% this month', subtext: 'Published + drafts' },
    { key: 'storage', label: 'Storage Used', value: '38 GB', trend: '62% used', subtext: 'of 100 GB plan storage', progress: 62 },
    { key: 'credits', label: 'AI Credits Remaining', value: '2,340', trend: '↑ 15% saved', subtext: 'Resets on 1st of month' },
    { key: 'plan', label: 'Current Plan', value: 'Pro', trend: 'Active now', subtext: '4K exports + AI pack' },
  ]), [projects.length]);

  const activities = [
    { id: 'a1', icon: <FiFolderPlus />, title: 'Created project “YouTube Intro Promo”', time: '2 hours ago' },
    { id: 'a2', icon: <FiZap />, title: 'AI Subtitle generated for Wedding Reel', time: '4 hours ago' },
    { id: 'a3', icon: <FiImage />, title: 'Uploaded 12 new media assets', time: 'Yesterday' },
    { id: 'a4', icon: <FiActivity />, title: 'Rendered Instagram Product Ad', time: 'Yesterday' },
  ];

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((item) => item.id !== projectId));
  };

  const handleEditProject = (projectId) => {
    navigate(`/editor/${projectId}`);
  };

  const handleExportProject = () => {
    navigate('/export');
  };

  const handleCreateProject = () => {
    setShowNewProjectModal(true);
  };

  const handleSaveNewProject = () => {
    if (newProjectName.trim()) {
      const newProject = {
        id: 'p' + Date.now(),
        name: newProjectName,
        lastEdited: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '),
        thumbnail: '/images/DH/bg2.jpg',
        status: 'Draft',
        duration: '00:00',
        resolution: '1080p'
      };
      setProjects((prev) => [newProject, ...prev]);
      setNewProjectName('');
      setNewProjectCategory('');
      setShowNewProjectModal(false);
      alert('✓ Project created successfully!');
    }
  };

  const handleAiEditing = () => {
    navigate('/customer/ai-tools');
  };

  const handleUploadMedia = () => {
    setShowUploadModal(true);
  };

  const handleMediaUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      alert(`✓ Uploaded ${files.length} file(s) successfully!`);
      setShowUploadModal(false);
    }
  };

  const handleViewAnalytics = () => {
    navigate('/customer/analytics');
  };

  return (
    <div className="customer-dashboard-modern">
      <header className="cd-top-navbar" aria-label="Dashboard top navbar">
        <div className="cd-top-brand">
          <h2>D & H Creatives</h2>
          <p>Customer Dashboard</p>
        </div>
        <div className="cd-top-actions">
          <button
            type="button"
            className="cd-top-icon-btn"
            aria-label="Notifications"
            onClick={() => window.alert('You have new dashboard notifications.')}
          >
            <FiBell />
          </button>
          <div className="cd-avatar">DH</div>
        </div>
      </header>

      <section className="customer-dashboard-header-top cd-welcome" aria-label="Welcome section">
        <div className="cd-welcome-copy">
          <h1>{greeting}, {currentUserName} 👋</h1>
          <p>Ready to create stunning content today? Jump into your workflow quickly.</p>
        </div>
        <div className="cd-quick-actions">
          <button type="button" className="cd-gradient-btn" onClick={handleCreateProject}>New Project</button>
          <button type="button" className="cd-gradient-btn" onClick={handleAiEditing}><FiZap /> Start AI Editing</button>
          <button type="button" className="cd-gradient-btn" onClick={handleUploadMedia}><FiImage /> Upload Media</button>
          <button type="button" className="cd-gradient-btn" onClick={handleViewAnalytics}><FiPieChart /> View Analytics</button>
        </div>
      </section>

      <StatsCards stats={stats} />

      <div className="cd-main-grid">
        <div className="cd-main-left">
          <ProjectsSection projects={projects} onEdit={handleEditProject} onExport={handleExportProject} onDelete={handleDeleteProject} />
        </div>

        <div className="cd-main-right">
          <RecentActivityPanel activities={activities} />
        </div>
      </div>

      {showNewProjectModal && (
        <div className="modal-backdrop" onClick={() => setShowNewProjectModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Create New Project</h3>
              <button 
                type="button" 
                onClick={() => setShowNewProjectModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: '20px' }}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveNewProject(); }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontWeight: 600, color: '#333' }}>Project Name *</span>
                <input 
                  type="text"
                  placeholder="e.g., My YouTube Video"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' }}
                  required
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontWeight: 600, color: '#333' }}>Category</span>
                <select 
                  value={newProjectCategory}
                  onChange={(e) => setNewProjectCategory(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' }}
                >
                  <option value="">Select a category</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  style={{ padding: '10px 16px', border: '1px solid #ccc', borderRadius: '8px', background: '#f5f5f5', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ padding: '10px 16px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Upload Media</h3>
              <button 
                type="button" 
                onClick={() => setShowUploadModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: '20px' }}
              >
                <FiX />
              </button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center', border: '2px dashed #667eea', borderRadius: '8px', marginBottom: '16px', background: 'rgba(102, 126, 234, 0.05)' }}>
              <FiImage style={{ fontSize: '40px', color: '#667eea', marginBottom: '12px' }} />
              <p style={{ margin: '8px 0', color: '#666' }}>Drag and drop your media files here</p>
              <p style={{ margin: '8px 0', color: '#999', fontSize: '12px' }}>or click to browse</p>
            </div>
            <label style={{ display: 'block' }}>
              <input 
                type="file"
                multiple
                onChange={handleMediaUpload}
                style={{ display: 'none' }}
                accept="video/*,image/*,audio/*"
              />
              <button 
                type="button"
                onClick={(e) => e.currentTarget.previousElementSibling.click()}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', background: '#f5f5f5', cursor: 'pointer', fontWeight: 600 }}
              >
                Browse Files
              </button>
            </label>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                type="button"
                onClick={() => setShowUploadModal(false)}
                style={{ padding: '10px 16px', border: '1px solid #ccc', borderRadius: '8px', background: '#f5f5f5', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
