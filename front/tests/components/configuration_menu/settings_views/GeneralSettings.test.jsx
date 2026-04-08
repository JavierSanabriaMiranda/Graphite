import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

vi.mock('../../../../../src/components/context/SettingsContext', () => ({
    useSettings: () => ({
        defaultFont: 'Inter',
        updateDefaultFont: vi.fn(),
    }),
}));

vi.mock('../../../../../src/components/context/ToastContext', () => ({
    useToast: () => ({
        showToast: vi.fn(),
    }),
}));


vi.mock('../../../../src/components/configuration_menu/LanguageSelector', () => ({
    default: () => <div>Language Selector Component</div>,
}));

vi.mock('../../../../src/components/configuration_menu/DefaultFontSelector', () => ({
    default: () => <div>Font Selector Component</div>,
}));

// --- 3. IMPORT DEL COMPONENTE ---
import GeneralSettings from '../../../../src/components/configuration_menu/settings_views/GeneralSettings';

describe('GeneralSettings Component', () => {
    const mockT = (key) => key;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test: Check titles and descriptions using translations.
     */
    it('should render the general settings structure with correct translated labels', () => {
        render(<GeneralSettings t={mockT} />);

        expect(screen.getByText('settings.general.language.title')).toBeInTheDocument();
        expect(screen.getByText('settings.general.font.title')).toBeInTheDocument();
    });

    /**
     * Test: Verify that children are rendered.
     * Instead of using data-testid, we look for the text rendered by our mocks.
     */
    it('should include the LanguageSelector and DefaultFontSelector components', () => {
        render(<GeneralSettings t={mockT} />);

        expect(screen.getByText('Language Selector Component')).toBeInTheDocument();
        expect(screen.getByText('Font Selector Component')).toBeInTheDocument();
    });

    /**
     * Test: Layout and animations classes.
     */
    it('should apply the correct layout and animation classes', () => {
        const { container } = render(<GeneralSettings t={mockT} />);
        
        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveClass('animate-in', 'fade-in', 'slide-in-from-bottom-2');
    });

    /**
     * Test: Fallback mechanism when translation keys are missing.
     */
    it('should use fallback strings for font section if translation keys are missing', () => {
        const mockTWithMissing = (key) => {
            if (key.includes('font')) return undefined;
            return key;
        };

        render(<GeneralSettings t={mockTWithMissing} />);

        // We check the hardcoded strings from your component's (|| "Default Editor Font") logic
        expect(screen.getByText('Default Editor Font')).toBeInTheDocument();
        expect(screen.getByText('Choose the font that will be used by default in your notes.')).toBeInTheDocument();
    });
});