import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import Backlinks from '../../../src/components/navigation/Backlinks';

vi.mock('@floating-ui/react', () => {
    // Variables to capture the state and setter from the component
    let currentOpen = false;
    let currentOnOpenChange = () => {};

    return {
        useFloating: (config) => {
            currentOpen = config.open;
            currentOnOpenChange = config.onOpenChange;
            return {
                refs: { setReference: vi.fn(), setFloating: vi.fn() },
                floatingStyles: {},
                context: { open: currentOpen, onOpenChange: currentOnOpenChange }
            };
        },
        autoUpdate: vi.fn(),
        offset: vi.fn(),
        flip: vi.fn(),
        shift: vi.fn(),
        useClick: vi.fn(),
        useDismiss: vi.fn(),
        useRole: vi.fn(),
        useInteractions: () => ({
            getReferenceProps: (userProps) => ({
                ...userProps,
                // Manually bridge the click event to the component's state setter
                onClick: (e) => {
                    if (userProps?.onClick) userProps.onClick(e);
                    currentOnOpenChange(!currentOpen);
                }
            }),
            getFloatingProps: (userProps) => userProps,
        }),
        // Portal renders children directly into the test DOM
        FloatingPortal: ({ children }) => <div data-testid="portal-root">{children}</div>,
        FloatingFocusManager: ({ children }) => <>{children}</>,
    };
});

// --- 2. OTHER MOCKS ---

const mockSelectNote = vi.fn();
vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: () => ({
        selectNote: mockSelectNote
    }),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/util/NoteIcon', () => ({
    default: ({ iconChar }) => <span>{iconChar}</span>
}));

vi.mock('../../../src/components/util/DropdownArrow', () => ({
    default: () => <span />
}));

describe('Backlinks Component', () => {
    const mockBacklinks = [
        { note_id: '1', title: 'Reference Note 1', updated_at: '2026-05-10T10:00:00Z', icon: '📝' },
        { note_id: '2', title: 'Reference Note 2', updated_at: '2026-05-11T12:00:00Z', icon: null }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return null if backlinks array is empty', () => {
        const { container } = render(<Backlinks backlinks={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the trigger button with the correct count', () => {
        render(<Backlinks backlinks={mockBacklinks} />);
        expect(screen.getByText(/2/)).toBeInTheDocument();
        expect(screen.getByText(/editor.info_bar.backlinks/)).toBeInTheDocument();
    });

    /**
     * TEST: Opening the list and selecting a note
     */
    it('should open the list and handle selection', async () => {
        render(<Backlinks backlinks={mockBacklinks} />);
        
        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        // Find the note title that should appear in the portal
        const noteItem = await screen.findByText('Reference Note 1');
        expect(noteItem).toBeInTheDocument();

        // Simulate selection
        fireEvent.click(noteItem);
        expect(mockSelectNote).toHaveBeenCalledWith(mockBacklinks[0]);

        // List should be closed now
        await waitFor(() => {
            expect(screen.queryByText('Reference Note 1')).not.toBeInTheDocument();
        });
    });

    /**
     * TEST: Date formatting logic
     */
    it('should display formatted dates when open', async () => {
        render(<Backlinks backlinks={mockBacklinks} />);
        
        fireEvent.click(screen.getByRole('button'));

        const expectedDate = new Date(mockBacklinks[0].updated_at).toLocaleDateString();
        // findAllByText handles multiple notes sharing the same date
        const dateElements = await screen.findAllByText(expectedDate);
        expect(dateElements.length).toBeGreaterThan(0);
    });
});