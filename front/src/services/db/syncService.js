import { getDB } from '.';
import { remoteNoteService, remoteWorkspaceService } from '../api';
import { encryptData, decryptData } from '../../util/crypto';
import { formatDateForServer } from '../../util/formatDate';

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
                    encryptedName: ciphertext,
                    nameIv: iv,
                    isDeleted: workspace.is_deleted === 1,
                    updatedAt: workspace.updated_at
                };

                await remoteWorkspaceService.upsertRemoteWorkspace(wsPayload);
                await syncService.markAsClean('WORKSPACES', 'workspace_id', workspace.workspace_id);
            }

            // Sync Notes
            for (const note of notes) {
                // Bundle sensitive data: title, content, icon
                const noteMetadata = JSON.stringify({
                    title: note.title,
                    icon: note.icon,
                    notePath: note.note_path
                });

                let { ciphertext, iv } = await encryptData(noteMetadata, dek);
                const cipherMetadata = ciphertext;
                const metadataIv = iv;

                ({ ciphertext, iv } = await encryptData(note.content, dek));

                const formattedCreatedAt = formatDateForServer(note.created_at)
                const formattedUpdatedAt = formatDateForServer(note.updated_at)


                const notePayload = {
                    noteId: note.note_id,
                    workspace: { workspaceId: note.workspace_id },
                    parent: note.parent_id ? { noteId: note.parent_id } : null,
                    encryptedMetadata: cipherMetadata,
                    metadataIv: metadataIv,
                    encryptedPayload: ciphertext,
                    iv: iv,
                    isFavorite: note.is_favorite === 1,
                    isDeleted: note.is_deleted === 1,
                    createdAt: formattedCreatedAt,
                    updatedAt: formattedUpdatedAt,
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
    },

    /**
     * FULL DOWNLOAD SYNC (Lazy Strategy)
     * 1. Downloads all workspaces.
     * 2. For each workspace, downloads all notes metadata.
     * 3. Saves everything to local DB with 'is_dirty = 0'.
     */
    pullAllMetadata: async (dek, userId) => {
        if (!dek) return;
        const db = await getDB();

        try {

            // Step 1: Sync Workspaces
            const remoteWorkspaces = await remoteWorkspaceService.getAllRemoteWorkspaces();
            for (const rw of remoteWorkspaces) {
                // Decrypt name for local use
                const decryptedJson = await decryptData(rw.encryptedName, dek, rw.nameIv);
                const { name } = JSON.parse(decryptedJson);

                await db.execute(
                    `INSERT INTO WORKSPACES (workspace_id, owner_id, name, is_deleted, updated_at, is_dirty) 
                     VALUES (?, ?, ?, ?, ?, 0) 
                     ON CONFLICT(workspace_id) DO UPDATE SET 
                     name = excluded.name, is_deleted = excluded.is_deleted, updated_at = excluded.updated_at`,
                    [rw.workspaceId, userId, name, rw.isDeleted ? 1 : 0, rw.updatedAt]
                );

                const remoteNotes = await remoteNoteService.getRemoteMetadataByWorkspace(rw.workspaceId);

                // Insert notes without parent references
                for (const rn of remoteNotes) {
                    const metaJson = await decryptData(rn.encryptedMetadata, dek, rn.metadataIv);
                    const { title, icon, notePath } = JSON.parse(metaJson);

                    await db.execute(
                        `INSERT INTO NOTES (note_id, workspace_id, parent_id, title, icon, note_path, is_favorite, is_deleted, updated_at, note_version, is_dirty)
                     VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, 0) 
                     ON CONFLICT(note_id) DO UPDATE SET
                     title = excluded.title, icon = excluded.icon, workspace_id = excluded.workspace_id,
                     is_favorite = excluded.is_favorite, is_deleted = excluded.is_deleted, 
                     updated_at = excluded.updated_at, note_version = excluded.note_version`,
                        [rn.noteId, rn.workspaceId, title, icon, notePath, rn.isFavorite ? 1 : 0, rn.isDeleted ? 1 : 0, rn.updatedAt, rn.noteVersion]
                    );
                }

                // Insert parent references
                for (const rn of remoteNotes) {
                    if (rn.parentId) {
                        await db.execute(
                            "UPDATE NOTES SET parent_id = ? WHERE note_id = ?",
                            [rn.parentId, rn.noteId]
                        );
                    }
                }
            }
        } catch (error) {
            console.error("Error pulling metadata:", error);
        }
    },

    /**
     * Attempts to get the most updated version of a note.
     * @returns {Object} { note: Object, status: 'ONLINE' | 'OFFLINE_STALE' | 'OFFLINE_EMPTY' }
     */
    getNoteWithSync: async (noteId, dek) => {
        const db = await getDB();
        const isOnline = navigator.onLine;

        // Get local data
        const localNote = await db.select("SELECT * FROM NOTES WHERE note_id = $1", [noteId]);
        const note = localNote[0];

        if (isOnline) {
            try {
                // Fetch remote content
                const remote = await remoteNoteService.getRemoteNoteContent(noteId);

                // Compare versions (Simple LWW)
                // If remote is newer OR we don't have local content, we update
                if (!note.content || new Date(remote.updatedAt) > new Date(note.updated_at)) {
                    const decryptedContent = await decryptData(remote.encryptedPayload, dek, remote.iv);

                    await db.execute(
                        "UPDATE NOTES SET content = ?, is_dirty = 0 WHERE note_id = ?",
                        [decryptedContent, noteId]
                    );

                    // Return updated note
                    const updated = { ...note, content: JSON.stringify(decryptedContent), updated_at: remote.updatedAt };
                    return { note: updated, status: 'ONLINE' };
                }
                return { note, status: 'ONLINE' };
            } catch (error) {
                console.error("Sync error, falling back to local:", error);
                // If network fails during fetch, proceed as offline
            }
        }

        // 3. Offline Logic
        if (!note.content) {
            return { note, status: 'OFFLINE_EMPTY' };
        } else {
            return { note, status: 'OFFLINE_STALE' };
        }
    }
};