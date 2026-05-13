import { describe, it, expect, vi, beforeEach } from 'vitest';
import { invoke } from '@tauri-apps/api/core';
import { save } from '@tauri-apps/plugin-dialog';
import { exportNoteToPdf } from '../../../../src/components/options_menu/export/exportNoteToPdf'
import * as exportUtils from '../../../../src/components/options_menu/export/exportUtils'

// --- 1. MOCKING TAURI AND PLUGINS ---

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('@tauri-apps/plugin-dialog', () => ({
    save: vi.fn(),
}));

// Mocking the local helper within the same file/module
vi.mock('../../../../src/components/options_menu/export/exportUtils', async () => {
    const actual = await vi.importActual('../../../../src/components/options_menu/export/exportUtils');
    return {
        ...actual,
        generateFullHtmlString: vi.fn(),
    };
});

describe('exportNoteToPdf function', () => {
    const mockEditor = { getHTML: () => '<h1>Test</h1>' };
    const mockAllNotes = [];
    const mockTitle = "Meeting Notes";
    const mockTheme = "dark";

    beforeEach(() => {
        vi.clearAllMocks();
        // Default HTML generation mock
        vi.mocked(exportUtils.generateFullHtmlString).mockResolvedValue('<html>...</html>');
    });

    /**
     * Test Case: Successful Full Flow
     */
    it('should complete the full export flow when a file path is selected', async () => {
        const fakePath = '/downloads/meeting_notes.pdf';
        
        vi.mocked(save).mockResolvedValue(fakePath);
        vi.mocked(invoke).mockResolvedValue();

        const result = await exportNoteToPdf(mockEditor, mockTitle, mockTheme, mockAllNotes);

        // Verify Dialog was opened with sanitized default name
        expect(save).toHaveBeenCalledWith(expect.objectContaining({
            defaultPath: 'Meeting_Notes.pdf'
        }));

        // Verify Rust backend was invoked
        expect(invoke).toHaveBeenCalledWith('export_pdf_silently', {
            html: '<html>...</html>',
            path: fakePath
        });

        expect(result).toBe(true);
    });

    /**
     * Test Case: User Cancellation
     */
    it('should stop execution and return false if the user cancels the save dialog', async () => {
        vi.mocked(save).mockResolvedValue(null);

        const result = await exportNoteToPdf(mockEditor, mockTitle, mockTheme, mockAllNotes);

        expect(exportUtils.generateFullHtmlString).not.toHaveBeenCalled();
        expect(invoke).not.toHaveBeenCalled();
        expect(result).toBe(false);
    });

    /**
     * Test Case: Error Handling
     */
    it('should throw and log an error if the Rust backend fails', async () => {
        vi.mocked(save).mockResolvedValue('/some/path.pdf');
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        vi.mocked(invoke).mockRejectedValue(new Error('Internal PDF Engine Error'));

        await expect(
            exportNoteToPdf(mockEditor, mockTitle, mockTheme, mockAllNotes)
        ).rejects.toThrow('Internal PDF Engine Error');

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});