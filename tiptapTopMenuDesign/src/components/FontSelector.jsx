import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useFloating, autoUpdate, offset, flip, shift, useClick,
    useDismiss, useRole, useInteractions, FloatingPortal, FloatingFocusManager
} from '@floating-ui/react';

const FONTS = [
    { id: 'Inter', label: 'Inter', type: 'sans' },
    { id: 'Arial', label: 'Arial', type: 'sans' },
    { id: 'Courier New', label: 'Courier New', type: 'mono' },
    { id: 'Georgia', label: 'Georgia', type: 'serif' },
    { id: 'Times New Roman', label: 'Times New Roman', type: 'serif' },
];

const normalizeText = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const FontSelector = ({ editor, state }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

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

    const filteredFonts = useMemo(() => {
        const s = normalizeText(search);
        return FONTS.filter(f => normalizeText(f.label).includes(s));
    }, [search]);

    const handleSelect = (fontId) => {
        editor.chain().focus().setFontFamily(fontId).run();
        setIsOpen(false);
        setSearch('');
    };

    const currentFont = FONTS.find(f => f.id === state.currentFont) || { label: state.currentFont || 'Inter' };

    return (
        <>
            {/* Trigger: Muestra la fuente actual */}
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="flex items-center justify-between gap-2 min-w-[130px] p-1.5 px-3 bg-main-bg border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-zinc-200 outline-none focus:ring-2 focus:ring-primary/50"
            >
                <span className="truncate" style={{ fontFamily: currentFont.id }}>
                    {currentFont.label}
                </span>
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
            </button>

            <FloatingPortal>
                {isOpen && (
                    <FloatingFocusManager context={context} modal={false}>
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                            className="z-[9999] w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-100"
                        >
                            {/* Buscador */}
                            <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                                <input
                                    autoFocus
                                    placeholder={t('editor.toolbar.text_font.search') || "Search font..."}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded-md outline-none focus:ring-1 focus:ring-primary dark:text-zinc-200"
                                />
                            </div>

                            {/* Lista de Fuentes */}
                            <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                                {filteredFonts.length > 0 ? (
                                    filteredFonts.map((font) => (
                                        <button
                                            key={font.id}
                                            onClick={() => handleSelect(font.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors
                        ${state.currentFont === font.id
                                                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}
                      `}
                                        >
                                            <span style={{ fontFamily: font.id }} className="truncate">
                                                {font.label}
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-xs text-zinc-400 italic">
                                        {t('editor.toolbar.text_font.search_not_found')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </>
    );
};

export default FontSelector;