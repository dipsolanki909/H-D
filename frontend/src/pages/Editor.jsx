import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/appStore';
import {
  FiPlay,
  FiPause,
  FiScissors,
  FiType,
  FiMusic,
  FiSliders,
  FiArrowDown,
} from 'react-icons/fi';
import '../components/VideoEditor/Editor.css';

export const VideoEditor = () => {
  const navigate = useNavigate();
  const store = useAppStore();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState('trim');

  useEffect(() => {
    if (videoRef.current && store.uploadedFile) {
      const file = store.uploadedFile;
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      
      return () => {
        if (videoRef.current && videoRef.current.src) {
          videoRef.current.pause();
          URL.revokeObjectURL(videoRef.current.src);
        }
      };
    }
  }, [store.uploadedFile]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log('Video play was interrupted:', error);
              setIsPlaying(false);
            });
        }
        return;
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTrimStart = () => {
    store.updateEditorSettings({
      trim: { ...store.editorSettings.trim, start: currentTime },
    });
  };

  const handleTrimEnd = () => {
    store.updateEditorSettings({
      trim: { ...store.editorSettings.trim, end: currentTime },
    });
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      store.uploadVideo(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  return (
    <div className="editor-container">
      <header className="editor-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Video Editor</h1>
        <button className="btn-primary" onClick={() => navigate('/preview')}>
          Preview
        </button>
      </header>

      <div className="editor-layout">
        {/* Video Preview */}
        <div className="editor-preview">
          {!store.uploadedFile ? (
            <div className="upload-area">
              <div className="upload-content">
                <h2>Upload Your Video</h2>
                <p>Select a video file to start editing</p>
                <label className="upload-label">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                  />
                  <span className="upload-btn">Choose Video</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="video-player">
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="video-element"
              />
              <div className="player-controls">
                <button onClick={handlePlayPause} className="btn-control">
                  {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                </button>
                <div className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Timeline Scrubber */}
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = e.target.value;
                  }
                }}
                className="timeline-scrubber"
              />
            </div>
          )}
        </div>

        {/* Editor Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-tabs">
            <button
              className={`tab-btn ${activeTab === 'trim' ? 'active' : ''}`}
              onClick={() => setActiveTab('trim')}
            >
              <FiScissors size={18} /> Trim
            </button>
            <button
              className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
            >
              <FiType size={18} /> Text
            </button>
            <button
              className={`tab-btn ${activeTab === 'music' ? 'active' : ''}`}
              onClick={() => setActiveTab('music')}
            >
              <FiMusic size={18} /> Music
            </button>
            <button
              className={`tab-btn ${activeTab === 'filters' ? 'active' : ''}`}
              onClick={() => setActiveTab('filters')}
            >
              <FiSliders size={18} /> Filters
            </button>
          </div>

          {/* Tab Content */}
          <div className="toolbar-content">
            {activeTab === 'trim' && (
              <div className="tab-panel">
                <h3>Trim Video</h3>
                <p>Set start and end points for your video</p>
                <div className="trim-controls">
                  <button
                    className="btn-secondary"
                    onClick={handleTrimStart}
                  >
                    Set Start ({formatTime(store.editorSettings.trim.start)})
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={handleTrimEnd}
                  >
                    Set End ({formatTime(store.editorSettings.trim.end || duration)})
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="tab-panel">
                <h3>Add Text</h3>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="text-input"
                />
                <div className="text-controls">
                  <input type="color" defaultValue="#ffffff" />
                  <select>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                  <button className="btn-secondary">Add Text</button>
                </div>
              </div>
            )}

            {activeTab === 'music' && (
              <div className="tab-panel">
                <h3>Add Music</h3>
                <p>Upload background music for your video</p>
                <input type="file" accept="audio/*" className="file-input" />
                <button className="btn-secondary">Add Music</button>
              </div>
            )}

            {activeTab === 'filters' && (
              <div className="tab-panel">
                <h3>Apply Filters</h3>
                <div className="filters-grid">
                  {['Brightness', 'Contrast', 'Saturation', 'Blur'].map(filter => (
                    <button key={filter} className="filter-btn">
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="editor-actions">
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          ← Previous
        </button>
        <button className="btn-primary-large" onClick={() => navigate('/preview')}>
          Preview & Continue <FiArrowDown />
        </button>
      </div>
    </div>
  );
};
