import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SettingsModal from '../../../src/components/settings/SettingsModal';
import { useAuth } from '../../../src/components/context/AuthContext';
import { useIsMobile } from '../../../src/hooks/useIsMobile';

vi.mock('../../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mocking Sub-components to isolate the Modal test
vi.mock('../../../src/components/settings/SettingsView', () => ({
    // Mocking SettingsView as a simple container with a close button
    default: ({ onClose, t }) => (
        <div data-testid="settings-view">
            <h1>{t('settings.title')}</h1>
            <button onClick={onClose} data-testid="close-settings">Close</button>
        </div>
    ),
}));

// Mocking Floating UI to avoid complex portal/overlay logic in unit tests
vi.mock('@floating-ui/react', () => ({
    useFloating: () => ({ refs: { setFloating: vi.fn() }, context: {} }),
    useDismiss: vi.fn(),
    useRole: vi.fn(),
    useInteractions: () => ({ getFloatingProps: () => ({}) }),
    FloatingPortal: ({ children }) => <div data-testid="floating-portal">{children}</div>,
    FloatingOverlay: ({ children, style, className }) => (
        <div data-testid="floating-overlay" style={style} className={className}>
            {children}
        </div>
    ),
}));

vi.mock('lucide-react', () => ({
    X: () => <svg data-testid="close-icon" />,
    Globe: () => <svg data-testid="globe-icon" />,
}));

describe('SettingsModal Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        // Setup default auth state
        useAuth.mockReturnValue({ logout: vi.fn() });
        // Setup default device state
        useIsMobile.mockReturnValue(false);
    });

    /**
     * Test that the modal does not render anything when isOpen is false.
     */
    it('should return null if isOpen is false', () => {
        const { container } = render(<SettingsModal isOpen={false} onClose={mockOnClose} />);
        expect(container.firstChild).toBeNull();
    });

    /**
     * Verify that the internal SettingsView is rendered when the modal opens.
     */
    it('should render the modal structure via SettingsView when isOpen is true', () => {
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByTestId('settings-view')).toBeInTheDocument();
        expect(screen.getByText('settings.title')).toBeInTheDocument();
    });

    /**
     * Test closing mechanism via the props passed to the child view.
     */
    it('should call onClose when the close trigger in SettingsView is clicked', () => {
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        const closeBtn = screen.getByTestId('close-settings');
        fireEvent.click(closeBtn);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    /**
     * Test mobile-specific rendering.
     */
    it('should render a simplified mobile version without FloatingPortal', () => {
        useIsMobile.mockReturnValue(true);
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        // In mobile mode, we don't use FloatingPortal mock
        expect(screen.queryByTestId('floating-portal')).not.toBeInTheDocument();
        expect(screen.getByTestId('settings-view')).toBeInTheDocument();
    });

    /**
     * Verify desktop version uses Floating UI Overlay.
     */
    it('should render desktop version using FloatingOverlay', () => {
        useIsMobile.mockReturnValue(false);
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByTestId('floating-portal')).toBeInTheDocument();
        expect(screen.getByTestId('floating-overlay')).toBeInTheDocument();
    });
});