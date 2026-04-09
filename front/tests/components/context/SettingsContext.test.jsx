import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SettingsProvider, useSettings } from '../../../src/components/context/SettingsContext';

/**
 * Consumer component to interact with the SettingsContext during tests
 */
const SettingsConsumer = () => {
    const { defaultFont, updateDefaultFont } = useSettings();
    return (
        <div>
            <span data-testid="current-font">{defaultFont}</span>
            <button onClick={() => updateDefaultFont('Arial')}>Change to Arial</button>
        </div>
    );
};

describe('SettingsContext - SettingsProvider', () => {
    
    beforeEach(() => {
        // Clear localStorage before each test to ensure isolation
        localStorage.clear();
        vi.clearAllMocks();
    });

    /**
     * Test that the provider initializes with the default value 
     * if localStorage is empty.
     */
    it('should initialize with "Inter" as default font if no preference is stored', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );

        expect(screen.getByTestId('current-font')).toHaveTextContent('Inter');
    });

    /**
     * Test that the provider reads and uses values from localStorage 
     * during its initialization.
     */
    it('should initialize with value from localStorage if present', () => {
        localStorage.setItem('pref_font', 'Georgia');

        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );

        expect(screen.getByTestId('current-font')).toHaveTextContent('Georgia');
    });

    /**
     * Test the update function: it should update the React state 
     * and persist the change in localStorage.
     */
    it('should update state and localStorage when updateDefaultFont is called', () => {
        render(
            <SettingsProvider>
                <SettingsConsumer />
            </SettingsProvider>
        );

        const button = screen.getByText('Change to Arial');
        fireEvent.click(button);

        // Check React state update
        expect(screen.getByTestId('current-font')).toHaveTextContent('Arial');
        
        // Check localStorage persistence
        expect(localStorage.getItem('pref_font')).toBe('Arial');
    });

    /**
     * Safety check for the custom hook error boundary.
     */
    it('should throw error if useSettings is used outside of SettingsProvider', () => {
        // Suppress console.error for this expected error to keep logs clean
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        const ComponentOutside = () => {
            useSettings();
            return null;
        };

        expect(() => render(<ComponentOutside />)).toThrow('useSettings debe usarse dentro de un SettingsProvider');
        
        consoleSpy.mockRestore();
    });
});