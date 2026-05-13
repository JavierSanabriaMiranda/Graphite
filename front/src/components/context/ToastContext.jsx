import { createContext, useContext, useState, useCallback, Component } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

/**
 * ToastProvider component that provides a context for showing toast notifications in the application.
 * 
 * @param {Component} children - The children components that will have access to the toast context (to show notifications) 
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to add a notification. It accepts a message and a type (success, error, info) for styling.
  const showToast = useCallback((title, type = 'success', message = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  /**
   * Returns specific styles and icons based on the toast type, 
   * supporting both light and dark mode scales.
   */
  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />,
          accent: 'bg-green-600 dark:bg-green-500',
          iconBg: 'bg-green-600/10 dark:bg-green-500/10',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500" />,
          accent: 'bg-red-600 dark:bg-red-500',
          iconBg: 'bg-red-600/10 dark:bg-red-500/10',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-500" />,
          accent: 'bg-blue-600 dark:bg-blue-500',
          iconBg: 'bg-blue-600/10 dark:bg-blue-500/10',
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <FloatingPortal>
        <div className="fixed top-8 right-8 z-10000 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
          {toasts.map((toast) => {
            const styles = getToastStyles(toast.type);
            return (
              <div
                key={toast.id}
                className={`
                  pointer-events-auto relative flex items-start gap-4 p-4 rounded-lg shadow-xl overflow-hidden
                  animate-in slide-in-from-right-full fade-in duration-300
                  bg-white border border-zinc-200 
                  dark:bg-[#1a212c] dark:border-zinc-800/50 dark:shadow-2xl
                `}
              >
                {/* Visual Accent Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.accent}`} />

                {/* Status Icon Wrapper */}
                <div className={`shrink-0 p-2.5 rounded-lg ${styles.iconBg}`}>
                  {styles.icon}
                </div>

                {/* Content Body */}
                <div className={`grow flex flex-col self-stretch ${!toast.message ? 'justify-center' : 'pt-0.5'}`}>
                  <h3 className="font-bold text-sm leading-tight text-zinc-900 dark:text-white">
                    {toast.title}
                  </h3>
                  {toast.message && (
                    <p className="text-xs mt-1 leading-normal text-zinc-500 dark:text-zinc-400">
                      {toast.message}
                    </p>
                  )}
                </div>

                {/* Close Action */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="cursor-pointer shrink-0 transition-colors p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </FloatingPortal>
    </ToastContext.Provider>
  );
};

// Hook personalizado para usarlo fácilmente
export const useToast = () => useContext(ToastContext);