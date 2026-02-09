const { processTask } = require('../../src/services/worker');
const taskModel = require('../../src/models/task');

jest.mock('../../src/models/task');

describe('Worker Service Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock setTimeout to run immediately
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('processTask() should update status to PROCESSING and then COMPLETED (Positive)', async () => {
        const mockMessage = {
            content: Buffer.from(JSON.stringify({ id: '123' }))
        };

        taskModel.update.mockResolvedValue(true);

        const processPromise = processTask(mockMessage);

        // Fast-forward processing delay
        jest.runAllTimers();

        const result = await processPromise;

        expect(result).toBe(true);
        expect(taskModel.update).toHaveBeenCalledWith('123', { status: 'PROCESSING' });
        expect(taskModel.update).toHaveBeenCalledWith('123', expect.objectContaining({ 
            status: 'COMPLETED'
        }));
    });

    test('processTask() should update status to FAILED on error (Negative)', async () => {
        const mockMessage = {
            content: Buffer.from(JSON.stringify({ id: '123' }))
        };

        taskModel.update.mockImplementationOnce(() => Promise.reject(new Error('DB Error')));

        const result = await processTask(mockMessage);

        expect(result).toBe(false);
        expect(taskModel.update).toHaveBeenCalledWith('123', { status: 'FAILED' });
    });
});
