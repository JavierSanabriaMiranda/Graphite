import { getDB } from '.';
import { remoteNoteService, remoteWorkspaceService } from '../api';
import { encryptData, decryptData } from '../../util/crypto';
import { formatDateForServer } from '../../util/formatDate';
import { noteService } from './noteService';
import { SyncStatus } from '../../util/SyncStatus';

// --- Private helper functions for sync logic ---

/**
 * Syncs the workspaces received as parameter with the remote server, encrypting them with the provided DEK. 
 * Marks them as clean if successful.
 **/
const syncWorkspaces = async (workspaces, dek) => {
    for (const workspace of workspaces) {
        // Bundle sensitive data: name
        const plaintext = JSON.stringify({ name: workspace.name, icon: workspace.icon });
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
};

/**
 * Syncs the notes received as parameter with the remote server, encrypting them with the provided DEK. 
 * Marks them as clean if successful.
 **/
const syncNotes = async (notes, dek) => {
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

        const response = await remoteNoteService.updateRemoteNote(notePayload);

        if (response.ok) {
            const data = await response.json();
            const newVersion = data.newVersion;

            await noteService.incrementVersion(note.note_id, newVersion);
            await syncService.markAsClean('NOTES', 'note_id', note.note_id);
        } else if (response.status === 409) {
            // Take server content to compare
            const remoteData = await remoteNoteService.getRemoteNoteContent(note.note_id);
            const remoteMeta = await remoteNoteService.getRemoteNoteMetadata(note.note_id);
            const metaJson = await decryptData(remoteMeta.encryptedMetadata, dek, remoteMeta.metadataIv);
            const { title, icon } = JSON.parse(metaJson);

            const decryptedRemote = await decryptData(remoteData.encryptedPayload, dek, remoteData.iv);

            // Save conflict on local db
            await noteService.setConflict(
                note.note_id,
                title,
                icon,
                decryptedRemote,
                remoteMeta.noteVersion
            );

        }
    }
};

const ensureRemoteChildrenMetadata = async (parentId, dek, db) => {
    // Pedimos al servidor todos los hijos de esta nota
    const remoteChildren = await remoteNoteService.getRemoteMetadataByParent(parentId);

    for (const child of remoteChildren) {
        const metaJson = await decryptData(child.encryptedMetadata, dek, child.metadataIv);
        const { title, icon, notePath } = JSON.parse(metaJson);

        await db.execute(
            `INSERT INTO NOTES (note_id, workspace_id, parent_id, title, icon, note_path, note_version, is_dirty)
             VALUES (?, ?, ?, ?, ?, ?, ?, 0)
             ON CONFLICT(note_id) DO UPDATE SET
             title = excluded.title, icon = excluded.icon, parent_id = excluded.parent_id`,
            [child.noteId, child.workspaceId, parentId, title, icon, notePath, child.noteVersion]
        );
    }
};

// Pulls remote workspaces and their notes, decrypts them, and saves to local DB
const pullRemoteWorkspacesAndNotes = async (remoteWorkspaces, dek, db, userId) => {
    for (const rw of remoteWorkspaces) {
        // Decrypt payload for local use
        const decryptedJson = await decryptData(rw.encryptedPayload, dek, rw.iv);
        const { name, icon } = JSON.parse(decryptedJson);

        // If no icon is present, we want to store null instead of an empty string 
        // to avoid confusion with the default icon logic in the UI
        let noteIcon = null;
        if (icon) {
            noteIcon = icon;
        }

        await db.execute(
            `INSERT INTO WORKSPACES (workspace_id, owner_id, name, icon, is_deleted, updated_at, is_dirty) 
                     VALUES (?, ?, ?, ?, ?, ?, 0) 
                     ON CONFLICT(workspace_id) DO UPDATE SET 
                     name = excluded.name, icon = excluded.icon, is_deleted = excluded.is_deleted, updated_at = excluded.updated_at`,
            [rw.workspaceId, userId, name, noteIcon, rw.isDeleted ? 1 : 0, rw.updatedAt]
        );

        const remoteNotes = await remoteNoteService.getRemoteMetadataByWorkspace(rw.workspaceId);
        await pullRemoteNotesOfAWorkspace(remoteNotes, dek, db);
    }
};

