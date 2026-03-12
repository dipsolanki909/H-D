const express = require('express');
const controller = require('../controllers/pricingController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Pricing plans
 */

/**
 * @swagger
 * /pricing/plans:
 *   get:
 *     summary: Get all pricing plans
 *     tags: [Pricing]
 *     responses:
 *       200:
 *         description: A list of pricing plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/plans', controller.getPlans);

module.exports = router;
