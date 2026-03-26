const express = require('express');
const controller = require('../controllers/paymentController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

router.get('/config', controller.getPublicConfig);

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment and subscription management
 */

/**
 * @swagger
 * /payment/create:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment intent created
 *       400:
 *         description: Bad request
 */
router.post(
    '/create-order',
    body('amount').isNumeric().withMessage('amount must be numeric'),
    validate,
    controller.createOrder
);

router.post(
    '/verify-payment',
    body('razorpay_order_id').notEmpty().withMessage('razorpay_order_id is required'),
    body('razorpay_payment_id').notEmpty().withMessage('razorpay_payment_id is required'),
    body('razorpay_signature').notEmpty().withMessage('razorpay_signature is required'),
    validate,
    controller.verifyPayment
);

router.post(
    '/create',
    body('amount').isNumeric(),
    body('plan').notEmpty().withMessage('plan is required'),
    validate,
    controller.createPayment
);

/**
 * @swagger
 * /payment/verify:
 *   post:
 *     summary: Verify a payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *             properties:
 *               paymentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 *       400:
 *         description: Bad request
 */
router.post(
    '/verify',
    body('razorpay_order_id').notEmpty().withMessage('razorpay_order_id is required'),
    body('razorpay_payment_id').notEmpty().withMessage('razorpay_payment_id is required'),
    body('razorpay_signature').notEmpty().withMessage('razorpay_signature is required'),
    validate,
    controller.verifyPayment
);

/**
 * @swagger
 * /payment/subscriptions:
 *   get:
 *     summary: Get user's subscriptions
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: A list of subscriptions
 */
router.get('/subscriptions', controller.getSubscriptions);

/**
 * @swagger
 * /payment/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               planId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscription updated
 *       404:
 *         description: Subscription not found
 */
router.put('/subscriptions/:id', controller.updateSubscription);

/**
 * @swagger
 * /payment/subscriptions/{id}:
 *   delete:
 *     summary: Cancel a subscription
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription canceled
 *       404:
 *         description: Subscription not found
 */
router.delete('/subscriptions/:id', controller.cancelSubscription);

/**
 * @swagger
 * /payment/invoices:
 *   get:
 *     summary: Get user's invoices
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: A list of invoices
 */
router.get('/invoices', controller.getInvoices);

module.exports = router;
