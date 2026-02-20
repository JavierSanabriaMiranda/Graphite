import { useEffect, useRef } from 'react';

/**
 * Hook for detecting clicks outside of a specified element. 
 * Useful for closing dropdowns, modals, etc. when clicking outside of them.
 * 
 * @param {function} handler 
 */
export const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};