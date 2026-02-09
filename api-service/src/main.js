/**
 * main.js - API Service Entry Point
 * 
 * This file will:
 * 1. Initialize the Express.js application.
 * 2. Configure middleware (e.g., JSON parsing).
 * 3. Load environment variables from .env.
 * 4. Connect to the MySQL database and RabbitMQ.
 * 5. Register the task API routes.
 * 6. Start the server on the configured port.
 */
// entry points server

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use('/api/tasks', require('./api/tasks'));

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
