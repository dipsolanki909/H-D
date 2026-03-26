import React, { useRef } from 'react';

const getPositionClass = (position) => {
  if (position === 'top') return 'dhe-video-editor__subtitle--top';
  if (position === 'middle') return 'dhe-video-editor__subtitle--middle';
  return 'dhe-video-editor__subtitle--bottom';
};

export default function VideoPreview({
  videoUrl,
  subtitle,
  subtitleStyle,
  currentTime,
  onTimeUpdate,
  onDurationReady,
}) {
  const videoRef = useRef(null);

  const onSeekInput = (nextTime) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = nextTime;
    onTimeUpdate(nextTime);
  };

  return (
    <div className="dhe-video-editor__preview-wrap">
      <div className="dhe-video-editor__preview">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            onLoadedMetadata={(event) => onDurationReady(event.currentTarget.duration)}
            onTimeUpdate={(event) => onTimeUpdate(event.currentTarget.currentTime)}
          />
        ) : (
          <div className="dhe-video-editor__preview-placeholder">Upload a video to preview here.</div>
        )}

        {subtitle ? (
          <div
            className={`dhe-video-editor__subtitle ${getPositionClass(subtitleStyle.position)}`}
            style={{ color: subtitleStyle.color, fontSize: `${subtitleStyle.fontSize}px` }}
          >
            {subtitle.text}
          </div>
        ) : null}
      </div>

      <input
        className="dhe-video-editor__seek-input"
        type="range"
        min="0"
        max="100"
        value={videoRef.current?.duration ? (currentTime / videoRef.current.duration) * 100 : 0}
        onChange={(event) => {
          const rawValue = Number(event.target.value);
          const duration = videoRef.current?.duration || 0;
          onSeekInput((rawValue / 100) * duration);
        }}
      />
    </div>
  );
}
