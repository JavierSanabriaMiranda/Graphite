import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import AuthenticationView from '../../../src/components/views/AuthenticationView';
import { useAuth } from '../../../src/components/context/AuthContext';
import { useIsMobile } from '../../../src/hooks/useIsMobile';

// --- 1. MOCKS ---

/**
 * Mocking the AuthContext to control login and signUp behaviors.
 */
vi.mock('../../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

/**
 * Mocking the responsive hook.
 */
vi.mock('../../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

/**
 * Mocking react-i18next to return the keys as translation strings.
 */
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

/**
 * Mocking subcomponents to avoid rendering external dependencies complex logic.
 */
vi.mock('../../../src/components/util/ChangeThemeButton', () => ({
    default: () => <button data-testid="theme-btn">Theme</button>,
}));

describe('AuthenticationView Component', () => {
    const mockLogin = vi.fn();
    const mockSignUp = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        // Default: desktop view
        useIsMobile.mockReturnValue(false);
        // Default auth context behavior
        useAuth.mockReturnValue({
            login: mockLogin,
            signUp: mockSignUp,
        });
    });

    /**
     * Test the UI transition between Login and Signup modes.
     */
    it('should toggle between login and signup modes', () => {
        render(<AuthenticationView />);

        // Starts in Login mode
        expect(screen.getByText('identification.login.title')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('identification.username_placeholder')).not.toBeInTheDocument();

        // Switch to Signup mode by clicking the footer button
        const toggleBtn = screen.getByText('identification.register.register');
        fireEvent.click(toggleBtn);

        expect(screen.getByText('identification.register.title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('identification.username_placeholder')).toBeInTheDocument();
        expect(screen.getByLabelText('identification.confirm_password')).toBeInTheDocument();
    });

    /**
     * Test a successful login submission with valid data.
     */
    it('should call login with correct credentials', async () => {
        render(<AuthenticationView />);

        fireEvent.change(screen.getByPlaceholderText('identification.email_placeholder'), {
            target: { value: 'test@example.com' },
        });
        // We use LabelText to target the specific PasswordInput correctly
        fireEvent.change(screen.getByLabelText('identification.password'), {
            target: { value: 'password123' },
        });

        const submitBtn = screen.getByRole('button', { name: /identification.login.button/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        });
    });

    /**
     * Test client-side validation logic for mismatched passwords during registration.
     * Fix: Directly firing the submit event on the form to ensure state update.
     */
    it('should show error if passwords do not match during signup', async () => {
        const { container } = render(<AuthenticationView />);
        
        // 1. Switch to signup mode
        fireEvent.click(screen.getByText('identification.register.register'));

        // 2. Fill the form
        fireEvent.change(screen.getByPlaceholderText('identification.email_placeholder'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('identification.password'), {
            target: { value: 'pass1' },
        });
        fireEvent.change(screen.getByLabelText('identification.confirm_password'), {
            target: { value: 'pass2' },
        });

        // 3. Directly trigger form submission
        // Sometimes fireEvent.click(button) fails to trigger onSubmit in JSDOM if there are validation conflicts
        const form = container.querySelector('form');
        await act(async () => {
            fireEvent.submit(form);
        });

        // 4. Verification: check the alert element
        const errorMessage = await screen.findByRole('alert');
        expect(errorMessage.textContent).toContain('identification.password_mismatch');
        expect(mockSignUp).not.toHaveBeenCalled();
    });

    /**
     * Test API error handling for 401 Unauthorized (Invalid Credentials).
     */
    it('should display error message when login fails with 401', async () => {
        mockLogin.mockRejectedValue({ status: 401 });

        render(<AuthenticationView />);

        fireEvent.change(screen.getByPlaceholderText('identification.email_placeholder'), {
            target: { value: 'wrong@test.com' },
        });
        fireEvent.change(screen.getByLabelText('identification.password'), {
            target: { value: 'wrong' },
        });

        fireEvent.click(screen.getByRole('button', { name: /identification.login.button/i }));

        expect(await screen.findByText('error.invalid_credentials')).toBeInTheDocument();
    });

    /**
     * Test API error handling for 409 Conflict (User already exists).
     */
    it('should display error message when signup fails with 409', async () => {
        mockSignUp.mockRejectedValue({ status: 409 });

        render(<AuthenticationView />);
        fireEvent.click(screen.getByText('identification.register.register'));

        fireEvent.change(screen.getByPlaceholderText('identification.username_placeholder'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('identification.email_placeholder'), { target: { value: 'exists@test.com' } });
        fireEvent.change(screen.getByLabelText('identification.password'), { target: { value: 'Pass123!' } });
        fireEvent.change(screen.getByLabelText('identification.confirm_password'), { target: { value: 'Pass123!' } });

        fireEvent.click(screen.getByRole('button', { name: /identification.register.button/i }));

        expect(await screen.findByText('error.already_registered')).toBeInTheDocument();
    });

    /**
     * Verify that the UI enters a loading state while the authentication request is pending.
     */
    it('should disable submit button and show spinner when loading', async () => {
        // Mock a login call that remains pending
        mockLogin.mockReturnValue(new Promise(() => {}));

        render(<AuthenticationView />);
        
        fireEvent.change(screen.getByPlaceholderText('identification.email_placeholder'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByLabelText('identification.password'), { target: { value: 'pass' } });

        const submitBtn = screen.getByRole('button', { name: /identification.login.button/i });
        fireEvent.click(submitBtn);

        expect(submitBtn).toBeDisabled();
        // Check if the spinner SVG is rendered inside the submit button
        expect(submitBtn.querySelector('.animate-spin')).toBeInTheDocument();
    });

    /**
     * Test the mobile specific layout changes.
     */
    it('should apply mobile layout classes when isMobile is true', () => {
        useIsMobile.mockReturnValue(true);
        render(<AuthenticationView />);
        
        // The top bar container should have a margin top on mobile
        const topBar = screen.getByText('Graphite').closest('div');
        expect(topBar).toHaveClass('mt-10');
    });
});