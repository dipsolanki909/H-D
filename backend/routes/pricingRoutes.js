const express = require('express');
const controller = require('../controllers/pricingController');

const router = express.Router();

/**
 * @swagger
 * /pricing/plans:
 *   get:
 *     summary: Get pricing plans
 *     tags: [Pricing]
 */
router.get('/plans', controller.getPlans);

module.exports = router;
