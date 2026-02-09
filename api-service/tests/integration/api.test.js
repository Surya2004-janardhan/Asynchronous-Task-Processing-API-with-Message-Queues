const request = require('supertest');
const express = require('express');
const taskRoutes = require('../../src/api/tasks');
const taskService = require('../../src/services/taskService');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

jest.mock('../../src/services/taskService');

describe('API Routes', () => {
    beforeEach(() => jest.clearAllMocks());

    test('POST /api/tasks returns 202', async () => {
        taskService.create.mockResolvedValue({ id: '123' });
        const res = await request(app).post('/api/tasks').send({ title: 'T', description: 'D' });
        expect(res.status).toBe(202);
        expect(res.body.task_id).toBe('123');
    });

    test('GET /api/tasks/:id returns 200', async () => {
        taskService.find.mockResolvedValue({ id: '123', status: 'PENDING' });
        const res = await request(app).get('/api/tasks/123');
        expect(res.status).toBe(200);
        expect(res.body.task_id).toBe('123');
    });
});
