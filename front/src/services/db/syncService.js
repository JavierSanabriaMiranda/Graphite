import { getDB } from './index';

/**
 * syncService - Handles integrity and cleans the syncronized data
 */
export const syncService = {
    
    /**
     * Removes from DB rows of tables that have been removed and informed to cloud
     */
    purgeSyncedDeletes: async () => {
        const db = await getDB();
        
        try {
            // Remove notes marked as delete and syncronized
            const deletedNotes = await db.execute(
                "DELETE FROM NOTES WHERE is_deleted = 1 AND is_dirty = 0"
            );

            // Remove workspaces marked as delete and syncronized
            const deletedWorkspaces = await db.execute(
                "DELETE FROM WORKSPACES WHERE is_deleted = 1 AND is_dirty = 0"
            );
            
            return {
                notes: deletedNotes.rowsAffected,
                workspaces: deletedWorkspaces.rowsAffected
            };
        } catch (error) {
            console.error("Error while database purge", error);
            throw error;
        }
    },

    /**
     * Function to get what to sync to remote db
     */
    getPendingUploads: async () => {
        const db = await getDB();
        const pendingNotes = await db.select("SELECT * FROM NOTES WHERE is_dirty = 1");
        const pendingWorkspaces = await db.select("SELECT * FROM WORKSPACES WHERE is_dirty = 1");
        
        return {
            notes: pendingNotes,
            workspaces: pendingWorkspaces
        };
    }
};