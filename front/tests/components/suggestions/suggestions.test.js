import { describe, it, expect, vi, beforeEach } from 'vitest';
import getSuggestionConfig from '../../../src/components/suggestions/suggestions';

describe('Slash Commands Suggestions Logic', () => {
    // Extended translation mock to cover various block types
    const t = (key) => {
        const translations = {
            'editor.slash.h1.title': 'Heading 1',
            'editor.slash.h1.search': 'h1,title,big',
            'editor.slash.normal_text.title': 'Text',
            'editor.slash.normal_text.search': 'p,paragraph',
            'editor.slash.page.title': 'Page',
            'editor.slash.page.search': 'subpage,new',
            'editor.slash.emoji.title': 'Emoji',
            'editor.slash.emoji.search': 'smile,face',
            'editor.slash.code.title': 'Code Block',
            'editor.slash.code.search': 'code,pre',
        };
        return translations[key] || key;
    };

    // Dependencies and Tiptap editor mocks
    const mockCreateSubnote = vi.fn();
    const mockSelectNote = vi.fn();
    const mockOnEmojiCommand = vi.fn();
    
    // Fluent mock for Tiptap editor chaining
    const mockEditor = {
        chain: vi.fn().mockReturnThis(),
        focus: vi.fn().mockReturnThis(),
        deleteRange: vi.fn().mockReturnThis(),
        setParagraph: vi.fn().mockReturnThis(),
        setNode: vi.fn().mockReturnThis(),
        insertPageBlock: vi.fn().mockReturnThis(),
        toggleCodeBlock: vi.fn().mockReturnThis(),
        run: vi.fn().mockReturnThis(),
    };

    const config = getSuggestionConfig(t, mockCreateSubnote, mockSelectNote, mockOnEmojiCommand);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test the filtering logic based on the user's query.
     * It should look into titles and searchTerms defined in translations.
     */
    describe('Filtering Logic', () => {
        it('should filter items by title', () => {
            const result = config.items({ query: 'heading' });
            expect(result[0].title).toBe('Heading 1');
        });

        it('should filter items by searchTerms', () => {
            const result = config.items({ query: 'paragraph' });
            expect(result[0].title).toBe('Text');
        });

        it('should be case insensitive', () => {
            const result = config.items({ query: 'TEXT' });
            expect(result.length).toBeGreaterThan(0);
            expect(result[0].title).toBe('Text');
        });

        it('should return empty array if no matches are found', () => {
            const result = config.items({ query: 'xyz_non_existent' });
            expect(result.length).toBe(0);
        });

        it('should return at most 20 items', () => {
            // Since we only have a few items in mock translations, this verifies logic
            const result = config.items({ query: '' });
            expect(result.length).toBeLessThanOrEqual(20);
        });
    });

    /**
     * Test the actual execution of commands when an item is selected.
     * This includes basic Tiptap commands and custom business logic.
     */
    describe('Command Execution', () => {
        const range = { from: 0, to: 5 };

        it('should execute basic text command (Paragraph)', () => {
            const items = config.items({ query: 'Text' });
            items[0].command({ editor: mockEditor, range });

            expect(mockEditor.chain).toHaveBeenCalled();
            expect(mockEditor.deleteRange).toHaveBeenCalledWith(range);
            expect(mockEditor.setParagraph).toHaveBeenCalled();
            expect(mockEditor.run).toHaveBeenCalled();
        });

        it('should execute heading commands with correct level attributes', () => {
            const items = config.items({ query: 'Heading 1' });
            items[0].command({ editor: mockEditor, range });

            expect(mockEditor.setNode).toHaveBeenCalledWith('heading', { level: 1 });
        });

        /**
         * Test the complex async flow for creating a subpage.
         * It must call the DB service, insert the block, and navigate to the new note.
         */
        it('should handle subpage creation and subsequent note selection', async () => {
            const newNote = { note_id: 'new-id-123', title: 'New Note' };
            mockCreateSubnote.mockResolvedValue(newNote);

            const items = config.items({ query: 'Page' });
            await items[0].command({ editor: mockEditor, range });

            expect(mockCreateSubnote).toHaveBeenCalled();
            expect(mockEditor.insertPageBlock).toHaveBeenCalledWith('new-id-123');
            expect(mockSelectNote).toHaveBeenCalledWith(newNote);
        });

        /**
         * Test external command triggers (Emoji Picker).
         */
        it('should call onEmojiCommand and clean up the range when selected', () => {
            const items = config.items({ query: 'Emoji' });
            items[0].command({ editor: mockEditor, range });

            expect(mockEditor.deleteRange).toHaveBeenCalledWith(range);
            expect(mockOnEmojiCommand).toHaveBeenCalled();
        });

        it('should execute code block toggle command', () => {
            const items = config.items({ query: 'Code Block' });
            items[0].command({ editor: mockEditor, range });

            expect(mockEditor.toggleCodeBlock).toHaveBeenCalled();
        });
    });

    /**
     * Structural check for Tiptap Extension compatibility.
     */
    describe('Render Contract', () => {
        it('should expose the necessary hooks for Tiptap suggestions extension', () => {
            const renderFunctions = config.render();
            expect(renderFunctions).toHaveProperty('onStart');
            expect(renderFunctions).toHaveProperty('onUpdate');
            expect(renderFunctions).toHaveProperty('onKeyDown');
            expect(renderFunctions).toHaveProperty('onExit');
        });
    });
});