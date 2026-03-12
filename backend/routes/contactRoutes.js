const express = require('express');
const controller = require('../controllers/contactController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact inquiries
 */

/**
 * @swagger
 * /contact/inquiries:
 *   post:
 *     summary: Submit a contact inquiry
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inquiry submitted successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/inquiries',
    body('name').notEmpty(),
    body('email').isEmail(),
    body('message').notEmpty(),
    validate,
    controller.submitInquiry
);

module.exports = router;
