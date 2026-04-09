import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    // Initial state reading from localStorage
    const [defaultFont, setDefaultFont] = useState(() => {
        return localStorage.getItem('pref_font') || 'Inter';
    });

    // Function to update font on all the system
    const updateDefaultFont = (newFont) => {
        localStorage.setItem('pref_font', newFont);
        setDefaultFont(newFont);
    };

    return (
        <SettingsContext.Provider value={{ defaultFont, updateDefaultFont }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings debe usarse dentro de un SettingsProvider');
    }
    return context;
};