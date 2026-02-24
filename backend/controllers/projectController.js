let projects = [];

const createProject = (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'name is required' });
  }

  const project = {
    id: projects.length + 1,
    name,
    description: description || '',
    videoIds: []
  };

  projects.push(project);
  return res.status(201).json({ success: true, message: 'Project created', data: project });
};

const getProjects = (_req, res) => {
  return res.status(200).json({ success: true, data: projects });
};

const getProjectById = (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((item) => item.id === id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  return res.status(200).json({ success: true, data: project });
};

const updateProject = (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((item) => item.id === id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  return res.status(200).json({ success: true, message: 'Project updated', data: project });
};

const deleteProject = (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  projects.splice(index, 1);
  return res.status(200).json({ success: true, message: 'Project deleted' });
};

const assignVideoToProject = (req, res) => {
  const id = Number(req.params.id);
  const { videoId } = req.body;

  const project = projects.find((item) => item.id === id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  if (!videoId) {
    return res.status(400).json({ success: false, message: 'videoId is required' });
  }

  if (!project.videoIds.includes(videoId)) {
    project.videoIds.push(videoId);
  }

  return res.status(200).json({ success: true, message: 'Video assigned to project', data: project });
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  assignVideoToProject
};
