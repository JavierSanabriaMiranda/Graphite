import { getDB } from '.';

/**
 * Service for CRUD operations in Workspaces table
 */
export const workspaceService = {

    addWelcomeWorkspace: async (userId) => {
        const db = await getDB();

        const workspaceUuid = crypto.randomUUID();

        await db.execute(
            "INSERT INTO WORKSPACES (workspace_id, owner_id, name, icon, is_dirty) VALUES ($1, $2, $3, $4, 1)",
            [workspaceUuid, userId, "Personal", '🔒']
        );

        return workspaceUuid;
    },

    /**
     * Get all the workspaces from the user whose id is inserted as parameter
     * 
     * @param {string} userId - ID of the user owner of the workspaces to get
     * @returns All the workspaces from the user whose id is inserted as parameter
     */
    getByUser: async (userId) => {
        const db = await getDB();
        return await db.select("SELECT * FROM WORKSPACES where owner_id = $1", [userId]);
    },

    getById: async (workspaceId) => {
        const db = await getDB();
        const results = await db.select("SELECT * FROM WORKSPACES where workspace_id = $1", [workspaceId]);
        return results.length > 0 ? results[0] : null;
    },

    /**
     * Creates a new workspace with the name and the owner specified as params
     * 
     * @param {string} ownerId - ID of the user owner of the workspace to create
     * @param {string} name - Name of the workspace to create
     * @param {string} icon - Icon for the workspace to create
     */
    create: async (ownerId, name, icon=null) => {
        const db = await getDB();

        const workspaceId = crypto.randomUUID();

        await db.execute(
            "INSERT INTO WORKSPACES (workspace_id, owner_id, name, icon, is_dirty) VALUES ($1, $2, $3, $4, 1)",
            [workspaceId, ownerId, name, icon]
        );

        return await workspaceService.getById(workspaceId);
    }
};