import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ImportButton from '../../../src/components/options_menu/ImportButton';
import { useToast } from '../../../src/components/context/ToastContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

describe('ImportButton Component', () => {
    let mockEditor;
    let mockOnDone;
    let mockShowToast;

    beforeEach(() => {
        vi.clearAllMocks();

        mockShowToast = vi.fn();
        useToast.mockReturnValue({ showToast: mockShowToast });

        mockOnDone = vi.fn();
        mockEditor = {
            commands: {
                insertContent: vi.fn(),
            },
        };

        
        const MockFileReader = vi.fn().mockImplementation(function () {
            this.readAsText = vi.fn((file) => {
                // Simulate result based on file name
                const result = file.name === 'valid.json'
                    ? '{"type": "doc", "content": []}'
                    : 'invalid-json';

                // Execute the onload the component has defined
                if (this.onload) {
                    this.onload({ target: { result } });
                }
            });
        });

        vi.stubGlobal('FileReader', MockFileReader);
    });

    it('should render the button and the hidden input', () => {
        render(<ImportButton editor={mockEditor} onDone={mockOnDone} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('editor.options_menu.import')).toBeInTheDocument();

        // Input is hidden but exists on DOM
        const input = document.querySelector('input[type="file"]');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('hidden');
    });

    it('should trigger the file input click when the button is clicked', () => {
        render(<ImportButton editor={mockEditor} onDone={mockOnDone} />);

        const input = document.querySelector('input[type="file"]');
        const spy = vi.spyOn(input, 'click');

        fireEvent.click(screen.getByRole('button'));

        expect(spy).toHaveBeenCalled();
    });

    it('should handle successful JSON import', async () => {
        render(<ImportButton editor={mockEditor} onDone={mockOnDone} />);
        const input = document.querySelector('input[type="file"]');

        // Create a fake file
        const file = new File(['{"test": true}'], 'valid.json', { type: 'application/json' });

        // Trigger input change
        fireEvent.change(input, { target: { files: [file] } });

        expect(mockEditor.commands.insertContent).toHaveBeenCalledWith({ type: "doc", content: [] });
        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.import_success', 'success');
        expect(mockOnDone).toHaveBeenCalled();
        expect(input.value).toBe(""); // Reset value
    });

    it('should handle invalid JSON error', async () => {
        render(<ImportButton editor={mockEditor} onDone={mockOnDone} />);
        const input = document.querySelector('input[type="file"]');

        const file = new File(['invalid'], 'invalid.json', { type: 'application/json' });

        fireEvent.change(input, { target: { files: [file] } });

        expect(mockEditor.commands.insertContent).not.toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('editor.options_menu.import_error', 'error');
        expect(input.value).toBe(""); // Reset value even with an error
    });

    it('should do nothing if no file is selected', () => {
        render(<ImportButton editor={mockEditor} onDone={mockOnDone} />);
        const input = document.querySelector('input[type="file"]');

        // Trigger event without files
        fireEvent.change(input, { target: { files: [] } });

        expect(global.FileReader).not.toHaveBeenCalled();
    });
});