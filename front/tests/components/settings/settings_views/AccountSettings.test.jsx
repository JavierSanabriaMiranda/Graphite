import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import AccountSettings from '../../../../src/components/settings/settings_views/AccountSettings';

describe('AccountSettings Component', () => {
    const mockT = (key) => key;
    const mockOnLogoutClick = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test that the component displays all necessary internationalized strings.
     * This ensures the UI is consistent with the current language context.
     */
    it('should render correct titles and descriptions using translations', () => {
        render(<AccountSettings t={mockT} onLogoutClick={mockOnLogoutClick} />);

        // Verify title and description from i18n keys
        expect(screen.getByText('settings.account.logout.title')).toBeInTheDocument();
        expect(screen.getByText('settings.account.logout.description')).toBeInTheDocument();
        
        // Verify the logout button text
        expect(screen.getByText('settings.account.logout.logout')).toBeInTheDocument();
    });

    /**
     * Test the main interaction of the view: the logout process.
     * We verify that the callback passed from the parent (SettingsView) is triggered.
     */
    it('should trigger onLogoutClick when the logout button is pressed', () => {
        render(<AccountSettings t={mockT} onLogoutClick={mockOnLogoutClick} />);

        const logoutButton = screen.getByRole('button', { name: /settings.account.logout.logout/i });
        fireEvent.click(logoutButton);

        expect(mockOnLogoutClick).toHaveBeenCalledTimes(1);
    });

    /**
     * Test that the component renders the Lucide icon correctly.
     * Although it is a third-party library, we check that it exists in the DOM.
     */
    it('should render the LogOut icon inside the button', () => {
        const { container } = render(<AccountSettings t={mockT} onLogoutClick={mockOnLogoutClick} />);
        
        // Lucide icons are rendered as SVG elements
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('lucide-log-out');
    });

    /**
     * Verify CSS transition/animation classes are present for UX consistency.
     */
    it('should have animation classes for smooth transitions', () => {
        const { container } = render(<AccountSettings t={mockT} onLogoutClick={mockOnLogoutClick} />);
        
        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveClass('animate-in', 'fade-in', 'slide-in-from-bottom-2');
    });
});