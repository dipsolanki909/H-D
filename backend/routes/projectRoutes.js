const express = require('express');
const controller = require('../controllers/projectController');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');


const router = express.Router();

router.use((req, _res, next) => {
    console.log(`[PROJECT][ROUTE] ${req.method} ${req.originalUrl}`);
    next();
});


/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Bad request
 */
router.post(
    '/',
    body('name').notEmpty().withMessage('Name is required'),
    validate,
    controller.createProject
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects for the current user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 */
router.get('/', controller.getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project found
 *       404:
 *         description: Project not found
 */
router.get('/:id', controller.getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated
 *       404:
 *         description: Project not found
 */
router.put(
    '/:id',
    body('name').notEmpty().withMessage('Name is required'),
    validate,
    controller.updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
router.delete('/:id', controller.deleteProject);

/**
 * @swagger
 * /projects/{id}/assign-video:
 *   post:
 *     summary: Assign video to project
 *     tags: [Projects]
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
 *             required:
 *               - videoId
 *             properties:
 *               videoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video assigned to project
 *       404:
 *         description: Project or video not found
 */
router.post(
    '/:id/assign-video',
    body('videoId').notEmpty().withMessage('videoId is required'),
    validate,
    controller.assignVideoToProject
);

module.exports = router;
