import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOnlineSync } from '../../src/hooks/useOnlineSync';

// Mock useAuth
vi.mock('../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

// Mock syncService
vi.mock('../../src/services/db/syncService', () => ({
    syncService: {
        syncPendingData: vi.fn(),
    },
}));

import { useAuth } from '../../src/components/context/AuthContext';
import { syncService } from '../../src/services/db/syncService';

describe('useOnlineSync', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock window.addEventListener and removeEventListener
        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
        // Mock navigator.onLine
        Object.defineProperty(navigator, 'onLine', {
            writable: true,
            value: true,
        });
        // Mock console.log
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should add online event listener on mount', () => {
        useAuth.mockReturnValue({ dek: 'test-dek', isAuthenticated: true });

        renderHook(() => useOnlineSync());

        expect(window.addEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    });

    it('should remove online event listener on unmount', () => {
        useAuth.mockReturnValue({ dek: 'test-dek', isAuthenticated: true });

        const { unmount } = renderHook(() => useOnlineSync());

        unmount();

        expect(window.removeEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    });

    it('should sync when online event is triggered and authenticated', async () => {
        const testDek = 'test-dek-123';
        useAuth.mockReturnValue({ dek: testDek, isAuthenticated: true });

        renderHook(() => useOnlineSync());

        // Get the handler that was passed to addEventListener
        const handler = window.addEventListener.mock.calls[0][1];

        // Simulate online event
        handler();

        expect(syncService.syncPendingData).toHaveBeenCalledWith(testDek);
    });

    it('should not sync when not authenticated', () => {
        useAuth.mockReturnValue({ dek: null, isAuthenticated: false });

        renderHook(() => useOnlineSync());

        const handler = window.addEventListener.mock.calls[0][1];
        handler();

        expect(syncService.syncPendingData).not.toHaveBeenCalled();
    });

    it('should not sync when dek is missing', () => {
        useAuth.mockReturnValue({ dek: null, isAuthenticated: true });

        renderHook(() => useOnlineSync());

        const handler = window.addEventListener.mock.calls[0][1];
        handler();

        expect(syncService.syncPendingData).not.toHaveBeenCalled();
    });

    it('should sync on mount if online and authenticated', () => {
        const testDek = 'test-dek-456';
        useAuth.mockReturnValue({ dek: testDek, isAuthenticated: true });
        Object.defineProperty(navigator, 'onLine', { writable: true, value: true });

        renderHook(() => useOnlineSync());

        expect(syncService.syncPendingData).toHaveBeenCalledWith(testDek);
    });

    it('should not sync on mount if offline', () => {
        useAuth.mockReturnValue({ dek: 'test-dek', isAuthenticated: true });
        Object.defineProperty(navigator, 'onLine', { writable: true, value: false });

        renderHook(() => useOnlineSync());

        expect(syncService.syncPendingData).not.toHaveBeenCalled();
    });

    it('should not sync on mount if not authenticated', () => {
        useAuth.mockReturnValue({ dek: null, isAuthenticated: false });
        Object.defineProperty(navigator, 'onLine', { writable: true, value: true });

        renderHook(() => useOnlineSync());

        expect(syncService.syncPendingData).not.toHaveBeenCalled();
    });

    it('should re-add listener when auth changes', () => {
        useAuth.mockReturnValue({ dek: 'test-dek', isAuthenticated: true });

        const { rerender } = renderHook(() => useOnlineSync());

        expect(window.addEventListener).toHaveBeenCalledTimes(1);

        // Change auth state
        useAuth.mockReturnValue({ dek: 'new-dek', isAuthenticated: true });

        rerender();

        // Should have removed and re-added listener
        expect(window.removeEventListener).toHaveBeenCalled();
        expect(window.addEventListener).toHaveBeenCalledTimes(2);
    });

    it('should log message when connection is restored', () => {
        useAuth.mockReturnValue({ dek: 'test-dek', isAuthenticated: true });

        renderHook(() => useOnlineSync());

        const handler = window.addEventListener.mock.calls[0][1];
        handler();

        expect(console.log).toHaveBeenCalledWith('Graphite: Connection restored. Syncing pending data...');
    });
});
