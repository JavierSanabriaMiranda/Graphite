import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SettingsContext = createContext();

export const ZOOM_LEVELS = [12, 14, 16, 18, 20, 24]; // 16px is the default zoom level at index 2

/**
 * SettingsProvider component that wraps the app and provides 
 * settings-related state and functions.
 */
export const SettingsProvider = ({ children }) => {
    // Initial state reading from localStorage
    const [defaultFont, setDefaultFont] = useState(() => {
        return localStorage.getItem('pref_font') || 'Inter';
    });
    const [zoomIndex, setZoomIndex] = useState(() => {
        const saved = localStorage.getItem('graphite-zoom');
        return saved !== null ? parseInt(saved) : 2; // Default 16px
    });

    // Function to update font on all the system
    const updateDefaultFont = (newFont) => {
        localStorage.setItem('pref_font', newFont);
        setDefaultFont(newFont);
    };

    // Function to apply zoom level 
    const updateZoom = useCallback((direction) => {
        setZoomIndex(prevIndex => {
            if (direction === 'in') return Math.min(prevIndex + 1, ZOOM_LEVELS.length - 1);
            if (direction === 'out') return Math.max(prevIndex - 1, 0);
            if (direction === 'reset') return 2;
            return prevIndex;
        });
    }, []);

    // Apply zoom level to the document and save to localStorage
    useEffect(() => {
        document.documentElement.style.fontSize = `${ZOOM_LEVELS[zoomIndex]}px`;
        localStorage.setItem('graphite-zoom', zoomIndex);
    }, [zoomIndex]);

    // Shortcut keys for zooming
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    updateZoom('in');
                } else if (e.key === '-') {
                    e.preventDefault();
                    updateZoom('out');
                } else if (e.key === '0') {
                    e.preventDefault();
                    updateZoom('reset');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [updateZoom]);

    const value = {
        zoomIndex,
        setZoomIndex,
        updateZoom,
        ZOOM_LEVELS
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