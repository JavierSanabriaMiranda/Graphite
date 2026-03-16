import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '../../../src/services/db/userService';
import { getDB } from '../../../src/services/db';

vi.mock('../../../src/services/db', () => ({
    getDB: vi.fn(),
}));

describe('userService Suite', () => {
    let mockDb;

    beforeEach(() => {
        vi.clearAllMocks();

        mockDb = {
            select: vi.fn(),
            execute: vi.fn(),
        };
        getDB.mockResolvedValue(mockDb);
    });

    describe('getCurrentUser', () => {
        it('should return the first user if it exists', async () => {
            const mockUser = { user_id: 'u1', email: 'test@test.com' };
            mockDb.select.mockResolvedValue([mockUser]);

            const user = await userService.getCurrentUser();

            expect(mockDb.select).toHaveBeenCalledWith("SELECT * FROM USERS LIMIT 1");
            expect(user).toEqual(mockUser);
        });

        it('should return null if no user is found', async () => {
            mockDb.select.mockResolvedValue([]);
            const user = await userService.getCurrentUser();
            expect(user).toBeNull();
        });
    });

    describe('isAuthenticated', () => {
        it('should return true if user has id and email', async () => {
            // We mock the service method itself to isolate this logic
            vi.spyOn(userService, 'getCurrentUser').mockResolvedValue({
                id: '123',
                email: 'test@test.com'
            });

            const auth = await userService.isAuthenticated();
            expect(auth).toBe(true);
        });

        it('should return false if no user exists or data is missing', async () => {
            vi.spyOn(userService, 'getCurrentUser').mockResolvedValue(null);
            const auth = await userService.isAuthenticated();
            expect(auth).toBe(false);

            vi.spyOn(userService, 'getCurrentUser').mockResolvedValue({ id: '123' }); // Missing email
            const authIncomplete = await userService.isAuthenticated();
            expect(authIncomplete).toBe(false);
        });
    });

    describe('saveCloudSession', () => {
        const cloudData = ['id-cloud', 'cloud@test.com', 'javier', 'token-123'];

        it('should UPDATE an existing local user with cloud data', async () => {
            const localUser = { user_id: 'local-uuid' };
            vi.spyOn(userService, 'getCurrentUser').mockResolvedValue(localUser);

            await userService.saveCloudSession(...cloudData);

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE USERS SET"),
                [...cloudData, 'local-uuid']
            );
        });

        it('should INSERT a new user if none exists locally', async () => {
            vi.spyOn(userService, 'getCurrentUser').mockResolvedValue(null);

            await userService.saveCloudSession(...cloudData);

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO USERS"),
                cloudData
            );
        });
    });

    describe('updateProfile and logout', () => {
        it('should call update with the correct username', async () => {
            await userService.updateProfile('u1', { username: 'NewName' });

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE USERS SET username = $1"),
                ['NewName', 'u1']
            );
        });

        it('should delete all rows on logout', async () => {
            await userService.logout();
            expect(mockDb.execute).toHaveBeenCalledWith("DELETE FROM USERS");
        });
    });
});