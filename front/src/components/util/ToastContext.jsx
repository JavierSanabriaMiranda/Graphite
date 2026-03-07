import { createContext, useContext, useState, useCallback, Component } from 'react';
import { FloatingPortal } from '@floating-ui/react';

const ToastContext = createContext();

/**
 * ToastProvider component that provides a context for showing toast notifications in the application.
 * 
 * @param {Component} children - The children components that will have access to the toast context (to show notifications) 
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to add a notification. It accepts a message and a type (success, error, info) for styling.
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Notifications render */}
      <FloatingPortal>
        <div className="fixed top-15 right-4 z-[10000] flex flex-col gap-2 w-full max-w-xs pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`
                pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border
                animate-in slide-in-from-right-full fade-in duration-300
                ${toast.type === 'success' ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300' : ''}
                ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300' : ''}
                ${toast.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' : ''}
              `}
            >
              <span className="text-sm font-medium">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-4 hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </FloatingPortal>
    </ToastContext.Provider>
  );
};

// Hook personalizado para usarlo fácilmente
export const useToast = () => useContext(ToastContext);