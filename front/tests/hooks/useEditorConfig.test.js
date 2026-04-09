import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditorConfig } from '../../src/hooks/useEditorConfig';

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mock i18next module
vi.mock('i18next', () => ({
    default: { t: (key) => key },
}));

// Mock Tiptap components and extensions
vi.mock('@tiptap/react', () => ({
    ReactNodeViewRenderer: vi.fn((component) => component),
}));

vi.mock('@tiptap/starter-kit', () => ({
    default: {
        configure: vi.fn(() => ({})),
    },
}));

vi.mock('@tiptap/extension-underline', () => ({
    Underline: {},
}));

vi.mock('@tiptap/extension-text-style', () => ({
    TextStyle: {},
}));

vi.mock('@tiptap/extension-font-family', () => ({
    FontFamily: {},
}));

vi.mock('@tiptap/extension-color', () => ({
    Color: {},
}));

vi.mock('@tiptap/extension-code', () => ({
    default: {
        extend: vi.fn(function() {
            return {
                configure: vi.fn(() => this),
            };
        }),
    },
}));

vi.mock('@tiptap/extension-text-align', () => ({
    default: {
        configure: vi.fn(() => ({})),
    },
}));

vi.mock('@tiptap/extension-bullet-list', () => ({
    default: {
        extend: vi.fn(function() {
            return this;
        }),
    },
}));

vi.mock('@tiptap/extension-ordered-list', () => ({
    default: {
        extend: vi.fn(function() {
            return this;
        }),
    },
}));

vi.mock('@tiptap/extension-task-list', () => ({
    default: {},
}));

vi.mock('@tiptap/extension-task-item', () => ({
    default: {
        configure: vi.fn(() => ({})),
    },
}));

vi.mock('@tiptap/extension-highlight', () => ({
    default: {
        configure: vi.fn(() => ({})),
    },
}));

vi.mock('@tiptap/extension-placeholder', () => ({
    default: {
        configure: vi.fn(() => ({})),
    },
}));

vi.mock('@tiptap/extension-details', () => ({
    Details: {
        configure: vi.fn(() => ({})),
    },
    DetailsSummary: {},
    DetailsContent: {},
}));

vi.mock('lowlight', () => ({
    createLowlight: vi.fn(() => ({
        register: vi.fn(),
    })),
}));

// Mock custom components
vi.mock('../../src/components/advanced_blocks/Callout', () => ({
    Callout: {},
}));

vi.mock('../../src/components/advanced_blocks/CodeBlockComponent', () => ({
    CustomCodeBlock: {
        configure: vi.fn(function() {
            return {
                extend: vi.fn(() => this),
            };
        }),
    },
    default: () => null,
}));

vi.mock('../../src/components/advanced_blocks/toggle_block/ToggleBlock', () => ({
    ToggleBlock: {},
}));

vi.mock('../../src/components/advanced_blocks/toggle_block/ToggleTitle', () => ({
    ToggleTitle: {},
}));

vi.mock('../../src/components/advanced_blocks/toggle_block/ToggleContent', () => ({
    ToggleContent: {},
}));

vi.mock('../../src/components/advanced_blocks/PageBlockComponent', () => ({
    PageBlock: {},
}));

vi.mock('../../src/components/extensions/BlockMoving', () => ({
    BlockMoving: {},
}));

vi.mock('../../src/components/slash_commands/Commands', () => ({
    Commands: {
        configure: vi.fn(() => ({})),
    },
}));

vi.mock('../../src/components/slash_commands/suggestions', () => ({
    default: vi.fn(() => ({})),
}));

describe('useEditorConfig', () => {
    const mockOnUpdate = vi.fn();
    const mockHandleEmojiCommand = vi.fn();
    const mockCreateSubnote = vi.fn();
    const mockSelectNote = vi.fn();
    const mockHandleKeyDown = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return config object with required properties', () => {
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
            })
        );

        expect(result.current).toHaveProperty('extensions');
        expect(result.current).toHaveProperty('onUpdate');
        expect(result.current).toHaveProperty('editorProps');
    });

    it('should have extensions array', () => {
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
            })
        );

        expect(Array.isArray(result.current.extensions)).toBe(true);
        expect(result.current.extensions.length).toBeGreaterThan(0);
    });

    it('should pass through callbacks correctly', () => {
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
            })
        );

        expect(result.current.onUpdate).toBe(mockOnUpdate);
    });

    it('should configure editorProps with default styles', () => {
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
            })
        );

        expect(result.current.editorProps).toBeDefined();
        expect(result.current.editorProps.attributes).toBeDefined();
        expect(result.current.editorProps.attributes.class).toBeDefined();
    });

    it('should apply custom class to editorProps', () => {
        const customClass = 'custom-editor-class';
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
                customClass,
            })
        );

        expect(result.current.editorProps.attributes.class).toBe(customClass);
    });

    it('should use default font in style', () => {
        const defaultFont = 'Roboto';
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
                defaultFont,
            })
        );

        expect(result.current.editorProps.attributes.style).toContain('Roboto');
    });

    it('should set handleKeyDown in editorProps', () => {
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
            })
        );

        expect(result.current.editorProps.handleKeyDown).toBeDefined();
        expect(typeof result.current.editorProps.handleKeyDown).toBe('function');
    });

    it('should use default handleKeyDown when not provided', () => {
        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
            })
        );

        expect(result.current.editorProps.handleKeyDown).toBeDefined();
        expect(typeof result.current.editorProps.handleKeyDown).toBe('function');
    });

    it('should merge extra props into editorProps', () => {
        const extraProps = {
            attributes: { 'data-testid': 'editor' },
        };

        const { result } = renderHook(() =>
            useEditorConfig({
                onUpdate: mockOnUpdate,
                handleEmojiCommand: mockHandleEmojiCommand,
                createSubnote: mockCreateSubnote,
                selectNote: mockSelectNote,
                handleKeyDownProp: mockHandleKeyDown,
                extraProps,
            })
        );

        expect(result.current.editorProps.attributes['data-testid']).toBe('editor');
    });
});
