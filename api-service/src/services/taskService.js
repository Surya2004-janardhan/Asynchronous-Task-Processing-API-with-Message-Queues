/**
 * taskService.js - Task Business Logic
 * 
 * This file will:
 * 1. Implement logic to create a new task in the database with status 'PENDING'.
 * 2. Generate unique task IDs (UUIDs).
 * 3. Handle publishing task messages to the 'task_queue' in RabbitMQ.
 * 4. Ensure data consistency between the DB and RabbitMQ.
 */

// main logic 

const { v4: uuidv4 } = require('uuid');
const taskModel = require('../models/task');
const { publishToQueue } = require('../rabbitmq/publisher');

// create task
async function create(task) {
    const taskId = uuidv4();
    const taskData = {
        id: taskId,
        ...task,
        status: 'PENDING',
        created_at: new Date(),
        updated_at: new Date()
    };
    await taskModel.create(taskData);
    
    // Publish message with exact payload required (task_id)
    const message = {
        task_id: taskId,
        title: task.title,
        description: task.description,
        metadata: task.metadata
    };
    await publishToQueue('task_queue', message);
    return taskData;
}

// find task by id
async function find(id) {
    return await taskModel.find(id);
}

// update task
async function update(id, task) {
    const taskData = {
        ...task,
        updated_at: new Date()
    };
    await taskModel.update(id, taskData);
    return taskData;
}

// delete task
async function remove(id) {
    await taskModel.remove(id);
}

// get all tasks
async function findAll() {
    return await taskModel.findAll();
}

module.exports = {
    create,
    find,
    update,
    remove,
    findAll
};
