import { getDB } from './index';

/**
 * Service for CRUD operations in Notes table
 */
export const noteService = {

    /**
     * Get all the notes of a workspace
     * 
     * @param {string} workspaceId - Id of the workspace in which the notes are
     * @returns all notes of a workspace
     */
    getByWorkspace: async (workspaceId) => {
        const db = await getDB();
        return await db.select(
            "SELECT * FROM NOTES WHERE workspace_id = $1 ORDER BY updated_at DESC",
            [workspaceId]
        );
    },

    /**
     * Get the note whose ID is the one inserted as a parameter
     * 
     * @param {string} noteId - ID of the note to get
     * @returns the note whose ID is the one inserted as a parameter or null if not found
     */
    getByNoteId: async (noteId) => {
        const db = await getDB();
        const notes = await db.select(
            "SELECT * FROM NOTES WHERE note_id = $1",
            [noteId]
        );
        return notes.length > 0 ? notes[0] : null;
    },

    /**
     * Get all the root notes (notes with no parent)
     * 
     * @param {String} workspaceId - Id of the workspace in which the notes are
     * @returns all the root notes
     */
    getRootNotes: async (workspaceId) => {
        const db = await getDB();
        return await db.select(
            "SELECT * FROM NOTES WHERE workspace_id = $1 AND parent_id IS NULL AND is_deleted = 0 ORDER BY updated_at DESC",
            [workspaceId]
        );
    },

    /**
     * Get all subnotes of the specified note
     * 
     * @param {String} parentId - Id of the note to get it's children
     * @returns subnotes of the note specified as param
     */
    getSubnotes: async (parentId) => {
        const db = await getDB();
        return await db.select(
            "SELECT * FROM NOTES WHERE parent_id = $1 AND is_deleted = 0 ORDER BY updated_at DESC",
            [parentId]
        );
    },

    /**
     * Create new note on Notes table
     * 
     * @param {string} workspaceId - ID of the workspace in which the note is
     * @param {string} title - title of the new note
     * @param {JSON} contentJSON - content of the new note in tiptap JSON format
     * @param {string} parentId - ID of the parent note or null if it's a root note
     * 
     * @returns confirmation of the insert
     */
    create: async (workspaceId, title, contentJSON, parentId = null) => {
        const db = await getDB();
        const contentStr = JSON.stringify(contentJSON);
        const noteId = crypto.randomUUID();

        let path = parentId
            ? (await noteService.getByNoteId(parentId)).note_path + "/" + title
            : "/" + title;

        return await db.execute(
            `INSERT INTO NOTES (note_id, workspace_id, title, content, parent_id, note_path, is_dirty) 
         VALUES ($1, $2, $3, $4, $5, $6, 1)`,
            [noteId, workspaceId, title, contentStr, parentId, path.replace(/\/+/g, '/')]
        );
    },

    /**
     * Updates the note whose noteId is inserted as param with the data inserted as param
     * 
     * @param {string} noteId - ID of the note to update
     * @param {JSON} data - JSON with just the info to update
     * 
     * @returns 
     */
    update: async (noteId, data) => {
        const db = await getDB();

        // Path logic (if parent or title changes)
        if (data.title || 'parent_id' in data) {
            const current = await noteService.getByNoteId(noteId);
            const newTitle = data.title || current.title;
            const newParentId = 'parent_id' in data ? data.parent_id : current.parent_id;

            let newPath = "";
            if (newParentId) {
                const parent = await noteService.getByNoteId(newParentId);
                newPath = `${parent.note_path}/${newTitle}`;
            } else {
                newPath = `/${newTitle}`;
            }
            data.note_path = newPath.replace(/\/+/g, '/');

            // TODO: Update also path of the children
        }

        // Mark as dirty when updating
        data.is_dirty = 1;
        data.updated_at = new Date().toISOString();

        const fields = [];
        const values = [];
        let i = 1;

        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = $${i}`);
            values.push(key === 'content' ? JSON.stringify(value) : value);
            i++;
        }

        values.push(noteId);
        return await db.execute(
            `UPDATE NOTES SET ${fields.join(', ')} WHERE note_id = $${i}`,
            values
        );
    },

    /**
     * Deletes the note whose id is inserted as param
     * 
     * @param {string} noteId - ID of the note to delete
     * @returns 
     */
    delete: async (noteId) => {
        const db = await getDB();
        // Delete (logical)
        return await db.execute(
            "UPDATE NOTES SET is_deleted = 1, is_dirty = 1, updated_at = CURRENT_TIMESTAMP WHERE note_id = $1",
            [noteId]
        );
    }
};