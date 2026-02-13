/**
 * db.js - Database Connection Configuration
 * 
 * This file:
 * 1. Uses the 'mysql2/promise' library for async/await support.
 * 2. Creates a connection pool using environment variables.
 * 3. Exports the pool to be used by models.
 */

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'task_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
