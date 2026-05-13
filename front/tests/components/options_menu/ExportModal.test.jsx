import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
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

// Mocking browser globals for downloads
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('ExportModal Component - Full Suite', () => {
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
            allNotes: [{ note_id: '1', title: 'Related Note' }]
        });

        mockEditor = {
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            getHTML: vi.fn().mockReturnValue('<p>Hello World</p>'),
        };
    });

    // --- BASIC RENDERING TESTS ---

    it('should render nothing when isOpen is false', () => {
        const { container } = render(
            <ExportModal isOpen={false} onClose={mockOnClose} editor={mockEditor} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render correctly when open', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);
        expect(screen.getByText('editor.options_menu.export.modal_title')).toBeInTheDocument();
        expect(screen.getByText(/JSON/i)).toBeInTheDocument();
        expect(screen.getByText(/HTML/i)).toBeInTheDocument();
        expect(screen.getByText(/PDF/i)).toBeInTheDocument();
    });

    // --- INTERACTION & STATE TESTS ---

    it('should change the selected format when clicking options', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        const htmlButton = screen.getByRole('button', { name: /HTML/i });
        const jsonButton = screen.getByRole('button', { name: /JSON/i });

        fireEvent.click(htmlButton);
        expect(htmlButton).toHaveClass('border-blue-500'); // Selected state

        fireEvent.click(jsonButton);
        expect(jsonButton).toHaveClass('border-blue-500');
    });

    it('should show theme selector only for HTML format', () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        // By default (JSON), theme selector should not be there
        expect(screen.queryByText('editor.options_menu.export.select_theme')).not.toBeInTheDocument();

        // Switch to HTML
        fireEvent.click(screen.getByRole('button', { name: /HTML/i }));
        expect(screen.getByText('editor.options_menu.export.select_theme')).toBeInTheDocument();

        // Switch to PDF
        fireEvent.click(screen.getByRole('button', { name: /PDF/i }));
        expect(screen.queryByText('editor.options_menu.export.select_theme')).not.toBeInTheDocument();
    });

    // --- EXPORT WORKFLOW TESTS ---

    it('should export as JSON and trigger browser download', async () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);
        const linkClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        await act(async () => {
            fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));
        });

        expect(mockEditor.getJSON).toHaveBeenCalled();
        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(linkClickSpy).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_success', 'success');
        expect(mockOnClose).toHaveBeenCalled();
        linkClickSpy.mockRestore();
    });

    it('should export as HTML with selected theme', async () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        fireEvent.click(screen.getByRole('button', { name: /HTML/i }));
        fireEvent.click(screen.getByText('editor.options_menu.export.theme_dark'));

        await act(async () => {
            fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));
        });

        expect(exportNoteToHtml).toHaveBeenCalledWith(
            mockEditor,
            'Test Note',
            'dark',
            expect.any(Array)
        );
        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_success', 'success');
    });

    it('should handle PDF export flow with info toast', async () => {
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);

        fireEvent.click(screen.getByRole('button', { name: /PDF/i }));

        await act(async () => {
            fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));
        });

        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.preparing_pdf', 'info');
        expect(exportNoteToPdf).toHaveBeenCalledWith(mockEditor, 'Test Note', 'light', expect.any(Array));
        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_success', 'success');
    });

    // --- ERROR & EDGE CASES ---

    it('should show error toast if any export process fails', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.mocked(exportNoteToPdf).mockRejectedValue(new Error('Backend Crash'));

        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);
        fireEvent.click(screen.getByRole('button', { name: /PDF/i }));

        await act(async () => {
            fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));
        });

        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_failed', 'error');
        expect(mockOnClose).not.toHaveBeenCalled(); // Modal should stay open on error
    });

    it('should use default filename when note title is missing', async () => {
        vi.mocked(useNote).mockReturnValue({ selectedNote: null, allNotes: [] });
        render(<ExportModal isOpen={true} onClose={mockOnClose} editor={mockEditor} />);
        
        // Using JSON for quick check
        const linkClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        await act(async () => {
            fireEvent.click(screen.getByText('editor.options_menu.export.modal_export'));
        });

        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.export.export_success', 'success');
        linkClickSpy.mockRestore();
    });
});