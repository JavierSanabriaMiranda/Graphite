import { describe, it, expect, vi } from 'vitest';
import getSuggestionConfig from '../../../src/components/slash_commands/suggestions';

describe('Slash Commands Suggestions Logic', () => {
    // Mock of traduction function
    const t = (key) => {
        const translations = {
            'editor.slash.h1.title': 'Heading 1',
            'editor.slash.h1.search': 'h1,title,big',
            'editor.slash.normal_text.title': 'Text',
            'editor.slash.normal_text.search': 'p,paragraph',
        };
        return translations[key] || key;
    };

    const mockCreateSubnote = vi.fn();
    const config = getSuggestionConfig(t, mockCreateSubnote);

    it('should filter items by title', () => {
        const result = config.items({ query: 'heading' });
        expect(result[0].title).toBe('Heading 1');
    });

    it('should filter items by searchTerms', () => {
        const result = config.items({ query: 'paragraph' });
        expect(result[0].title).toBe('Text');
    });

    it('should return empty array if no matches', () => {
        const result = config.items({ query: 'xyz_non_existent' });
        expect(result.length).toBe(0);
    });
});