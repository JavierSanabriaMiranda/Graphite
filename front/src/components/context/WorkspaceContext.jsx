import { createContext, useContext, useState, useEffect, useCallback, Component } from 'react';
import { workspaceService } from '../../services/db/workspaceService';
import { syncService } from '../../services/db/syncService';
import { useAuth } from './AuthContext';
import { userService } from '../../services/db/userService';

const WorkspaceContext = createContext();

/**
 * WorkspaceProvider Component
 * This wrapper manages the state of the currently selected workspace
 * 
 * @param {Component} children - The components that will have access to this context.
 */
export const WorkspaceProvider = ({ children }) => {
    const { dek, isAuthenticated } = useAuth();
    const [workspaces, setWorkspaces] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

    const openCreation = () => setIsCreatingWorkspace(true);
    const closeCreation = () => setIsCreatingWorkspace(false);

    useEffect(() => {
        if (!activeWorkspace) {
            setIsCreatingWorkspace(true);
        }
    }, [activeWorkspace]);

    /**
     * Creates a new workspace with the name and the icon inserted as param and saves it on db
     * 
     * @param {String} name - Of the new workspace
     * @param {String} icon - Of the new workspace
     */
    const createNewWorkspace = async (name, icon) => {
        try {
            const user = await userService.getCurrentUser();

            // Create workspace in DB
            const newWs = await workspaceService.create(user.user_id, name, icon);
            // Refresh list
            const localWorkspaces = await workspaceService.getByUser(user.user_id);
            setWorkspaces(localWorkspaces);
            await syncService.syncPendingData(dek);

            // Select new workspace
            selectWorkspace(newWs);
            closeCreation();
        } catch (error) {
            console.error("Error while creating workspace:", error);
        }
    };

    /**
     * Syncs workspaces from server when user logs in
     */
    const loadWorkspaces = useCallback(async () => {
        if (!isAuthenticated) return;

        try {
            const user = await userService.getCurrentUser();
            const localWorkspaces = await workspaceService.getByUser(user.user_id);
            setWorkspaces(localWorkspaces);

            if (localWorkspaces.length === 0) {
                setIsCreatingWorkspace(true);
                setActiveWorkspace(null);
            } else if (!activeWorkspace) {
                setIsCreatingWorkspace(false);
                setActiveWorkspace(localWorkspaces[0]);
            }
        } catch (error) {
            console.error("Error while loading workspaces:", error);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, activeWorkspace]);

    useEffect(() => {
        loadWorkspaces();
    }, [loadWorkspaces]);

    /**
     * Change active workspace and trigger synchronization of metadata for that workspace notes
     */
    const selectWorkspace = useCallback(async (workspace) => {
        setActiveWorkspace(workspace);

        // Lazy sync: just pull metadata for the selected workspace to update the note list in the sidebar
        if (navigator.onLine && dek) {
            try {
                const user = await userService.getCurrentUser();
                await syncService.pullAllMetadata(dek, user.user_id);
            } catch (error) {
                console.error("Error while syncing workspace metadata:", error);
            }
        }
    }, [dek]);

    /**
     * Updates the current selected workspace name with the name inserted as param
     * 
     * @param {String} newName - New name of the current selected workspace
     * @returns 
     */
    const updateWorkspaceName = async (newName) => {
        if (!activeWorkspace) return;
        try {
            const workspaceId = activeWorkspace.workspace_id;
            await workspaceService.updateName(workspaceId, newName);
            // Update local state
            const user = await userService.getCurrentUser();
            const localWorkspaces = await workspaceService.getByUser(user.user_id);
            setWorkspaces(localWorkspaces);
            const updatedWorkspace = await workspaceService.getById(workspaceId);
            setActiveWorkspace(updatedWorkspace); // Update active workspace with new name
            // Sync changes
            await syncService.syncPendingData(dek);

        } catch (error) {
            console.error("Error while updating workspace name:", error);
        }
    };

    /**
     * Updates the current selected workspace icon with the name inserted as param
     * 
     * @param {String} newIcon - New icon of the current selected workspace
     * @returns 
     */
    const updateWorkspaceIcon = async (newIcon) => {
        if (!activeWorkspace) return;
        try {
            const workspaceId = activeWorkspace.workspace_id;
            await workspaceService.updateIcon(workspaceId, newIcon);
            // Update local state
            const user = await userService.getCurrentUser();
            const localWorkspaces = await workspaceService.getByUser(user.user_id);
            setWorkspaces(localWorkspaces);
            const updatedWorkspace = await workspaceService.getById(workspaceId);
            setActiveWorkspace(updatedWorkspace); // Update active workspace with new icon
            // Sync changes
            await syncService.syncPendingData(dek);

        } catch (error) {
            console.error("Error while updating workspace name:", error);
        }
    };

    /**
     * Deletes the workspace whose id is inserted as param from the db
     * 
     * @param {String} workspaceId - Of the workspace to delete
     */
    const deleteWorkspace = async (workspaceId) => {
        try {
            await workspaceService.delete(workspaceId);
            // Refresh list
            const user = await userService.getCurrentUser();
            const localWorkspaces = await workspaceService.getByUser(user.user_id);
            setWorkspaces(localWorkspaces);
            if (workspaces.length > 0) {
                setActiveWorkspace(localWorkspaces[0]);
            } else {
                setActiveWorkspace(null);
            }
            await syncService.syncPendingData(dek);
        } catch (error) {
            console.error("Error while deleting workspace:", error);
        }
    }

    const value = {
        workspaces,
        activeWorkspace,
        selectWorkspace,
        isLoading,
        refreshWorkspaces: loadWorkspaces,
        isCreatingWorkspace,
        openCreation,
        closeCreation,
        createNewWorkspace,
        updateWorkspaceName,
        updateWorkspaceIcon,
        deleteWorkspace
    };

    return (
        <WorkspaceContext.Provider value={value}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => {
    const context = useContext(WorkspaceContext);
    if (!context) throw new Error('useWorkspace must be used within a WorkspaceProvider');
    return context;
};