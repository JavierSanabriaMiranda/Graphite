import React, { createContext, useContext, useState } from 'react';

// Create context
const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Settings modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State for bottom navigation on mobile
  // 'editor' | 'search' | 'browse' | 'settings'
  const [activeTab, setActiveTab] = useState('editor');

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const value = {
    isSettingsOpen,
    openSettings,
    closeSettings,
    activeTab,
    setActiveTab
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used inside an UIProvider');
  }
  return context;
};