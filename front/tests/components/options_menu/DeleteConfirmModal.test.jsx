import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DeleteConfirmModal from '../../../src/components/options_menu/DeleteConfirmModal';
import { noteService } from '../../../src/services/db/noteService';
import { useNote } from '../../../src/components/context/NoteContext';
import { useToast } from '../../../src/components/context/ToastContext';

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: { delete: vi.fn() }
}));

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
    const mockSelectNote = vi.fn();
    const mockTriggerRefresh = vi.fn();
    const mockShowToast = vi.fn();

    const mockSelectedNote = { note_id: '1', title: 'Current Note' };
    const mockOtherNote = { note_id: '2', title: 'Other Note' };

    beforeEach(() => {
        vi.clearAllMocks();

        // Hooks default configuration
        useNote.mockReturnValue({
            selectedNote: mockSelectedNote,
            selectNote: mockSelectNote,
            triggerRefresh: mockTriggerRefresh,
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

    it('should call onClose when clicking Cancel button', () => {
        render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} />);

        fireEvent.click(screen.getByText('common.cancel'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should delete the note successfully and clear selection if it is the current note', async () => {
        vi.mocked(noteService.delete).mockResolvedValue(true);

        render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);

        await act(async () => {
            fireEvent.click(screen.getByText('common.delete'));
        });

        expect(noteService.delete).toHaveBeenCalledWith(mockSelectedNote.note_id);
        expect(mockShowToast).toHaveBeenCalledWith(expect.any(String), "success");
        expect(mockSelectNote).toHaveBeenCalledWith(null); // Delete current, editor gets cleared
        expect(mockOnConfirm).toHaveBeenCalled();
        expect(mockTriggerRefresh).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should delete successfully but NOT clear selection if deleting a different note', async () => {
        vi.mocked(noteService.delete).mockResolvedValue(true);

        // Use a different note by prop
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

        expect(noteService.delete).toHaveBeenCalledWith(mockOtherNote.note_id);
        expect(mockSelectNote).not.toHaveBeenCalled(); // Editor dont get clear because it's not selected note
    });

    it('should handle errors during deletion', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        vi.mocked(noteService.delete).mockRejectedValue(new Error('DB Error'));

        render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} />);

        await act(async () => {
            fireEvent.click(screen.getByText('common.delete'));
        });

        expect(mockShowToast).toHaveBeenCalledWith(expect.any(String), "error");
        expect(consoleSpy).toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it('should call onClose when clicking the backdrop', () => {
        const { container } = render(<DeleteConfirmModal isOpen={true} onClose={mockOnClose} />);

        const backdrop = container.querySelector('.bg-black\\/60');
        fireEvent.click(backdrop);

        expect(mockOnClose).toHaveBeenCalled();
    });
});