const express = require('express');
const controller = require('../controllers/editorController');

const router = express.Router();

/**
 * @swagger
 * /editor/trim:
 *   post:
 *     summary: Trim video
 *     tags: [Editor]
 */
router.post('/trim', controller.trimVideo);

/**
 * @swagger
 * /editor/merge:
 *   post:
 *     summary: Merge videos
 *     tags: [Editor]
 */
router.post('/merge', controller.mergeVideos);

/**
 * @swagger
 * /editor/filter:
 *   post:
 *     summary: Apply filter
 *     tags: [Editor]
 */
router.post('/filter', controller.applyFilter);

/**
 * @swagger
 * /editor/text:
 *   post:
 *     summary: Add text overlay
 *     tags: [Editor]
 */
router.post('/text', controller.addText);

/**
 * @swagger
 * /editor/music:
 *   post:
 *     summary: Add background music
 *     tags: [Editor]
 */
router.post('/music', controller.addMusic);

module.exports = router;
