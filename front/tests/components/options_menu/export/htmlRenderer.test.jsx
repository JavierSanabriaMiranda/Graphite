import { describe, it, expect, vi, beforeEach } from 'vitest';
import { convertJsonToHtml } from '../../../../src/components/options_menu/export/htmlRenderer';

// --- 1. MOCKS ---

// Mocking child components to avoid rendering complex internal logic
vi.mock('../../../../src/components/advanced_blocks/file_attachment/VideoAttachmentView', () => ({
    default: () => <div data-testid="video-view" />
}));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/AudioAttachmentView', () => ({
    default: () => <div data-testid="audio-view" />
}));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/ImageAttachmentView', () => ({
    default: () => <img data-testid="image-view" alt="" />
}));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/GenericFileAttachmentView', () => ({
    default: () => <div data-testid="generic-file-view" />
}));

// Mock translation
vi.mock('i18next', () => ({
    t: (key) => key,
}));

describe('htmlRenderer - convertJsonToHtml', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test basic text rendering and Tiptap marks (Bold, Italic, Styles)
     */
    it('should render text with marks correctly', () => {
        const json = {
            type: 'doc',
            content: [{
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Bold', marks: [{ type: 'bold' }] },
                    { type: 'text', text: ' and ' },
                    { type: 'text', text: 'Colored', marks: [{ type: 'textStyle', attrs: { color: '#ff0000' } }] }
                ]
            }]
        };

        const html = convertJsonToHtml(json, 'html', []);

        expect(html).toContain('<strong class="font-bold">Bold</strong>');
        expect(html).toContain('<span style="color:#ff0000">Colored</span>');
    });

    /**
     * Test the Callout block rendering
     */
    it('should render callout blocks with emojis', () => {
        const json = {
            type: 'doc',
            content: [{
                type: 'callout',
                attrs: { emoji: '💡' },
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Callout content' }] }]
            }]
        };

        const html = convertJsonToHtml(json, 'html', []);

        expect(html).toContain('💡');
        expect(html).toContain('Callout content');
        expect(html).toContain('export-node');
    });

    /**
     * Test Code Blocks and language labels
     */
    it('should render code blocks with language labels', () => {
        const json = {
            type: 'doc',
            content: [{
                type: 'codeBlock',
                attrs: { language: 'javascript' },
                content: [{ type: 'text', text: 'const x = 10;' }]
            }]
        };

        const html = convertJsonToHtml(json, 'html', []);

        expect(html).toContain('javascript');
        expect(html).toContain('uppercase'); // Verify the CSS class is present
        expect(html).toContain('<code class="language-javascript">const x = 10;</code>');
    });

    /**
     * Test Task Lists (Checkboxes)
     */
    it('should render task items correctly (checked/unchecked)', () => {
        const json = {
            type: 'doc',
            content: [{
                type: 'taskList',
                content: [
                    { type: 'taskItem', attrs: { checked: true }, content: [{ type: 'text', text: 'Done' }] },
                    { type: 'taskItem', attrs: { checked: false }, content: [{ type: 'text', text: 'Pending' }] }
                ]
            }]
        };

        const html = convertJsonToHtml(json, 'html', []);

        // Check for the primary background color on the checked item
        expect(html).toContain('style="background-color:#4f46e5');
        expect(html).toContain('Done');
        expect(html).toContain('Pending');
    });

    /**
     * Test NoteLinks: Resolving title from allNotes array
     */
    it('should resolve note titles in noteLinks using allNotes data', () => {
        const allNotes = [{ note_id: 'note-123', title: 'Linked Note', icon: '📝' }];
        const json = {
            type: 'doc',
            content: [{
                type: 'paragraph',
                content: [{ type: 'noteLink', attrs: { noteId: 'note-123' } }]
            }]
        };

        const html = convertJsonToHtml(json, 'html', allNotes);

        expect(html).toContain('Linked Note');
        expect(html).toContain('📝');
    });

    /**
     * Test Attachment filtering: PDF mode should hide audio/video
     */
    it('should hide audio and video attachments when exportFormat is PDF', () => {
        const json = {
            type: 'doc',
            content: [
                { type: 'attachment', attrs: { mimeType: 'video/mp4', attachmentId: 'v1' } },
                { type: 'attachment', attrs: { mimeType: 'image/png', attachmentId: 'i1' } }
            ]
        };

        const html = convertJsonToHtml(json, 'pdf', []);

        // Video should be filtered out
        expect(html).not.toContain('video-view');
        // Image should remain
        expect(html).toContain('image-view');
    });

    /**
     * Test Toggle blocks: Content should always be visible in exports
     */
    it('should render toggle blocks with visible content for export', () => {
        const json = {
            type: 'doc',
            content: [{
                type: 'toggleBlock',
                content: [
                    { type: 'toggleTitle', content: [{ type: 'text', text: 'Click to expand' }] },
                    { type: 'toggleContent', content: [{ type: 'text', text: 'Hidden logic' }] }
                ]
            }]
        };

        const html = convertJsonToHtml(json, 'html', []);

        expect(html).toContain('Click to expand');
        expect(html).toContain('Hidden logic');
        // Verify the static dropdown icon is present
        expect(html).toContain('polyline');
    });
});