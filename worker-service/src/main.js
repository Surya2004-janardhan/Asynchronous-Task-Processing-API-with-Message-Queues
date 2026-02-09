/**
 * main.js - Worker Service Entry Point
 * 
 * This file will:
 * 1. Initialize the worker process.
 * 2. Connect to the MySQL database and RabbitMQ.
 * 3. Start the RabbitMQ consumer to listen for messages on 'task_queue'.
 * 4. Handle process termination signals (SIGINT, SIGTERM) for graceful shutdown.
 */
// main entry for worker 

require('dotenv').config();
const { connect } = require('./rabbitmq/consumer');

// start worker
connect();

