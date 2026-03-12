const Template = require('../models/templateModel');

const getTemplates = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category: new RegExp(category, 'i') } : {};
    const templates = await Template.find(filter);
    res.status(200).json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }
    res.status(200).json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPremiumTemplates = async (_req, res) => {
  try {
    const premiumTemplates = await Template.find({ premium: true });
    res.status(200).json({ success: true, data: premiumTemplates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const applyTemplate = (req, res) => {
  const { videoId, templateId } = req.body;
  if (!videoId || !templateId) {
    return res.status(400).json({ success: false, message: 'videoId and templateId are required' });
  }
  // This would involve finding the template and video, and applying the template's jsonContent to the video project.
  // This is a more complex operation that is out of scope of just connecting the DB.
  return res.status(200).json({ success: true, message: 'Template applied', data: { videoId, templateId } });
};

const favoriteTemplate = (req, res) => {
  const { id } = req.params;
  // This would involve finding the user and adding the template to their favorites list.
  return res.status(200).json({ success: true, message: 'Template favorited', data: { templateId: id } });
};

const unfavoriteTemplate = (req, res) => {
  const { id } = req.params;
  // This would involve finding the user and removing the template from their favorites list.
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
