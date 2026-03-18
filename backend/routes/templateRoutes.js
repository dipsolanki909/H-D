const express = require('express');
const controller = require('../controllers/templateController');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Template management
 */

/**
 * @swagger
 * /templates:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter templates by category
 *     responses:
 *       200:
 *         description: A list of templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
router.get('/', controller.getTemplates);

/**
 * @swagger
 * /templates/premium:
 *   get:
 *     summary: Get premium templates
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: A list of premium templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
router.get('/premium', controller.getPremiumTemplates);

/**
 * @swagger
 * /templates/{id}:
 *   get:
 *     summary: Get template by ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the template to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template not found
 */
router.get('/:id', controller.getTemplateById);

/**
 * @swagger
 * /templates/apply:
 *   post:
 *     summary: Apply template to video
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - templateId
 *             properties:
 *               videoId:
 *                 type: string
 *               templateId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Template applied
 *       400:
 *         description: Bad request
 */
router.post('/apply', controller.applyTemplate);

/**
 * @swagger
 * /templates/{id}/favorite:
 *   post:
 *     summary: Favorite a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the template to favorite
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template favorited
 */
router.post('/:id/favorite', controller.favoriteTemplate);

/**
 * @swagger
 * /templates/{id}/favorite:
 *   delete:
 *     summary: Unfavorite a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the template to unfavorite
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template unfavorited
 */
router.delete('/:id/favorite', controller.unfavoriteTemplate);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the template
 *         name:
 *           type: string
 *           description: The name of the template
 *         category:
 *           type: string
 *           description: The category of the template
 *         premium:
 *           type: boolean
 *           description: Whether the template is premium
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the template
 *         jsonContent:
 *           type: string
 *           description: The JSON content of the template
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the template was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the template was last updated
 */
