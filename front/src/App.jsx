import { useState, useEffect } from 'react';
import TiptapEditor from './components/TipTapEditor'
import { ToastProvider } from './components/util/ToastContext';
import Sidebar from './components/Sidebar';
import { userService } from './services/db/userService';
import { workspaceService } from './services/db/workspaceService';

function App() {
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshNotes = () => setRefreshTrigger(prev => prev + 1);

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
    <div className="flex h-screen bg-zinc-950 text-zinc-200">
      <Sidebar
        isOpen={isSidebarPinned}
        setIsOpen={setIsSidebarPinned}
        workspace={currentWorkspace}
        onNoteSelect={setSelectedNote}
        activeNoteId={selectedNote?.note_id}
        refreshTrigger={refreshTrigger}
      />
      <main className={`flex-1 transition-all duration-300 ${isSidebarPinned ? 'pl-64' : 'pl-0'}`}>
        <ToastProvider>
          <TiptapEditor activeNote={selectedNote} onNoteUpdate={refreshNotes} />
        </ToastProvider>
      </main>
    </div>
  )
}

export default App
