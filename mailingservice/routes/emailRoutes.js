const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.post('/', emailController.createScheduledEmail);
router.get('/', emailController.getScheduledEmails);
router.put('/:id', emailController.updateScheduledEmail);
router.delete('/:id', emailController.deleteScheduledEmail);

module.exports = router;