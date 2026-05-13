import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import LogoutModal from '../../../../src/components/settings/settings_views/LogoutModal';

// --- 1. MOCKS ---

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

// Mock Floating UI to simplify DOM structure during tests
vi.mock('@floating-ui/react', () => ({
    useFloating: () => ({ refs: { setFloating: vi.fn() }, context: {} }),
    useDismiss: vi.fn(),
    useRole: vi.fn(),
    useInteractions: () => ({ getFloatingProps: () => ({}) }),
    FloatingPortal: ({ children }) => <div data-testid="floating-portal">{children}</div>,
    FloatingOverlay: ({ children, style, className }) => (
        <div data-testid="floating-overlay" style={style} className={className}>
            {children}
        </div>
    ),
}));

describe('LogoutModal Component', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Verify that the modal returns null when isOpen is false.
     */
    it('should not render anything when isOpen is false', () => {
        const { container } = render(
            <LogoutModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} isUnsynced={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    /**
     * Test the warning view (when there is unsynced local data).
     * We verify the change in title, description and the warning icon.
     */
    it('should render warning message and AlertTriangle icon when isUnsynced is true', () => {
        const { container } = render(
            <LogoutModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} isUnsynced={true} />
        );

        expect(screen.getByText('settings.account.logout.unsynced_title')).toBeInTheDocument();
        expect(screen.getByText('settings.account.logout.unsynced_description')).toBeInTheDocument();
        
        // Find the icon SVG and verify it has the alert/triangle related class
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
        
        // Match either 'alert' or 'triangle' to support different Lucide versions
        const className = icon.getAttribute('class');
        expect(className).toMatch(/alert|triangle/);
    });

    /**
     * Test the standard logout view.
     */
    it('should render standard confirmation message and LogOut icon when isUnsynced is false', () => {
        const { container } = render(
            <LogoutModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} isUnsynced={false} />
        );

        expect(screen.getByText('settings.account.logout.confirm_title')).toBeInTheDocument();
        
        // Verify the logout icon is present
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute('class')).toContain('lucide-log-out');
    });

    /**
     * Verify the interaction when the user confirms the logout.
     */
    it('should call onConfirm and onClose when logout button is clicked', () => {
        render(<LogoutModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} isUnsynced={false} />);

        const logoutBtn = screen.getByRole('button', { name: 'settings.account.logout.logout' });
        fireEvent.click(logoutBtn);

        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    /**
     * Ensure the cancel button only triggers the onClose callback.
     */
    it('should only call onClose when cancel button is clicked', () => {
        render(<LogoutModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} isUnsynced={false} />);

        const cancelBtn = screen.getByRole('button', { name: 'common.cancel' });
        fireEvent.click(cancelBtn);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
        expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    /**
     * Visual and accessibility check for the overlay.
     */
    it('should render with correct overlay styles and backdrop blur', () => {
        render(<LogoutModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} isUnsynced={false} />);

        const overlay = screen.getByTestId('floating-overlay');
        expect(overlay).toHaveStyle({
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)'
        });
    });
});