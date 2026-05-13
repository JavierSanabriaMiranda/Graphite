import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveAsFile, generateFullHtmlString } from '../../../../src/components/options_menu/export/exportUtils';
import { invoke } from '@tauri-apps/api/core';
import { attachmentService } from '../../../../src/services/db/attachmentService';
import { convertJsonToHtml } from '../../../../src/components/options_menu/export/htmlRenderer';

// --- 1. MOCKS ---

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('../../../../src/services/db/attachmentService', () => ({
    attachmentService: {
        getById: vi.fn(),
    },
}));

vi.mock('../../../../src/components/options_menu/export/htmlRenderer', () => ({
    convertJsonToHtml: vi.fn(),
}));

describe('exportUtils - saveAsFile', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mocking URL methods which don't exist in JSDOM by default or need spying
        global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
        global.URL.revokeObjectURL = vi.fn();
    });

    /**
     * Test the browser download trigger logic
     */
    it('should create a link and trigger a click for download', () => {
        const spyElement = {
            click: vi.fn(),
            setAttribute: vi.fn(),
            style: {},
            href: '',
            download: ''
        };

        // Spy on document.createElement to catch the anchor tag
        vi.spyOn(document, 'createElement').mockReturnValue(spyElement);

        saveAsFile('test content', 'test.txt', 'text/plain');

        expect(URL.createObjectURL).toHaveBeenCalled();
        expect(spyElement.download).toBe('test.txt');
        expect(spyElement.href).toBe('blob:mock-url');
        expect(spyElement.click).toHaveBeenCalled();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });
});

describe('exportUtils - generateFullHtmlString', () => {
    const mockEditor = {
        getJSON: () => ({ type: 'doc', content: [] })
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Default mock for Twemoji font
        vi.mocked(invoke).mockImplementation((cmd) => {
            if (cmd === 'get_app_resource_base64') return Promise.resolve('font-base64');
            if (cmd === 'get_file_base64') return Promise.resolve('file-base64');
        });

        vi.mocked(convertJsonToHtml).mockReturnValue('<p>Mock Content</p>');
    });

    /**
     * Test the HTML template structure and theme application
     */
    it('should generate a full HTML string with injected styles and light theme', async () => {
        const result = await generateFullHtmlString(mockEditor, 'Test Title', 'light', 'html', []);

        expect(result).toContain('<!DOCTYPE html>');
        expect(result).toContain('Test Title');
        expect(result).toContain('background: #f6f7f8'); // Light theme check
        expect(result).toContain('Mock Content');
    });

    /**
     * Test Dark Theme styles
     */
    it('should apply dark theme styles correctly', async () => {
        const result = await generateFullHtmlString(mockEditor, 'Dark Note', 'dark', 'html', []);
        expect(result).toContain('background: #101822');
        expect(result).toContain('class="dark"');
    });

    /**
     * Test Resource Injection (Phase 1): Converting attachment:// to data: urls
     */
    it('should replace attachment:// links with Base64 data urls', async () => {
        // Setup raw HTML with an attachment image
        const rawHtmlWithImage = '<img src="attachment://uuid-123" />';
        vi.mocked(convertJsonToHtml).mockReturnValue(rawHtmlWithImage);

        // Mock DB metadata
        vi.mocked(attachmentService.getById).mockResolvedValue({
            local_path: '/path/to/img.png',
            mime_type: 'image/png'
        });

        const result = await generateFullHtmlString(mockEditor, 'Note with Image', 'light', 'html', []);

        // Verify the DB was queried
        expect(attachmentService.getById).toHaveBeenCalledWith('uuid-123');
        // Verify Tauri was called to read the file
        expect(invoke).toHaveBeenCalledWith('get_file_base64', { path: '/path/to/img.png' });
        // Verify the final string contains the data URL
        expect(result).toContain('src="data:image/png;base64,file-base64"');
    });

    /**
     * Test Error Resilience: Font loading failure
     */
    it('should still generate HTML even if font loading fails', async () => {
        vi.mocked(invoke).mockRejectedValueOnce(new Error('Font not found'));
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        const result = await generateFullHtmlString(mockEditor, 'Title', 'light', 'html', []);

        expect(result).toContain('<!DOCTYPE html>');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Twemoji'), expect.any(Error));
        consoleSpy.mockRestore();
    });
});