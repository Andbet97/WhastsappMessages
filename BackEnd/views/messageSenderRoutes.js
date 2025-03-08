const express = require('express');

const router = express.Router();

router.get('/messages', ( res, req ) => {
    req.json(
        {
            msg: 'Mensajes encolados'
        }
    );
});

router.post('/send-message', ( res, req ) => {
    req.json(
        {
            msg: 'Enviar mensaje'
        }
    );
});

module.exports = router;
