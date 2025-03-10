const express = require('express');
const messageController = require('../controllers/messageController');

// Use express router
const router = express.Router();

// Register /message GET, responsability defined in getQueueMessages controller function
router.get('/messages', messageController.getQueueMessages);

// Register /send-message POST, responsability defined in sendMessage controller function
router.post('/send-message', messageController.sendMessage);

// Register /history GET, responsability defined in getMessages controller function
router.get('/history', messageController.getMessages);

// Export router
module.exports = router;
