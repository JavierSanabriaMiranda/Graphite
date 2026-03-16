import { describe, it, expect, vi, beforeEach } from 'vitest';
import { menuBarStateSelector } from '../../../src/components/util/menuBarStateSelector';

describe('menuBarStateSelector Logic', () => {
    let mockEditor;
    let mockCtx;

    beforeEach(() => {
        mockEditor = {
            isActive: vi.fn().mockReturnValue(false),
            getAttributes: vi.fn().mockReturnValue({}),
            can: vi.fn().mockReturnValue({
                undo: vi.fn().mockReturnValue(false),
                redo: vi.fn().mockReturnValue(false),
            }),
        };

        mockCtx = {
            editor: mockEditor,
        };
    });

    it('should correctly map basic formats (bold, italic, etc.)', () => {
        mockEditor.isActive.mockImplementation((name) => {
            if (name === 'bold') return true;
            if (name === 'code') return true;
            return false;
        });

        const state = menuBarStateSelector(mockCtx);

        expect(state.isBold).toBe(true);
        expect(state.isCode).toBe(true);
        expect(state.isItalic).toBe(false);
    });

    describe('currentTextType priority logic', () => {
        it('should return "h1" when heading level 1 is active', () => {
            mockEditor.isActive.mockImplementation((name, opts) => {
                return name === 'heading' && opts?.level === 1;
            });
            const state = menuBarStateSelector(mockCtx);
            expect(state.currentTextType).toBe('h1');
        });

        it('should return "callout" when callout is active', () => {
            mockEditor.isActive.mockImplementation((name) => name === 'callout');
            const state = menuBarStateSelector(mockCtx);
            expect(state.currentTextType).toBe('callout');
        });

        it('should return "p" as default when nothing else is active', () => {
            const state = menuBarStateSelector(mockCtx);
            expect(state.currentTextType).toBe('p');
        });
    });

    describe('Fonts and History', () => {
        it('should return the correct font family or "Inter" as default', () => {
            // Case with font
            mockEditor.getAttributes.mockReturnValue({ fontFamily: 'Roboto' });
            let state = menuBarStateSelector(mockCtx);
            expect(state.currentFont).toBe('Roboto');

            // Case without font
            mockEditor.getAttributes.mockReturnValue({});
            state = menuBarStateSelector(mockCtx);
            expect(state.currentFont).toBe('Inter');
        });

        it('should correctly report history state', () => {
            mockEditor.can.mockReturnValue({
                undo: () => true,
                redo: () => false,
            });

            const state = menuBarStateSelector(mockCtx);
            expect(state.canUndo).toBe(true);
            expect(state.canRedo).toBe(false);
        });
    });
});