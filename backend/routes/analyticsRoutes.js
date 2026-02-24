const express = require('express');
const controller = require('../controllers/analyticsController');

const router = express.Router();

/**
 * @swagger
 * /analytics/overview:
 *   get:
 *     summary: Get analytics overview
 *     tags: [Analytics]
 */
router.get('/overview', controller.getOverview);

/**
 * @swagger
 * /analytics/usage-history:
 *   get:
 *     summary: Get usage history
 *     tags: [Analytics]
 */
router.get('/usage-history', controller.getUsageHistory);

module.exports = router;
