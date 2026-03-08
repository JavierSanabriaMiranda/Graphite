import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n/i18n.js'
import { initializeDB } from './services/db/index.js'

(async () => {
  try {
    await initializeDB();

    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    console.error("Error while starting app:", error);
  }
})();
