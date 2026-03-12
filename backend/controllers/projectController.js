const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({ name, description, user: req.user.id });
    res.status(201).json({ success: true, message: 'Project created', data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user.id }).populate('videos');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, description },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project updated', data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const assignVideoToProject = async (req, res) => {
  try {
    const { videoId } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $addToSet: { videos: videoId } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Video assigned to project', data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  assignVideoToProject
};
