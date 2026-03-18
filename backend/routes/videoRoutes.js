const express = require('express');
const controller = require('../controllers/videoController');


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management
 */

/**
 * @swagger
 * /videos/upload:
 *   post:
 *     summary: Upload video file
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - s3Key
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               s3Key:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video uploaded
 *       400:
 *         description: Bad request
 */
router.post('/upload', controller.uploadVideo);

/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Get all videos for the current user
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: A list of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 */
router.get('/', controller.getVideos);

/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: Video not found
 */
router.get('/:id', controller.getVideoById);

/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video deleted
 *       404:
 *         description: Video not found
 */
router.delete('/:id', controller.deleteVideo);

/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: Video not found
 */
router.put('/:id', controller.updateVideo);

/**
 * @swagger
 * /videos/{id}/metadata:
 *   get:
 *     summary: Get video metadata
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video metadata
 */
router.get('/:id/metadata', controller.getVideoMetadata);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the video
 *         title:
 *           type: string
 *           description: The title of the video
 *         description:
 *           type: string
 *           description: The description of the video
 *         s3Key:
 *           type: string
 *           description: The key of the video file in S3
 *         user:
 *           type: string
 *           description: The ID of the user who uploaded the video
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the video was uploaded
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the video was last updated
 */
