import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNoteLinkSuggestionConfig } from '../../../src/components/suggestions/noteLinksSuggestions';
import { ReactRenderer } from '@tiptap/react';
import { computePosition } from '@floating-ui/dom';

vi.mock('@tiptap/react', () => ({
    ReactRenderer: vi.fn().mockImplementation(function () {
        return {
            element: document.createElement('div'),
            updateProps: vi.fn(),
            destroy: vi.fn(),
        };
    }),
}));

vi.mock('@floating-ui/dom', () => ({
    computePosition: vi.fn().mockResolvedValue({ x: 10, y: 20 }),
    flip: vi.fn(),
    shift: vi.fn(),
    offset: vi.fn(),
}));

// Mock of the component that ReactRenderer would receive
vi.mock('../suggestions/SlashMenuList', () => ({
    default: () => null,
}));

describe('NoteLink Suggestion Logic', () => {
    const mockNotes = {
        current: [
            { note_id: '1', title: 'Software Engineering', note_path: '/uni' },
            { note_id: '2', title: 'Hard Science', note_path: '/general' },
            { note_id: '3', title: 'Matemática Discreta', note_path: '/math' },
        ],
    };

    const config = getNoteLinkSuggestionConfig(mockNotes);

    afterEach(() => {
        document.body.innerHTML = '';
        vi.clearAllMocks();
    });

    describe('items() - Filtering Logic', () => {
        it('should return top 10 notes if query is empty', () => {
            const results = config.items({ query: '' });
            expect(results).toHaveLength(3);
            expect(results[0].title).toBe('Software Engineering');
        });

        it('should filter notes by multiple words regardless of order', () => {
            const results = config.items({ query: 'eng soft' });
            expect(results).toHaveLength(1);
            expect(results[0].noteId).toBe('1');
        });

        it('should be case insensitive and ignore accents', () => {
            const results = config.items({ query: 'matematica' });
            expect(results).toHaveLength(1);
            expect(results[0].title).toBe('Matemática Discreta');
        });

        it('should return an empty array if no matches are found', () => {
            const results = config.items({ query: 'xyz123' });
            expect(results).toHaveLength(0);
        });
    });

    describe('render() - Lifecycle and Keyboard', () => {
        let editorMock;
        let renderInstance;

        beforeEach(() => {
            editorMock = {
                chain: vi.fn().mockReturnValue({
                    focus: vi.fn().mockReturnThis(),
                    deleteRange: vi.fn().mockReturnThis(),
                    run: vi.fn(),
                }),
                state: { doc: { textBetween: vi.fn() } }
            };
            renderInstance = config.render();
        });

        it('should append container to body onStart', () => {
            renderInstance.onStart({ editor: editorMock, clientRect: () => ({}) });
            expect(document.body.innerHTML).toContain('div');
        });

        it('should execute deleteRange when Escape is pressed', () => {
            renderInstance.onStart({ editor: editorMock, clientRect: () => ({}) });
            const event = new KeyboardEvent('keydown', { key: 'Escape' });

            const result = renderInstance.onKeyDown({ event, range: { from: 0, to: 5 } });

            expect(result).toBe(true);
            expect(editorMock.chain).toHaveBeenCalled();
        });

        it('should clean up onExit', () => {
            renderInstance.onStart({ editor: editorMock, clientRect: () => ({}) });
            renderInstance.onExit();
            expect(document.body.innerHTML).toBe('');
        });
    });
});