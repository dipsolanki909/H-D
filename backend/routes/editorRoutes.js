const express = require('express');
const controller = require('../controllers/editorController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Editor
 *   description: Video editing operations
 */

/**
 * @swagger
 * /editor/trim:
 *   post:
 *     summary: Trim a video
 *     tags: [Editor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - startTime
 *               - endTime
 *             properties:
 *               videoId:
 *                 type: string
 *               startTime:
 *                 type: number
 *               endTime:
 *                 type: number
 *     responses:
 *       200:
 *         description: Video trimmed successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/trim',
    body('videoId').notEmpty(),
    body('startTime').isNumeric(),
    body('endTime').isNumeric(),
    validate,
    controller.trimVideo
);

/**
 * @swagger
 * /editor/merge:
 *   post:
 *     summary: Merge multiple videos
 *     tags: [Editor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoIds
 *             properties:
 *               videoIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Videos merged successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/merge',
    body('videoIds').isArray({ min: 2 }),
    validate,
    controller.mergeVideos
);

/**
 * @swagger
 * /editor/filter:
 *   post:
 *     summary: Apply a filter to a video
 *     tags: [Editor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - filterType
 *             properties:
 *               videoId:
 *                 type: string
 *               filterType:
 *                 type: string
 *                 enum: [grayscale, sepia, blur]
 *     responses:
 *       200:
 *         description: Filter applied successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/filter',
    body('videoId').notEmpty(),
    body('filterType').notEmpty(),
    validate,
    controller.applyFilter
);

/**
 * @swagger
 * /editor/text:
 *   post:
 *     summary: Add a text overlay to a video
 *     tags: [Editor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - text
 *               - position
 *             properties:
 *               videoId:
 *                 type: string
 *               text:
 *                 type: string
 *               position:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *     responses:
 *       200:
 *         description: Text added successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/text',
    body('videoId').notEmpty(),
    body('text').notEmpty(),
    validate,
    controller.addText
);

/**
 * @swagger
 * /editor/music:
 *   post:
 *     summary: Add background music to a video
 *     tags: [Editor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - musicUrl
 *             properties:
 *               videoId:
 *                 type: string
 *               musicUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Music added successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/music',
    body('videoId').notEmpty(),
    body('musicUrl').isURL(),
    validate,
    controller.addMusic
);

module.exports = router;
