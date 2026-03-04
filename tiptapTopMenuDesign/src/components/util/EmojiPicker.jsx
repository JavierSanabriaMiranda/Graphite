import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFloating, autoUpdate, offset, flip, shift, FloatingPortal, useInteractions,
    useClick, useDismiss, useRole
 } from '@floating-ui/react';

import { EMOJI_DATA, EMOJI_CATEGORIES } from '../../data/emojis';

const Icon = ({ d, className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

const EmojiPicker = ({ onSelect, children }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('smileys');

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context),
    ]);

    /**
     * Normalizes text to ignore accents
     */
    const normalizeText = (text) =>
        text ? text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";

    // Searching logic
    const filteredEmojis = useMemo(() => {
        const s = normalizeText(search);
        if (!s) return null;

        return EMOJI_DATA.filter(emoji => {
            const translatedName = t(`emojis.names.${emoji.id}`, { defaultValue: '' });
            return normalizeText(translatedName).includes(s) || emoji.id.includes(s);
        }).slice(0, 36);
    }, [search, t]);

    return (
        <>
            <div ref={refs.setReference}
                {...getReferenceProps()}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer">
                {children}
            </div>

            <FloatingPortal>
                {isOpen && (
                    <div
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                        style={floatingStyles}
                        className="z-1000 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                    >
                        {/* Searching field */}
                        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
                            <input
                                autoFocus
                                placeholder={t('editor.toolbar.search_emoji') || "Buscar emoji..."}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded-md outline-none focus:ring-1 focus:ring-primary dark:text-zinc-200"
                            />
                        </div>

                        {/* Categories selector (Tabs) */}
                        {!search && (
                            <div className="flex justify-around p-1 bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                {EMOJI_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        title={t(cat.label)}
                                        className={`p-1.5 rounded-md transition-colors ${activeCategory === cat.id
                                            ? 'bg-selected'
                                            : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500'
                                            }`}
                                    >
                                        <Icon d={cat.icon} className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Emoji Grid */}
                        <div className="h-64 overflow-y-auto p-2 custom-scrollbar">
                            {search ? (
                                <div className="grid grid-cols-6 gap-1">
                                    {filteredEmojis.map(e => (
                                        <button
                                            key={e.id}
                                            title={t(`emojis.names.${e.id}`)}
                                            onClick={() => { onSelect(e.char); setIsOpen(false); setSearch(''); }}
                                            className="text-2xl p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-transform hover:scale-125"
                                        >
                                            {e.char}
                                        </button>
                                    ))}
                                    {filteredEmojis.length === 0 && (
                                        <p className="col-span-6 text-center text-zinc-400 text-xs py-4 italic">
                                            {t('editor.toolbar.no_results')}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                EMOJI_CATEGORIES.filter(c => c.id === activeCategory).map(cat => (
                                    <div key={cat.id}>
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2 px-1">
                                            {t(cat.label)}
                                        </p>
                                        <div className="grid grid-cols-6 gap-1">
                                            {/* Filtering: Emojis from a category */}
                                            {EMOJI_DATA.filter(e => e.category === cat.id).map(e => (
                                                <button
                                                    key={e.id}
                                                    title={t(`emojis.names.${e.id}`)}
                                                    onClick={() => { onSelect(e.char); setIsOpen(false); }}
                                                    className="text-2xl p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-transform hover:scale-125"
                                                >
                                                    {e.char}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </FloatingPortal>
        </>
    );
};

export default EmojiPicker;