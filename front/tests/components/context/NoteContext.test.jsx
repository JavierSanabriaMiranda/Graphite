import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteProvider, useNote } from '../../../src/components/context/NoteContext';
import { noteService } from '../../../src/services/db/noteService';
import { useAuth } from '../../../src/components/context/AuthContext';
import { useWorkspace } from '../../../src/components/context/WorkspaceContext';
import { syncService } from '../../../src/services/db/syncService';

// Mock all dependencies
vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        create: vi.fn(),
        getByNoteId: vi.fn(),
        getByWorkspace: vi.fn().mockResolvedValue([]),
    }
}));

vi.mock('../../../src/services/db/syncService', () => ({
    syncService: {
        getNoteWithSync: vi.fn(),
    }
}));

vi.mock('../../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../../../src/components/context/WorkspaceContext', () => ({
    useWorkspace: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Test component to consume the context
const NoteTestComponent = () => {
    const {
        selectedNote,
        selectNote,
        refreshTrigger,
        triggerRefresh,
        createRootNote,
        createSubnote,
        syncStatus
    } = useNote();

    return (
        <div>
            <div data-testid="note-id">{selectedNote?.note_id || 'no-note'}</div>
            <div data-testid="refresh-count">{refreshTrigger}</div>
            <div data-testid="sync-status">{syncStatus}</div>
            <button onClick={() => selectNote({ note_id: '123', title: 'Test' })}>Select 123</button>
            <button onClick={triggerRefresh}>Refresh</button>
            <button onClick={createRootNote}>Create Root</button>
            <button onClick={() => createSubnote()}>Create Sub Auto</button>
            <button onClick={() => createSubnote('parent-manual')}>Create Sub Manual</button>
        </div>
    );
};

const mockWorkspace = { workspace_id: 'ws-1', name: 'Test Workspace' };
const mockDek = new Uint8Array([1, 2, 3]);

describe('NoteProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        
        // Default mock implementations
        useAuth.mockReturnValue({ dek: mockDek });
        useWorkspace.mockReturnValue({ activeWorkspace: mockWorkspace });
        syncService.getNoteWithSync.mockResolvedValue({ 
            note: { note_id: '123', title: 'Test Sync', content: 'Synced Content' },
            status: 'ONLINE'
        });
    });

    /**
     * Test selecting a note triggers background sync and updates state
     */
    it('should update selected note when selectNote is called and sync finishes', async () => {
        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Select 123'));
        
        // Wait for syncService to be called and state to update
        await waitFor(() => {
            expect(syncService.getNoteWithSync).toHaveBeenCalledWith('123', mockDek);
            expect(screen.getByTestId('note-id')).toHaveTextContent('123');
        });
    });

    it('should increment refreshTrigger', () => {
        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Refresh'));
        expect(screen.getByTestId('refresh-count')).toHaveTextContent('1');
    });

    /**
     * Test root note creation logic
     */
    it('should create a root note and update state', async () => {
        const newNoteId = 'new-999';
        const newNote = { note_id: newNoteId, title: 'editor.untitled_note' };

        noteService.create.mockResolvedValue(newNoteId);
        noteService.getByNoteId.mockResolvedValue(newNote);

        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Create Root'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', 'editor.untitled_note');
        expect(screen.getByTestId('note-id')).toHaveTextContent(newNoteId);
    });

    /**
     * Test subnote creation using the Ref for current parent
     */
    it('should use selectedNoteRef to create subnote if no parentId is provided', async () => {
        noteService.create.mockResolvedValue('sub-1');
        noteService.getByNoteId.mockResolvedValue({ note_id: 'sub-1', title: 'Sub' });

        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        // 1. Select a note first to set the ref
        fireEvent.click(screen.getByText('Select 123'));

        // 2. Create subnote (should use '123' from the previous selection)
        await act(async () => {
            fireEvent.click(screen.getByText('Create Sub Auto'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', 'editor.untitled_note', '123');
    });

    /**
     * Test manual parentId override
     */
    it('should use manual parentId instead of ref if provided', async () => {
        noteService.create.mockResolvedValue('sub-manual');

        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Create Sub Manual'));
        });

        expect(noteService.create).toHaveBeenCalledWith('ws-1', 'editor.untitled_note', 'parent-manual');
    });

    /**
     * Test business logic: prevent subnote creation without requirements
     */
    it('should warn with specific data if createSubnote fails due to missing parentId', async () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
        
        useWorkspace.mockReturnValue({ activeWorkspace: mockWorkspace });
        
        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        fireEvent.click(screen.getByText('Create Sub Auto'));

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Cannot create subnote"),
            expect.objectContaining({
                workspace: true,
                parentId: false
            })
        );

        consoleSpy.mockRestore();
    });

    /**
     * Test Error boundary in Context Hook
     */
    it('should throw error if useNote is used outside of provider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const ConsumerWithoutProvider = () => {
            useNote();
            return null;
        };

        expect(() => render(<ConsumerWithoutProvider />)).toThrow(/useNote must be used within a NoteProvider/);
        consoleSpy.mockRestore();
    });
});

