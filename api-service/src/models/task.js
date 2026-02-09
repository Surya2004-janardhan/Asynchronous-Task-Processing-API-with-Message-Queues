/**
 * task.js - Task Database Model
 * 
 * This file will:
 * 1. Define the interaction logic with the MySQL 'tasks' table.
 * 2. Provide methods for inserting tasks (create).
 * 3. Provide methods for fetching tasks by ID (find).
 * 4. Map database rows to JavaScript objects.
 */

// interaction logic with sql table tht we created in init.sql

// const db = require('../config/database');
// fixing correct path for db 
const db = require('../db/init.sql');

// create task
async function create(task) {
    const [result] = await db.query('INSERT INTO tasks SET ?', task);
    return result.insertId;
}

// find task by id
async function find(id) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', id);
    return rows[0];
}

// update task
async function update(id, task) {
    const [result] = await db.query('UPDATE tasks SET ? WHERE id = ?', [task, id]);
    return result.affectedRows;
}

// delete task
async function remove(id) {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ?', id);
    return result.affectedRows;
}

// get all tasks
async function findAll() {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
}

module.exports = {
    create,
    find,
    update,
    remove,
    findAll
};