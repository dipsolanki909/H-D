let videos = [];

const uploadVideo = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'title is required' });
  }

  const video = {
    id: videos.length + 1,
    title,
    description: description || '',
    createdAt: new Date().toISOString()
  };

  videos.push(video);
  return res.status(201).json({ success: true, message: 'Video uploaded', data: video });
};

const getVideos = (_req, res) => {
  return res.status(200).json({ success: true, data: videos });
};

const getVideoById = (req, res) => {
  const id = Number(req.params.id);
  const video = videos.find((item) => item.id === id);
  if (!video) {
    return res.status(404).json({ success: false, message: 'Video not found' });
  }
  return res.status(200).json({ success: true, data: video });
};

const deleteVideo = (req, res) => {
  const id = Number(req.params.id);
  const index = videos.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Video not found' });
  }
  videos.splice(index, 1);
  return res.status(200).json({ success: true, message: 'Video deleted successfully' });
};

const updateVideo = (req, res) => {
  const id = Number(req.params.id);
  const video = videos.find((item) => item.id === id);
  if (!video) {
    return res.status(404).json({ success: false, message: 'Video not found' });
  }

  video.title = req.body.title || video.title;
  video.description = req.body.description || video.description;
  return res.status(200).json({ success: true, message: 'Video updated successfully', data: video });
};

const getVideoMetadata = (req, res) => {
  const id = Number(req.params.id);
  const video = videos.find((item) => item.id === id);
  if (!video) {
    return res.status(404).json({ success: false, message: 'Video not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id,
      duration: '00:02:30',
      format: 'mp4',
      resolution: '1920x1080'
    }
  });
};

module.exports = {
  uploadVideo,
  getVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
  getVideoMetadata
};
