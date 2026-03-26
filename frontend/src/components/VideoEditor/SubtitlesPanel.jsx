import React from 'react';

export default function SubtitlesPanel({ subtitles, onSubtitleChange, onSrtUpload, hasVideo }) {
  return (
    <aside className="dhe-video-editor__panel dhe-video-editor__panel--right">
      <h3>Subtitles</h3>

      <label className="dhe-video-editor__file-label">
        <span>Upload SRT</span>
        <input
          type="file"
          accept=".srt,text/plain"
          disabled={!hasVideo}
          onChange={(event) => onSrtUpload(event.target.files?.[0])}
        />
      </label>

      <div className="dhe-video-editor__subtitle-list">
        {subtitles.length === 0 ? <p>No subtitle lines yet.</p> : null}

        {subtitles.map((entry) => (
          <label className="dhe-video-editor__subtitle-item" key={entry.id}>
            <span>
              {entry.start.toFixed(1)}s - {entry.end.toFixed(1)}s
            </span>
            <textarea
              value={entry.text}
              onChange={(event) => onSubtitleChange(entry.id, event.target.value)}
            />
          </label>
        ))}
      </div>
    </aside>
  );
}
