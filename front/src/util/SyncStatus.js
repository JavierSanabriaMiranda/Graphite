/**
 * "Enum" that represents the sync status of a note
 */
export const SyncStatus = {
    ONLINE: 'ONLINE',               // Note is fully synced with the server.
    OFFLINE_STALE: 'OFFLINE_STALE', // Editing local version (may have something newer in the cloud).
    OFFLINE_EMPTY: 'OFFLINE_EMPTY', // No local content nor connection to fetch from the server.
    CONFLICT: 'CONFLICT',           // Note has a different version on the server (409).
    LOADING: 'LOADING'              // Transitory state while the service is working.
};