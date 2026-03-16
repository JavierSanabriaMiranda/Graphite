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
                    key={item.code}
                    onClick={() => onSelect(item.code)}
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

    it('should render the picker with current language (English)', () => {
        render(<LanguageSelector />);
        expect(screen.getByTestId('current-value')).toHaveTextContent('en');
        const label = screen.getByTestId('label-content');
        expect(label).toHaveTextContent('🇺🇸');
        expect(label).toHaveTextContent('English');
    });

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
        expect(label).toHaveTextContent('🇪🇸');
        expect(label).toHaveTextContent('Español');
    });

    it('should call i18n.changeLanguage when a language is selected', () => {
        render(<LanguageSelector />);
        const esButton = screen.getByText('Español');
        fireEvent.click(esButton);
        expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    it('should fallback to first language if current language is not in the list', () => {
        vi.mocked(useTranslation).mockReturnValue({
            t: (key) => key,
            i18n: {
                language: 'fr', // Not supported language
                changeLanguage: mockChangeLanguage,
            },
        });

        render(<LanguageSelector />);

        const label = screen.getByTestId('label-content');
        expect(label).toHaveTextContent('English');
    });
});