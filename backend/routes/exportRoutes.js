const express = require('express');
const controller = require('../controllers/exportController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Export
 *   description: Video export and download
 */

/**
 * @swagger
 * /export:
 *   post:
 *     summary: Start a video export job
 *     tags: [Export]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - format
 *             properties:
 *               videoId:
 *                 type: string
 *               format:
 *                 type: string
 *                 enum: [mp4, mov, avi]
 *               resolution:
 *                 type: string
 *                 enum: ['720p', '1080p', '4K']
 *     responses:
 *       202:
 *         description: Export job started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobId:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post(
    '/',
    body('videoId').notEmpty(),
    body('format').notEmpty(),
    validate,
    controller.exportVideo
);

/**
 * @swagger
 * /export/download/{videoId}:
 *   get:
 *     summary: Download an exported video
 *     tags: [Export]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video file
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Video not found or not ready for download
 */
router.get('/download/:videoId', controller.downloadVideo);

/**
 * @swagger
 * /export/{jobId}:
 *   get:
 *     summary: Get the status of an export job
 *     tags: [Export]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Export job status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobId:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [pending, processing, completed, failed]
 *                 progress:
 *                   type: number
 *                 downloadUrl:
 *                   type: string
 *       404:
 *         description: Job not found
 */
router.get('/:jobId', controller.getExportStatus);

module.exports = router;
