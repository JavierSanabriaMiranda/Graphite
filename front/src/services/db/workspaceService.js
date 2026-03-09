import { getDB } from './index';

/**
 * Service for CRUD operations in Workspaces table
 */
export const workspaceService = {

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


    /**
     * Gets the workspaces with the name and owner specified as params (it should be just one)
     * 
     * @param {string} userId 
     * @param {string} name 
     * @returns Workspaces with the name and owner specified as params
     */
    getByUserAndName: async (userId, name) => {
        const db = await getDB();
        return await db.select("SELECT * FROM WORKSPACES where owner_id = $1 AND name = $2", [userId, name]);
    },

    /**
     * Creates a new workspace with the name and the owner specified as params
     * 
     * @param {string} ownerId - ID of the user owner of the workspace to create
     * @param {string} name - Name of the workspace to create
     */
    create: async (ownerId, name) => {
        const db = await getDB();
        const sameNameWorkspaces = await workspaceService.getByUserAndName(ownerId, name)

        if (sameNameWorkspaces.length > 0) {
            throw new Error(`User already have a workspace with name "${name}"`);
        }

        const workspaceId = crypto.randomUUID();

        return await db.execute(
            "INSERT INTO WORKSPACES (workspace_id, owner_id, name, is_dirty) VALUES ($1, $2, $3, 1)",
            [workspaceId, ownerId, name]
        );
    }
};