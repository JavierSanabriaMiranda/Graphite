import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ChangeThemeButton from '../../../src/components/util/ChangeThemeButton';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false, // Light theme by default
    media: query,
    onchange: null,
    addListener: vi.fn(), 
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ChangeThemeButton', () => {
    
    beforeEach(() => {
        // Clean localstorage and dom classes
        localStorage.clear();
        document.documentElement.classList.remove('dark');
        vi.clearAllMocks();
    });

    it('should initialize as Light Mode by default if no preference exists', () => {
        render(<ChangeThemeButton />);
        const button = screen.getByRole('button');
        
        expect(button).toHaveTextContent('🌙');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should initialize as Dark Mode if localStorage says so', () => {
        localStorage.setItem('theme', 'dark');
        render(<ChangeThemeButton />);
        
        expect(screen.getByText('☀️')).toBeInTheDocument();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should initialize as Dark Mode if system preference is dark', () => {
        // Force system to config dark theme as preference
        window.matchMedia.mockImplementationOnce(query => ({
            matches: query === '(prefers-color-scheme: dark)',
        }));

        render(<ChangeThemeButton />);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should toggle theme and update DOM and localStorage on click', () => {
        render(<ChangeThemeButton />);
        const button = screen.getByRole('button');

        // Change to dark
        fireEvent.click(button);
        expect(button).toHaveTextContent('☀️');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');

        // Change to light
        fireEvent.click(button);
        expect(button).toHaveTextContent('🌙');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should have the correct translation keys in the title', () => {
        render(<ChangeThemeButton />);
        const button = screen.getByRole('button');
        
        // Started theme is light so text sohuld suggest to change to dark theme
        expect(button).toHaveAttribute('title', 'editor.toolbar.change_dark_theme');
        
        fireEvent.click(button);
        expect(button).toHaveAttribute('title', 'editor.toolbar.change_light_theme');
    });
});