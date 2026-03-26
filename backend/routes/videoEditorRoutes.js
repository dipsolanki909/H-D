const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller = require('../controllers/videoEditorController');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'tmp', 'video-editor', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const stamp = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname || '.mp4');
    cb(null, `${stamp}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('video/')) {
      cb(new Error('Only video files are allowed.'));
      return;
    }
    cb(null, true);
  },
});

router.post('/upload', upload.single('video'), controller.uploadVideo);
router.post('/subtitles', controller.generateSubtitles);
router.post('/export', controller.exportVideo);

module.exports = router;
