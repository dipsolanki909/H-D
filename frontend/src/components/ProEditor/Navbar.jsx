import React from 'react';
import { FiDownload } from 'react-icons/fi';

export const Navbar = ({
  exportResolution,
  onResolutionChange,
  isExporting,
  exportProgress,
  exportSuccess,
  onExport,
}) => {
  return (
    <header className="pro-editor-navbar glass-card export-enabled">
      <div className="pro-editor-project-block">
        <div className="pro-editor-project">
          <span className="project-dot" />
          <h1>Project: Summer Campaign Reel</h1>
        </div>

        {isExporting && (
          <div className="export-progress-wrap" aria-live="polite">
            <div className="export-progress-track">
              <div className="export-progress-bar" style={{ width: `${exportProgress}%` }} />
            </div>
            <span>{exportProgress}%</span>
          </div>
        )}

        {!!exportSuccess && <p className="export-success-msg">{exportSuccess}</p>}
      </div>

      <div className="pro-export-controls">
        <label htmlFor="export-resolution">Resolution</label>
        <select
          id="export-resolution"
          value={exportResolution}
          onChange={(event) => onResolutionChange(event.target.value)}
          disabled={isExporting}
        >
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
        </select>

        <span className="format-chip">MP4</span>

        <button type="button" className="pro-editor-export-btn" onClick={onExport} disabled={isExporting}>
          <FiDownload />
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>
    </header>
  );
};
