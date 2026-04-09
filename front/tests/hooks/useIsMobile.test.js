import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../src/hooks/useIsMobile';

describe('useIsMobile', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock window methods
        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return true when viewport is less than 768px', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 500,
        });

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
    });

    it('should return false when viewport is 768px or larger', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
    });

    it('should add resize listener on mount', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        renderHook(() => useIsMobile());

        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('should remove resize listener on unmount', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        const { unmount } = renderHook(() => useIsMobile());

        unmount();

        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('should update state when window resizes from desktop to mobile', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        // Simulate resize to mobile
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 500,
            });
            const resizeHandler = window.addEventListener.mock.calls[0][1];
            resizeHandler();
        });

        expect(result.current).toBe(true);
    });

    it('should update state when window resizes from mobile to desktop', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 500,
        });

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);

        // Simulate resize to desktop
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 1024,
            });
            const resizeHandler = window.addEventListener.mock.calls[0][1];
            resizeHandler();
        });

        expect(result.current).toBe(false);
    });
});
