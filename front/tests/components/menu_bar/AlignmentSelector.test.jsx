import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AlignmentSelector from '../../../src/components/menu_bar/AlignmentSelector';
import { useEditorState } from '@tiptap/react';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditorState: vi.fn(),
    };
});

vi.mock('../../../src/components/util/DropdownArrow', () => ({
    default: ({ menuOpen }) => <div data-testid="dropdown-arrow" data-open={menuOpen} />
}));

describe('AlignmentSelector Suite', () => {
    let mockEditor;
    let mockChain;

    beforeEach(() => {
        vi.clearAllMocks();

        mockChain = {
            focus: vi.fn().mockReturnThis(),
            setTextAlign: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Default state: Alignment to left
        vi.mocked(useEditorState).mockImplementation(({ selector }) => {
            const ctx = {
                editor: {
                    isActive: vi.fn((query) => {
                        return false;
                    }),
                }
            };
            return selector(ctx);
        });
    });

    it('should return null if no editor is provided', () => {
        const { container } = render(<AlignmentSelector editor={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the default Left alignment icon', () => {
        render(<AlignmentSelector editor={mockEditor} />);

        const svg = screen.getByRole('button').querySelector('svg');
        const path = svg.querySelector('path');
        expect(path).toHaveAttribute('d', 'M3 6h18M3 12h10M3 18h18');
    });

    it('should show the correct icon based on editor state (Center)', () => {
        vi.mocked(useEditorState).mockImplementation(({ selector }) => {
            const ctx = {
                editor: {
                    isActive: vi.fn((query) => query.textAlign === 'center'),
                }
            };
            return selector(ctx);
        });

        render(<AlignmentSelector editor={mockEditor} />);

        const svg = screen.getByRole('button').querySelector('svg');
        const path = svg.querySelector('path');
        expect(path).toHaveAttribute('d', 'M3 6h18M7 12h10M3 18h18');
    });

    it('should open the dropdown menu when clicked', () => {
        render(<AlignmentSelector editor={mockEditor} />);

        const mainButton = screen.getByTitle('editor.toolbar.alignment.alignment');
        fireEvent.click(mainButton);

        // Verify that menu options appear
        expect(screen.getByTitle('editor.toolbar.alignment.center')).toBeInTheDocument();
        expect(screen.getByTitle('editor.toolbar.alignment.right')).toBeInTheDocument();
        expect(screen.getByTitle('editor.toolbar.alignment.justify')).toBeInTheDocument();
    });

    it('should call setTextAlign and close menu when an option is selected', () => {
        render(<AlignmentSelector editor={mockEditor} />);

        // Open Menu
        fireEvent.click(screen.getByTitle('editor.toolbar.alignment.alignment'));

        // Click on "Right" option
        const rightButton = screen.getByTitle('editor.toolbar.alignment.right');
        fireEvent.click(rightButton);

        // Verify tiptap commands
        expect(mockEditor.chain).toHaveBeenCalled();
        expect(mockChain.setTextAlign).toHaveBeenCalledWith('right');
        expect(mockChain.run).toHaveBeenCalled();

        // Verify menu is closed
        expect(screen.queryByTitle('editor.toolbar.alignment.center')).not.toBeInTheDocument();
    });

    it('should apply active classes to the selected alignment in the menu', () => {
        // Force "justify" state
        vi.mocked(useEditorState).mockImplementation(({ selector }) => {
            const ctx = {
                editor: {
                    isActive: vi.fn((query) => query.textAlign === 'justify'),
                }
            };
            return selector(ctx);
        });

        render(<AlignmentSelector editor={mockEditor} />);

        // Open menu
        fireEvent.click(screen.getByTitle('editor.toolbar.alignment.alignment'));

        const justifyButton = screen.getByTitle('editor.toolbar.alignment.justify');
        // Must have bg-primary class
        expect(justifyButton).toHaveClass('bg-primary');
    });
});