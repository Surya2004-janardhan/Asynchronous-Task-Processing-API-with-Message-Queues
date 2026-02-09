/**
 * worker.js - Worker Business Logic
 * 
 * This file will:
 * 1. Implement the message callback function for RabbitMQ.
 * 2. Parse incoming task messages.
 * 3. Update task status in DB to 'PROCESSING'.
 * 4. Simulate task processing with a 5-10 second delay.
 * 5. Update task status in DB to 'COMPLETED' upon successful execution.
 * 6. Handle errors by sending negative acknowledgments (NACKs) or logging.
 */
