import TiptapEditor from './components/TipTapEditor'
import { ToastProvider } from './components/util/ToastContext';

function App() {

  return (
    <>
      <ToastProvider>
        <TiptapEditor />
      </ToastProvider>
    </>
  )
}

export default App
