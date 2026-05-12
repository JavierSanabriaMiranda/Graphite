import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { SettingsProvider, useSettings, ZOOM_LEVELS } from '../../../src/components/context/SettingsContext';

/**
 * Enhanced consumer component to interact with Zoom and Font settings
 */
const SettingsConsumer = () => {
    const { 
        defaultFont, 
        updateDefaultFont, 
        zoomIndex, 
        updateZoom,
        ZOOM_LEVELS: zoomLevels
    } = useSettings();

    // Calculate zoom percentage: base is 16px (index 2)
    const baseZoom = 16;
    const currentZoomPx = zoomLevels[zoomIndex];
    const zoomPercentage = Math.round((currentZoomPx / baseZoom) * 100);

    return (
        <div>
            <span data-testid="current-font">{defaultFont}</span>
            <span data-testid="current-zoom">{zoomPercentage}%</span>
            <span data-testid="zoom-index">{zoomIndex}</span>
            
            <button onClick={() => updateDefaultFont('Arial')}>Change to Arial</button>
            <button onClick={() => updateZoom('in')}>Zoom In</button>
            <button onClick={() => updateZoom('out')}>Zoom Out</button>
            <button onClick={() => updateZoom('reset')}>Zoom Reset</button>
        </div>
    );
};

describe('SettingsContext - SettingsProvider', () => {
    
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with "Inter" as default font if no preference is stored', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );
        expect(screen.getByTestId('current-font')).toHaveTextContent('Inter');
    });

    it('should initialize with value from localStorage if present', () => {
        localStorage.setItem('pref_font', 'Georgia');
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );
        expect(screen.getByTestId('current-font')).toHaveTextContent('Georgia');
    });

    it('should update state and localStorage when updateDefaultFont is called', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );
        fireEvent.click(screen.getByText('Change to Arial'));
        expect(screen.getByTestId('current-font')).toHaveTextContent('Arial');
        expect(localStorage.getItem('pref_font')).toBe('Arial');
    });

    /**
     * Test Zoom Logic: Manual updates via function
     */
    it('should update zoom level correctly via updateZoom function', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );

        // Assuming default zoom is 100% (index 2)
        const zoomDisplay = screen.getByTestId('current-zoom');
        expect(zoomDisplay).toHaveTextContent('100%');

        // Zoom In
        fireEvent.click(screen.getByText('Zoom In'));
        expect(zoomDisplay).not.toHaveTextContent('100%'); // Should be higher, e.g., 110%

        // Reset
        fireEvent.click(screen.getByText('Zoom Reset'));
        expect(zoomDisplay).toHaveTextContent('100%');

        // Zoom Out
        fireEvent.click(screen.getByText('Zoom Out'));
        expect(zoomDisplay).not.toHaveTextContent('100%'); // Should be lower, e.g., 90%
    });

    /**
     * Test Zoom Logic: Global Keyboard Shortcuts (Ctrl/Meta + key)
     */
    it('should handle keyboard shortcuts for zooming', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );

        const zoomDisplay = screen.getByTestId('current-zoom');
        expect(zoomDisplay).toHaveTextContent('100%');

        // Simulate Ctrl + '+'
        fireEvent.keyDown(window, { key: '+', ctrlKey: true });
        expect(zoomDisplay).not.toHaveTextContent('100%');

        // Simulate Ctrl + '-'
        fireEvent.keyDown(window, { key: '-', ctrlKey: true });
        // We do it twice to see the change from the previous 'in' step
        fireEvent.keyDown(window, { key: '-', ctrlKey: true }); 
        expect(zoomDisplay).not.toHaveTextContent('100%');

        // Simulate Ctrl + '0' (Reset)
        fireEvent.keyDown(window, { key: '0', ctrlKey: true });
        expect(zoomDisplay).toHaveTextContent('100%');
    });

    /**
     * Test Zoom Boundaries: Min and Max levels
     */
    it('should not exceed ZOOM_LEVELS boundaries', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );

        // Force many "Zoom In" clicks to hit the cap
        const zoomInBtn = screen.getByText('Zoom In');
        for (let i = 0; i < 10; i++) {
            fireEvent.click(zoomInBtn);
        }
        
        const maxZoom = screen.getByTestId('current-zoom').textContent;
        fireEvent.click(zoomInBtn); // Try one more
        expect(screen.getByTestId('current-zoom')).toHaveTextContent(maxZoom);

        // Force many "Zoom Out" clicks to hit the floor
        const zoomOutBtn = screen.getByText('Zoom Out');
        for (let i = 0; i < 15; i++) {
            fireEvent.click(zoomOutBtn);
        }

        const minZoom = screen.getByTestId('current-zoom').textContent;
        fireEvent.click(zoomOutBtn); // Try one more
        expect(screen.getByTestId('current-zoom')).toHaveTextContent(minZoom);
    });

    it('should throw error if useSettings is used outside of SettingsProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const ComponentOutside = () => {
            useSettings();
            return null;
        };
        expect(() => render(<ComponentOutside />)).toThrow('useSettings debe usarse dentro de un SettingsProvider');
        consoleSpy.mockRestore();
    });
});