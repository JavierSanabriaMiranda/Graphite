import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSelector from '../../../src/components/configuration_menu/LanguageSelector';
import { useTranslation } from 'react-i18next';

const mockChangeLanguage = vi.fn();

// Define useTranslation as a mock
vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('../../../src/components/util/SearchablePicker', () => ({
    default: ({ items, onSelect, buttonLabel, value }) => (
        <div data-testid="mock-picker">
            <div data-testid="current-value">{value}</div>
            <div data-testid="label-content">{buttonLabel}</div>
            {items.map(item => (
                <button
                    key={item.value}
                    onClick={() => onSelect(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}));

describe('LanguageSelector Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Default configuration (English)
        vi.mocked(useTranslation).mockReturnValue({
            t: (key) => key,
            i18n: {
                language: 'en',
                changeLanguage: mockChangeLanguage,
            },
        });
    });

    /**
     * Test that the component correctly displays English when 
     * the i18n instance is set to 'en'
     */
    it('should render the picker with current language (English)', () => {
        render(<LanguageSelector />);
        
        expect(screen.getByTestId('current-value')).toHaveTextContent('en');
        const label = screen.getByTestId('label-content');
        
        // Note: Flags removed as per current component implementation
        expect(label).toHaveTextContent('English');
    });

    /**
     * Verify that the UI updates the label when the language in context changes to Spanish
     */
    it('should show Español when the current language is es', () => {
        vi.mocked(useTranslation).mockReturnValue({
            t: (key) => key,
            i18n: {
                language: 'es',
                changeLanguage: mockChangeLanguage,
            },
        });

        render(<LanguageSelector />);

        expect(screen.getByTestId('current-value')).toHaveTextContent('es');
        const label = screen.getByTestId('label-content');
        expect(label).toHaveTextContent('Español');
    });

    /**
     * Test user interaction: selecting a language must call i18n.changeLanguage
     */
    it('should call i18n.changeLanguage when a language is selected', () => {
        render(<LanguageSelector />);
        
        const esButton = screen.getByText('Español');
        fireEvent.click(esButton);
        
        expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    /**
     * Test the resilience of the component: fallback to the first available language 
     * if the system reports an unsupported language code.
     */
    it('should fallback to first language if current language is not in the supported list', () => {
        vi.mocked(useTranslation).mockReturnValue({
            t: (key) => key,
            i18n: {
                language: 'fr', // Not supported language in our hardcoded list
                changeLanguage: mockChangeLanguage,
            },
        });

        render(<LanguageSelector />);

        const label = screen.getByTestId('label-content');
        expect(label).toHaveTextContent('English');
    });
});