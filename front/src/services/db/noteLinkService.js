import { getDB } from '.';

/**
 * Service to manage connections between notes (links and backlinks)
 */
export const noteLinkService = {
    /**
     * Updates the links of a note. It removes old ones and inserts new ones.
     * @param {string} sourceId - The ID of the note that contains the links
     * @param {string[]} targetIds - Array of note IDs being referenced
     */
    updateLinks: async (sourceId, targetIds) => {
        const db = await getDB();
        
        // Remove all existing links from this source
        await db.execute(
            "DELETE FROM NOTE_LINKS WHERE source_id = $1",
            [sourceId]
        );

        if (!targetIds || targetIds.length === 0) return;

        // Insert new unique links
        const uniqueTargets = [...new Set(targetIds)];
        
        for (const targetId of uniqueTargets) {
            // Ignore if pointing to itself
            if (targetId === sourceId) continue;
            
            await db.execute(
                "INSERT OR IGNORE INTO NOTE_LINKS (source_id, target_id) VALUES ($1, $2)",
                [sourceId, targetId]
            );
        }
    },

    /**
     * Gets all notes that point to the specified note
     * @param {string} targetId - The ID of the note to get backlinks for
     * @returns {Promise<Array>} List of notes referencing the target
     */
    getBacklinks: async (targetId) => {
        const db = await getDB();
        return await db.select(
            `SELECT N.note_id, N.title, N.icon, N.updated_at 
             FROM NOTES N
             JOIN NOTE_LINKS NL ON N.note_id = NL.source_id
             WHERE NL.target_id = $1 AND N.is_deleted = 0
             ORDER BY N.updated_at DESC`,
            [targetId]
        );
    },

    /**
     * Gets all target note IDs that the source note points to
     * @param {string} sourceId - The ID of the note to get links from
     * @returns {Promise<Array>} List of target note IDs
     */
    getLinksBySource: async (sourceId) => {
        const db = await getDB();
        return await db.select(
            `SELECT * FROM NOTE_LINKS WHERE source_id = $1`,
            [sourceId]
        );
    }
};