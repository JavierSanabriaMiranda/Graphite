import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditorConfig } from '../../src/hooks/useEditorConfig';
import { createLowlight } from 'lowlight';

const { tStable } = vi.hoisted(() => ({
    tStable: vi.fn((key) => key)
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: tStable }),
}));

vi.mock('i18next', () => ({
    t: tStable,
    default: { t: tStable },
}));

vi.mock('lowlight', () => {
    const register = vi.fn();
    return {
        createLowlight: vi.fn(() => ({
            register,
        })),
    };
});

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        ReactNodeViewRenderer: vi.fn((component) => component),
        Node: {
            create: vi.fn(() => ({
                configure: vi.fn().mockReturnThis(),
                extend: vi.fn(function() { return this; }),
            })),
        },
    };
});

vi.mock('@tiptap/starter-kit', () => ({
    default: { configure: vi.fn().mockReturnThis() },
}));

vi.mock('highlight.js/lib/languages/javascript', () => ({ default: vi.fn() }));
vi.mock('highlight.js/lib/languages/python', () => ({ default: vi.fn() }));

vi.mock('../../src/components/suggestions/suggestions', () => ({ default: vi.fn() }));
vi.mock('../../src/components/suggestions/noteLinksSuggestions', () => ({ getNoteLinkSuggestionConfig: vi.fn() }));

describe('useEditorConfig Hook - Full Integration Suite', () => {
    const mockOnUpdate = vi.fn();
    const mockUploadFile = vi.fn();
    const mockNoteId = 'note-123';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // --- BASIC CONFIGURATION TESTS ---

    it('should return a config object with the expected structure', () => {
        const { result } = renderHook(() => useEditorConfig({ onUpdate: mockOnUpdate }));

        expect(result.current).toHaveProperty('extensions');
        expect(result.current).toHaveProperty('onUpdate');
        expect(result.current).toHaveProperty('editorProps');
        expect(Array.isArray(result.current.extensions)).toBe(true);
    });

    it('should build a font stack that includes the custom emoji font variable', () => {
        const { result } = renderHook(() => useEditorConfig({ 
            onUpdate: mockOnUpdate,
            defaultFont: 'Roboto'
        }));

        const style = result.current.editorProps.attributes.style;
        expect(style).toContain('Roboto');
        expect(style).toContain('var(--font-emoji)');
    });

    it('should apply the default Prose classes if no customClass is provided', () => {
        const { result } = renderHook(() => useEditorConfig({ onUpdate: mockOnUpdate }));
        
        const classes = result.current.editorProps.attributes.class;
        expect(classes).toContain('prose');
        expect(classes).toContain('dark:prose-invert');
        expect(classes).toContain('focus:outline-none');
    });

    // --- SYNTAX HIGHLIGHTING (LOWLIGHT) TESTS ---

    it('should register all required languages in lowlight on initialization', () => {
        renderHook(() => useEditorConfig({ onUpdate: mockOnUpdate }));
        
        const lowlight = createLowlight();
        const registeredLanguages = vi.mocked(lowlight.register).mock.calls.map(call => call[0]);
        
        const expected = ['java', 'javascript', 'python', 'c', 'cpp', 'bash', 'html', 'css'];
        expected.forEach(lang => expect(registeredLanguages).toContain(lang));
    });

    // --- DYNAMIC PLACEHOLDER LOGIC ---

    it('should return node-specific placeholders for Toggle and Page blocks', () => {
        const { result } = renderHook(() => useEditorConfig({ onUpdate: mockOnUpdate }));
        
        const placeholderExt = result.current.extensions.find(ext => ext.name === 'placeholder');
        const getPlaceholder = placeholderExt.options.placeholder;

        const mockEditor = {
            state: {
                doc: { resolve: vi.fn(() => ({ parent: { type: { name: 'toggleContent' } } })) }
            }
        };

        // Case: Toggle Title
        expect(getPlaceholder({ node: { type: { name: 'toggleTitle' } }, editor: mockEditor }))
            .toBe('editor.toggle_title');

        // Case: Toggle Content (Paragraph)
        expect(getPlaceholder({ node: { type: { name: 'paragraph' } }, editor: mockEditor, pos: 10 }))
            .toBe('editor.toggle_empty');
    });

    // --- 5. FILE EVENT HANDLING (PASTE & DROP) ---

    it('should handle file paste by uploading the file and inserting an attachment node', async () => {
        mockUploadFile.mockResolvedValue({
            attachment_id: 'att-1',
            file_name: 'test.png',
            mime_type: 'image/png'
        });

        const { result } = renderHook(() => useEditorConfig({ 
            onUpdate: mockOnUpdate, 
            uploadFile: mockUploadFile,
            noteId: mockNoteId
        }));

        const mockView = {
            state: {
                tr: { replaceSelectionWith: vi.fn().mockReturnThis() },
                schema: { nodes: { attachment: { create: vi.fn(() => 'node') } } }
            },
            dispatch: vi.fn()
        };

        const mockEvent = {
            preventDefault: vi.fn(),
            clipboardData: { files: [new File([], 'test.png')] }
        };

        const handled = await result.current.editorProps.handlePaste(mockView, mockEvent);
        
        expect(handled).toBe(true);
        expect(mockUploadFile).toHaveBeenCalled();
        await vi.waitFor(() => {
            expect(mockView.dispatch).toHaveBeenCalled();
        });
    });

    it('should handle file drop by calculating coordinates and inserting node', async () => {
        mockUploadFile.mockResolvedValue({ attachment_id: 'att-2', file_name: 'drop.jpg' });

        const { result } = renderHook(() => useEditorConfig({ 
            onUpdate: mockOnUpdate, 
            uploadFile: mockUploadFile,
            noteId: mockNoteId
        }));

        const mockView = {
            posAtCoords: vi.fn(() => ({ pos: 100 })),
            state: {
                tr: { insert: vi.fn().mockReturnThis() },
                schema: { nodes: { attachment: { create: vi.fn(() => 'dropNode') } } }
            },
            dispatch: vi.fn()
        };

        const mockEvent = {
            preventDefault: vi.fn(),
            clientX: 10, clientY: 10,
            dataTransfer: { files: [new File([], 'drop.jpg')] }
        };

        const handled = await result.current.editorProps.handleDrop(mockView, mockEvent, null, false);

        expect(handled).toBe(true);
        expect(mockView.posAtCoords).toHaveBeenCalled();
        await vi.waitFor(() => {
            expect(mockView.state.tr.insert).toHaveBeenCalledWith(100, 'dropNode');
        });
    });

    // --- MEMOIZATION & STABILITY ---

    it('should return a consistent config object when dependencies do not change', () => {
        const initialProps = { 
            onUpdate: mockOnUpdate, 
            defaultFont: 'Inter',
            allNotes: [],
            noteId: mockNoteId,
            uploadFile: mockUploadFile
        };

        const { result, rerender } = renderHook(
            (props) => useEditorConfig(props),
            { initialProps }
        );

        const firstResult = result.current;

        rerender(initialProps);

        expect(result.current).toBe(firstResult);
    });

    it('should provide a default no-op handleKeyDown if not provided', () => {
        const { result } = renderHook(() => useEditorConfig({ onUpdate: mockOnUpdate }));
        
        const handler = result.current.editorProps.handleKeyDown;
        expect(typeof handler).toBe('function');
        expect(handler()).toBe(false);
    });
});