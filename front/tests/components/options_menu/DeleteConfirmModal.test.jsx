import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DeleteConfirmModal from '../../../src/components/options_menu/DeleteConfirmModal';
import { useNote } from '../../../src/components/context/NoteContext';
import { useToast } from '../../../src/components/context/ToastContext';

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn()
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn()
}));

vi.mock('@floating-ui/react', async () => {
    const actual = await vi.importActual('@floating-ui/react');
    return { ...actual, FloatingPortal: ({ children }) => <div>{children}</div> };
});

describe('DeleteConfirmModal', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();
    const mockDeleteNote = vi.fn();

    const mockSelectedNote = { note_id: '1', title: 'Current Note' };
    const mockOtherNote = { note_id: '2', title: 'Other Note' };
    const mockShowToast = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useNote.mockReturnValue({
            selectedNote: mockSelectedNote,
            deleteNote: mockDeleteNote,
        });

        useToast.mockReturnValue({
            showToast: mockShowToast
        });
    });

    it('should render nothing when isOpen is false', () => {
        const { container } = render(
            <DeleteConfirmModal isOpen={false} onClose={mockOnClose} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render correctly and show the translation keys', () => {
        render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} />);

        // Verify modal title is present
        expect(screen.getByText('editor.options_menu.delete.confirm_title')).toBeInTheDocument();

        // Verify modal description is present
        expect(screen.getByText('editor.options_menu.delete.confirm_description')).toBeInTheDocument();
    });

    it('should delete the note successfully using the context function', async () => {
        mockDeleteNote.mockResolvedValue(true);

        render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);

        const deleteButton = screen.getByText('common.delete');

        await act(async () => {
            fireEvent.click(deleteButton);
        });

        expect(mockDeleteNote).toHaveBeenCalledWith(mockSelectedNote.note_id);
        expect(mockShowToast).toHaveBeenCalledWith("editor.options_menu.delete.success", "success");
        expect(mockOnConfirm).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should delete a different note if noteToDelete prop is provided', async () => {
        mockDeleteNote.mockResolvedValue(true);

        render(
            <DeleteConfirmModal
                isOpen={true}
                onClose={mockOnClose}
                noteToDelete={mockOtherNote}
            />
        );

        await act(async () => {
            fireEvent.click(screen.getByText('common.delete'));
        });

        expect(mockDeleteNote).toHaveBeenCalledWith(mockOtherNote.note_id);
    });

    it('should handle errors during deletion', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        // Simulate fail 
        mockDeleteNote.mockRejectedValue(new Error('DB Error'));

        render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} />);

        await act(async () => {
            fireEvent.click(screen.getByText('common.delete'));
        });

        expect(mockShowToast).toHaveBeenCalledWith("editor.options_menu.delete.error", "error");
        expect(consoleSpy).toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});