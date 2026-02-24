import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/appStore';
import { useAuth } from '../context/AuthContext';
import { FiDownload, FiCheckCircle } from 'react-icons/fi';
import '../components/Export/Export.css';

const RESOLUTION_OPTIONS = [
  { id: 'sd', label: '480p (SD)', price: 0, free: true, quality: 'Low' },
  { id: 'hd', label: '720p (HD)', price: 0, free: true, quality: 'Medium' },
  { id: 'fhd', label: '1080p (Full HD)', price: 99, quality: 'High', premium: true },
  { id: '4k', label: '4K', price: 199, quality: 'Ultra', premium: true },
];

const FORMAT_OPTIONS = [
  { id: 'mp4', label: 'MP4', type: 'video/mp4' },
  { id: 'webm', label: 'WebM', type: 'video/webm' },
  { id: 'mov', label: 'MOV', type: 'video/quicktime' },
];

export const Export = () => {
  const navigate = useNavigate();
  const store = useAppStore();
  const { user } = useAuth();
  const [selectedResolution, setSelectedResolution] = useState('hd');
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const selectedRes = RESOLUTION_OPTIONS.find(r => r.id === selectedResolution);

  const canDownload = (resolution) => {
    if (resolution.free) return true;
    if (user?.isPremium) return true;
    if (store.isPremium) return true;
    return false;
  };

  const handleExport = async () => {
    // Check if user has permission
    if (!canDownload(selectedRes) && !store.isPremium) {
      navigate('/payment', { state: { returnTo: '/export' } });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate rendering/export process
      const interval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 30;
        });
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setExportProgress(100);
        setIsExporting(false);
        setExportComplete(true);
        setDownloadUrl(`/exports/video_${Date.now()}.${selectedFormat}`);
      }, 3000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `video_${Date.now()}.${selectedFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareToSocial = (platform) => {
    const platforms = {
      youtube: 'https://youtube.com/@dhcreatives?si=i2lvia1b8K0CE4N4',
      instagram: 'https://www.instagram.com/d_and_h_creatives?igsh=MXMwZDE2NmRsbmQ3cA==',
      facebook: 'mailto:d.and.hcreatives101@gmail.com',
      twitter: 'https://x.com/dhcreatives101?s=11',
    };
    const url = platforms[platform];
    if (!url) return;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className="export-container">
      <header className="export-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Export & Download</h1>
        <p>Choose quality and format for your video</p>
      </header>

      <div className="export-content">
        {!exportComplete ? (
          <>
            {/* Resolution Selection */}
            <section className="export-section">
              <h2>Video Resolution</h2>
              <div className="resolution-grid">
                {RESOLUTION_OPTIONS.map(res => (
                  <button
                    key={res.id}
                    className={`resolution-card ${selectedResolution === res.id ? 'selected' : ''} ${!canDownload(res) ? 'locked' : ''}`}
                    onClick={() => canDownload(res) && setSelectedResolution(res.id)}
                    disabled={!canDownload(res)}
                  >
                    <h4>{res.label}</h4>
                    <p className="quality">{res.quality} Quality</p>
                    {res.free ? (
                      <span className="free-badge">FREE</span>
                    ) : (
                      <span className="premium-price">₹{res.price}</span>
                    )}
                    {!canDownload(res) && <span className="lock-badge">🔒</span>}
                  </button>
                ))}
              </div>
              {!canDownload(selectedRes) && !store.isPremium && (
                <p className="upgrade-hint">
                  💡 Upgrade to premium for HD/4K export
                </p>
              )}
            </section>

            {/* Format Selection */}
            <section className="export-section">
              <h2>Video Format</h2>
              <div className="format-grid">
                {FORMAT_OPTIONS.map(fmt => (
                  <button
                    key={fmt.id}
                    className={`format-card ${selectedFormat === fmt.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFormat(fmt.id)}
                  >
                    <span className="format-icon">📹</span>
                    <h4>{fmt.label}</h4>
                  </button>
                ))}
              </div>
            </section>

            {/* Export Details */}
            <section className="export-section">
              <h2>Export Details</h2>
              <div className="details-box">
                <div className="detail-row">
                  <span>Resolution:</span>
                  <strong>{selectedRes?.label}</strong>
                </div>
                <div className="detail-row">
                  <span>Format:</span>
                  <strong>{selectedFormat.toUpperCase()}</strong>
                </div>
                <div className="detail-row">
                  <span>Watermark:</span>
                  <strong>{store.isPremium || user?.isPremium ? 'Removed' : 'Included'}</strong>
                </div>
                <div className="detail-row">
                  <span>Estimated Size:</span>
                  <strong>~{selectedRes?.id === '4k' ? '2GB' : selectedRes?.id === 'fhd' ? '800MB' : '400MB'}</strong>
                </div>
              </div>
            </section>

            {/* Export Button */}
            <button
              className="btn-primary-large"
              onClick={handleExport}
              disabled={isExporting}
            >
              <FiDownload size={20} />
              {isExporting ? 'Exporting...' : 'Start Export'}
            </button>

            {/* Progress Bar */}
            {isExporting && (
              <div className="export-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${exportProgress}%` }}></div>
                </div>
                <p>{Math.round(exportProgress)}% Complete</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Export Complete Screen */}
            <div className="export-complete">
              <FiCheckCircle size={80} className="success-icon" />
              <h2>✅ Video Exported Successfully!</h2>
              <p>Your video is ready to download and share</p>

              <div className="completion-actions">
                <button className="btn-primary-large" onClick={handleDownload}>
                  <FiDownload size={20} />
                  Download Video
                </button>

                <div className="social-share">
                  <p>Or share directly to:</p>
                  <div className="social-buttons">
                    <button
                      className="social-btn"
                      onClick={() => handleShareToSocial('youtube')}
                    >
                      📺 YouTube
                    </button>
                    <button
                      className="social-btn"
                      onClick={() => handleShareToSocial('instagram')}
                    >
                      📱 Instagram
                    </button>
                    <button
                      className="social-btn"
                      onClick={() => handleShareToSocial('facebook')}
                    >
                      👥 Facebook
                    </button>
                    <button
                      className="social-btn"
                      onClick={() => handleShareToSocial('twitter')}
                    >
                      𝕏 Twitter
                    </button>
                  </div>
                </div>
              </div>

              <div className="completion-footer">
                <button className="btn-secondary-large" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </button>
                <button className="btn-secondary-large" onClick={() => navigate('/upload')}>
                  Create Another Video
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
