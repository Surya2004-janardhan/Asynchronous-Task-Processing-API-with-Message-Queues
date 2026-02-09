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
// main logic 

const taskModel = require('../models/task');

// process task message
async function processTask(message) {
    const task = JSON.parse(message.content.toString());
    try {
        // update status to PROCESSING
        await taskModel.update(task.id, { status: 'PROCESSING' });
        // simulate task processing as per the tasks reqs from partner
        await new Promise(resolve => setTimeout(resolve, 5000));
        // update status to COMPLETED
        await taskModel.update(task.id, { 
            status: 'COMPLETED',
            completed_at: new Date()
        });
        return true;
    } catch (error) {
        console.error('Error processing task:', error);
        // update status to FAILED
        await taskModel.update(task.id, { status: 'FAILED' });
        return false;
    }
}

module.exports = {
    processTask
};