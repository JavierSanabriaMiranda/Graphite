import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { workspaceService } from '../../services/db/workspaceService';
import { syncService } from '../../services/db/syncService';
import { useAuth } from './AuthContext';
import { userService } from '../../services/db/userService';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const { dek, isAuthenticated } = useAuth();
    const [workspaces, setWorkspaces] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

    const openCreation = () => setIsCreatingWorkspace(true);
    const closeCreation = () => setIsCreatingWorkspace(false);

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

    // Initial load of workspaces when user logs in
    const loadWorkspaces = useCallback(async () => {
        if (!isAuthenticated) return;

        try {
            const user = await userService.getCurrentUser();
            const localWorkspaces = await workspaceService.getByUser(user.user_id);
            setWorkspaces(localWorkspaces);

            // If no active workspace, set the first one as active
            if (!activeWorkspace && localWorkspaces.length > 0) {
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
                await syncService.pullAllMetadata(dek, workspace.workspace_id);
            } catch (error) {
                console.error("Error while syncing workspace metadata:", error);
            }
        }
    }, [dek]);

    const value = {
        workspaces,
        activeWorkspace,
        selectWorkspace,
        isLoading,
        refreshWorkspaces: loadWorkspaces,
        isCreatingWorkspace,
        openCreation,
        closeCreation,
        createNewWorkspace
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