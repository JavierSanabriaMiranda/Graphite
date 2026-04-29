import { useState, useEffect } from 'react';
import TiptapEditor from './components/TiptapEditor';
import { useTranslation } from 'react-i18next';
import { ToastProvider } from './components/context/ToastContext';
import Sidebar from './components/navigation/Sidebar';
import { userService } from './services/db/userService';
import { workspaceService } from './services/db/workspaceService';
import { NoteProvider } from './components/context/NoteContext';
import { WorkspaceProvider, useWorkspace } from './components/context/WorkspaceContext';
import { useIsMobile } from './hooks/useIsMobile';
import BottomNavbar from './components/navigation/BottomNavBar';
import { UIProvider, useUI } from './components/context/UIContext';
import SettingsModal from './components/settings/SettingsModal';

import MobileBrowseView from './components/navigation/MobileBrowseView';
import MobileSearchView from './components/views/MobileSearchView';

import { useAuth, AuthProvider } from './components/context/AuthContext';
import AuthenticationView from './components/views/AuthenticationView';
import { useOnlineSync } from './hooks/useOnlineSync';
import CreateWorkspaceView from './components/views/CreateWorkspaceView';
import { Loader2 } from 'lucide-react';
import { SettingsProvider } from './components/context/SettingsContext';
import SearchOverlay from './components/note_search/SearchOverlay';

// Component to access to the context inside the app
const AppContent = ({ isMobile, isSidebarPinned, setIsSidebarPinned }) => {
  const { t } = useTranslation();

  const { isSettingsOpen, closeSettings, activeTab, setActiveTab, openSettings } = useUI();
  const { isCreatingWorkspace, isLoading: wsLoading, workspaces } = useWorkspace();

  const handleTabChange = (tabId) => {
    if (tabId === 'settings') {
      openSettings();
    } else {
      setActiveTab(tabId);
    }
  };

  if (wsLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-main-bg text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-widest opacity-50">{t('common.loading')}</p>
      </div>
    );
  }

  if (isCreatingWorkspace) {
    return (
      <CreateWorkspaceView showCancelBtn={workspaces.length > 0} />
    );
  }

  return (
    <div className="flex h-dvh bg-main-bg text-text-primary overflow-hidden">
      {/* SIDEBAR: just in desktop */}
      {!isMobile && (
        <Sidebar
          isOpen={isSidebarPinned}
          setIsOpen={setIsSidebarPinned}
        />
      )}

      {/* Main Content */}
      <main className={`
        flex-1 relative transition-all duration-300 flex flex-col min-w-0
        ${!isMobile && isSidebarPinned ? 'pl-64' : 'pl-0'}
        ${isMobile ? 'pb-16' : ''}
      `}>
        <SettingsProvider>
          {activeTab === 'editor' && <TiptapEditor />}
          {activeTab === 'search' && (isMobile ? (
            <MobileSearchView />
          ) : (
            <TiptapEditor />
          ))}
          {activeTab === 'browse' && (
            isMobile ? (
              <MobileBrowseView />
            ) : (
              <TiptapEditor />
            )
          )}
        </SettingsProvider>
      </main>

      {/* Global components (Portals) */}
      <SettingsProvider>
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      </SettingsProvider>
      {isMobile && (
        <BottomNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {!isMobile && <SearchOverlay />}
    </div>
  );
};

// Middle component to handle data loading from user just after login
const DataWrapper = ({ isMobile }) => {
  useOnlineSync();

  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      if (isAuthenticated) {
        try {
          const user = await userService.getCurrentUser();
          if (user) {
            const workspaces = await workspaceService.getByUser(user.user_id);
            if (workspaces.length > 0) setCurrentWorkspace(workspaces[0]);
          }
        } catch (e) {
          console.error("Error cargando datos:", e);
        }
      }
      setDataLoading(false);
    };
    initData();
  }, [isAuthenticated]);

  useEffect(() => {
    setIsSidebarPinned(!isMobile);
  }, [isMobile]);

  if (authLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-main-bg text-primary">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-widest opacity-50">Desbloqueando Graphite...</p>
      </div>
    );
  }

  // If there's no session, go to login
  if (!isAuthenticated) {
    return <AuthenticationView />;
  }

  // If authenticated but loading workspace
  if (dataLoading) return null;

  return (
    <SettingsProvider>
      <ToastProvider>
        <UIProvider>
          <WorkspaceProvider>
            <NoteProvider>
              <AppContent
                isMobile={isMobile}
                isSidebarPinned={isSidebarPinned}
                setIsSidebarPinned={setIsSidebarPinned}
              />
            </NoteProvider>
          </WorkspaceProvider>
        </UIProvider>
      </ToastProvider>
    </SettingsProvider>
  );
};

function App() {
  const isMobile = useIsMobile();

  return (
    <AuthProvider>
      <DataWrapper isMobile={isMobile} />
    </AuthProvider>
  );
}

export default App;