import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (email, password, name, role = 'user') =>
    apiClient.post('/auth/register', { email, password, name, role }),

  login: (loginIdentifier, password) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);
    const payload = { password };
    if (isEmail) {
      payload.email = loginIdentifier;
    } else {
      payload.username = loginIdentifier;
    }
    return apiClient.post('/auth/login', payload);
  },

  logout: () => localStorage.removeItem('token'),

  refreshToken: () => apiClient.post('/auth/refresh'),
};

// Video APIs
export const videoAPI = {
  upload: (formData) =>
    apiClient.post('/videos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getVideos: () => apiClient.get('/videos'),

  getVideoById: (id) => apiClient.get(`/videos/${id}`),

  deleteVideo: (id) => apiClient.delete(`/videos/${id}`),

  updateVideo: (id, data) => apiClient.put(`/videos/${id}`, data),

  getMetadata: (id) => apiClient.get(`/videos/${id}/metadata`),
};

// Project APIs
export const projectAPI = {
  create: (name, description) =>
    apiClient.post('/projects', { name, description }),

  getProjects: () => apiClient.get('/projects'),

  getProjectById: (id) => apiClient.get(`/projects/${id}`),

  updateProject: (id, data) => apiClient.put(`/projects/${id}`, data),

  deleteProject: (id) => apiClient.delete(`/projects/${id}`),

  assignVideo: (projectId, videoId) =>
    apiClient.post(`/projects/${projectId}/assign-video`, { videoId }),
};

// Editing APIs
export const editorAPI = {
  trim: (videoId, start, end) =>
    apiClient.post('/editor/trim', { videoId, start, end }),

  merge: (videoIds) =>
    apiClient.post('/editor/merge', { videoIds }),

  applyFilter: (videoId, filterType) =>
    apiClient.post('/editor/filter', { videoId, filterType }),

  addText: (videoId, textData) =>
    apiClient.post('/editor/text', { videoId, ...textData }),

  addMusic: (videoId, audioId) =>
    apiClient.post('/editor/music', { videoId, audioId }),
};

// Template APIs
export const templateAPI = {
  getTemplates: (category = null) =>
    apiClient.get(`/templates${category ? `?category=${category}` : ''}`),

  getTemplateById: (id) => apiClient.get(`/templates/${id}`),

  getPremiumTemplates: () => apiClient.get('/templates/premium'),

  applyTemplate: (videoId, templateId) =>
    apiClient.post('/templates/apply', { videoId, templateId }),
};

// Export/Render APIs
export const exportAPI = {
  export: (videoId, quality, format) =>
    apiClient.post('/export', { videoId, quality, format }),

  getExportStatus: (jobId) => apiClient.get(`/export/${jobId}`),

  downloadVideo: (videoId) =>
    apiClient.get(`/export/download/${videoId}`, { responseType: 'blob' }),
};

// Payment APIs
export const paymentAPI = {
  createPayment: (amount, plan) =>
    apiClient.post('/payment/create', { amount, plan }),

  verifyPayment: (paymentId, signature) =>
    apiClient.post('/payment/verify', { paymentId, signature }),

  getSubscriptions: () => apiClient.get('/payment/subscriptions'),

  updateSubscription: (subscriptionId, plan) =>
    apiClient.put(`/payment/subscriptions/${subscriptionId}`, { plan }),

  cancelSubscription: (subscriptionId) =>
    apiClient.delete(`/payment/subscriptions/${subscriptionId}`),
};

// Admin APIs
export const adminAPI = {
  getUsers: () => apiClient.get('/admin/users'),

  getUserById: (id) => apiClient.get(`/admin/users/${id}`),

  updateUserRole: (id, role) =>
    apiClient.put(`/admin/users/${id}/role`, { role }),

  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),

  getStorageStats: () => apiClient.get('/admin/storage'),

  getActivityLogs: () => apiClient.get('/admin/logs'),

  getSystemStats: () => apiClient.get('/admin/system-stats'),
};

export default apiClient;

