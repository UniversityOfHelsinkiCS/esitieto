import { info, error, subscribeToMessages } from './messager';

describe('messager.js', () => {
    let mockSetMessage;
    let unsubscribe;

    beforeEach(() => {
        mockSetMessage = jest.fn();
        unsubscribe = subscribeToMessages(mockSetMessage);
    });

    afterEach(() => {
        unsubscribe();
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('should display an informational message', () => {
        jest.useFakeTimers();
        info('Test info message');

        expect(mockSetMessage).toHaveBeenCalledWith({ text: 'Test info message', type: 'info' });

        jest.advanceTimersByTime(8000);
        expect(mockSetMessage).toHaveBeenCalledWith({ text: '', type: '' });
    });

    it('should display an error message', () => {
        jest.useFakeTimers();
        error('Test error message');

        expect(mockSetMessage).toHaveBeenCalledWith({ text: 'Virhe: Test error message', type: 'error' });

        jest.advanceTimersByTime(8000);
        expect(mockSetMessage).toHaveBeenCalledWith({ text: '', type: '' });
    });

    it('should handle message subscription and unsubscription', () => {
        expect(typeof unsubscribe).toBe('function');

        info('Test info message');
        expect(mockSetMessage).toHaveBeenCalledWith({ text: 'Test info message', type: 'info' });

        unsubscribe();
        info('Another test info message');
        expect(mockSetMessage).not.toHaveBeenCalledWith({ text: 'Another test info message', type: 'info' });
    });
});
