import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/appStore';
import { FiPlay, FiPause, FiArrowLeft, FiArrowRight, FiDownload } from 'react-icons/fi';
import '../components/Preview/Preview.css';

export const VideoPreview = () => {
  const navigate = useNavigate();
  const store = useAppStore();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [satisfaction, setSatisfaction] = useState(null);

  useEffect(() => {
    if (videoRef.current && store.uploadedFile) {
      const url = URL.createObjectURL(store.uploadedFile);
      videoRef.current.src = url;
    }
  }, [store.uploadedFile]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
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

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleSatisfied = () => {
    setSatisfaction('satisfied');
    setTimeout(() => {
      // Determine if user needs payment
      if (store.isPremium || store.selectedResolution === '720p') {
        navigate('/export');
      } else {
        navigate('/payment');
      }
    }, 500);
  };

  const handleNotSatisfied = () => {
    setSatisfaction('not-satisfied');
    setTimeout(() => {
      navigate('/editor');
    }, 500);
  };

  return (
    <div className="preview-container">
      <header className="preview-header">
        <h1>Preview Your Video</h1>
        <p>Are you satisfied with your video?</p>
      </header>

      <div className="preview-content">
        {/* Video Player */}
        <div className="preview-player">
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="preview-video"
          />

          {/* Player Controls */}
          <div className="preview-controls">
            <button onClick={handlePlayPause} className="btn-control-large">
              {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} />}
            </button>

            {/* Timeline */}
            <div className="preview-timeline">
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
                className="timeline"
              />
              <div className="time-info">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction Feedback */}
        <div className="satisfaction-section">
          <h3>How satisfied are you?</h3>
          <div className="satisfaction-options">
            <button
              className={`satisfaction-btn not-satisfied ${satisfaction === 'not-satisfied' ? 'selected' : ''}`}
              onClick={handleNotSatisfied}
            >
              <FiArrowLeft size={24} />
              <span>Not Satisfied</span>
              <small>Go back to edit</small>
            </button>

            <button
              className={`satisfaction-btn satisfied ${satisfaction === 'satisfied' ? 'selected' : ''}`}
              onClick={handleSatisfied}
            >
              <FiArrowRight size={24} />
              <span>Satisfied</span>
              <small>Continue to export</small>
            </button>
          </div>
        </div>

        {/* Video Details */}
        <div className="video-details">
          <div className="detail-card">
            <h4>Video Stats</h4>
            <ul>
              <li><strong>Duration:</strong> {formatTime(duration)}</li>
              <li><strong>Category:</strong> {store.selectedCategory}</li>
              <li><strong>Template:</strong> {store.selectedTemplate?.name || 'None'}</li>
              <li><strong>Status:</strong> Ready for export</li>
            </ul>
          </div>

          <div className="detail-card">
            <h4>Export Options</h4>
            <p>After confirming, you can choose:</p>
            <ul>
              <li>✓ Resolution: 720p (free) / 1080p (paid)</li>
              <li>✓ Format: MP4 / WebM</li>
              <li>✓ Watermark: {store.isPremium ? 'Removed' : 'Included'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="preview-actions">
        <button className="btn-secondary-large" onClick={() => navigate('/editor')}>
          <FiArrowLeft size={20} />
          Back to Edit
        </button>
        <button
          className="btn-primary-large"
          onClick={handleSatisfied}
          disabled={satisfaction === 'not-satisfied'}
        >
          <FiDownload size={20} />
          Continue to Export
        </button>
      </div>
    </div>
  );
};
