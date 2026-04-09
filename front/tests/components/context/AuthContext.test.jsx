import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../../../src/components/context/AuthContext';
import { invoke } from '@tauri-apps/api/core';
import { authService } from '../../../src/services/api';
import { userService } from '../../../src/services/db/userService';
import { syncService } from '../../../src/services/db/syncService';
import { workspaceService } from '../../../src/services/db/workspaceService'; // Added
import { noteService } from '../../../src/services/db/noteService'; // Added
import { isTokenValid } from '../../../src/util/auth';

// --- 1. MOCKS ---

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('../../../src/util/auth', () => ({
    isTokenValid: vi.fn(),
}));

vi.mock('../../../src/services/api', () => ({
    authService: {
        getSalt: vi.fn(),
        login: vi.fn(),
        signup: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/userService', () => ({
    userService: {
        getCurrentUser: vi.fn(),
        saveCloudSession: vi.fn(),
        logout: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/syncService', () => ({
    syncService: {
        pullAllMetadata: vi.fn(),
        purgeSyncedDeletes: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/workspaceService', () => ({
    workspaceService: {
        addWelcomeWorkspace: vi.fn().mockResolvedValue('ws-123'),
    },
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        addWelcomeNotes: vi.fn(),
    },
}));

vi.mock('../../../src/util/crypto', () => ({
    deriveAuthHash: vi.fn().mockResolvedValue('hashed-pass'),
    deriveKEK: vi.fn().mockResolvedValue('kek-key'),
    unwrapDEK: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
    wrapDEK: vi.fn().mockResolvedValue({ wrappedDek: 'wrapped', iv: 'iv' }),
}));

/**
 * Updated AuthConsumer to include all elements required by tests
 */
const AuthConsumer = () => {
    const { isAuthenticated, login, logout, signUp, dek } = useAuth();
    return (
        <div>
            <span data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Guest'}</span>
            <span data-testid="dek-present">{dek ? 'Yes' : 'No'}</span>
            <button onClick={() => login('test@test.com', 'Pass123!')}>Login</button>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => signUp('test@test.com', 'Pass123!', 'user123')}>Sign Up</button>
        </div>
    );
};

describe('AuthContext - AuthProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    });

    /**
     * Test session restoration on app start
     */
    it('should restore session on mount if token is valid', async () => {
        const mockDek = [1, 2, 3];
        invoke.mockResolvedValue({ token: 'valid-token', dek: mockDek });
        isTokenValid.mockReturnValue(true);
        userService.getCurrentUser.mockResolvedValue({ user_id: 'u1' });

        await act(async () => {
            render(
                <AuthProvider>
                    <AuthConsumer />
                </AuthProvider>
            );
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
        expect(screen.getByTestId('dek-present')).toHaveTextContent('Yes');
        expect(syncService.pullAllMetadata).toHaveBeenCalledWith(new Uint8Array(mockDek), 'u1');
    });

    /**
     * Test full login flow
     */
    it('should perform a full login flow successfully', async () => {
        invoke.mockResolvedValue(null);
        authService.getSalt.mockResolvedValue({ salt: 'salt123' });
        authService.login.mockResolvedValue({
            token: 't-123',
            wrappedDek: 'w-dek',
            dekIv: 'iv',
            username: 'tester',
            userId: 'u1'
        });

        await act(async () => {
            render(<AuthProvider><AuthConsumer /></AuthProvider>);
        });

        // Use findBy to wait for loading to finish
        const loginBtn = await screen.findByText('Login');
        await act(async () => {
            fireEvent.click(loginBtn);
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
        expect(invoke).toHaveBeenCalledWith('save_secure_data', expect.any(Object));
    });

    /**
     * Test Sign Up and welcome content
     */
    it('should create a new account and initialize welcome content', async () => {
        invoke.mockResolvedValue(null);
        authService.signup.mockResolvedValue({ token: 't-new', userId: 'u-new' });

        await act(async () => {
            render(<AuthProvider><AuthConsumer /></AuthProvider>);
        });

        const signUpBtn = await screen.findByText('Sign Up');
        await act(async () => {
            fireEvent.click(signUpBtn);
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
        expect(workspaceService.addWelcomeWorkspace).toHaveBeenCalledWith('u-new');
        expect(noteService.addWelcomeNotes).toHaveBeenCalledWith('ws-123');
    });

    /**
     * Test logout process
     */
    it('should clear all data on logout', async () => {
        invoke.mockResolvedValue({ token: 'tok', dek: [1] });
        isTokenValid.mockReturnValue(true);
        userService.getCurrentUser.mockResolvedValue({ user_id: 'u1' });

        await act(async () => {
            render(<AuthProvider><AuthConsumer /></AuthProvider>);
        });

        const logoutBtn = await screen.findByText('Logout');
        await act(async () => {
            fireEvent.click(logoutBtn);
        });

        expect(invoke).toHaveBeenCalledWith('clear_secure_data');
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Guest');
    });
});