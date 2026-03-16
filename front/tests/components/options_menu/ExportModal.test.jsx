import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExportModal from '../../../src/components/options_menu/ExportModal';
import { useToast } from '../../../src/components/context/ToastContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

vi.mock('@floating-ui/react', async () => {
    const actual = await vi.importActual('@floating-ui/react');
    return { ...actual, FloatingPortal: ({ children }) => <div>{children}</div> };
});

global.URL.createObjectURL = vi.fn(() => 'blob:url-de-prueba');
global.URL.revokeObjectURL = vi.fn();

describe('ExportModal Component', () => {
    let mockEditor;
    let mockOnClose;
    let mockShowToast;

    beforeEach(() => {
        vi.clearAllMocks();

        mockOnClose = vi.fn();
        mockShowToast = vi.fn();
        vi.mocked(useToast).mockReturnValue({ showToast: mockShowToast });

        mockEditor = {
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            getHTML: vi.fn().mockReturnValue('<p>Hola Mundo</p>'),
        };
    });

    it('should render nothing when isOpen is false', () => {
        const { container } = render(
            <ExportModal isOpen={false} onClose={mockOnClose} editor={mockEditor} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render correctly when open', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        expect(screen.getByText('editor.options_menu.export.modal_title')).toBeInTheDocument();
        // Ignore cases
        expect(screen.getByText(/json/i)).toBeInTheDocument();
        expect(screen.getByText(/html/i)).toBeInTheDocument();
    });

    it('should change the selected format when clicking options', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        const htmlButton = screen.getByRole('button', { name: /HTML/i });
        const jsonButton = screen.getByRole('button', { name: /JSON/i });

        // By default is JSON, click on HTML
        fireEvent.click(htmlButton);
        expect(htmlButton).toHaveClass('border-blue-500'); // Selection class

        // Come back to JSON
        fireEvent.click(jsonButton);
        expect(jsonButton).toHaveClass('border-blue-500');
    });

    it('should export as JSON and trigger download', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        // Spy 'a' creation element and it's click method
        const linkClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));

        expect(mockEditor.getJSON).toHaveBeenCalled();
        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(linkClickSpy).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_success', 'success');
        expect(mockOnClose).toHaveBeenCalled();

        linkClickSpy.mockRestore();
    });

    it('should export as HTML when selected', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        // Select HTML
        fireEvent.click(screen.getByRole('button', { name: /HTML/i }));

        const linkClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));

        expect(mockEditor.getHTML).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith(expect.any(String), 'success');

        linkClickSpy.mockRestore();
    });

    it('should call onClose when Cancel button is clicked', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        fireEvent.click(screen.getByText('editor.options_menu.export.modal_cancel'));
        expect(mockOnClose).toHaveBeenCalled();
    });
});