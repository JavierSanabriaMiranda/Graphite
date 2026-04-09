import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import WorkspaceSelector from '../../../src/components/navigation/WorkspaceSelector';
import { useWorkspace } from '../../../src/components/context/WorkspaceContext';
import { useIsMobile } from '../../../src/hooks/useIsMobile';

// --- 1. MOCKS ---

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/WorkspaceContext', () => ({
    useWorkspace: vi.fn(),
}));

vi.mock('../../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

// Mock Floating UI to avoid portal/positioning issues in JSDOM
// Mock más robusto de Floating UI
vi.mock('@floating-ui/react', () => {
    const React = require('react');
    return {
        useFloating: ({ onOpenChange, open }) => ({
            refs: { 
                setReference: vi.fn(), 
                setFloating: vi.fn() 
            },
            floatingStyles: {},
            context: { open, onOpenChange },
        }),
        autoUpdate: vi.fn(),
        offset: vi.fn(),
        flip: vi.fn(),
        shift: vi.fn(),
        useClick: (context) => ({
            getReferenceProps: () => ({
                onClick: () => context.onOpenChange(!context.open)
            })
        }),
        useDismiss: vi.fn(() => ({})),
        useRole: vi.fn(() => ({})),
        useInteractions: (interactions) => ({
            getReferenceProps: () => interactions[0].getReferenceProps(),
            getFloatingProps: () => ({}),
        }),
        FloatingPortal: ({ children }) => <div data-testid="floating-portal">{children}</div>,
    };
});

describe('WorkspaceSelector Component', () => {
    const mockSelectWorkspace = vi.fn();
    const mockOpenCreation = vi.fn();
    
    const mockWorkspaces = [
        { workspace_id: 'ws-1', name: 'Work', icon: '💼' },
        { workspace_id: 'ws-2', name: 'Personal', icon: '🏠' }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        useIsMobile.mockReturnValue(false); // Default to desktop
        useWorkspace.mockReturnValue({
            workspaces: mockWorkspaces,
            activeWorkspace: mockWorkspaces[0],
            selectWorkspace: mockSelectWorkspace,
            openCreation: mockOpenCreation
        });
    });

    /**
     * Verify that the selector renders the active workspace name and icon correctly.
     */
    it('should render the active workspace information', () => {
        render(<WorkspaceSelector />);
        
        expect(screen.getByText('Work')).toBeInTheDocument();
        expect(screen.getByText('💼')).toBeInTheDocument();
    });

    /**
     * Test the opening of the floating menu when clicking the reference button.
     */
    it('should open the floating menu when clicked', () => {
        render(<WorkspaceSelector />);
        
        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);
        
        // Check if the portal and the workspace list are rendered
        expect(screen.getByTestId('floating-portal')).toBeInTheDocument();
        expect(screen.getByText('workspaces.title')).toBeInTheDocument();
        expect(screen.getByText('Personal')).toBeInTheDocument();
    });

    /**
     * Ensure that selecting a different workspace calls the correct function 
     * and closes the menu.
     */
    it('should call selectWorkspace and close menu when a workspace is selected', () => {
        render(<WorkspaceSelector />);
        
        // Open menu
        fireEvent.click(screen.getByRole('button'));
        
        // Click on the second workspace
        const personalWsBtn = screen.getByText('Personal');
        fireEvent.click(personalWsBtn);
        
        expect(mockSelectWorkspace).toHaveBeenCalledWith(mockWorkspaces[1]);
        // The portal should be removed after selection (isOpen becomes false)
        expect(screen.queryByTestId('floating-portal')).not.toBeInTheDocument();
    });

    /**
     * Test the "Create Workspace" button interaction.
     */
    it('should call openCreation and close menu when create button is clicked', () => {
        render(<WorkspaceSelector />);
        
        fireEvent.click(screen.getByRole('button'));
        
        const createBtn = screen.getByText('workspaces.create');
        fireEvent.click(createBtn);
        
        expect(mockOpenCreation).toHaveBeenCalled();
        expect(screen.queryByTestId('floating-portal')).not.toBeInTheDocument();
    });

    /**
     * Check if the layout adapts to mobile view using the custom hook.
     */
    it('should apply mobile classes when useIsMobile is true', () => {
        useIsMobile.mockReturnValue(true);
        const { container } = render(<WorkspaceSelector />);
        
        const trigger = container.querySelector('button');
        // Check for specific mobile padding/margin or size classes
        expect(trigger).toHaveClass('p-2', '-ml-2', 'mb-6');
        
        const iconContainer = trigger.querySelector('div');
        expect(iconContainer).toHaveClass('w-12', 'h-12', 'text-2xl');
    });

    /**
     * Verify fallback behavior when the workspace doesn't have an icon.
     */
    it('should render the first letter of the name as icon if no emoji is provided', () => {
        useWorkspace.mockReturnValue({
            workspaces: mockWorkspaces,
            activeWorkspace: { workspace_id: 'ws-3', name: 'Alpha', icon: null },
            selectWorkspace: mockSelectWorkspace,
            openCreation: mockOpenCreation
        });

        render(<WorkspaceSelector />);
        expect(screen.getByText('A')).toBeInTheDocument();
    });
});