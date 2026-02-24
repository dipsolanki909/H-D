const express = require('express');
const controller = require('../controllers/adminController');

const router = express.Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 */
router.get('/users', controller.getUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 */
router.get('/users/:id', controller.getUserById);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
 */
router.put('/users/:id/role', controller.updateUserRole);
router.patch('/users/:id/status', controller.updateUserStatus);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Admin]
 */
router.delete('/users/:id', controller.deleteUser);

/**
 * @swagger
 * /admin/storage:
 *   get:
 *     summary: Get storage stats
 *     tags: [Admin]
 */
router.get('/storage', controller.getStorageStats);

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: Get activity logs
 *     tags: [Admin]
 */
router.get('/logs', controller.getLogs);

/**
 * @swagger
 * /admin/system-stats:
 *   get:
 *     summary: Get system stats
 *     tags: [Admin]
 */
router.get('/system-stats', controller.getSystemStats);

router.post('/templates', controller.createTemplate);
router.put('/templates/:id', controller.updateTemplate);
router.delete('/templates/:id', controller.deleteTemplate);

router.get('/transactions', controller.getTransactions);
router.put('/settings', controller.updateSettings);

module.exports = router;
