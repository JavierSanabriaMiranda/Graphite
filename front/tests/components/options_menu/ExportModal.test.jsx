import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExportModal from '../../../src/components/options_menu/ExportModal';
import { useToast } from '../../../src/components/context/ToastContext';
import { useNote } from '../../../src/components/context/NoteContext';
import { exportNoteToHtml } from '../../../src/components/options_menu/export/exportNoteToHtml';
import { exportNoteToPdf } from '../../../src/components/options_menu/export/exportNoteToPdf';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

// Mock external export functions
vi.mock('../../../src/components/options_menu/export/exportNoteToHtml', () => ({
    exportNoteToHtml: vi.fn(),
}));

vi.mock('../../../src/components/options_menu/export/exportNoteToPdf', () => ({
    exportNoteToPdf: vi.fn(),
}));

vi.mock('@floating-ui/react', async () => {
    const actual = await vi.importActual('@floating-ui/react');
    return { ...actual, FloatingPortal: ({ children }) => <div data-testid="portal">{children}</div> };
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

        // Mocking NoteContext required values
        vi.mocked(useNote).mockReturnValue({
            selectedNote: { title: 'Test Note' },
            allNotes: []
        });

        mockEditor = {
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            getHTML: vi.fn().mockReturnValue('<p>Hello World</p>'),
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

    it('should export as HTML when selected', async () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        // 1. Seleccionar el formato HTML
        const htmlButton = screen.getByRole('button', { name: /HTML/i });
        fireEvent.click(htmlButton);

        // 2. Hacer clic en el botón de exportar
        const exportButton = screen.getByText('editor.options_menu.export.modal_export');

        await act(async () => {
            fireEvent.click(exportButton);
        });

        // 3. VERIFICACIÓN CORRECTA:
        // No verificamos el editor, sino que el HELPER ha sido llamado
        expect(exportNoteToHtml).toHaveBeenCalledWith(
            mockEditor,
            'Test Note',
            'light', // Tema por defecto en el estado inicial
            []       // allNotes del mock
        );

        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_success', 'success');
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when Cancel button is clicked', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        fireEvent.click(screen.getByText('editor.options_menu.export.modal_cancel'));
        expect(mockOnClose).toHaveBeenCalled();
    });
});