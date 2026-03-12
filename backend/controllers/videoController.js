const Video = require('../models/videoModel');

const uploadVideo = async (req, res) => {
  try {
    const { title, description, s3Key } = req.body;
    // Assuming user is available in req.user from an auth middleware
    const user = req.user.id; 
    const newVideo = await Video.create({ title, description, s3Key, user });
    res.status(201).json({ success: true, message: 'Video uploaded', data: newVideo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    // Assuming user is available in req.user from an auth middleware
    const videos = await Video.find({ user: req.user.id });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    // Optional: Check if the video belongs to the user
    // if (video.user.toString() !== req.user.id) {
    //   return res.status(403).json({ success: false, message: 'User not authorized' });
    // }
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!updatedVideo) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.status(200).json({ success: true, message: 'Video updated successfully', data: updatedVideo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVideoMetadata = (req, res) => {
  // This seems to be mock data, leaving as is.
  // In a real scenario, you might get this from the video file itself.
  const id = req.params.id;
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
