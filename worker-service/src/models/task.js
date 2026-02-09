/**
 * task.js - Task Database Model (Worker)
 * 
 * This file will:
 * 1. Provide methods for updating task status and timestamps in the MySQL table.
 * 2. handle DB updates for 'PROCESSING', 'COMPLETED', and 'FAILED' states.
 * 3. Re-use or share logic with the API service where appropriate.
 */

// main logic 

const db = require('../db/init.sql');

// update task status
async function update(id, task) {
    const taskData = {
        ...task,
        updated_at: new Date()
    };
    await db.query('UPDATE tasks SET ? WHERE id = ?', [taskData, id]);
    return taskData;
}

// find task by id
async function find(id) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
}

module.exports = {
    update,
    find
};
