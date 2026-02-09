const { v4: uuidv4 } = require('uuid');
const taskService = require('../../src/services/taskService');
const taskModel = require('../../src/models/task');
const { publishToQueue } = require('../../src/rabbitmq/publisher');

jest.mock('../../src/models/task');
jest.mock('../../src/rabbitmq/publisher');
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid-123')
}));

describe('Task Service Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('create() should create a task in DB and publish to queue', async () => {
        const taskInput = { title: 'Test', description: 'Desc' };
        taskModel.create.mockResolvedValue(1);
        publishToQueue.mockResolvedValue(true);

        const result = await taskService.create(taskInput);

        expect(result.id).toBe('test-uuid-123');
        expect(result.status).toBe('PENDING');
        expect(taskModel.create).toHaveBeenCalled();
        expect(publishToQueue).toHaveBeenCalledWith('task_queue', expect.objectContaining({
            id: 'test-uuid-123',
            title: 'Test'
        }));
    });

    test('find() should call model find', async () => {
        const mockTask = { id: '123', title: 'Test' };
        taskModel.find.mockResolvedValue(mockTask);

        const result = await taskService.find('123');

        expect(result).toEqual(mockTask);
        expect(taskModel.find).toHaveBeenCalledWith('123');
    });
});
