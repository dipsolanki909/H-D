const express = require('express');
const controller = require('../controllers/videoController');

const router = express.Router();

/**
 * @swagger
 * /videos/upload:
 *   post:
 *     summary: Upload video file
 *     tags: [Videos]
 */
router.post('/upload', controller.uploadVideo);

/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Videos]
 */
router.get('/', controller.getVideos);

/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get video by ID
 *     tags: [Videos]
 */
router.get('/:id', controller.getVideoById);

/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete video
 *     tags: [Videos]
 */
router.delete('/:id', controller.deleteVideo);

/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update video
 *     tags: [Videos]
 */
router.put('/:id', controller.updateVideo);

/**
 * @swagger
 * /videos/{id}/metadata:
 *   get:
 *     summary: Get video metadata
 *     tags: [Videos]
 */
router.get('/:id/metadata', controller.getVideoMetadata);

module.exports = router;
