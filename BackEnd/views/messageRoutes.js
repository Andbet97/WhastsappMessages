const express = require('express');
const messageController = require("../controllers/messageController");

// Use express router
const router = express.Router();

// Register /message route, only response pre-load message
router.get('/messages', ( res, req ) => {
    req.json(
        {
            msg: 'Mensajes encolados'
        }
    );
});

// Register /send-message POST, responsability defined in sendMessage controller function
router.post('/send-messages', messageController.sendMessage);

// Export router
module.exports = router;
