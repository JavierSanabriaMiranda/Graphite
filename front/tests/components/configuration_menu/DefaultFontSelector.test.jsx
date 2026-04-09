import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import DefaultFontSelector from '../../../src/components/configuration_menu/DefaultFontSelector';
import { useSettings } from '../../../src/components/context/SettingsContext';
import { useToast } from '../../../src/components/context/ToastContext';

// --- 1. MOCKS ---

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('../../../src/components/context/SettingsContext', () => ({
    useSettings: vi.fn(),
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

// Mock the generic picker to verify the props passed to it
vi.mock('../../../src/components/util/SearchablePicker', () => ({
    default: ({ items, value, onSelect, buttonLabel, placeholder }) => (
        <div data-testid="mock-picker">
            <div data-testid="picker-current-value">{value}</div>
            <div data-testid="picker-button-label">{buttonLabel}</div>
            <div data-testid="picker-placeholder">{placeholder}</div>
            {items.map((item) => (
                <button
                    key={item.value}
                    onClick={() => onSelect(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    ),
}));

describe('DefaultFontSelector Component', () => {
    let mockUpdateDefaultFont;
    let mockShowToast;

    beforeEach(() => {
        vi.clearAllMocks();

        mockUpdateDefaultFont = vi.fn();
        mockShowToast = vi.fn();

        useSettings.mockReturnValue({
            defaultFont: 'Inter',
            updateDefaultFont: mockUpdateDefaultFont,
        });

        useToast.mockReturnValue({
            showToast: mockShowToast,
        });
    });

    /**
     * Test that the component correctly identifies the active font 
     * from the settings context and renders the appropriate label.
     */
    it('should render with the current default font from settings', () => {
        render(<DefaultFontSelector />);

        expect(screen.getByTestId('mock-picker')).toBeInTheDocument();
        expect(screen.getByTestId('picker-current-value')).toHaveTextContent('Inter');
        
        const labelContent = screen.getByTestId('picker-button-label');
        expect(labelContent).toHaveTextContent('Inter');
        // Check if font-family style is applied to the span
        expect(labelContent.querySelector('span')).toHaveStyle({ fontFamily: 'Inter' });
    });

    /**
     * Verify that selecting a new font triggers both the setting update 
     * and a notification to the user about restarting the app/view.
     */
    it('should update settings and show a toast when a new font is selected', () => {
        render(<DefaultFontSelector />);

        // Simulate selecting 'Arial' from the picker items
        const arialOption = screen.getByText('Arial');
        fireEvent.click(arialOption);

        // Verify context update
        expect(mockUpdateDefaultFont).toHaveBeenCalledWith('Arial');
        
        // Verify toast notification with translation key
        expect(mockShowToast).toHaveBeenCalledWith(
            'settings.general.font.restart_notice',
            'info'
        );
    });

    /**
     * Ensure the component defaults to the first available font (Inter) 
     * if the context value is missing or invalid.
     */
    it('should fallback to the first font in the list if defaultFont is null', () => {
        useSettings.mockReturnValue({
            defaultFont: null,
            updateDefaultFont: mockUpdateDefaultFont,
        });

        render(<DefaultFontSelector />);

        // Should find 'Inter' (the first one in FONTS array)
        const labelContent = screen.getByTestId('picker-button-label');
        expect(labelContent).toHaveTextContent('Inter');
    });

    /**
     * Verification of the data structure sent to the generic SearchablePicker
     */
    it('should pass all font options to the SearchablePicker', () => {
        render(<DefaultFontSelector />);
        
        // Check for specific fonts in the list
        expect(screen.getByText('Courier New')).toBeInTheDocument();
        expect(screen.getByText('Georgia')).toBeInTheDocument();
        expect(screen.getByText('Times New Roman')).toBeInTheDocument();
    });

    /**
     * Test i18n integration for search placeholder
     */
    it('should display the correct translated search placeholder', () => {
        render(<DefaultFontSelector />);
        expect(screen.getByTestId('picker-placeholder')).toHaveTextContent('settings.general.font.search');
    });
});