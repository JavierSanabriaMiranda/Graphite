import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService, remoteWorkspaceService, remoteNoteService } from '../../src/services/api';
import ApiError from '../../src/custom_errors/ApiError';

// Mock fetch globally
global.fetch = vi.fn();

// Mock Tauri invoke
vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

import { invoke } from '@tauri-apps/api/core';

describe('API Service Suite', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch.mockReset();
    });

    describe('authService', () => {
        describe('login', () => {
            it('should successfully login with email and password hash', async () => {
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue({
                        token: 'jwt-token',
                        wrappedDek: 'encrypted-dek',
                        iv: 'initialization-vector',
                        salt: 'password-salt'
                    })
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await authService.login('user@example.com', 'password-hash');

                expect(global.fetch).toHaveBeenCalledWith(
                    expect.stringContaining('/users/login'),
                    expect.objectContaining({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: expect.stringContaining('user@example.com')
                    })
                );
                expect(result.token).toBe('jwt-token');
            });

            it('should throw ApiError on login failure', async () => {
                const mockResponse = {
                    ok: false,
                    message: 'Invalid credentials',
                    status: 401
                };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(authService.login('user@example.com', 'wrong-hash')).rejects.toThrow(ApiError);
            });
        });

        describe('signup', () => {
            it('should successfully register new user', async () => {
                const signupData = {
                    email: 'newuser@example.com',
                    passwordHash: 'hash',
                    salt: 'salt',
                    wrappedDek: 'wrapped-dek',
                    iv: 'iv'
                };

                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue({ token: 'new-jwt-token' })
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await authService.signup(signupData);

                expect(global.fetch).toHaveBeenCalledWith(
                    expect.stringContaining('/users/register'),
                    expect.objectContaining({ method: 'POST' })
                );
                expect(result.token).toBe('new-jwt-token');
            });

            it('should throw ApiError on signup failure', async () => {
                const signupData = { email: 'test@example.com' };
                const mockResponse = {
                    ok: false,
                    message: 'Email already exists',
                    status: 409
                };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(authService.signup(signupData)).rejects.toThrow(ApiError);
            });
        });

        describe('getSalt', () => {
            it('should fetch salt for email', async () => {
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue({ salt: 'user-salt' })
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await authService.getSalt('user@example.com');

                expect(global.fetch).toHaveBeenCalledWith(
                    expect.stringContaining('/users/salt')
                );
                expect(result.salt).toBe('user-salt');
            });

            it('should throw ApiError if salt fetch fails', async () => {
                const mockResponse = { ok: false, message: 'User not found', status: 404 };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(authService.getSalt('nonexistent@example.com')).rejects.toThrow(ApiError);
            });
        });
    });

    describe('remoteWorkspaceService', () => {
        describe('upsertRemoteWorkspace', () => {
            it('should successfully upsert workspace', async () => {
                const payload = {
                    workspaceId: 'ws-123',
                    encryptedPayload: 'encrypted-data',
                    iv: 'iv-value'
                };

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: true };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteWorkspaceService.upsertRemoteWorkspace(payload);

                expect(result).toBe(true);
                expect(global.fetch).toHaveBeenCalledWith(
                    expect.stringContaining('/workspaces'),
                    expect.objectContaining({ method: 'PUT' })
                );
            });

            it('should throw error if upsert fails', async () => {
                const payload = { workspaceId: 'ws-123' };
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(remoteWorkspaceService.upsertRemoteWorkspace(payload)).rejects.toThrow();
            });
        });

        describe('getAllRemoteWorkspaces', () => {
            it('should fetch all workspaces for user', async () => {
                const mockWorkspaces = [
                    { workspaceId: 'ws-1', name: 'Work' },
                    { workspaceId: 'ws-2', name: 'Personal' }
                ];

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue(mockWorkspaces)
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteWorkspaceService.getAllRemoteWorkspaces();

                expect(result).toHaveLength(2);
                expect(result[0].name).toBe('Work');
            });

            it('should throw error if fetch fails', async () => {
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(remoteWorkspaceService.getAllRemoteWorkspaces()).rejects.toThrow();
            });
        });
    });

    describe('remoteNoteService', () => {
        describe('updateRemoteNote', () => {
            it('should successfully update note', async () => {
                const payload = {
                    noteId: 'n-123',
                    encryptedPayload: 'encrypted-content'
                };

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: true };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.updateRemoteNote(payload);

                expect(result.ok).toBe(true);
            });

            it('should handle 409 conflict response', async () => {
                const payload = { noteId: 'n-123' };
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false, status: 409 };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.updateRemoteNote(payload);

                expect(result.status).toBe(409);
            });

            it('should throw error on non-409 failure', async () => {
                const payload = { noteId: 'n-123' };
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false, status: 500 };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(remoteNoteService.updateRemoteNote(payload)).rejects.toThrow();
            });
        });

        describe('getRemoteMetadataByWorkspace', () => {
            it('should fetch notes metadata for workspace', async () => {
                const mockMetadata = [
                    { noteId: 'n-1', title: 'Note 1' },
                    { noteId: 'n-2', title: 'Note 2' }
                ];

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue(mockMetadata)
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.getRemoteMetadataByWorkspace('ws-123');

                expect(result).toHaveLength(2);
                expect(global.fetch).toHaveBeenCalledWith(
                    expect.stringContaining('workspace/ws-123/metadata'),
                    expect.any(Object)
                );
            });
        });

        describe('getRemoteMetadataByParent', () => {
            it('should fetch child notes metadata', async () => {
                const mockMetadata = [{ noteId: 'child-1', parentId: 'parent-1' }];

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue(mockMetadata)
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.getRemoteMetadataByParent('parent-1');

                expect(result).toHaveLength(1);
            });
        });

        describe('getRemoteNoteMetadata', () => {
            it('should fetch note metadata', async () => {
                const mockMetadata = { noteId: 'n-123', title: 'My Note' };

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue(mockMetadata)
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.getRemoteNoteMetadata('n-123');

                expect(result.title).toBe('My Note');
            });

            it('should return null if note not found (404)', async () => {
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false, status: 404 };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.getRemoteNoteMetadata('nonexistent');

                expect(result).toBeNull();
            });

            it('should throw error on other failures', async () => {
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false, status: 500 };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(remoteNoteService.getRemoteNoteMetadata('n-123')).rejects.toThrow();
            });
        });

        describe('getRemoteNoteContent', () => {
            it('should fetch encrypted note content', async () => {
                const mockContent = {
                    noteId: 'n-123',
                    encryptedPayload: 'encrypted-content',
                    iv: 'iv-value'
                };

                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = {
                    ok: true,
                    json: vi.fn().mockResolvedValue(mockContent)
                };
                global.fetch.mockResolvedValue(mockResponse);

                const result = await remoteNoteService.getRemoteNoteContent('n-123');

                expect(result.encryptedPayload).toBe('encrypted-content');
            });

            it('should throw error if fetch fails', async () => {
                invoke.mockResolvedValue({ token: 'mock-token' });
                const mockResponse = { ok: false };
                global.fetch.mockResolvedValue(mockResponse);

                await expect(remoteNoteService.getRemoteNoteContent('n-123')).rejects.toThrow();
            });
        });
    });
});
