import { describe, it, expect } from 'vitest';
import ApiError from '../../src/custom_errors/ApiError';

describe('ApiError', () => {
    it('should create an ApiError with message and status', () => {
        const error = new ApiError('Unauthorized', 401);

        expect(error.message).toBe('Unauthorized');
        expect(error.status).toBe(401);
        expect(error.name).toBe('ApiError');
    });

    it('should be an instance of Error and ApiError', () => {
        const error = new ApiError('Not found', 404);

        expect(error instanceof Error).toBe(true);
        expect(error instanceof ApiError).toBe(true);
    });

    it('should be throwable and catchable', () => {
        const throwError = () => {
            throw new ApiError('Server error', 500);
        };

        expect(throwError).toThrow(ApiError);
    });

    it('should have stack trace', () => {
        const error = new ApiError('Test error', 400);

        expect(error.stack).toBeDefined();
        expect(typeof error.stack).toBe('string');
    });

    it('should work with different status codes', () => {
        const error400 = new ApiError('Bad Request', 400);
        const error500 = new ApiError('Server Error', 500);

        expect(error400.status).toBe(400);
        expect(error500.status).toBe(500);
    });
});
