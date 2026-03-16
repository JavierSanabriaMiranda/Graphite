import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteProvider, useNote } from '../../../src/components/context/NoteContext';
import { noteService } from '../../../src/services/db/noteService';

// Mock note service
vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        create: vi.fn(),
        getByNoteId: vi.fn(),
    }
}));

const NoteTestComponent = () => {
    const {
        selectedNote,
        selectNote,
        refreshTrigger,
        triggerRefresh,
        createRootNote,
        createSubnote
    } = useNote();

    return (
        <div>
            <div data-testid="note-id">{selectedNote?.note_id || 'no-note'}</div>
            <div data-testid="refresh-count">{refreshTrigger}</div>
            <button onClick={() => selectNote({ note_id: '123', title: 'Test' })}>Select 123</button>
            <button onClick={triggerRefresh}>Refresh</button>
            <button onClick={createRootNote}>Create Root</button>
            {/* Button that uses automatic context ID (ref) */}
            <button onClick={() => createSubnote()}>Create Sub Auto</button>
            {/* Button that uses manual ID */}
            <button onClick={() => createSubnote('parent-manual')}>Create Sub Manual</button>
        </div>
    );
};

const mockWorkspace = { workspace_id: 'ws-1' };

describe('NoteProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should update selected note when selectNote is called', () => {
        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Select 123'));
        expect(screen.getByTestId('note-id')).toHaveTextContent('123');
    });

    it('should increment refreshTrigger', () => {
        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Refresh'));
        expect(screen.getByTestId('refresh-count')).toHaveTextContent('1');
    });

    it('should create a root note and update state', async () => {
        const newNoteId = 'new-999';
        const newNote = { note_id: newNoteId, title: 'Untitled' };

        noteService.create.mockResolvedValue(newNoteId);
        noteService.getByNoteId.mockResolvedValue(newNote);

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Create Root'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', expect.any(String));
        expect(screen.getByTestId('note-id')).toHaveTextContent(newNoteId);
    });

    it('should use selectedNoteRef to create subnote if no parentId is provided', async () => {
        const subNote = { note_id: 'sub-1', title: 'Subnote' };
        noteService.create.mockResolvedValue('sub-1');
        noteService.getByNoteId.mockResolvedValue(subNote);

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        // 1. Seleccionamos una nota para que el ref se actualice
        fireEvent.click(screen.getByText('Select 123'));

        // 2. Creamos subnota sin pasar ID (debe usar '123' del ref)
        await act(async () => {
            fireEvent.click(screen.getByText('Create Sub Auto'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', expect.any(String), '123');
    });

    it('should use manual parentId instead of ref if provided', async () => {
        noteService.create.mockResolvedValue('sub-manual');

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Create Sub Manual'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', expect.any(String), 'parent-manual');
    });

    it('should warn with specific data if createSubnote fails due to missing requirements', async () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

        render(
            <NoteProvider workspace={null}>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Create Sub Auto'));

        // Verificamos que el log incluya el objeto de estado de las variables
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Cannot create subnote"),
            expect.objectContaining({
                workspace: false,
                parentId: false
            })
        );

        consoleSpy.mockRestore();
    });

    it('should handle errors when createSubnote fails in DB', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        noteService.create.mockRejectedValue(new Error('DB Error'));

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        // Seleccionamos nota para que no falle por falta de parentId
        fireEvent.click(screen.getByText('Select 123'));

        await act(async () => {
            fireEvent.click(screen.getByText('Create Sub Auto'));
        });

        expect(consoleSpy).toHaveBeenCalledWith("Error creating subnote:", expect.any(Error));
        consoleSpy.mockRestore();
    });

    it('should throw error if useNote is used outside of provider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const ConsumerWithoutProvider = () => {
            useNote();
            return null;
        };

        expect(() => render(<ConsumerWithoutProvider />)).toThrow('useNote must be used within a NoteProvider');
        consoleSpy.mockRestore();
    });
});