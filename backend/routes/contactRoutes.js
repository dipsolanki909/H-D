const express = require('express');
const controller = require('../controllers/contactController');

const router = express.Router();

/**
 * @swagger
 * /contact/inquiries:
 *   post:
 *     summary: Submit contact inquiry
 *     tags: [Contact]
 */
router.post('/inquiries', controller.submitInquiry);

module.exports = router;
