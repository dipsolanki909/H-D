const express = require('express');
const controller = require('../controllers/aiController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI-powered tools
 */

/**
 * @swagger
 * /ai/tools:
 *   get:
 *     summary: Get a list of available AI tools
 *     tags: [AI]
 *     responses:
 *       200:
 *         description: A list of AI tools
 */
router.get('/tools', controller.getTools);

/**
 * @swagger
 * /ai/tools/{toolId}/run:
 *   post:
 *     summary: Run an AI tool
 *     tags: [AI]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               parameters:
 *                 type: object
 *     responses:
 *       200:
 *         description: AI tool executed successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/tools/:toolId/run',
    body('prompt').notEmpty(),
    validate,
    controller.runTool
);

/**
 * @swagger
 * /ai/credits:
 *   get:
 *     summary: Get the user's remaining AI credits
 *     tags: [AI]
 *     responses:
 *       200:
 *         description: AI credit balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 credits:
 *                   type: number
 */
router.get('/credits', controller.getCredits);

module.exports = router;
