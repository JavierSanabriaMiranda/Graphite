import { useState } from 'react';
import TiptapEditor from './components/TipTapEditor'
import { ToastProvider } from './components/util/ToastContext';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-200">
      <Sidebar
        isOpen={isSidebarPinned}
        setIsOpen={setIsSidebarPinned}
      />
      <main className={`flex-1 transition-all duration-300 ${isSidebarPinned ? 'pl-64' : 'pl-0'}`}>
          <ToastProvider>
            <TiptapEditor />
          </ToastProvider>
      </main>
    </div>
  )
}

export default App
