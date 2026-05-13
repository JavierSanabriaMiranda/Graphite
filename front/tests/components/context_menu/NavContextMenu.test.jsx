import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import NavContextMenu from '../../../src/components/context_menu/NavContextMenu';

// Mock Floating UI to handle virtual positioning and portals in JSDOM
vi.mock('@floating-ui/react', () => ({
    useFloating: () => ({
        refs: { setFloating: vi.fn(), setPositionReference: vi.fn() },
        floatingStyles: { position: 'absolute', top: 0, left: 0 },
        context: {}
    }),
    offset: vi.fn(),
    flip: vi.fn(),
    shift: vi.fn(),
    useDismiss: vi.fn(),
    useInteractions: () => ({ getFloatingProps: vi.fn(() => ({})) }),
    FloatingPortal: ({ children }) => <div>{children}</div>,
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

describe('NavContextMenu Component', () => {
    const mockOnClose = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnCreateSubpage = vi.fn();

    const defaultProps = {
        x: 150,
        y: 300,
        onClose: mockOnClose,
        onDeleteClick: mockOnDelete,
        onCreateSubpageClick: mockOnCreateSubpage
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all navigation menu items correctly', () => {
        render(<NavContextMenu {...defaultProps} />);

        expect(screen.getByText('sidebar.context_menu.add_subpage')).toBeInTheDocument();
        expect(screen.getByText('sidebar.context_menu.delete_page')).toBeInTheDocument();
    });

    it('should call onCreateSubpageClick and close menu when "Add Subpage" is clicked', () => {
        render(<NavContextMenu {...defaultProps} />);

        const addButton = screen.getByText('sidebar.context_menu.add_subpage');
        fireEvent.click(addButton);

        expect(mockOnCreateSubpage).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onDeleteClick and close menu when "Delete Page" is clicked', () => {
        render(<NavContextMenu {...defaultProps} />);

        const deleteButton = screen.getByText('sidebar.context_menu.delete_page');
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should have a red text style for the delete action', () => {
        render(<NavContextMenu {...defaultProps} />);

        const deleteButton = screen.getByText('sidebar.context_menu.delete_page').closest('button');
        expect(deleteButton).toHaveClass('text-red-500');
    });
});