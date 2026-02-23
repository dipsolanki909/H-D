import React, { useState } from 'react';
import './UploadNewVideo.css';

const UploadNewVideo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = [...e.dataTransfer.files];
    // Handle file upload logic here
    console.log('Dropped files:', files);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  const handleFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    // Handle file upload logic here
    console.log('Selected files:', files);
  };

  return (
    <div className="upload-new-video-container">
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileClick}
      >
        <div className="upload-area-content">
          <p>Drag & drop your video here</p>
          <p>or</p>
          <button className="upload-button">Click to upload</button>
          <p className="supported-formats">Supported formats: MP4, MOV, AVI</p>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
      {uploadProgress > 0 && (
        <div className="progress-indicator">
          <div
            className="progress-bar"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UploadNewVideo;