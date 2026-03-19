import { useState, useEffect } from 'react';
import TiptapEditor from './components/TiptapEditor';
import { ToastProvider } from './components/context/ToastContext';
import Sidebar from './components/navigation/Sidebar';
import { userService } from './services/db/userService';
import { workspaceService } from './services/db/workspaceService';
import { NoteProvider } from './components/context/NoteContext';
import { useIsMobile } from './hooks/useIsMobile';
import BottomNavbar from './components/navigation/BottomNavBar';
import { UIProvider, useUI } from './components/context/UIContext';
import SettingsModal from './components/configuration_menu/SettingsModal';

// Component to access to the context inside the app
const AppContent = ({ isMobile, isSidebarPinned, setIsSidebarPinned, currentWorkspace }) => {
  const { isSettingsOpen, closeSettings, activeTab, setActiveTab, openSettings } = useUI();

  const handleTabChange = (tabId) => {
    if (tabId === 'settings') {
      openSettings();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="flex h-dvh bg-main-bg text-text-primary overflow-hidden">
      {/* SIDEBAR: just in desktop */}
      {!isMobile && (
        <Sidebar
          isOpen={isSidebarPinned}
          setIsOpen={setIsSidebarPinned}
          workspace={currentWorkspace}
        />
      )}

      {/* Main Content */}
      <main className={`
        flex-1 relative transition-all duration-300 flex flex-col min-w-0
        ${!isMobile && isSidebarPinned ? 'pl-64' : 'pl-0'}
        ${isMobile ? 'pb-16' : ''}
      `}>
        <ToastProvider>
          {/* Aquí podrías alternar componentes según activeTab */}
          {activeTab === 'editor' && <TiptapEditor />}
          {activeTab === 'search' && <div className="p-8">Sección de Búsqueda</div>}
          {activeTab === 'browse' && <div className="p-8">Explorador de Notas</div>}
        </ToastProvider>
      </main>

      {/* Global components (Portals) */}
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />

      {isMobile && (
        <BottomNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

function App() {
  const isMobile = useIsMobile()
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  useEffect(() => {
    const init = async () => {
      const user = await userService.getCurrentUser();
      if (user) {
        const workspaces = await workspaceService.getByUser(user.user_id);
        if (workspaces.length > 0) setCurrentWorkspace(workspaces[0]);
      }
    };
    init();
  }, []);

  useEffect(() => {
    setIsSidebarPinned(!isMobile)
  }, [isMobile])

  return (
    <UIProvider>
      <NoteProvider workspace={currentWorkspace}>
        <AppContent 
          isMobile={isMobile} 
          isSidebarPinned={isSidebarPinned} 
          setIsSidebarPinned={setIsSidebarPinned}
          currentWorkspace={currentWorkspace}
        />
      </NoteProvider>
    </UIProvider>
  );
}

export default App
