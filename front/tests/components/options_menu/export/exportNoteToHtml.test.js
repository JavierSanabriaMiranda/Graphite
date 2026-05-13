import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportNoteToHtml } from '../../../../src/components/options_menu/export/exportNoteToHtml';
import * as exportUtils from '../../../../src/components/options_menu/export/exportUtils'

vi.mock('../../../../src/components/options_menu/export/exportUtils', async () => {
    const actual = await vi.importActual('../../../../src/components/options_menu/export/exportUtils');
    return {
        ...actual,
        generateFullHtmlString: vi.fn(),
        saveAsFile: vi.fn(),
    };
});

describe('exportNoteToHtml function', () => {
    const mockEditor = { getHTML: () => '<p>Hello</p>' };
    const mockAllNotes = [];
    const mockHtmlResult = '<html><body><p>Hello</p></body></html>';

    beforeEach(() => {
        vi.clearAllMocks();
        exportUtils.generateFullHtmlString.mockResolvedValue(mockHtmlResult);
    });

    it('should call generateFullHtmlString and saveAsFile with correct parameters', async () => {
        const title = "My Daily Note";
        const theme = 'dark';

        await exportNoteToHtml(mockEditor, title, theme, mockAllNotes);

        // Verify html was correctly generated with correct args
        expect(exportUtils.generateFullHtmlString).toHaveBeenCalledWith(
            mockEditor,
            title,
            theme,
            'html',
            mockAllNotes
        );

        expect(exportUtils.saveAsFile).toHaveBeenCalledWith(
            mockHtmlResult,
            'my_daily_note.html',
            'text/html'
        );
    });

    it('should sanitize the filename by replacing special characters with underscores', async () => {
        const title = "Note! @2026 #Graphite";

        await exportNoteToHtml(mockEditor, title, 'light', mockAllNotes);

        expect(exportUtils.saveAsFile).toHaveBeenCalledWith(
            expect.any(String),
            expect.stringMatching(/note.*2026.*graphite\.html/),
            'text/html'
        );
    });

    it('should use default title when none is provided', async () => {
        await exportNoteToHtml(mockEditor, undefined, 'light', mockAllNotes);

        expect(exportUtils.saveAsFile).toHaveBeenCalledWith(
            expect.any(String),
            'graphite_document.html',
            'text/html'
        );
    });
});