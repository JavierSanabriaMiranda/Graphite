import { getDB } from '.';
import i18next from 'i18next';
import { getWelcomeNote } from './pre_designed_pages/welcomeContent'

const emptyContent = JSON.stringify({
    type: 'doc',
    content: [
        {
            type: 'paragraph',
        },
    ],
});

const getChildIdsFromContent = (json) => {
    const ids = [];
    const traverse = (node) => {
        if (node.type === 'pageBlock' && node.attrs?.noteId) {
            ids.push(node.attrs.noteId);
        }
        if (node.content) {
            node.content.forEach(traverse);
        }
    };
    if (json) traverse(json);
    return ids;
};

/**
 * Service for CRUD operations in Notes table
 */
export const noteService = {


    addWelcomeNotes: async (workspaceUuid) => {
        const db = await getDB();

        const lang = i18next.language?.split('-')[0] || 'en';
        const localizedContent = getWelcomeNote(lang);
        const welcome = localizedContent.welcome_note;
        const subnote = localizedContent.subnote;

        const noteUuid = crypto.randomUUID();
        const subnoteUuid = crypto.randomUUID();

        await db.execute(
            `INSERT INTO NOTES (note_id, workspace_id, title, content, note_path, icon, is_dirty) 
                     VALUES ($1, $2, $3, $4, $5, $6, 1)`,
            [
                noteUuid,
                workspaceUuid,
                welcome.title,
                welcome.body,
                "/" + welcome.title,
                welcome.icon
            ]
        );

        await db.execute(
            `INSERT INTO NOTES (note_id, parent_id, workspace_id, title, content, note_path, icon, is_dirty) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, 1)`,
            [
                subnoteUuid,
                noteUuid,
                workspaceUuid,
                subnote.title,
                subnote.body,
                "/" + welcome.title + "/" + subnote.title,
                subnote.icon
            ]
        );
    },

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
            "SELECT * FROM NOTES WHERE workspace_id = $1 AND parent_id IS NULL AND is_deleted = 0 ORDER BY title ASC",
            [workspaceId]
        );
    },

    /**
     * Returns true if the note whose Id is inserted as param has subnotes false otherwise
     * 
     * @param {String} parentId - Id of the note to evaluate children existance
     * @returns true if the note whose Id is inserted as param has subnotes false otherwise 
     */
    hasSubnotes: async (parentId) => {
        const db = await getDB();
        const res = await db.select(
            "SELECT EXISTS(SELECT 1 FROM NOTES WHERE parent_id = $1 AND is_deleted = 0) as has_children",
            [parentId]
        );
        return res[0].has_children === 1;
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
     * Get the note with the path specified as param in the workspace specified as param
     * 
     * @param {String} path - Path of the note to get
     * @param {String} workspaceId - Id of the workspace in which the note is
     * @returns note with the path specified as param in the workspace specified as param
     */
    getNoteByPath: async (path, workspaceId) => {
        const db = await getDB();
        const res = await db.select(
            "SELECT * FROM NOTES WHERE note_path = $1 AND workspace_id = $2 AND is_deleted = 0 LIMIT 1",
            [path, workspaceId]
        );
        return res[0];
    },

    /**
     * Create new note on Notes table
     * 
     * @param {string} workspaceId - ID of the workspace in which the note is
     * @param {string} title - title of the new note
     * @param {string} parentId - ID of the parent note or null if it's a root note
     * 
     * @returns noteId of the new note
     */
    create: async (workspaceId, title, parentId = null) => {
        const db = await getDB();
        const noteId = crypto.randomUUID();

        // Get parent path if exists
        let parentPath = "";
        if (parentId) {
            const parentNote = await noteService.getByNoteId(parentId);
            parentPath = parentNote ? parentNote.note_path : "";
        }

        let finalTitle = title;
        let path = `${parentPath}/${finalTitle}`.replace(/\/+/g, '/');
        let counter = 1;

        // Loop for checking name collisions
        while (true) {
            const existing = await noteService.getNoteByPath(path, workspaceId)

            if (!existing) {
                // If no results, unique path, exit loop
                break;
            }

            // If exists modify title and recalculate path
            finalTitle = `${title} (${counter})`;
            path = `${parentPath}/${finalTitle}`.replace(/\/+/g, '/');
            counter++;
        }


        await db.execute(
            `INSERT INTO NOTES (note_id, workspace_id, title, content, parent_id, note_path, is_dirty) 
         VALUES ($1, $2, $3, $4, $5, $6, 1)`,
            [noteId, workspaceId, finalTitle, emptyContent, parentId, path.replace(/\/+/g, '/')]
        );

        return noteId;
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
        const now = new Date().toISOString();

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
            newPath = newPath.replace(/\/+/g, '/');

            // Check if the new title or path makes a collision
            const collision = await noteService.getNoteByPath(newPath, current.workspace_id);

            if (collision && collision.note_id !== noteId) {
                return { error: 'COLLISION', message: 'Path already exists' };
            }

            // Update subnotes path
            const oldPath = current.note_path;
            if (oldPath !== newPath) {
                await db.execute(`
                UPDATE NOTES 
                SET 
                    note_path = $1 || SUBSTR(note_path, $2),
                    is_dirty = 1,
                    updated_at = $3
                WHERE note_path LIKE $4 AND workspace_id = $5
            `, [
                    newPath,
                    oldPath.length + 1,
                    now,
                    `${oldPath}/%`,
                    current.workspace_id
                ]);
            }

            data.note_path = newPath;
        }

        // Mark as dirty when updating
        data.is_dirty = 1;
        data.updated_at = now;

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
        // Mark note and all subnotes till the end as deleted
        return await db.execute(`
        WITH RECURSIVE descendant_notes AS (
            SELECT note_id FROM NOTES WHERE note_id = $1
            UNION ALL
            SELECT n.note_id 
            FROM NOTES n
            JOIN descendant_notes dn ON n.parent_id = dn.note_id
        )
        UPDATE NOTES 
        SET 
            is_deleted = 1, 
            is_dirty = 1,
            updated_at = CURRENT_TIMESTAMP 
        WHERE note_id IN (SELECT note_id FROM descendant_notes)
        `, [noteId]);
    },

    incrementVersion: async (noteId, newVersion) => {
        const db = await getDB();
        return await db.execute(
            `UPDATE NOTES SET note_version = $1 WHERE note_id = $2`,
            [newVersion, noteId]
        );
    },

    getNotesNotSynced: async () => {
        const db = await getDB();
        return await db.select(
            "SELECT * FROM NOTES WHERE is_dirty = 1 AND is_deleted = 0"
        );
    },

    setConflict: async (noteId, conflictTitle, conflictIcon, conflictContent, remoteVersion) => {
        const db = await getDB();
        return await db.execute(
            `UPDATE NOTES SET conflict_title = $1, conflict_icon = $2, conflict_content = $3, remote_version = $4 WHERE note_id = $5`,
            [conflictTitle, conflictIcon, conflictContent, remoteVersion, noteId]
        );
    },

    resolveConflict: async (noteId, title, icon, content, version) => {
        const db = await getDB();
        await noteService.update(noteId, { title: title, icon: icon })
        await db.execute(
            `UPDATE NOTES SET 
                content = $1, note_version = $2,  
                conflict_content = NULL, remote_version = NULL, 
                is_deleted = 0, is_dirty = 1 
            WHERE note_id = $3`,
            [JSON.stringify(content), version, noteId]
        );

        // Get the IDs of the subpages that are on new content
        const validChildIds = getChildIdsFromContent(content);

        if (validChildIds.length > 0) {
            // Mark all notes that aren't in validChildIds and whose parent is current note to not be in new content
            const placeholders = validChildIds.map(() => '?').join(',');
            await db.execute(
                `UPDATE NOTES SET is_deleted = 1, is_dirty = 1 
             WHERE parent_id = ? AND note_id NOT IN (${placeholders})`,
                [noteId, ...validChildIds]
            );
            // Mark all notes that are in validChildIds to not be deleted
            await noteService.resurrectNotes(validChildIds)
        } else {
            // If new content doesn't have supages, all local subpages gets deleted
            await db.execute(
                `UPDATE NOTES SET is_deleted = 1, is_dirty = 1 WHERE parent_id = ?`,
                [noteId]
            );
        }
    },

    resurrectNotes: async (noteIds) => {
        if (!noteIds || noteIds.length === 0) return;
        const db = await getDB();
        const placeholders = noteIds.map(() => '?').join(',');

        // Mark as not deleted
        await db.execute(
            `UPDATE NOTES SET 
            is_deleted = 0, 
            is_dirty = 1 
            WHERE note_id IN (${placeholders})`,
            noteIds
        );
    }
};