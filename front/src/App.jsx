import { useState, useEffect } from 'react';
import TiptapEditor from './components/TiptapEditor';
import { ToastProvider } from './components/context/ToastContext';
import Sidebar from './components/side_bar/Sidebar';
import { userService } from './services/db/userService';
import { workspaceService } from './services/db/workspaceService';
import { NoteProvider } from './components/context/NoteContext';

function App() {
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

  return (
    <NoteProvider workspace={currentWorkspace}>
      <div className="flex h-screen bg-zinc-950 text-zinc-200">
        <Sidebar
          isOpen={isSidebarPinned}
          setIsOpen={setIsSidebarPinned}
          workspace={currentWorkspace}
        />
        <main className={`flex-1 transition-all duration-300 ${isSidebarPinned ? 'pl-64' : 'pl-0'}`}>
          <ToastProvider>
            <TiptapEditor />
          </ToastProvider>
        </main>
      </div>
    </NoteProvider>
  )
}

export default App
