const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  try {
    console.log('[PROJECT][createProject] body:', req.body);

    const { name, description } = req.body;
    const userId = req.user?._id || req.user?.id;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const payload = {
      name,
      description,
    };

    if (userId) {
      payload.user = userId;
    }

    const project = await Project.create(payload);

    res.status(201).json({ success: true, message: 'Project created', data: project });
  } catch (error) {
    console.error('[PROJECT][createProject] Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    console.log('[PROJECT][getProjects] params:', req.params, 'query:', req.query);

    const userId = req.user?._id || req.user?.id;
    const query = userId ? { user: userId } : {};

    console.log('[PROJECT][getProjects] query:', query);

    const projects = await Project.find(query);
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error('[PROJECT][getProjects] Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const query = userId
      ? { _id: req.params.id, user: userId }
      : { _id: req.params.id };

    const project = await Project.findOne(query).populate('videos');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('[PROJECT][getProjectById] Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      console.error('[PROJECT][updateProject] Missing req.user. Params:', req.params);
      return res.status(401).json({ message: 'Unauthorized: user not found in request' });
    }

    const { name, description } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { name, description },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project updated', data: project });
  } catch (error) {
    console.error('[PROJECT][updateProject] Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      console.error('[PROJECT][deleteProject] Missing req.user. Params:', req.params);
      return res.status(401).json({ message: 'Unauthorized: user not found in request' });
    }

    const project = await Project.findOneAndDelete({ _id: req.params.id, user: userId });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('[PROJECT][deleteProject] Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const assignVideoToProject = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      console.error('[PROJECT][assignVideoToProject] Missing req.user. Params:', req.params);
      return res.status(401).json({ message: 'Unauthorized: user not found in request' });
    }

    const { videoId } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { $addToSet: { videos: videoId } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Video assigned to project', data: project });
  } catch (error) {
    console.error('[PROJECT][assignVideoToProject] Error:', error);
    res.status(500).json({ message: error.message });
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
