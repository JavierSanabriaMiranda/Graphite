import { createContext, useContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { noteService } from '../../services/db/noteService';

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
export const NoteProvider = ({ children, workspace }) => {
    const { t } = useTranslation();
    const [selectedNote, setSelectedNote] = useState(null);

    // A numeric counter used to signal other components (like Sidebar) 
    // that a note's metadata (title, icon, etc.) has changed in the DB.
    const [refreshTrigger, setRefreshTrigger] = useState(0);

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
    const selectNote = useCallback((note) => {
        if (note?.note_id === selectedNote?.note_id) return;
        setSelectedNote(note);
    }, [selectedNote]);

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
        // If no ID, use the current selected note
        const effectiveParentId = parentId || selectedNote?.note_id;

        if (!workspace || !effectiveParentId) {
            console.warn("Cannot create subnote: Missing workspace or parent ID");
            return null;
        }

        try {
            const title = t('editor.untitled_note') || 'Untitled';
            const newNoteId = await noteService.create(
                workspace.workspace_id,
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
    }, [workspace, selectedNote, t, triggerRefresh]);

    // Context value object containing the state and the updater functions
    const value = {
        selectedNote,
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