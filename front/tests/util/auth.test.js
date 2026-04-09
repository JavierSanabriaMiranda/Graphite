import { describe, it, expect, vi } from 'vitest';
import { isTokenValid } from '../../src/util/auth';

vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));

import { jwtDecode } from 'jwt-decode';

describe('isTokenValid', () => {
    const currentTime = Date.now() / 1000;

    describe('invalid tokens', () => {
        it('should return false for null, undefined, or empty token', () => {
            expect(isTokenValid(null)).toBe(false);
            expect(isTokenValid(undefined)).toBe(false);
            expect(isTokenValid('')).toBe(false);
        });

        it('should return false for malformed tokens', () => {
            jwtDecode.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(isTokenValid('malformed.token.here')).toBe(false);
        });

        it('should return false for expired tokens', () => {
            jwtDecode.mockReturnValue({
                exp: currentTime - 100, // Expired 100 seconds ago
            });

            expect(isTokenValid('expired.token')).toBe(false);
        });

        it('should return false for tokens expiring within 10 seconds', () => {
            jwtDecode.mockReturnValue({
                exp: currentTime + 5, // Expires in 5 seconds
            });

            expect(isTokenValid('soon-to-expire.token')).toBe(false);
        });
    });

    describe('valid tokens', () => {
        it('should return true for valid, non-expired tokens with sufficient time', () => {
            jwtDecode.mockReturnValue({
                exp: currentTime + 30, // Expires in 30 seconds
            });

            expect(isTokenValid('valid.token')).toBe(true);
        });

        it('should return true for tokens expiring in more than 10 seconds', () => {
            jwtDecode.mockReturnValue({
                exp: currentTime + 11, // Expires in 11 seconds
            });

            expect(isTokenValid('boundary.token')).toBe(true);
        });
    });
});
