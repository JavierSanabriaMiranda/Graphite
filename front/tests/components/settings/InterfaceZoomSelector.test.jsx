import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import InterfaceZoomSelector from '../../../src/components/settings/InterfaceZoomSelector';
import { useSettings } from '../../../src/components/context/SettingsContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/SettingsContext', () => ({
    useSettings: vi.fn(),
}));

describe('InterfaceZoomSelector Component', () => {
    const mockSetZoomIndex = vi.fn();
    const mockZoomLevels = [12, 14, 16, 18, 20]; // 16 is at index 2 (Default)

    beforeEach(() => {
        vi.clearAllMocks();

        // Default implementation for settings context
        useSettings.mockReturnValue({
            zoomIndex: 2, // Default (100%)
            setZoomIndex: mockSetZoomIndex,
            ZOOM_LEVELS: mockZoomLevels
        });
    });

    /**
     * Test: Initial Rendering
     */
    it('should render correct percentage and hide reset button when at default zoom', () => {
        render(<InterfaceZoomSelector />);

        expect(screen.getByText('100%')).toBeInTheDocument();
        // Reset button (RotateCcw) shouldn't be visible when isDefault is true
        expect(screen.queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
    });

    /**
     * Test: Interaction with Increment/Decrement buttons
     */
    it('should call setZoomIndex when Plus or Minus buttons are clicked', () => {
        render(<InterfaceZoomSelector />);

        const plusButton = screen.getByTitle('settings.general.zoom.increase');
        const minusButton = screen.getByTitle('settings.general.zoom.decrease');

        fireEvent.click(plusButton);
        // It uses a functional update (prev => Math.min(...))
        expect(mockSetZoomIndex).toHaveBeenCalledWith(expect.any(Function));

        fireEvent.click(minusButton);
        expect(mockSetZoomIndex).toHaveBeenCalledTimes(2);
    });

    /**
     * Test: Reset functionality
     */
    it('should show reset button when zoom is not 100% and call setZoomIndex(2)', () => {
        useSettings.mockReturnValue({
            zoomIndex: 4, 
            setZoomIndex: mockSetZoomIndex,
            ZOOM_LEVELS: mockZoomLevels
        });

        render(<InterfaceZoomSelector />);
        
        expect(screen.getByText('125%')).toBeInTheDocument();
        
        const resetButton = screen.getByTitle('settings.general.zoom.reset');
        fireEvent.click(resetButton);

        expect(mockSetZoomIndex).toHaveBeenCalledWith(2);
    });

    /**
     * Test: Slider Logic (Local vs Global State)
     * Changing the input should update local UI but not trigger global change until mouse up
     */
    it('should update UI percentage on change but only trigger setZoomIndex on mouse up', () => {
        render(<InterfaceZoomSelector />);

        const slider = screen.getByRole('slider');

        // Simulating drag to 75% (index 0 -> 12px)
        fireEvent.change(slider, { target: { value: '0' } });

        // UI should reflect local changes immediately
        expect(screen.getByText('75%')).toBeInTheDocument();
        // Global context should NOT be called yet
        expect(mockSetZoomIndex).not.toHaveBeenCalled();

        // Releasing the slider
        fireEvent.mouseUp(slider);

        expect(mockSetZoomIndex).toHaveBeenCalledWith(0);
    });

    /**
     * Test: External updates synchronization
     * If zoomIndex changes externally, the internal localIndex must follow
     */
    it('should update internal state when zoomIndex changes from context', () => {
        const { rerender } = render(<InterfaceZoomSelector />);

        expect(screen.getByText('100%')).toBeInTheDocument();

        // Simulate external change (e.g., via keyboard shortcut)
        useSettings.mockReturnValue({
            zoomIndex: 0,
            setZoomIndex: mockSetZoomIndex,
            ZOOM_LEVELS: mockZoomLevels
        });

        rerender(<InterfaceZoomSelector />);

        expect(screen.getByText('75%')).toBeInTheDocument();
    });
});