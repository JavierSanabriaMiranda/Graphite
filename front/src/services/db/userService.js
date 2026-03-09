import { getDB } from './index';

/**
 * userService - Manages the local identity and links it with cloud
 */
export const userService = {

    /**
     * Gets the current user (active). In local app just one row is expected
     */
    getCurrentUser: async () => {
        const db = await getDB();
        const users = await db.select("SELECT * FROM USERS LIMIT 1");
        return users.length > 0 ? users[0] : null;
    },

    /**
     * Verifies if there's an active session (if email and/or token saved)
     */
    isAuthenticated: async () => {
        const user = await userService.getCurrentUser();
        return !!(user && user.id && user.email);
    },

    /**
     * Registers the success of a cloud authentication
     * @param {string} userId - UUID from the server
     * @param {string} email - Email del usuario
     * @param {string} username - Nombre del usuario
     * @param {string} token - JWT o Session Token para la API
     */
    saveCloudSession: async (userId, email, username, token) => {
        const db = await getDB();
        const existingUser = await userService.getCurrentUser();

        if (existingUser) {
            // User was existing (maybe as guest)
            // Updates it's local ID with the cloud ID
            return await db.execute(
                `UPDATE USERS SET 
                    user_id = $1, 
                    email = $2, 
                    username = $3, 
                    session_token = $4, 
                    updated_at = CURRENT_TIMESTAMP 
                 WHERE user_id = $5`,
                [userId, email, username, token, existingUser.user_id]
            );
        } else {
            // First login at this device
            return await db.execute(
                `INSERT INTO USERS (user_id, email, username, session_token) 
                 VALUES ($1, $2, $3, $4)`,
                [userId, email, username, token]
            );
        }
    },

    /**
     * Updates profile information locally.
     * @param {string} userId - UUID of the user
     * @param {JSON} data - JSON with data to change (ex: { username: 'Javi' })
     */
    updateProfile: async (userId, data) => {
        const db = await getDB();

        return await db.execute(
            "UPDATE USERS SET username = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2",
            [data.username, userId]
        );
    },

    /**
     * Log out: clean data from the user
     */
    logout: async () => {
        const db = await getDB();
        await db.execute("DELETE FROM USERS");
    }
};