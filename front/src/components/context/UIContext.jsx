import React, { createContext, useContext, useState } from 'react';

// Create context
const UIContext = createContext();

/**
 * This wrapper manages the UI navigation and state for modals 
 * that are not specific to a single view but affect the whole app, 
 * such as the SettingsModal or the SearchOverlay.
 * 
 * @param {Component} children - Component that will be able to access to the UI functions 
 */
export const UIProvider = ({ children }) => {
  // Settings modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // State for bottom navigation on mobile
  // 'editor' | 'search' | 'browse' | 'settings'
  const [activeTab, setActiveTab] = useState('editor');

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const value = {
    isSettingsOpen,
    openSettings,
    closeSettings,
    activeTab,
    setActiveTab,
    openSearch,
    closeSearch,
    isSearchOpen
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