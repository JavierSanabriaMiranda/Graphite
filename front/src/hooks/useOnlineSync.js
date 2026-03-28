import { useEffect } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { syncService } from '../services/db/syncService';

/**
 * Hook to monitor network status and trigger sync when connection is restored.
 */
export const useOnlineSync = () => {
    const { dek, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleOnline = () => {
            console.log("Graphite: Connection restored. Syncing pending data...");
            if (isAuthenticated && dek) {
                syncService.syncPendingData(dek);
            }
        };

        // Event listener for network recovery
        window.addEventListener('online', handleOnline);

        // Initial check when the app loads
        if (navigator.onLine && isAuthenticated && dek) {
            syncService.syncPendingData(dek);
        }

        return () => window.removeEventListener('online', handleOnline);
    }, [isAuthenticated, dek]);
};