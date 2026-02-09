/**
 * tasks.js - Task API Routes
 * 
 * This file will:
 * 1. Define the RESTful endpoints for tasks.
 * 2. POST /api/tasks: Accept task details and call the task service to submit them.
 * 3. GET /api/tasks/:id: Retrieve task status and metadata from the database.
 * 4. Handle HTTP responses and error codes (202, 404, 500, etc.).
 */

// main endpoints 

const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

// POST /api/tasks
router.post('/', async (req, res) => {
    try {
        const task = await taskService.create(req.body);
        res.status(202).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
    try {
        const task = await taskService.find(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
