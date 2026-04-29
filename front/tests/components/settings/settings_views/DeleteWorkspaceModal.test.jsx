import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import DeleteWorkspaceModal from '../../../../src/components/settings/settings_views/DeleteWorkspaceModal';

// --- 1. MOCKS ---

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        // Mocking 't' to return the key and any interpolation data for verification
        t: (key, options) => options?.name ? `${key}:${options.name}` : key,
    }),
}));

// Mock Floating UI components to avoid portal rendering issues in JSDOM
vi.mock('@floating-ui/react', () => ({
    useFloating: () => ({ refs: { setFloating: vi.fn() }, context: {} }),
    useDismiss: vi.fn(),
    useRole: vi.fn(),
    useInteractions: () => ({ getFloatingProps: () => ({}) }),
    FloatingPortal: ({ children }) => <div data-testid="floating-portal">{children}</div>,
    FloatingOverlay: ({ children, style }) => (
        <div data-testid="floating-overlay" style={style}>
            {children}
        </div>
    ),
}));

describe('DeleteWorkspaceModal Component', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();
    const workspaceName = "Personal Projects";

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Ensure the modal returns null when isOpen is false to prevent
     * unnecessary DOM elements.
     */
    it('should not render anything when isOpen is false', () => {
        const { container } = render(
            <DeleteWorkspaceModal 
                isOpen={false} 
                onClose={mockOnClose} 
                workspaceName={workspaceName} 
                onConfirm={mockOnConfirm} 
            />
        );
        expect(container.firstChild).toBeNull();
    });

    /**
     * Verify that the modal displays the workspace name within the
     * description text via i18n interpolation.
     */
    it('should render the workspace name in the description', () => {
        render(
            <DeleteWorkspaceModal 
                isOpen={true} 
                onClose={mockOnClose} 
                workspaceName={workspaceName} 
                onConfirm={mockOnConfirm} 
            />
        );

        // Based on our mock 't', it should contain the key and the name
        expect(screen.getByText(new RegExp(workspaceName))).toBeInTheDocument();
        expect(screen.getByText('settings.workspace.delete_confirm_title')).toBeInTheDocument();
    });

    /**
     * Test the negative interaction: clicking cancel should only trigger onClose.
     */
    it('should call onClose when the cancel button is clicked', () => {
        render(
            <DeleteWorkspaceModal 
                isOpen={true} 
                onClose={mockOnClose} 
                workspaceName={workspaceName} 
                onConfirm={mockOnConfirm} 
            />
        );

        const cancelBtn = screen.getByRole('button', { name: /common.cancel/i });
        fireEvent.click(cancelBtn);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
        expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    /**
     * Test the positive interaction: clicking delete should trigger
     * both the confirmation logic and close the modal.
     */
    it('should call onConfirm and onClose when the delete button is clicked', () => {
        render(
            <DeleteWorkspaceModal 
                isOpen={true} 
                onClose={mockOnClose} 
                workspaceName={workspaceName} 
                onConfirm={mockOnConfirm} 
            />
        );

        const deleteBtn = screen.getByRole('button', { name: /common.delete/i });
        fireEvent.click(deleteBtn);

        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    /**
     * Check for visual hierarchy, icons and overlay styles.
     */
    it('should render with correct visual hierarchy and icons', () => {
        const { container } = render(
            <DeleteWorkspaceModal 
                isOpen={true} 
                onClose={mockOnClose} 
                workspaceName={workspaceName} 
                onConfirm={mockOnConfirm} 
            />
        );

        // We look for the SVG and check it has the 'lucide' class 
        // and something related to 'alert' or 'triangle' to be flexible
        const svgIcon = container.querySelector('svg');
        expect(svgIcon).toBeInTheDocument();
        expect(svgIcon).toHaveClass('lucide');
        
        // Match either the old or the new Lucide class naming convention
        const className = svgIcon.getAttribute('class');
        expect(className).toMatch(/alert|triangle/);
        
        // Verify the overlay styles (background and blur)
        const overlay = screen.getByTestId('floating-overlay');
        expect(overlay).toHaveStyle({
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)'
        });
    });
});