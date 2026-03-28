import { getDB } from '.';
import { remoteNoteService, remoteWorkspaceService } from '../api';
import { encryptData } from '../../util/crypto';

/**
 * syncService - Handles integrity and cleans the synchronized data.
 * Implements a Zero-Knowledge architecture where the server only receives opaque blobs.
 */
export const syncService = {

    /**
     * Main synchronization orchestrator.
     * @param {Uint8Array} dek The decrypted Data Encryption Key from AuthContext.
     */
    syncPendingData: async (dek) => {
        if (!dek) return;

        try {
            const { notes, workspaces } = await syncService.getPendingUploads();

            // Sync Workspaces (Dependencies)
            for (const workspace of workspaces) {
                // Bundle sensitive data: name
                const plaintext = JSON.stringify({ name: workspace.name });
                const { ciphertext, iv } = await encryptData(plaintext, dek);

                const wsPayload = {
                    workspaceId: workspace.workspace_id,
                    encryptedPayload: ciphertext,
                    iv: iv,
                    isDeleted: workspace.is_deleted === 1,
                    updatedAt: workspace.updated_at
                };

                await remoteWorkspaceService.upsertRemoteWorkspace(wsPayload);
                await syncService.markAsClean('WORKSPACES', 'workspace_id', workspace.workspace_id);
            }

            // Sync Notes
            for (const note of notes) {
                // Bundle sensitive data: title, content, icon
                const notePlaintext = JSON.stringify({
                    title: note.title,
                    content: note.content,
                    icon: note.icon
                });

                const { ciphertext, iv } = await encryptData(notePlaintext, dek);

                const notePayload = {
                    noteId: note.note_id,
                    workspace: { workspaceId: note.workspace_id },
                    parent: note.parent_id ? { noteId: note.parent_id } : null,
                    encryptedPayload: ciphertext,
                    iv: iv,
                    isFavorite: note.is_favorite === 1,
                    isDeleted: note.is_deleted === 1,
                    createdAt: note.created_at,
                    updatedAt: note.updated_at,
                    noteVersion: note.note_version
                };

                const success = await remoteNoteService.updateRemoteNote(notePayload);

                if (success) {
                    await syncService.markAsClean('NOTES', 'note_id', note.note_id);
                }
            }

            // Final purge of records that are already synced and marked as deleted
            await syncService.purgeSyncedDeletes();
            
            console.log("Graphite Sync: All pending changes pushed to cloud.");
        } catch (error) {
            console.error("Graphite Sync Error:", error);
        }
    },

    /**
     * Removes from local DB rows that have been removed and successfully informed to cloud.
     */
    purgeSyncedDeletes: async () => {
        const db = await getDB();
        try {
            await db.execute("DELETE FROM NOTES WHERE is_deleted = 1 AND is_dirty = 0");
            await db.execute("DELETE FROM WORKSPACES WHERE is_deleted = 1 AND is_dirty = 0");
        } catch (error) {
            console.error("Error while database purge:", error);
        }
    },

    /**
     * Retrieves all records marked with the is_dirty flag.
     */
    getPendingUploads: async () => {
        const db = await getDB();
        const pendingNotes = await db.select("SELECT * FROM NOTES WHERE is_dirty = 1");
        const pendingWorkspaces = await db.select("SELECT * FROM WORKSPACES WHERE is_dirty = 1");
        return { notes: pendingNotes, workspaces: pendingWorkspaces };
    },

    /**
     * Updates the local dirty flag after a successful server confirmation.
     */
    markAsClean: async (table, idColumn, idValue) => {
        const db = await getDB();
        await db.execute(
            `UPDATE ${table} SET is_dirty = 0 WHERE ${idColumn} = ?`,
            [idValue]
        );
    }
};