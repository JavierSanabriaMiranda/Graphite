import { useState, useEffect } from 'react';

/**
 * Custom hook tells if the app is being used on a mobile device screen
 * @returns true if the app is being used on a mobile device screen, false otherwise
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};