const express = require('express');
const controller = require('../controllers/templateController');

const router = express.Router();

/**
 * @swagger
 * /templates:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 */
router.get('/', controller.getTemplates);

/**
 * @swagger
 * /templates/premium:
 *   get:
 *     summary: Get premium templates
 *     tags: [Templates]
 */
router.get('/premium', controller.getPremiumTemplates);

/**
 * @swagger
 * /templates/{id}:
 *   get:
 *     summary: Get template by ID
 *     tags: [Templates]
 */
router.get('/:id', controller.getTemplateById);

/**
 * @swagger
 * /templates/apply:
 *   post:
 *     summary: Apply template to video
 *     tags: [Templates]
 */
router.post('/apply', controller.applyTemplate);
router.post('/:id/favorite', controller.favoriteTemplate);
router.delete('/:id/favorite', controller.unfavoriteTemplate);

module.exports = router;
