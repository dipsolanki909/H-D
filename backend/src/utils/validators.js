// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password.length >= 8;
};

// Video file validation
export const isValidVideoFile = (file) => {
  const maxSize = 500 * 1024 * 1024; // 500MB
  const validFormats = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 500MB limit' };
  }

  if (!validFormats.includes(file.type)) {
    return { valid: false, error: 'Invalid video format. Supported: MP4, MOV, AVI, WebM' };
  }

  return { valid: true };
};

// Video metadata
export const getVideoMetadata = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      resolve({
        name: file.name,
        size: file.size,
        duration: video.duration,
        format: file.type,
        uploadedAt: new Date(),
      });
    };
    video.src = URL.createObjectURL(file);
  });
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Format duration
export const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
};

// Validate form data
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const validateRegisterForm = (email, password, confirmPassword, fullName) => {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Payment validation
export const validatePaymentForm = (formData) => {
  const errors = {};

  if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
    errors.cardNumber = 'Invalid card number';
  }

  if (!formData.cvv || formData.cvv.length < 3) {
    errors.cvv = 'Invalid CVV';
  }

  if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
    errors.expiryDate = 'Invalid expiry date (MM/YY)';
  }

  return errors;
};