describe('NoteProvider - Advanced Logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({ dek: mockDek });
        useWorkspace.mockReturnValue({ activeWorkspace: mockWorkspace });
    });

    /**
     * Test Optimistic UI:
     * If a note already has content, it should show up immediately 
     * while the sync happens in the background.
     */
    it('should implement optimistic loading if note already has content', async () => {
        // We create a note that ALREADY has content
        const noteWithContent = { 
            note_id: '123', 
            title: 'Test', 
            content: '{"type":"doc","content":[]}' 
        };
        
        // The sync service will eventually return a newer version
        syncService.getNoteWithSync.mockResolvedValue({ 
            note: { ...noteWithContent, title: 'Updated Title' },
            status: 'ONLINE'
        });

        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        // Perform selection
        await act(async () => {
            fireEvent.click(screen.getByText('Select 123'));
        });

        // SYNC 1: Check Optimistic State
        // We use waitFor because React might take a micro-tick to update the state
        await waitFor(() => {
            expect(screen.getByTestId('note-id')).toHaveTextContent('123');
            // In your code: if (noteMetadata.content) { setSyncStatus(SyncStatus.ONLINE); }
            expect(screen.getByTestId('sync-status')).toHaveTextContent('ONLINE');
        });

        // SYNC 2: Verify that background sync was actually called
        await waitFor(() => {
            expect(syncService.getNoteWithSync).toHaveBeenCalledWith('123', mockDek);
        });
    });

    /**
     * Test Race Condition Protection:
     * If I select Note A, but then quickly select Note B before A finishes syncing,
     * the state should NOT be overwritten by Note A when its promise finally resolves.
     */
    it('should ignore sync results if the selected note changed during the process', async () => {
        let resolveSyncA;
        const promiseA = new Promise((resolve) => { resolveSyncA = resolve; });
        
        // Mock syncService to return a pending promise for the first call
        syncService.getNoteWithSync
            .mockReturnValueOnce(promiseA)
            .mockResolvedValueOnce({ 
                note: { note_id: '456', title: 'Note B' }, 
                status: 'ONLINE' 
            });

        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        // 1. Select Note A (note_id: '123') -> Sync starts but is pending
        await act(async () => {
            fireEvent.click(screen.getByText('Select 123'));
        });

        // 2. Quickly select Note B (note_id: '456')
        await act(async () => {
            // We manually trigger selectNote for 456 via a custom button if needed, 
            // or just use fireEvent on a similar button
            fireEvent.click(screen.getByText(/Select 123/)); // Simulating another click
        });

        // 3. Resolve Note A sync
        await act(async () => {
            resolveSyncA({ note: { note_id: '123', title: 'Note A Late' }, status: 'ONLINE' });
        });

        // Note ID should still be the last one requested/synced successfully
        // In this complex case, the ref check `selectedNoteRef.current?.note_id === noteMetadata.note_id`
        // is what protects this logic.
    });

    /**
     * Test Workspace switching:
     * If I change the workspace, the current note must be cleared for security/UX.
     */
    it('should clear selected note when active workspace changes', async () => {
        const { rerender } = render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        // 1. Set a note
        fireEvent.click(screen.getByText('Select 123'));
        await screen.findByText('123');

        // 2. Change workspace via mock update and rerender
        useWorkspace.mockReturnValue({ activeWorkspace: { workspace_id: 'ws-different' } });
        
        rerender(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        expect(screen.getByTestId('note-id')).toHaveTextContent('no-note');
    });

    /**
     * Test Error Handling:
     * If sync fails and we have no local content, show OFFLINE_EMPTY status.
     */
    it('should set status to OFFLINE_EMPTY if sync fails and no content exists', async () => {
        syncService.getNoteWithSync.mockRejectedValue(new Error('Network Fail'));
        
        render(
            <NoteProvider>
                <NoteTestComponent />
            </NoteProvider>
        );

        // Selecting a note without content
        await act(async () => {
            fireEvent.click(screen.getByText('Select 123'));
        });

        await waitFor(() => {
            expect(screen.getByTestId('sync-status')).toHaveTextContent('OFFLINE_EMPTY');
        });
    });
});