import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiScissors, FiPlusSquare, FiMusic, FiFilter, FiRepeat, FiPlay, FiChevronRight } from 'react-icons/fi';
import './Editing.css';

export function Editing() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('None Selected');
  const [activeTool, setActiveTool] = useState(null);
  const [exportQuality, setExportQuality] = useState('1080p');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoFile(file);
  };

  const handleUpload = () => {
    if (!videoFile) return;
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        const next = p + Math.floor(Math.random() * 15) + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 500);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  const handleToolClick = (tool) => {
    setActiveTool(tool === activeTool ? null : tool);
  };

  const handleChangeTemplate = () => {
    navigate('/templates');
  };

  return (
    <div className="editing-page">
      <section className="editing-hero">
        <div className="hero-content">
          <h1>Edit Your Video Online</h1>
          <p className="subtitle">Upload, edit and export videos in minutes</p>
        </div>
      </section>

      <main className="editing-container">
        {/* Upload + Tools Column */}
        <div className="left-column">
          <div className="card upload-card">
            <h3>Video Upload</h3>
            <p>Select a video file (mp4, mov, webm)</p>
            <div className="upload-controls">
              <label className="file-input">
                <input type="file" accept="video/*" onChange={handleFileChange} />
                <span className="file-label">{videoFile ? videoFile.name : 'Choose a video file'}</span>
              </label>
              <button className="btn-primary upload-btn" onClick={handleUpload} disabled={!videoFile || uploading}>
                <FiUpload /> {uploading ? `Uploading ${uploadProgress}%` : 'Upload'}
              </button>
            </div>
            {uploading && (
              <div className="progress-bar">
                <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
          </div>

          <div className="card tools-card">
            <h3>Editing Tools</h3>
            <div className="tools-grid">
              <button className={`tool ${activeTool === 'trim' ? 'active' : ''}`} onClick={() => handleToolClick('trim')}>
                <FiScissors />
                <span>Trim Video</span>
              </button>

              <button className={`tool ${activeTool === 'merge' ? 'active' : ''}`} onClick={() => handleToolClick('merge')}>
                <FiRepeat />
                <span>Merge Clips</span>
              </button>

              <button className={`tool ${activeTool === 'text' ? 'active' : ''}`} onClick={() => handleToolClick('text')}>
                <FiPlusSquare />
                <span>Add Text</span>
              </button>

              <button className={`tool ${activeTool === 'music' ? 'active' : ''}`} onClick={() => handleToolClick('music')}>
                <FiMusic />
                <span>Add Music</span>
              </button>

              <button className={`tool ${activeTool === 'filters' ? 'active' : ''}`} onClick={() => handleToolClick('filters')}>
                <FiFilter />
                <span>Filters</span>
              </button>

              <button className={`tool ${activeTool === 'transitions' ? 'active' : ''}`} onClick={() => handleToolClick('transitions')}>
                <FiRepeat />
                <span>Transitions</span>
              </button>
            </div>

            {activeTool && (
              <div className="tool-panel">
                <h4>{activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Tool</h4>
                <p className="muted">(This is a UI-only demo of the selected tool.)</p>
                <div className="placeholder-area">
                  <FiPlay className="placeholder-icon" />
                  <p>Tool controls would appear here in the real editor.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Templates + Export */}
        <div className="right-column">
          <div className="card template-card">
            <h3>Templates</h3>
            <p>Selected template:</p>
            <div className="selected-template">
              <span className="template-name">{selectedTemplate}</span>
              <button className="btn-secondary small" onClick={() => setSelectedTemplate('None Selected')}>
                Clear
              </button>
            </div>
            <button className="btn-primary change-template" onClick={handleChangeTemplate}>
              Change Template <FiChevronRight />
            </button>
          </div>

          <div className="card export-card">
            <h3>Export</h3>
            <p>Choose export quality</p>
            <div className="export-options">
              <label className={`quality ${exportQuality === '720p' ? 'selected' : ''}`} onClick={() => setExportQuality('720p')}>
                <input type="radio" name="quality" checked={exportQuality === '720p'} readOnly />
                <span>720p</span>
              </label>
              <label className={`quality ${exportQuality === '1080p' ? 'selected' : ''}`} onClick={() => setExportQuality('1080p')}>
                <input type="radio" name="quality" checked={exportQuality === '1080p'} readOnly />
                <span>1080p</span>
              </label>
            </div>

            <button className="btn-primary export-btn" disabled={!videoFile}>
              Export Video ({exportQuality})
            </button>
            <p className="muted small">Note: Export button is UI-only in this demo.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
