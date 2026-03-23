import { render, screen, act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UIProvider, useUI } from '../../../src/components/context/UIContext';

describe('UIContext', () => {
    it('should throw an error if useUI is used outside of UIProvider', () => {
        // Silence error on console
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => renderHook(() => useUI())).toThrow('useUI must be used inside an UIProvider');
        
        consoleSpy.mockRestore();
    });

    it('should provide default values', () => {
        const { result } = renderHook(() => useUI(), {
            wrapper: UIProvider,
        });

        expect(result.current.isSettingsOpen).toBe(false);
        expect(result.current.activeTab).toBe('editor');
    });

    it('should toggle isSettingsOpen when openSettings and closeSettings are called', () => {
        const { result } = renderHook(() => useUI(), {
            wrapper: UIProvider,
        });

        // Open
        act(() => {
            result.current.openSettings();
        });
        expect(result.current.isSettingsOpen).toBe(true);

        // Close
        act(() => {
            result.current.closeSettings();
        });
        expect(result.current.isSettingsOpen).toBe(false);
    });

    it('should update activeTab when setActiveTab is called', () => {
        const { result } = renderHook(() => useUI(), {
            wrapper: UIProvider,
        });

        // Change to search
        act(() => {
            result.current.setActiveTab('search');
        });
        expect(result.current.activeTab).toBe('search');

        // Change to browse
        act(() => {
            result.current.setActiveTab('browse');
        });
        expect(result.current.activeTab).toBe('browse');
    });

    it('should render children correctly', () => {
        render(
            <UIProvider>
                <div data-testid="child">Child Element</div>
            </UIProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Child Element')).toBeInTheDocument();
    });
});