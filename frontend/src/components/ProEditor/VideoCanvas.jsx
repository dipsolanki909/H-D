import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiEdit3,
  FiMaximize2,
  FiPause,
  FiPlay,
  FiUpload,
  FiVolume2,
} from 'react-icons/fi';

export const VideoCanvas = ({ visualFx, initialVideoUrl = '', initialTextOverlays = [] }) => {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const [textOverlays, setTextOverlays] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [textDragState, setTextDragState] = useState(null);

  const videoUrl = useMemo(() => {
    if (!file) return '';
    return URL.createObjectURL(file);
  }, [file]);

  const hasVideo = Boolean(file || initialVideoUrl);
  const activeVideoUrl = file ? videoUrl : initialVideoUrl || '';

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const normalized = (Array.isArray(initialTextOverlays) ? initialTextOverlays : []).map((item, index) => ({
      id: item.id || `prefill-text-${index}`,
      text: item.text || `Text ${index + 1}`,
      x: Number(item.x ?? 60),
      y: Number(item.y ?? 46),
      fontSize: Number(item.fontSize ?? 32),
      fontFamily: item.fontFamily || 'Poppins',
      color: item.color || '#ffffff',
      animation: item.animation || 'fade',
      width: Number(item.width ?? 220),
      height: Number(item.height ?? 64),
    }));

    setTextOverlays(normalized);
    setSelectedTextId(normalized[0]?.id || null);
  }, [initialTextOverlays]);

  const handleFileSelect = (incomingFile) => {
    if (!incomingFile) return;
    if (!incomingFile.type.startsWith('video/')) return;
    setFile(incomingFile);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const onInputChange = (event) => {
    handleFileSelect(event.target.files?.[0]);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileSelect(event.dataTransfer.files?.[0]);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }
    videoRef.current.play();
    setIsPlaying(true);
  };

  const onSeek = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);
    if (videoRef.current) {
      videoRef.current.currentTime = nextTime;
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    const frame = videoRef.current.parentElement;
    if (!frame) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    frame.requestFullscreen();
  };

  const formatTime = (value) => {
    if (!value) return '00:00';
    const mins = Math.floor(value / 60);
    const secs = Math.floor(value % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const selectedText = textOverlays.find((item) => item.id === selectedTextId) || null;

  const getFilterStyle = () => {
    const activeFilter = visualFx?.filter || 'none';
    if (activeFilter === 'bw') return 'grayscale(1) contrast(1.08)';
    if (activeFilter === 'vintage') return 'sepia(0.55) saturate(0.9)';
    if (activeFilter === 'cinematic') return 'contrast(1.2) saturate(0.85) hue-rotate(-8deg)';
    return 'none';
  };

  const addTextOverlay = () => {
    const nextId = `txt-${Date.now()}`;
    const newOverlay = {
      id: nextId,
      text: 'New Text',
      x: 50,
      y: 45,
      fontSize: 32,
      fontFamily: 'Poppins',
      color: '#ffffff',
      animation: 'fade',
      width: 220,
      height: 64,
    };
    setTextOverlays((prev) => [...prev, newOverlay]);
    setSelectedTextId(nextId);
  };

  const updateSelectedText = (updates) => {
    if (!selectedTextId) return;
    setTextOverlays((prev) =>
      prev.map((item) => (item.id === selectedTextId ? { ...item, ...updates } : item))
    );
  };

  const onTextPointerDown = (event, id, mode) => {
    event.preventDefault();
    event.stopPropagation();
    const target = textOverlays.find((item) => item.id === id);
    if (!target || !frameRef.current) return;
    setSelectedTextId(id);
    setTextDragState({
      id,
      mode,
      startX: event.clientX,
      startY: event.clientY,
      originX: target.x,
      originY: target.y,
      originWidth: target.width,
      originHeight: target.height,
    });
  };

  useEffect(() => {
    if (!textDragState || !frameRef.current) return undefined;

    const onMove = (event) => {
      const frame = frameRef.current;
      if (!frame) return;
      const frameRect = frame.getBoundingClientRect();

      const dx = event.clientX - textDragState.startX;
      const dy = event.clientY - textDragState.startY;

      setTextOverlays((prev) =>
        prev.map((item) => {
          if (item.id !== textDragState.id) return item;

          if (textDragState.mode === 'resize') {
            const nextWidth = Math.max(120, textDragState.originWidth + dx);
            const nextHeight = Math.max(40, textDragState.originHeight + dy);
            return {
              ...item,
              width: nextWidth,
              height: nextHeight,
            };
          }

          const maxX = frameRect.width - item.width;
          const maxY = frameRect.height - item.height - 58;
          const nextX = Math.min(Math.max(0, textDragState.originX + dx), Math.max(0, maxX));
          const nextY = Math.min(Math.max(0, textDragState.originY + dy), Math.max(0, maxY));

          return {
            ...item,
            x: nextX,
            y: nextY,
          };
        })
      );
    };

    const onUp = () => setTextDragState(null);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [textDragState, textOverlays]);

  return (
    <section className="pro-editor-canvas glass-card" aria-label="Video preview">
      <div
        className={`canvas-inner ${isDragging ? 'dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <div className="canvas-video-frame" ref={frameRef}>
          {!hasVideo ? (
            <button
              type="button"
              className="canvas-placeholder"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="canvas-placeholder-icon">
                <FiUpload />
              </span>
              <strong>Drop video here or click to upload</strong>
              <p>MP4, MOV, WEBM supported</p>
            </button>
          ) : (
            <>
              <video
                ref={videoRef}
                className={`canvas-video-player effect-${visualFx?.effect || 'none'}`}
                style={{ filter: getFilterStyle() }}
                src={activeVideoUrl}
                onLoadedMetadata={(event) => {
                  setDuration(event.currentTarget.duration || 0);
                }}
                onTimeUpdate={(event) => {
                  setCurrentTime(event.currentTarget.currentTime || 0);
                }}
                onEnded={() => setIsPlaying(false)}
              />

              {textOverlays.map((item) => (
                <div
                  key={item.id}
                  className={`canvas-text-overlay ${selectedTextId === item.id ? 'selected' : ''} anim-${item.animation}`}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    minHeight: `${item.height}px`,
                    fontSize: `${item.fontSize}px`,
                    fontFamily: item.fontFamily,
                    color: item.color,
                  }}
                  onMouseDown={(event) => onTextPointerDown(event, item.id, 'move')}
                  onClick={() => setSelectedTextId(item.id)}
                >
                  {item.text}
                  <span
                    className="text-resize-handle"
                    onMouseDown={(event) => onTextPointerDown(event, item.id, 'resize')}
                  />
                </div>
              ))}

              {selectedText && (
                <div className="canvas-text-tools" aria-label="Text controls">
                  <input
                    type="text"
                    value={selectedText.text}
                    onChange={(event) => updateSelectedText({ text: event.target.value })}
                    aria-label="Text content"
                  />
                  <select
                    value={selectedText.fontFamily}
                    onChange={(event) => updateSelectedText({ fontFamily: event.target.value })}
                    aria-label="Font family"
                  >
                    <option value="Poppins">Poppins</option>
                    <option value="Inter">Inter</option>
                  </select>
                  <input
                    type="color"
                    value={selectedText.color}
                    onChange={(event) => updateSelectedText({ color: event.target.value })}
                    aria-label="Text color"
                  />
                  <select
                    value={selectedText.animation}
                    onChange={(event) => updateSelectedText({ animation: event.target.value })}
                    aria-label="Text animation"
                  >
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                  </select>
                </div>
              )}
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="canvas-hidden-input"
            onChange={onInputChange}
          />

          <div className="canvas-controls" aria-label="Video controls">
            <button
              type="button"
              className="canvas-control-btn text-add-btn"
              aria-label="Add text"
              onClick={addTextOverlay}
              disabled={!hasVideo}
            >
              <FiEdit3 />
            </button>

            <button
              type="button"
              className="canvas-control-btn"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={togglePlayPause}
              disabled={!hasVideo}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>

            <div className="canvas-seek-wrap">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.01"
                value={Math.min(currentTime, duration || 0)}
                onChange={onSeek}
                disabled={!hasVideo}
                aria-label="Timeline seek"
              />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>

            <div className="canvas-volume-wrap">
              <FiVolume2 />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                aria-label="Volume"
              />
            </div>

            <button
              type="button"
              className="canvas-control-btn"
              aria-label="Fullscreen"
              onClick={toggleFullscreen}
              disabled={!hasVideo}
            >
              <FiMaximize2 />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
