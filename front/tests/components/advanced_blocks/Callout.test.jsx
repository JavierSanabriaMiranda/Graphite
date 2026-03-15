import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { Callout, CalloutComponent } from '../../../src/components/advanced_blocks/Callout'; 

vi.mock('@tiptap/react', () => ({
    NodeViewWrapper: ({ children, className }) => <div className={className} data-testid="node-view-wrapper">{children}</div>,
    NodeViewContent: ({ className }) => <div className={className} data-testid="node-view-content" />,
    ReactNodeViewRenderer: vi.fn(),
}));

vi.mock('../../../src/components/util/EmojiPicker', () => ({
    default: ({ children, onSelect }) => (
        <div data-testid="emoji-picker-mock" onClick={() => onSelect('🚀')}>
            {children}
        </div>
    ),
}));

describe('CalloutComponent', () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            node: {
                attrs: {
                    emoji: '💡'
                }
            },
            updateAttributes: vi.fn()
        };
    });

    it('should render the default emoji', () => {
        render(<CalloutComponent {...mockProps} />);
        expect(screen.getByText('💡')).toBeInTheDocument();
    });

    it('should render an SVG icon if the emoji string is long (SVG path)', () => {
        const svgPath = 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5';
        mockProps.node.attrs.emoji = svgPath;
        
        const { container } = render(<CalloutComponent {...mockProps} />);
        const svg = container.querySelector('svg');
        const path = container.querySelector('path');
        
        expect(svg).toBeInTheDocument();
        expect(path).toHaveAttribute('d', svgPath);
    });

    it('should call updateAttributes when a new emoji is selected', () => {
        render(<CalloutComponent {...mockProps} />);
        
        // El mock de EmojiPicker dispara onSelect('🚀') al hacer click
        fireEvent.click(screen.getByTestId('emoji-picker-mock'));

        expect(mockProps.updateAttributes).toHaveBeenCalledWith({ emoji: '🚀' });
    });

    it('should render the NodeViewContent for Tiptap to inject text', () => {
        render(<CalloutComponent {...mockProps} />);
        expect(screen.getByTestId('node-view-content')).toHaveClass('callout-content');
    });
});

describe('Callout Extension Logic', () => {
    it('should have the correct name and group', () => {
        expect(Callout.name).toBe('callout');
        expect(Callout.config.group).toBe('block');
    });

    it('should define default attributes', () => {
        const attributes = Callout.config.addAttributes();
        expect(attributes.emoji.default).toBe('💡');
    });

    describe('toggleCallout Command', () => {
        it('should wrap in callout if it is not active', () => {
            const mockCommands = {
                wrapIn: vi.fn(),
                lift: vi.fn()
            };
            const mockEditor = {
                isActive: vi.fn().mockReturnValue(false)
            };

            const command = Callout.config.addCommands().toggleCallout();
            command({ commands: mockCommands, editor: mockEditor });

            expect(mockCommands.wrapIn).toHaveBeenCalledWith('callout');
            expect(mockCommands.lift).not.toHaveBeenCalled();
        });

        it('should lift from callout if it is already active', () => {
            const mockCommands = {
                wrapIn: vi.fn(),
                lift: vi.fn()
            };
            const mockEditor = {
                isActive: vi.fn().mockReturnValue(true)
            };

            const command = Callout.config.addCommands().toggleCallout();
            command({ commands: mockCommands, editor: mockEditor });

            expect(mockCommands.lift).toHaveBeenCalledWith('callout');
            expect(mockCommands.wrapIn).not.toHaveBeenCalled();
        });
    });

    it('should render correct HTML structure', () => {
        const node = { attrs: { emoji: '🔥' } };
        const html = Callout.config.renderHTML({ 
            HTMLAttributes: { class: 'test' }, 
            node 
        });

        expect(html[0]).toBe('div');
        expect(html[1]['data-type']).toBe('callout');
        expect(html[2][2]).toBe('🔥'); // El emoji en el div de icono
    });
});