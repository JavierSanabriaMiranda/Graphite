import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import SlashMenuList from '../../../src/components/slash_commands/SlashMenuList';

// Mock for scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('SlashMenuList Component', () => {
    const mockItems = [
        { title: 'Item 1', icon: 'path1', command: vi.fn() },
        { title: 'Item 2', icon: 'path2', command: vi.fn() },
    ];
    const mockCommand = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all items', () => {
        render(<SlashMenuList items={mockItems} command={mockCommand} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should change selection on ArrowDown', () => {
        const ref = React.createRef();
        render(<SlashMenuList items={mockItems} command={mockCommand} ref={ref} />);

        // First item selected by default
        expect(screen.getByText('Item 1').closest('button')).toHaveClass('text-primary');

        // Simulate pressing arrowDown
        act(() => {
            ref.current.onKeyDown({ event: { key: 'ArrowDown' } });
        });

        // Now second element must be selected
        expect(screen.getByText('Item 2').closest('button')).toHaveClass('text-primary');
    });

    it('should call command when clicking an item', () => {
        render(<SlashMenuList items={mockItems} command={mockCommand} />);

        fireEvent.click(screen.getByText('Item 2'));

        expect(mockCommand).toHaveBeenCalledWith(mockItems[1]);
    });

    it('should select item on Enter key', () => {
        const ref = React.createRef();
        render(<SlashMenuList items={mockItems} command={mockCommand} ref={ref} />);

        // Press enter being in first element
        ref.current.onKeyDown({ event: { key: 'Enter' } });

        expect(mockCommand).toHaveBeenCalledWith(mockItems[0]);
    });

    it('should show "no results" when items array is empty', () => {
        render(<SlashMenuList items={[]} command={mockCommand} />);
        expect(screen.getByText('common.no_result')).toBeInTheDocument();
    });
});