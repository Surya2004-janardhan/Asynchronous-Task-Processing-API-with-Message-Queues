// Manual mock of setTimeout to bypass environment issues with fake timers
global.setTimeout = jest.fn((fn, ms) => fn());

const { processTask } = require('../../src/services/worker');
const taskModel = require('../../src/models/task');

jest.mock('../../src/models/task');

describe('Worker Service Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('processTask() should update status to PROCESSING and then COMPLETED (Positive)', async () => {
        const mockMessage = {
            content: Buffer.from(JSON.stringify({ task_id: '123' }))
        };

        taskModel.update.mockResolvedValue(true);

        const success = await processTask(mockMessage);

        expect(success).toBe(true);
        expect(taskModel.update).toHaveBeenCalledWith('123', { status: 'PROCESSING' });
        expect(taskModel.update).toHaveBeenCalledWith('123', expect.objectContaining({ 
            status: 'COMPLETED'
        }));
    });

    test('processTask() should update status to FAILED on error (Negative)', async () => {
        const mockMessage = {
            content: Buffer.from(JSON.stringify({ task_id: '123' }))
        };

        taskModel.update.mockImplementationOnce(() => Promise.reject(new Error('DB Error')));

        const result = await processTask(mockMessage);

        expect(result).toBe(false);
        expect(taskModel.update).toHaveBeenCalledWith('123', { status: 'FAILED' });
    });
});
