import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import EditModeButton from '../../src/components/EditModeButton';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mocking Lucide icons to simplify the DOM and verify rendering
vi.mock('lucide-react', () => ({
    Lock: () => <span data-testid="lock-icon" />,
    Unlock: () => <span data-testid="unlock-icon" />,
}));

describe('EditModeButton Component', () => {
    const mockOnToggle = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test: Unlocked State (isEditable = true)
     * The user can edit, so the button should offer to LOCK.
     */
    it('should render the Unlock icon and correct title when editable', () => {
        render(<EditModeButton isEditable={true} onToggle={mockOnToggle} />);
        
        expect(screen.getByTestId('unlock-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('lock-icon')).not.toBeInTheDocument();
        
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', 'editor.lock_note');
        // Check for specific "unlocked" styles
        expect(button).toHaveClass('text-zinc-700');
    });

    /**
     * Test: Locked State (isEditable = false)
     * The note is read-only, so the button should offer to UNLOCK.
     */
    it('should render the Lock icon and correct title when not editable', () => {
        render(<EditModeButton isEditable={false} onToggle={mockOnToggle} />);
        
        expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('unlock-icon')).not.toBeInTheDocument();
        
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', 'editor.unlock_note');
        // Check for specific "locked/primary" styles
        expect(button).toHaveClass('text-primary');
        expect(button).toHaveClass('bg-primary/10');
    });

    /**
     * Test: Interaction
     * Clicking the button must trigger the toggle callback.
     */
    it('should call onToggle when clicked', () => {
        render(<EditModeButton isEditable={true} onToggle={mockOnToggle} />);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    /**
     * Test: Visual Feedback (Hover classes)
     * Verify that the "group" class exists for nested hover effects.
     */
    it('should have the group class for hover effects', () => {
        render(<EditModeButton isEditable={true} onToggle={mockOnToggle} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('group');
    });
});