const request = require('supertest');
const express = require('express');
const taskRoutes = require('../../src/api/tasks');
const taskService = require('../../src/services/taskService');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

jest.mock('../../src/services/taskService');

describe('API Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/tasks', () => {
        test('should return 202 on valid task submission (Positive)', async () => {
            const validTask = { title: 'New Task', description: 'Some description' };
            taskService.create.mockResolvedValue({ id: '123', ...validTask, status: 'PENDING' });

            const response = await request(app)
                .post('/api/tasks')
                .send(validTask);

            expect(response.status).toBe(202);
            expect(response.body.id).toBe('123');
            expect(response.body.status).toBe('PENDING');
        });

        test('should return 400 on missing title (Negative)', async () => {
            const invalidTask = { description: 'Missing title' };

            const response = await request(app)
                .post('/api/tasks')
                .send(invalidTask);

            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/required/);
        });

        test('should return 400 on empty description (Edge case)', async () => {
            const invalidTask = { title: 'Title', description: '' };

            const response = await request(app)
                .post('/api/tasks')
                .send(invalidTask);

            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/required/);
        });
    });

    describe('GET /api/tasks/:id', () => {
        test('should return 200 and task details if found (Positive)', async () => {
            const mockTask = { id: '123', title: 'Test', status: 'COMPLETED' };
            taskService.find.mockResolvedValue(mockTask);

            const response = await request(app).get('/api/tasks/123');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTask);
        });

        test('should return 404 if task not found (Negative)', async () => {
            taskService.find.mockResolvedValue(null);

            const response = await request(app).get('/api/tasks/999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Task not found');
        });
    });
});
