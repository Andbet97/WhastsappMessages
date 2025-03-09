const express = require('express');
const messageController = require('../controllers/messageController');

// Use express router
const router = express.Router();

// Register /message GET, responsability defined in getMessages controller function
router.get('/messages', messageController.getMessages);

// Register /send-message POST, responsability defined in sendMessage controller function
router.post('/send-message', messageController.sendMessage);

// Export router
module.exports = router;
