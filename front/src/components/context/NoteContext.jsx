import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { noteService } from '../../services/db/noteService';
import { useAuth } from './AuthContext';
import { syncService } from '../../services/db/syncService';
import { useWorkspace } from './WorkspaceContext.';

/**
 * Context object to hold the global state of the active note and UI synchronization.
 */
const NoteContext = createContext();

/**
 * NoteProvider Component
 * This wrapper manages the state of the currently selected note and a global 
 * refresh trigger to synchronize data across the Sidebar, Editor, and Navigation.
 * 
 * @param {Object} props.children - The components that will have access to this context.
 */
export const NoteProvider = ({ children }) => {
    const { dek } = useAuth();
    const { t } = useTranslation();
    const { activeWorkspace: workspace } = useWorkspace();
    
    const [selectedNote, setSelectedNote] = useState(null);
    // A numeric counter used to signal other components (like Sidebar) 
    // that a note's metadata (title, icon, etc.) has changed in the DB.
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState('ONLINE');

    const selectedNoteRef = useRef(selectedNote);

    // sync refs when state changes
    useEffect(() => {
        selectedNoteRef.current = selectedNote;
    }, [selectedNote]);

    // Clear selected note when workspace changes
    useEffect(() => {
        setSelectedNote(null);
    }, [workspace]);

    /**
     * Increments the refresh counter.
     * Used whenever a note is updated in the database to force 
     * data-fetching components to refresh their UI.
     */
    const triggerRefresh = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);


    /**
     * Updates the currently active note.
     * Uses useCallback to prevent child components from re-rendering unless the selectedNote changes.
     * 
     * @param {Object} note - The note object to be set as active.
     */
    const selectNote = useCallback(async (noteMetadata) => {
        if (!noteMetadata) {
            setSelectedNote(null);
            return;
        }

        // Fetch full content with sync logic
        const result = await syncService.getNoteWithSync(noteMetadata.note_id, dek);
        const note = await noteService.getByNoteId(noteMetadata.note_id);

        setSelectedNote(note);
        setSyncStatus(result.status);
        setIsSyncing(false);
    }, [dek]);

    /**
     * Creates a new root note
     */
    const createRootNote = useCallback(async () => {
        if (!workspace) return;
        try {
            const title = t('editor.untitled_note') || 'Untitled';
            const newId = await noteService.create(workspace.workspace_id, title);
            const newNote = await noteService.getByNoteId(newId);

            setSelectedNote(newNote); // open new note
            triggerRefresh();        // update sidebar
        } catch (error) {
            console.error("Error creating note from context:", error);
        }
    }, [workspace, t, triggerRefresh]);

    /**
    * Creates a new subnote within a parent note
    * @param {string} parentId - The ID of the parent note, if not passed use the current selected note instead
    * @returns {Promise<Object|null>} The newly created note object
    */
    const createSubnote = useCallback(async (parentId = null) => {
        if (!workspace) return;
        // If no ID, use the current selected note
        const currentWorkspace = workspace;
        const effectiveParentId = parentId || selectedNoteRef.current?.note_id;

        if (!currentWorkspace || !effectiveParentId) {
            console.warn("Cannot create subnote: Missing workspace or parent ID", {
                workspace: !!currentWorkspace,
                parentId: !!effectiveParentId
            });
            return null;
        }

        try {
            const title = t('editor.untitled_note') || 'Untitled';
            const newNoteId = await noteService.create(
                currentWorkspace.workspace_id,
                title,
                effectiveParentId
            );

            const newNote = await noteService.getByNoteId(newNoteId);
            triggerRefresh();
            return newNote;
        } catch (error) {
            console.error("Error creating subnote:", error);
            return null;
        }
    }, [t, triggerRefresh]);

    // Context value object containing the state and the updater functions
    const value = {
        selectedNote,
        isSyncing,
        syncStatus,
        setSelectedNote, // Raw setter for direct manipulation if needed
        selectNote,
        refreshTrigger,
        triggerRefresh,
        createRootNote,
        createSubnote
    };

    return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

/**
 * Custom hook: useNote
 * * Provides an easy way for any component to consume the NoteContext.
 * It includes a safety check to ensure it's used within a NoteProvider.
 * * @returns {Object} { selectedNote, selectNote, refreshTrigger, triggerRefresh, setSelectedNote }
 */
export const useNote = () => {
    const context = useContext(NoteContext);

    // Safety guard: prevent calling useNote outside the Provider tree
    if (!context) {
        throw new Error('useNote must be used within a NoteProvider. Check if you wrapped your App component.');
    }

    return context;
};