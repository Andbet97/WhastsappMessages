// Imports
const express = require('express');
const logger = require('morgan');
const messageRoutes = require('./views/messageRoutes.js');
const cors = require("cors");

// Create express app
const app = express();
// Define port to serve application
const port = process.env.PORT ?? 8000;
// Enable CORS to allow requests from front
app.use(cors({ origin: `http://${process.env.FRONT_URL ?? 'localhost:3000'}` }));
// Use morgan to show HTTP trafic in terminal consol
app.use(logger('dev'));

// Middleware to manage JSON
app.use(express.json());

// Register routs
app.use('/', messageRoutes);

// Run server application
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
