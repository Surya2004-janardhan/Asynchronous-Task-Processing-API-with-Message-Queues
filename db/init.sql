-- init.sql - Database Schema Creation
-- 
-- This script will:
-- 1. Create the 'tasks' table if it doesn't already exist.
-- 2. Define columns: id (UUID), title, description, status (ENUM), metadata (JSON), created_at, updated_at, completed_at.
-- 3. Set up appropriate defaults and indexes for performance.
-- 4. Be executed automatically by the MySQL container on startup.

create database if not exists async_tasks_db;
use async_tasks_db;

create table if not exists tasks (
    id varchar(36) primary key,
    title varchar(255) not null,
    description text,
    status enum('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED') not null default 'PENDING',
    metadata json,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    completed_at timestamp null
);

-- indexs on status and created_at
create index idx_status on tasks(status);
create index idx_created_at on tasks(created_at);
