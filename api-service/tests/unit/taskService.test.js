const taskService = require('../../src/services/taskService');
const taskModel = require('../../src/models/task');
const publisher = require('../../src/rabbitmq/publisher');

jest.mock('../../src/models/task');
jest.mock('../../src/rabbitmq/publisher', () => ({
    publishToQueue: jest.fn().mockResolvedValue(true)
}));
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid-123')
}));

describe('Task Service Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create and publish task', async () => {
        taskModel.create.mockResolvedValue(true);
        const result = await taskService.create({ title: 'T', description: 'D' });
        
        expect(result.id).toBe('test-uuid-123');
        expect(publisher.publishToQueue).toHaveBeenCalled();
        const callArgs = publisher.publishToQueue.mock.calls[0];
        expect(callArgs[0]).toBe('task_queue');
        expect(callArgs[1].task_id).toBe('test-uuid-123');
    });

    test('should find task', async () => {
        taskModel.find.mockResolvedValue({ id: '123' });
        const result = await taskService.find('123');
        expect(result.id).toBe('123');
    });
});
