import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

/**
 * SettingsProvider component that wraps the app and provides 
 * settings-related state and functions.
 */
export const SettingsProvider = ({ children }) => {
    // Zooom levels
    const ZOOM_LEVELS = [12, 14, 16, 18, 20, 24]; // 16px is the default, so it's at index 2
    const DEFAULT_ZOOM_INDEX = 2;

    // Initial state reading from localStorage
    const [defaultFont, setDefaultFont] = useState(() => {
        return localStorage.getItem('pref_font') || 'Inter';
    });
    const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);

    useEffect(() => {
        // Apply zoom level to the document root
        document.documentElement.style.fontSize = `${ZOOM_LEVELS[zoomIndex]}px`;

        // Save to localStorage
        localStorage.setItem('graphite-zoom', zoomIndex);
    }, [zoomIndex]);

    // Function to update font on all the system
    const updateDefaultFont = (newFont) => {
        localStorage.setItem('pref_font', newFont);
        setDefaultFont(newFont);
    };

    const value = {
        defaultFont,
        updateDefaultFont,
        setZoomIndex,
        ZOOM_LEVELS,
        DEFAULT_ZOOM_INDEX,
    }

    return (
        <SettingsContext.Provider value={value}>
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