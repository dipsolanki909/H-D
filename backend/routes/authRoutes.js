const express = require('express');
const { body, oneOf } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validationMiddleware');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Register CRUD API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create new register
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dipali
 *               email:
 *                 type: string
 *                 example: dipali@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               gender:
 *                 type: string
 *                 example: female
 *               emailOtp:
 *                 type: string
 *                 example: 1234
 *               address:
 *                 type: string
 *                 example: Surat
 *               pincode:
 *                 type: string
 *                 example: 395006
 *     responses:
 *       201:
 *         description: Register created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Register not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/register',
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('phone')
    .optional()
    .isLength({ min: 10 }).withMessage('Phone must be at least 10 digits'),

  validate,
  authController.createRegister
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user using email or username and password
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: dipali@gmail.com
 *               username:
 *                 type: string
 *                 example: Dipali
 *               password:
 *                 type: string
 *                 example: 123456
 *             oneOf:
 *               - required: [email, password]
 *               - required: [username, password]
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post(
  "/login",
  oneOf([
    body('email').isEmail().withMessage('A valid email is required'),
    body('username').notEmpty().withMessage('Username is required')
  ]),
  body('password')
    .notEmpty().withMessage('Password is required'),

  validate,
  authController.loginUser
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Generate new access token using refresh token
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your_refresh_token_here
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 *       500:
 *         description: Internal server error
 */
router.post(
  "/refresh-token",

  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required'),

  validate,
  authController.refreshToken
);

module.exports = router;