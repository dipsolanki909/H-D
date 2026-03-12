const express = require('express');
const controller = require('../controllers/analyticsController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Data analytics and reporting
 */

/**
 * @swagger
 * /analytics/overview:
 *   get:
 *     summary: Get an overview of analytics data
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics overview data
 */
router.get('/overview', controller.getOverview);

/**
 * @swagger
 * /analytics/usage-history:
 *   get:
 *     summary: Get the user's usage history
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: A list of usage history events
 */
router.get('/usage-history', controller.getUsageHistory);

module.exports = router;
