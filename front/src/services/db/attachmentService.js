import { getDB } from '.';

/**
 * Service for CRUD operations in ATTACHMENTS table.
 * Manages metadata for files and images linked to notes.
 */
export const attachmentService = {

    /**
     * Registers a new attachment in the database.
     * 
     * @param {Object} data - Metadata of the file (note_id, file_name, mime_type, file_size, local_path, img_width)
     */
    create: async (data) => {
        const db = await getDB();

        await db.execute(
            `INSERT INTO ATTACHMENTS (
                attachment_id, note_id, file_name, mime_type, 
                file_size, img_width, local_path, is_dirty
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, 1)`,
            [
                data.attachment_id,
                data.note_id,
                data.file_name,
                data.mime_type,
                data.file_size,
                data.img_width || null, // Optional for non-image files
                data.local_path
            ]
        );
    },

    /**
     * Get all attachments associated with a specific note.
     * 
     * @param {string} noteId 
     * @returns {Array} List of attachments
     */
    getByNoteId: async (noteId) => {
        const db = await getDB();
        return await db.select(
            "SELECT * FROM ATTACHMENTS WHERE note_id = $1 AND is_deleted = 0 ORDER BY created_at ASC",
            [noteId]
        );
    },

    /**
     * Get a specific attachment by its ID.
     * 
     * @param {string} attachmentId 
     * @returns {Object|null} Attachment metadata
     */
    getById: async (attachmentId) => {
        const db = await getDB();
        const results = await db.select(
            "SELECT * FROM ATTACHMENTS WHERE attachment_id = $1",
            [attachmentId]
        );
        return results.length > 0 ? results[0] : null;
    },

    /**
     * Updates attachment metadata and marks it as dirty for syncing.
     * 
     * @param {string} attachmentId 
     * @param {Object} data - Fields to update
     */
    update: async (attachmentId, data) => {
        const db = await getDB();
        const now = new Date().toISOString();

        // Mark as dirty for sync and update timestamp
        data.is_dirty = 1;
        data.updated_at = now;

        const fields = [];
        const values = [];
        let i = 1;

        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = $${i}`);
            values.push(value);
            i++;
        }

        values.push(attachmentId);
        return await db.execute(
            `UPDATE ATTACHMENTS SET ${fields.join(', ')} WHERE attachment_id = $${i}`,
            values
        );
    },

    /**
     * Logical deletion of an attachment.
     * 
     * @param {string} attachmentId 
     */
    delete: async (attachmentId) => {
        const db = await getDB();
        return await db.execute(
            `UPDATE ATTACHMENTS SET is_deleted = 1, is_dirty = 1, updated_at = CURRENT_TIMESTAMP WHERE attachment_id = $1`,
            [attachmentId]
        );
    },

    /**
     * Gets all attachments that need to be synced to the cloud.
     * 
     * @returns {Array} List of dirty attachments
     */
    getNotSynced: async () => {
        const db = await getDB();
        return await db.select(
            "SELECT * FROM ATTACHMENTS WHERE is_dirty = 1"
        );
    },

    /**
     * Resets the dirty flag after a successful cloud sync.
     * 
     * @param {string} attachmentId 
     */
    markAsSynced: async (attachmentId) => {
        const db = await getDB();
        return await db.execute(
            "UPDATE ATTACHMENTS SET is_dirty = 0 WHERE attachment_id = $1",
            [attachmentId]
        );
    }
};