const templates = [
  { id: 1, name: 'YouTube Intro', category: 'youtube', premium: false },
  { id: 2, name: 'Instagram Reel', category: 'instagram', premium: true }
];

const getTemplates = (req, res) => {
  const { category } = req.query;
  const filtered = category
    ? templates.filter((item) => item.category.toLowerCase() === String(category).toLowerCase())
    : templates;

  return res.status(200).json({ success: true, data: filtered });
};

const getTemplateById = (req, res) => {
  const id = Number(req.params.id);
  const template = templates.find((item) => item.id === id);
  if (!template) {
    return res.status(404).json({ success: false, message: 'Template not found' });
  }
  return res.status(200).json({ success: true, data: template });
};

const getPremiumTemplates = (_req, res) => {
  const premium = templates.filter((item) => item.premium);
  return res.status(200).json({ success: true, data: premium });
};

const applyTemplate = (req, res) => {
  const { videoId, templateId } = req.body;
  if (!videoId || !templateId) {
    return res.status(400).json({ success: false, message: 'videoId and templateId are required' });
  }
  return res.status(200).json({ success: true, message: 'Template applied', data: { videoId, templateId } });
};

const favoriteTemplate = (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ success: true, message: 'Template favorited', data: { templateId: id } });
};

const unfavoriteTemplate = (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ success: true, message: 'Template removed from favorites', data: { templateId: id } });
};

module.exports = {
  getTemplates,
  getTemplateById,
  getPremiumTemplates,
  applyTemplate,
  favoriteTemplate,
  unfavoriteTemplate
};
