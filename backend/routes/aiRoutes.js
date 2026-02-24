const express = require('express');
const controller = require('../controllers/aiController');

const router = express.Router();

/**
 * @swagger
 * /ai/tools:
 *   get:
 *     summary: Get AI tools
 *     tags: [AI]
 */
router.get('/tools', controller.getTools);

/**
 * @swagger
 * /ai/tools/{toolId}/run:
 *   post:
 *     summary: Run AI tool
 *     tags: [AI]
 */
router.post('/tools/:toolId/run', controller.runTool);

/**
 * @swagger
 * /ai/credits:
 *   get:
 *     summary: Get AI credits
 *     tags: [AI]
 */
router.get('/credits', controller.getCredits);

module.exports = router;
