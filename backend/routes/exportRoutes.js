const express = require('express');
const controller = require('../controllers/exportController');

const router = express.Router();

/**
 * @swagger
 * /export:
 *   post:
 *     summary: Export video
 *     tags: [Export]
 */
router.post('/', controller.exportVideo);

/**
 * @swagger
 * /export/download/{videoId}:
 *   get:
 *     summary: Download video
 *     tags: [Export]
 */
router.get('/download/:videoId', controller.downloadVideo);

/**
 * @swagger
 * /export/{jobId}:
 *   get:
 *     summary: Get export status
 *     tags: [Export]
 */
router.get('/:jobId', controller.getExportStatus);

module.exports = router;
