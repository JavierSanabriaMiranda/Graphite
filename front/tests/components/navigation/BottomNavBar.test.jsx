import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BottomNavbar from '../../../src/components/navigation/BottomNavBar';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                'nav.editor': 'Editor',
                'nav.browse': 'Browse',
                'nav.search': 'Search',
                'nav.settings': 'Settings'
            };
            return translations[key] || key;
        }
    }),
}));

describe('BottomNavbar Component', () => {
    const mockOnTabChange = vi.fn();

    it('renders all navigation tabs', () => {
        render(<BottomNavbar onTabChange={mockOnTabChange} />);
        
        expect(screen.getByText('Editor')).toBeInTheDocument();
        expect(screen.getByText('Browse')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('highlights the active tab correctly', () => {
        const { rerender } = render(
            <BottomNavbar activeTab="search" onTabChange={mockOnTabChange} />
        );

        // Search button has to have text-primary class
        const searchBtn = screen.getByText('Search').closest('button');
        expect(searchBtn).toHaveClass('text-primary');

        // Others shouldn't have text-primary class
        const editorBtn = screen.getByText('Editor').closest('button');
        expect(editorBtn).not.toHaveClass('text-primary');
        expect(editorBtn).toHaveClass('text-zinc-500');

        // Change prop and verify it updates style
        rerender(<BottomNavbar activeTab="browse" onTabChange={mockOnTabChange} />);
        expect(screen.getByText('Browse').closest('button')).toHaveClass('text-primary');
    });

    it('calls onTabChange with the correct id when a tab is clicked', () => {
        render(<BottomNavbar onTabChange={mockOnTabChange} />);

        const settingsBtn = screen.getByText('Settings').closest('button');
        fireEvent.click(settingsBtn);

        expect(mockOnTabChange).toHaveBeenCalledTimes(1);
        expect(mockOnTabChange).toHaveBeenCalledWith('settings');
    });

    it('applies zoom-in animation only to the active tab icon', () => {
        render(<BottomNavbar activeTab="editor" onTabChange={mockOnTabChange} />);
        
        // Look for div that wrapps icon editor
        const editorIconWrapper = screen.getByText('Editor').previousSibling;
        expect(editorIconWrapper).toHaveClass('animate-in', 'zoom-in');

        // Search shouldn't have it
        const searchIconWrapper = screen.getByText('Search').previousSibling;
        expect(searchIconWrapper).not.toHaveClass('animate-in', 'zoom-in');
    });

    it('uses "editor" as default activeTab if none is provided', () => {
        render(<BottomNavbar onTabChange={mockOnTabChange} />);
        
        const editorBtn = screen.getByText('Editor').closest('button');
        expect(editorBtn).toHaveClass('text-primary');
    });
});