const express = require('express');
const controller = require('../controllers/projectController');

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 */
router.post('/', controller.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 */
router.get('/', controller.getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 */
router.get('/:id', controller.getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 */
router.put('/:id', controller.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 */
router.delete('/:id', controller.deleteProject);

/**
 * @swagger
 * /projects/{id}/assign-video:
 *   post:
 *     summary: Assign video to project
 *     tags: [Projects]
 */
router.post('/:id/assign-video', controller.assignVideoToProject);

module.exports = router;
