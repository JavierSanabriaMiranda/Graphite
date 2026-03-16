import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OptionsMenu from '../../../src/components/options_menu/OptionsMenu';

// Subcomponents mock
vi.mock('../../../src/components/options_menu/ExportButton', () => ({
    default: ({ onOpenModal }) => <button onClick={onOpenModal}>Mock Export Button</button>
}));
vi.mock('../../../src/components/options_menu/ImportButton', () => ({
    default: ({ onDone }) => <button onClick={onDone}>Mock Import Button</button>
}));
vi.mock('../../../src/components/options_menu/DeleteButton', () => ({
    default: ({ onClick }) => <button onClick={onClick}>Mock Delete Button</button>
}));
vi.mock('../../../src/components/options_menu/ExportModal', () => ({
    default: ({ isOpen, onClose }) => isOpen ? (
        <div data-testid="export-modal">
            <button onClick={onClose}>Close Export</button>
        </div>
    ) : null
}));
vi.mock('../../../src/components/options_menu/DeleteConfirmModal', () => ({
    default: ({ isOpen, onClose }) => isOpen ? (
        <div data-testid="delete-modal">
            <button onClick={onClose}>Close Delete</button>
        </div>
    ) : null
}));

vi.mock('@floating-ui/react', async () => {
    const actual = await vi.importActual('@floating-ui/react');
    return { ...actual, FloatingPortal: ({ children }) => <div data-testid="portal">{children}</div> };
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

describe('OptionsMenu Component', () => {
    const mockEditor = { id: 'mock-editor' };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the main options button', () => {
        render(<OptionsMenu editor={mockEditor} />);
        expect(screen.getByTitle('editor.options_menu.options_menu')).toBeInTheDocument();
    });

    it('should toggle the menu when the button is clicked', () => {
        render(<OptionsMenu editor={mockEditor} />);
        const trigger = screen.getByTitle('editor.options_menu.options_menu');

        // Initially menu is hidden
        fireEvent.click(trigger);

        expect(screen.getByText('Mock Export Button')).toBeInTheDocument();
        expect(screen.getByText('Mock Import Button')).toBeInTheDocument();
        expect(screen.getByText('Mock Delete Button')).toBeInTheDocument();
    });

    it('should open the Export Modal and close the menu when export is clicked', () => {
        render(<OptionsMenu editor={mockEditor} />);

        fireEvent.click(screen.getByTitle('editor.options_menu.options_menu'));

        fireEvent.click(screen.getByText('Mock Export Button'));

        // Export modal must be opened
        expect(screen.getByTestId('export-modal')).toBeInTheDocument();

        // Options menu must be hidden
        const menuContainer = screen.getByText('Mock Export Button').parentElement;
        expect(menuContainer).toHaveStyle('visibility: hidden');
    });

    it('should open the Delete Confirm Modal and close the menu when delete is clicked', () => {
        render(<OptionsMenu editor={mockEditor} />);

        fireEvent.click(screen.getByTitle('editor.options_menu.options_menu'));
        fireEvent.click(screen.getByText('Mock Delete Button'));

        expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

        const menuContainer = screen.getByText('Mock Delete Button').parentElement;
        expect(menuContainer).toHaveStyle('visibility: hidden');
    });

    it('should close the modals when their onClose is called', () => {
        render(<OptionsMenu editor={mockEditor} />);

        // Open and close export
        fireEvent.click(screen.getByTitle('editor.options_menu.options_menu'));
        fireEvent.click(screen.getByText('Mock Export Button'));
        fireEvent.click(screen.getByText('Close Export'));
        expect(screen.queryByTestId('export-modal')).not.toBeInTheDocument();

        // Open and close delete
        fireEvent.click(screen.getByTitle('editor.options_menu.options_menu'));
        fireEvent.click(screen.getByText('Mock Delete Button'));
        fireEvent.click(screen.getByText('Close Delete'));
        expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });

    it('should close the menu when ImportButton signals it is done', () => {
        render(<OptionsMenu editor={mockEditor} />);

        fireEvent.click(screen.getByTitle('editor.options_menu.options_menu'));
        fireEvent.click(screen.getByText('Mock Import Button'));

        const menuContainer = screen.getByText('Mock Import Button').parentElement;
        expect(menuContainer).toHaveStyle('visibility: hidden');
    });
});