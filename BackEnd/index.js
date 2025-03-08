const express = require('express');
const logger = require('morgan');
const whatsappSenderRoutes = require('./views/messageSenderRoutes.js');

const app = express();

const port = 3000;
app.use(logger('dev'));

app.use('/', whatsappSenderRoutes);

app.listen(port, () => {
    console.log('Server is runing!')
});
