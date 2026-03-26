import React from 'react';

export default function Timeline({ currentTime, duration, trim, onSeek, onTrimChange, formatTime }) {
  const safeDuration = duration || 1;

  return (
    <section className="dhe-video-editor__timeline">
      <div className="dhe-video-editor__timeline-row">
        <label>Position</label>
        <input
          type="range"
          min="0"
          max={safeDuration}
          step="0.1"
          value={Math.min(currentTime, safeDuration)}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>

      <div className="dhe-video-editor__timeline-row">
        <label>Trim Start</label>
        <input
          type="range"
          min="0"
          max={Math.max(0, trim.end || safeDuration)}
          step="0.1"
          value={trim.start}
          onChange={(event) => onTrimChange((prev) => ({ ...prev, start: Number(event.target.value) }))}
        />
        <span>{formatTime(trim.start)}</span>
      </div>

      <div className="dhe-video-editor__timeline-row">
        <label>Trim End</label>
        <input
          type="range"
          min={trim.start}
          max={safeDuration}
          step="0.1"
          value={trim.end || safeDuration}
          onChange={(event) => onTrimChange((prev) => ({ ...prev, end: Number(event.target.value) }))}
        />
        <span>{formatTime(trim.end || safeDuration)}</span>
      </div>
    </section>
  );
}
