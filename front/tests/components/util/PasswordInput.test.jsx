import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PasswordInput from '../../../src/components/util/PasswordInput';

describe('PasswordInput Component', () => {
    const mockOnChange = vi.fn();
    const defaultProps = {
        label: 'Password',
        value: '',
        onChange: mockOnChange,
        placeholder: 'Enter password',
        id: 'password-input',
    };

    /**
     * Verify that the component renders the label and the input
     * with the correct initial type (password).
     */
    it('should render correctly with label and password type by default', () => {
        render(<PasswordInput {...defaultProps} />);
        
        expect(screen.getByText('Password')).toBeInTheDocument();
        const input = screen.getByPlaceholderText('Enter password');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'password');
    });

    /**
     * Test the visibility toggle logic.
     * Clicking the eye button should change type to "text" and then back to "password".
     */
    it('should toggle password visibility when eye button is clicked', () => {
        render(<PasswordInput {...defaultProps} />);
        
        const input = screen.getByPlaceholderText('Enter password');
        const toggleButton = screen.getByRole('button');

        // Initial state: hidden
        expect(input).toHaveAttribute('type', 'password');

        // First click: show password
        fireEvent.click(toggleButton);
        expect(input).toHaveAttribute('type', 'text');

        // Second click: hide password
        fireEvent.click(toggleButton);
        expect(input).toHaveAttribute('type', 'password');
    });

    /**
     * Verify that the eye icon changes when the state toggles.
     */
    it('should change the eye icon when visibility toggles', () => {
        const { container } = render(<PasswordInput {...defaultProps} />);
        
        const toggleButton = screen.getByRole('button');
        
        // Check initial Lucide icon (Eye)
        expect(container.querySelector('.lucide-eye')).toBeInTheDocument();

        fireEvent.click(toggleButton);
        
        // Check toggled Lucide icon (EyeOff)
        expect(container.querySelector('.lucide-eye-off')).toBeInTheDocument();
    });

    /**
     * Ensure the onChange callback is fired when the user types.
     */
    it('should call onChange when user types', () => {
        render(<PasswordInput {...defaultProps} />);
        
        const input = screen.getByPlaceholderText('Enter password');
        fireEvent.change(input, { target: { value: 'new-password' } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    /**
     * Test visual error state.
     */
    it('should apply error classes when error prop is true', () => {
        render(<PasswordInput {...defaultProps} error={true} />);
        
        const input = screen.getByPlaceholderText('Enter password');
        expect(input).toHaveClass('border-red-500/50');
    });

    /**
     * Accessibility: Verify that the label is correctly associated with the input.
     */
    it('should associate label with input via htmlFor', () => {
        render(<PasswordInput {...defaultProps} />);
        
        const input = screen.getByLabelText('Password');
        expect(input).toHaveAttribute('id', 'password-input');
    });
});