import { describe, it, expect, vi } from 'vitest';
import { NoteLink } from '../../../src/components/suggestions/NoteLinkExtension';

describe('NoteLink Tiptap Extension', () => {

    it('should have the correct name and configuration', () => {
        expect(NoteLink.name).toBe('noteLink');
        expect(NoteLink.config.inline).toBe(true);
        expect(NoteLink.config.group).toBe('inline');
        expect(NoteLink.config.atom).toBe(true);
    });

    it('should define the correct attributes', () => {
        const attributes = NoteLink.config.addAttributes();
        expect(attributes).toHaveProperty('noteId');
        expect(attributes.noteId.default).toBeNull();
    });

    describe('renderHTML and parseHTML', () => {
        it('should render correct HTML tag and data attributes', () => {
            const HTMLAttributes = { noteId: '123' };
            const output = NoteLink.config.renderHTML({ HTMLAttributes });

            expect(output[0]).toBe('span');
            expect(output[1]).toHaveProperty('data-note-link');
            expect(output[1].noteId).toBe('123');
        });

        it('should parse correctly from HTML', () => {
            const parseRule = NoteLink.config.parseHTML()[0];
            expect(parseRule.tag).toBe('span[data-note-link]');
        });
    });

    describe('Command Logic', () => {
        it('should insert a noteLink node followed by a space', () => {
            const editorMock = {
                chain: vi.fn().mockReturnThis(),
                focus: vi.fn().mockReturnThis(),
                insertContentAt: vi.fn().mockReturnThis(),
                run: vi.fn(),
            };

            const range = { from: 1, to: 3 };
            const props = { noteId: 'abc' };

            // Manually trigger the command from options
            NoteLink.config.addOptions().suggestion.command({
                editor: editorMock,
                range,
                props
            });

            expect(editorMock.insertContentAt).toHaveBeenCalledWith(range, [
                {
                    type: 'noteLink',
                    attrs: props,
                },
                {
                    type: 'text',
                    text: ' ',
                },
            ]);
        });
    });
});