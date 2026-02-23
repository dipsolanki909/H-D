import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/appStore';
import { isValidVideoFile, formatFileSize } from '../utils/validators';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiVideo, FiGrid } from 'react-icons/fi';
import './Upload.css';

const CATEGORIES = [
  { id: 'youtube', label: 'YouTube', icon: '📺' },
  { id: 'instagram', label: 'Instagram Reels', icon: '📱' },
  { id: 'wedding', label: 'Wedding', icon: '💒' },
  { id: 'birthday', label: 'Birthday', icon: '🎂' },
  { id: 'business', label: 'Business Promo', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
];

export const VideoUpload = () => {
  const navigate = useNavigate();
  const store = useAppStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError('');

    if (!file) return;

    const validation = isValidVideoFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect({ target: { files } });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) {
      setError('Please select a video and category');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Simulate upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      store.uploadVideo(selectedFile);
      store.setCategory(selectedCategory);
      setSuccess('Video uploaded successfully!');

      setTimeout(() => {
        navigate('/templates');
      }, 1500);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <header className="upload-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Upload & Create</h1>
      </header>

      <div className="upload-content">
        {/* Step 1: Select Video */}
        <div className="upload-section">
          <h2><FiVideo /> Step 1: Select Your Video</h2>

          <div
            className="upload-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
          >
            {!selectedFile ? (
              <>
                <FiUploadCloud size={64} className="upload-icon" />
                <p>Drag & drop your video here or click to browse</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="file-input"
                  id="file-input"
                />
                <label htmlFor="file-input" className="btn-primary">
                  Choose File
                </label>
              </>
            ) : (
              <div className="file-selected">
                <FiCheckCircle size={48} className="success-icon" />
                <p>{selectedFile.name}</p>
                <small>{formatFileSize(selectedFile.size)}</small>
                <label htmlFor="file-input" className="btn-secondary">
                  Change File
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="file-input"
                  id="file-input"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              <FiAlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="success-message">
              <FiCheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}
        </div>

        {/* Step 2: Select Category */}
        {selectedFile && (
          <div className="upload-section">
            <h2><FiGrid /> Step 2: Select Category</h2>
            <div className="categories-grid">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p>{uploadProgress}% Uploaded</p>
          </div>
        )}

        {/* Actions */}
        {selectedFile && (
          <div className="upload-actions">
            <button
              className="btn-primary-large"
              onClick={handleUpload}
              disabled={!selectedCategory || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Continue to Templates'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
