import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useFloating, autoUpdate, offset, flip, shift, useClick,
    useDismiss, useRole, useInteractions, FloatingPortal, FloatingFocusManager
} from '@floating-ui/react';
import DropdownArrow from './util/DropdownArrow';

const OPTIONS = [
    { id: 'p', label: 'editor.toolbar.block_type.normal_text', icon: 'M4 6h16M4 12h16M4 18h7' },
    {
        id: 'h1',
        label: 'editor.toolbar.block_type.h1',
        icon: 'M17 19h4m-2 0V9l-2 1M4 5v14M5 5H3M5 19H3M12 5v14M11 5h2M11 19h2M4 12h8'
    },
    {
        id: 'h2',
        label: 'editor.toolbar.block_type.h2',
        icon: 'M16 12v-0.5A2.5 2.5 0 0 1 18.5 9h0A2.5 2.5 0 0 1 21 11.5v0.33A2.52 2.52 0 0 1 19.74 14l-1.26 0.72A4.91 4.91 0 0 0 16 19h5M4 5v14M5 5H3M5 19H3M11 5v14M10 5h2M10 19h2M4 12h7'
    },
    {
        id: 'h3',
        label: 'editor.toolbar.block_type.h3',
        icon: 'M16 9h5l-2.75 4H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2h0M4 5v14M5 5H3M5 19H3M11 5v14M10 5h2M10 19h2M4 12h7'
    },
    {
        id: 'quote',
        label: 'editor.toolbar.block_type.quote',
        icon: 'M9.42 4.55C5.66 6.97 3.57 9.79 3.15 13C2.5 18 6.97 20.44 9.23 18.24C11.5 16.05 10.14 13.25 8.5 12.49C6.86 11.73 5.85 12 6.03 10.98C6.2 9.96 8.54 7.13 10.59 5.81C10.72 5.7 10.78 5.47 10.64 5.3C10.56 5.19 10.39 4.97 10.14 4.65C9.92 4.36 9.71 4.37 9.42 4.55ZM19.33 4.55C15.57 6.97 13.48 9.79 13.06 13C12.41 18 16.88 20.44 19.14 18.24C21.41 16.05 20.05 13.25 18.41 12.49C16.77 11.73 15.77 12 15.94 10.98C16.12 9.96 18.45 7.13 20.5 5.81C20.64 5.7 20.69 5.47 20.56 5.3C20.47 5.19 20.3 4.97 20.05 4.65C19.83 4.36 19.62 4.37 19.33 4.55Z'
    },
    { id: 'callout', label: 'editor.toolbar.block_type.callout', icon: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01' },
    { id: 'code', label: 'editor.toolbar.block_type.code_block.code_block', icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
];

// Generic icon that receives a path
const Icon = ({ d, className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

// Selection check icon
const CheckIcon = () => (
    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

/**
 * TextTypeSelector component that allows the user to select the text type of the current 
 * block (paragraph, heading 1, heading 2, callout...)
 * 
 * @param {Object} editor - The editor instance
 * @param {Object} state - The state of the menu bar, used to know the current text type
 */
const TextTypeSelector = ({ editor, state }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    // Floating UI setup for the floating menu
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(6), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context),
    ]);

    /**
     * Normalizes text to remove accents
     * 
     * @param {String} text to normalize
     * @returns 
     */
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD") // Turns 'ó' -> 'o' + '´')
            .replace(/[\u0300-\u036f]/g, "") // Remove accent char
            .trim();
    };

    /**
     * Represents the options shown with the search filter (all options if not filter specified)
     */
    const filteredOptions = useMemo(() => {
        // Normalizes the search
        const normalizedSearch = normalizeText(search);

        return OPTIONS.filter(opt => {
            // Translate and normalize option label
            const translatedLabel = t(opt.label);
            const normalizedLabel = normalizeText(translatedLabel);

            // Compare both clean texts
            return normalizedLabel.includes(normalizedSearch);
        });
    }, [search, t]);

    const currentOption = OPTIONS.find(opt => opt.id === state.currentTextType) || OPTIONS[0];

    /**
     * Changes the texttype on the editor
     * 
     * @param {String} val that represents the text type
     */
    const handleSelect = (val) => {
        const chain = editor.chain().focus();
        if (val === 'p') chain.setParagraph().run();
        else if (val.startsWith('h')) chain.toggleHeading({ level: parseInt(val.replace('h', '')) }).run();
        else if (val === 'quote') chain.toggleBlockquote().run();
        else if (val === 'callout') chain.toggleCallout().run();
        else if (val === 'code') chain.toggleCodeBlock().run();

        setIsOpen(false);
        setSearch('');
    };

    return (
        <>
            {/* Selection button */}
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="flex items-center justify-between gap-2 min-w-30 p-1.5 px-3 bg-app-bg border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-zinc-200 outline-none focus:ring-2 focus:ring-primary/50"
            >
                <span className="truncate">{t(currentOption.label)}</span>
                <DropdownArrow menuOpen={isOpen} defaultRotateAngle={0} />
            </button>

            <FloatingPortal>
                <FloatingFocusManager context={context} modal={false} style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
                    <div
                        ref={refs.setFloating}
                        style={{ ...floatingStyles, visibility: isOpen ? 'visible' : 'hidden' }}
                        {...getFloatingProps()}
                        className="z-9999 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-100"
                    >
                        {/* Searching Area */}
                        <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                            <input
                                autoFocus
                                placeholder={t('editor.toolbar.block_type.search')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded-md outline-none focus:ring-1 focus:ring-primary dark:text-zinc-200"
                            />
                        </div>
                        {/* Texttype options */}
                        <div className="max-h-72 overflow-y-auto p-1 custom-scrollbar">
                            {filteredOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleSelect(opt.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors
                      ${state.currentTextType === opt.id
                                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}
                    `}
                                >
                                    <Icon d={opt.icon} />
                                    <span className="flex-1 text-left">{t(opt.label)}</span>
                                    {state.currentTextType === opt.id && <CheckIcon />}
                                </button>
                            ))}
                        </div>
                    </div>
                </FloatingFocusManager>
            </FloatingPortal>
        </>
    );
};

export default TextTypeSelector;