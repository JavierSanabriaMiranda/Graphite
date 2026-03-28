const API_URL = "http://localhost:8080/api/v1/";
import { invoke } from "@tauri-apps/api/core";

/**
 * Internal helper to retrieve the JWT token from the secure Rust vault.
 * This ensures the token is never stored in insecure places like localStorage.
 */
const getAuthHeader = async () => {
    try {
        const vault = await invoke('load_secure_data');
        if (!vault || !vault.token) {
            throw new Error("No active session found in vault");
        }
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${vault.token}`
        };
    } catch (error) {
        console.error("Auth Header Error:", error);
        throw error;
    }
};

export const authService = {

    /**
     * Send credentials and receives the encrypt envelop
     */
    async login(email, passwordHash) {
        const response = await fetch(`${API_URL}users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, passwordHash })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error on login");
        }

        return await response.json(); // token, wrappedDek, iv, salt
    },

    /**
     * Registers user sending encrypted DEK from client
     */
    async signup(signupData) {
        // signupData contains: email, password, salt, wrappedDek, iv
        const response = await fetch(`${API_URL}users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error on signup");
        }

        return await response.json(); // Returns new JWT
    },

    async getSalt(email) {
        const response = await fetch(`${API_URL}users/salt?email=${email}`);
        if (!response.ok) throw new Error("User not found");
        return await response.json();
    },
};

export const remoteWorkspaceService = {
    /**
     * Synchronizes a workspace entity with the remote server.
     * @param {Object} payload Encrypted workspace data.
     */
    async upsertRemoteWorkspace(payload) {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}workspaces`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Workspace sync failed");
        return true;
    },

    /**
     * Fetches all workspaces from the server for the current user.
     */
    async getAllRemoteWorkspaces() {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}workspaces`, { headers });
        if (!response.ok) throw new Error("Failed to fetch workspaces");
        return await response.json();
    }
};

export const remoteNoteService = {
    /**
     * Synchronizes a note entity with the remote server.
     * @param {Object} payload Encrypted note data including IV and versioning.
     */
    async updateRemoteNote(payload) {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}notes`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Note sync failed");
        return true;
    },

    /**
     * Fetches metadata for all notes in a specific workspace.
     */
    async getRemoteMetadataByWorkspace(workspaceId) {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}notes/workspace/${workspaceId}/metadata`, { headers });
        if (!response.ok) throw new Error("Failed to fetch notes metadata");
        return await response.json();
    },

    /**
     * Fetches the encrypted payload of a specific note.
     */
    async getRemoteNoteContent(noteId) {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}notes/${noteId}/content`, { headers });
        if (!response.ok) throw new Error("Failed to fetch note content");
        return await response.json();
    }
};