const pullRemoteNotesOfAWorkspace = async (remoteNotes, dek, db) => {
    // Insert notes without parent references
    for (const rn of remoteNotes) {
        const metaJson = await decryptData(rn.encryptedMetadata, dek, rn.metadataIv);
        const { title, icon, notePath } = JSON.parse(metaJson);

        await db.execute(
            `INSERT INTO NOTES (note_id, workspace_id, parent_id, title, icon, note_path, is_favorite, is_deleted, updated_at, note_version, is_dirty)
                     VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, 0) 
                     ON CONFLICT(note_id) DO UPDATE SET
                     title = excluded.title, icon = excluded.icon, note_path = excluded.note_path, workspace_id = excluded.workspace_id,
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
};

// --- Sync Service Implementation ---

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
            await syncWorkspaces(workspaces, dek);

            // Sync Notes
            await syncNotes(notes, dek);

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

            // SyncWorkspaces and their notes
            const remoteWorkspaces = await remoteWorkspaceService.getAllRemoteWorkspaces();
            await pullRemoteWorkspacesAndNotes(remoteWorkspaces, dek, db, userId);

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

        if (!isOnline) {
            return {
                note,
                status: note.content ? SyncStatus.OFFLINE_STALE : SyncStatus.OFFLINE_EMPTY
            };
        }

        try {
            const remoteMeta = await remoteNoteService.getRemoteNoteMetadata(noteId);
            // Note doesn't exists remotely
            if (!remoteMeta) {
                if (!note) {
                    return { note: null, status: SyncStatus.OFFLINE_EMPTY };
                } else {
                    return { note, status: SyncStatus.OFFLINE_STALE };
                }
            }

            // CASE A: Local note is dirty, we have unsynced changes.
            if (note.is_dirty === 1) {
                // If local note is dirty, we have unsynced changes. Check for conflict: if 
                // remote version is different, we have a conflict. 
                // Otherwise, we are online but just haven't synced yet, so we can show local safely.
                if (remoteMeta.noteVersion !== note.note_version) {
                    const remoteFull = await remoteNoteService.getRemoteNoteContent(noteId);
                    const decryptedRemote = await decryptData(remoteFull.encryptedPayload, dek, remoteFull.iv);
                    const metaJson = await decryptData(remoteMeta.encryptedMetadata, dek, remoteMeta.metadataIv);
                    const { title, icon } = JSON.parse(metaJson);

                    await noteService.setConflict(
                        noteId,
                        title,
                        icon,
                        decryptedRemote,
                        remoteMeta.noteVersion
                    );
                    const updatedLocalNote = (await db.select("SELECT * FROM NOTES WHERE note_id = $1", [noteId]))[0];

                    return { note: updatedLocalNote, status: SyncStatus.CONFLICT };
                }
                // If no conlifct, show local version
                return { note, status: SyncStatus.ONLINE };
            }
            // CASE B: Local note is clean, we can safely compare and decide if we need to update from remote
            if (!note.content || remoteMeta.noteVersion > note.note_version) {
                const remoteFull = await remoteNoteService.getRemoteNoteContent(noteId);
                const decryptedContent = await decryptData(remoteFull.encryptedPayload, dek, remoteFull.iv);

                // Save locally
                await db.execute(
                    "UPDATE NOTES SET content = ?, updated_at = ?, note_version = ?, is_dirty = 0 WHERE note_id = ?",
                    [decryptedContent, remoteMeta.updatedAt, remoteMeta.noteVersion, noteId]
                );

                // Return note object updated
                const updatedNote = {
                    ...note,
                    content: decryptedContent,
                    updated_at: remoteMeta.updatedAt,
                    note_version: remoteMeta.noteVersion
                };
                return { note: updatedNote, status: SyncStatus.ONLINE };
            }
            return { note, status: SyncStatus.ONLINE };

        } catch (error) {
            console.error("Sync error, falling back to local:", error);
            // If network fails during fetch, proceed as offline
            if (!note.content) {
                return { note, status: SyncStatus.OFFLINE_EMPTY };
            } else {
                return { note, status: SyncStatus.OFFLINE_STALE };
            }
        }
    }
};