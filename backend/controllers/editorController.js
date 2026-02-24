const trimVideo = (req, res) => {
  const { videoId, start, end } = req.body;
  if (!videoId || start === undefined || end === undefined) {
    return res.status(400).json({ success: false, message: 'videoId, start, end are required' });
  }
  return res.status(200).json({ success: true, message: 'Trim job created', data: { videoId, start, end } });
};

const mergeVideos = (req, res) => {
  const { videoIds } = req.body;
  if (!Array.isArray(videoIds) || videoIds.length < 2) {
    return res.status(400).json({ success: false, message: 'At least 2 videoIds are required' });
  }
  return res.status(200).json({ success: true, message: 'Merge job created', data: { videoIds } });
};

const applyFilter = (req, res) => {
  const { videoId, filterType } = req.body;
  if (!videoId || !filterType) {
    return res.status(400).json({ success: false, message: 'videoId and filterType are required' });
  }
  return res.status(200).json({ success: true, message: 'Filter applied', data: { videoId, filterType } });
};

const addText = (req, res) => {
  const { videoId, text } = req.body;
  if (!videoId || !text) {
    return res.status(400).json({ success: false, message: 'videoId and text are required' });
  }
  return res.status(200).json({ success: true, message: 'Text overlay applied', data: { videoId, text } });
};

const addMusic = (req, res) => {
  const { videoId, audioId } = req.body;
  if (!videoId || !audioId) {
    return res.status(400).json({ success: false, message: 'videoId and audioId are required' });
  }
  return res.status(200).json({ success: true, message: 'Background music added', data: { videoId, audioId } });
};

module.exports = {
  trimVideo,
  mergeVideos,
  applyFilter,
  addText,
  addMusic
};
