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
            <button onClick={() => createSubnote('parent-456')}>Create Sub</button>
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

    it('should not update if the same note is selected', () => {
        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Select 123'));
        // try to select the same note
        fireEvent.click(screen.getByText('Select 123'));
        
        // Render must happen just once
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

        // Configure mock returns
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
        expect(screen.getByTestId('refresh-count')).toHaveTextContent('1');
    });

    it('should create a subnote correctly', async () => {
        const subNote = { note_id: 'sub-789', title: 'Untitled' };
        noteService.create.mockResolvedValue('sub-789');
        noteService.getByNoteId.mockResolvedValue(subNote);

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        let result;
        const TestSubnote = () => {
            const { createSubnote } = useNote();
            return <button onClick={async () => { result = await createSubnote('parent-1'); }}>Click</button>;
        };

        render(
            <NoteProvider workspace={mockWorkspace}>
                <TestSubnote />
            </NoteProvider>
        , { wrapper: ({children}) => children }); // Avoid double render

        await act(async () => {
            fireEvent.click(screen.getByText('Click'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', expect.any(String), 'parent-1');
        expect(result).toEqual(subNote);
    });

    it('should throw error if useNote is used outside of provider', () => {
        // Desactivate console errors for a moment
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        const ConsumerWithoutProvider = () => {
            useNote();
            return null;
        };

        expect(() => render(<ConsumerWithoutProvider />)).toThrow('useNote must be used within a NoteProvider');
        
        consoleSpy.mockRestore();
    });

    it('should handle errors when createRootNote fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        noteService.create.mockRejectedValue(new Error('DB Error'));

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Create Root'));
        });

        expect(consoleSpy).toHaveBeenCalledWith("Error creating note from context:", expect.any(Error));
        consoleSpy.mockRestore();
    });

    it('should warn and return null if createSubnote is called without workspace or parentId', async () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        
        // Renderizamos sin workspace
        render(
            <NoteProvider workspace={null}>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Create Sub'));

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Cannot create subnote"));
        consoleSpy.mockRestore();
    });

    it('should handle errors when createSubnote fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        noteService.create.mockRejectedValue(new Error('DB Error'));

        render(
            <NoteProvider workspace={mockWorkspace}>
                <NoteTestComponent />
            </NoteProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Create Sub'));
        });

        expect(consoleSpy).toHaveBeenCalledWith("Error creating subnote:", expect.any(Error));
        consoleSpy.mockRestore();
    });
});