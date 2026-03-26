import React from 'react';

export default function Sidebar({
  onVideoUpload,
  onAutoSubtitles,
  onExport,
  onStyleChange,
  subtitleStyle,
  isUploading,
  isGenerating,
  isExporting,
  hasVideo,
  hasSubtitles,
  status,
}) {
  return (
    <aside className="dhe-video-editor__panel dhe-video-editor__panel--left">
      <h3>Actions</h3>

      <label className="dhe-video-editor__file-label">
        <span>{isUploading ? 'Uploading...' : 'Upload Video'}</span>
        <input
          type="file"
          accept="video/*"
          disabled={isUploading}
          onChange={(event) => onVideoUpload(event.target.files?.[0])}
        />
      </label>

      <button
        type="button"
        className="dhe-video-editor__button"
        disabled={!hasVideo || isGenerating}
        onClick={onAutoSubtitles}
      >
        {isGenerating ? 'Generating...' : 'Auto Subtitles (Whisper)'}
      </button>

      <div className="dhe-video-editor__style-box">
        <h4>Subtitle Style</h4>

        <label>
          Color
          <input
            type="color"
            value={subtitleStyle.color}
            onChange={(event) => onStyleChange((prev) => ({ ...prev, color: event.target.value }))}
          />
        </label>

        <label>
          Size
          <input
            type="number"
            min="14"
            max="72"
            value={subtitleStyle.fontSize}
            onChange={(event) => onStyleChange((prev) => ({ ...prev, fontSize: Number(event.target.value) }))}
          />
        </label>

        <label>
          Position
          <select
            value={subtitleStyle.position}
            onChange={(event) => onStyleChange((prev) => ({ ...prev, position: event.target.value }))}
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        className="dhe-video-editor__button dhe-video-editor__button--primary"
        disabled={!hasVideo || isExporting}
        onClick={onExport}
      >
        {isExporting ? 'Exporting...' : 'Export Video'}
      </button>

      <div className="dhe-video-editor__status">
        <strong>Status</strong>
        <p>{status}</p>
        <p>Subtitles: {hasSubtitles ? 'Ready' : 'Not available'}</p>
      </div>
    </aside>
  );
}
