const express = require('express');
const controller = require('../controllers/paymentController');

const router = express.Router();

/**
 * @swagger
 * /payment/create:
 *   post:
 *     summary: Create payment
 *     tags: [Payment]
 */
router.post('/create', controller.createPayment);

/**
 * @swagger
 * /payment/verify:
 *   post:
 *     summary: Verify payment
 *     tags: [Payment]
 */
router.post('/verify', controller.verifyPayment);

/**
 * @swagger
 * /payment/subscriptions:
 *   get:
 *     summary: Get subscriptions
 *     tags: [Payment]
 */
router.get('/subscriptions', controller.getSubscriptions);

/**
 * @swagger
 * /payment/subscriptions/{id}:
 *   put:
 *     summary: Update subscription
 *     tags: [Payment]
 */
router.put('/subscriptions/:id', controller.updateSubscription);

/**
 * @swagger
 * /payment/subscriptions/{id}:
 *   delete:
 *     summary: Cancel subscription
 *     tags: [Payment]
 */
router.delete('/subscriptions/:id', controller.cancelSubscription);
router.get('/invoices', controller.getInvoices);

module.exports = router;
