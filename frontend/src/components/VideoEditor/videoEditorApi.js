import apiClient from '../../api/client';

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('video', file);

  const response = await apiClient.post('/api/video/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.data || {};
};

export const requestSubtitles = async (payload) => {
  const response = await apiClient.post('/api/video/subtitles', payload);
  return response.data?.data || {};
};

export const exportVideo = async (payload) => {
  const response = await apiClient.post('/api/video/export', payload, {
    responseType: 'blob',
  });
  return response.data;
};
