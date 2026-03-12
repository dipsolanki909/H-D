const express = require('express');
const controller = require('../controllers/adminController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only operations
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', controller.getUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user by ID (admin)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/users/:id', controller.getUserById);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   put:
 *     summary: Update user role (admin)
 *     tags: [Admin]
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
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User role updated
 *       404:
 *         description: User not found
 */
router.put(
    '/users/:id/role',
    body('role').notEmpty(),
    validate,
    controller.updateUserRole
);

/**
 * @swagger
 * /admin/users/{id}/status:
 *   patch:
 *     summary: Update user status (admin)
 *     tags: [Admin]
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: User status updated
 *       404:
 *         description: User not found
 */
router.patch(
    '/users/:id/status',
    body('status').notEmpty(),
    validate,
    controller.updateUserStatus
);


/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete user (admin)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', controller.deleteUser);

/**
 * @swagger
 * /admin/storage:
 *   get:
 *     summary: Get storage stats (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Storage statistics
 */
router.get('/storage', controller.getStorageStats);

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: Get activity logs (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of activity logs
 */
router.get('/logs', controller.getLogs);

/**
 * @swagger
 * /admin/system-stats:
 *   get:
 *     summary: Get system stats (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: System statistics
 */
router.get('/system-stats', controller.getSystemStats);

/**
 * @swagger
 * /admin/templates:
 *   post:
 *     summary: Create a new template (admin)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Template'
 *     responses:
 *       201:
 *         description: Template created
 */
router.post('/templates', controller.createTemplate);

/**
 * @swagger
 * /admin/templates/{id}:
 *   put:
 *     summary: Update a template (admin)
 *     tags: [Admin]
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
 *             $ref: '#/components/schemas/Template'
 *     responses:
 *       200:
 *         description: Template updated
 *       404:
 *         description: Template not found
 */
router.put('/templates/:id', controller.updateTemplate);

/**
 * @swagger
 * /admin/templates/{id}:
 *   delete:
 *     summary: Delete a template (admin)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template deleted
 *       404:
 *         description: Template not found
 */
router.delete('/templates/:id', controller.deleteTemplate);

/**
 * @swagger
 * /admin/transactions:
 *   get:
 *     summary: Get all transactions (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of transactions
 */
router.get('/transactions', controller.getTransactions);

/**
 * @swagger
 * /admin/settings:
 *   put:
 *     summary: Update system settings (admin)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Settings updated
 */
router.put('/settings', controller.updateSettings);

module.exports = router;
