import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useFloating, autoUpdate, offset, flip, shift, FloatingPortal, useInteractions,
    useClick, useDismiss, useRole
} from '@floating-ui/react';

import { EMOJI_DATA, EMOJI_CATEGORIES } from '../../data/emojis';
import { ICON_DATA, ICON_CATEGORIES } from '../../data/icons';

const Icon = ({ d, className = "w-4 h-4", strokeWidth=2 }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

const EmojiPicker = ({ onSelect, children, showIconsMenu = true }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [view, setView] = useState('emojis');
    const [activeCategory, setActiveCategory] = useState('people');

    const scrollContainerRef = useRef(null);
    
    /**
     * Makes the scrollbar go to the top when changing categories
     */
    useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
    }
}, [activeCategory, view]);

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
    const filteredItems = useMemo(() => {
        const s = normalizeText(search);
        if (!s) return null;

        const dataSource = view === 'emojis' ? EMOJI_DATA : ICON_DATA;
        const translationPrefix = view === 'emojis' ? 'emojis.names' : 'icons.names';

        return dataSource.filter(item => {
            const translatedName = t(`${translationPrefix}.${item.id}`, { defaultValue: '' });
            return normalizeText(translatedName).includes(s) || item.id.includes(s);
        }).slice(0, 36);
    }, [search, t, view]);

    const categories = view === 'emojis' ? EMOJI_CATEGORIES : ICON_CATEGORIES;
    const data = view === 'emojis' ? EMOJI_DATA : ICON_DATA;

    const handleSelect = (item) => {
        // item.char SIEMPRE debe ser un string (el emoji '🚀' o el path 'M12...')
        onSelect(item.char);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <>
            <div ref={refs.setReference} {...getReferenceProps()} className="cursor-pointer">
                {children}
            </div>

            <FloatingPortal>
                <div
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    style={{ ...floatingStyles, visibility: isOpen ? 'visible' : 'hidden' }}
                    className="z-1000 w-90 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Mode selector (Emojis vs Icons) */}
                    {showIconsMenu ? (<div className="flex p-1 bg-zinc-100 dark:bg-zinc-800/50 m-2 rounded-lg">
                        <button
                            onClick={() => { setView('emojis'); setActiveCategory('people'); }}
                            className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${view === 'emojis' ? 'bg-white dark:bg-zinc-700 shadow-sm text-primary' : 'text-zinc-500'}`}
                        >
                            {t('emojis.emojis') || 'Emojis'}
                        </button>
                        <button
                            onClick={() => { setView('icons'); setActiveCategory('ui'); }}
                            className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${view === 'icons' ? 'bg-white dark:bg-zinc-700 shadow-sm text-primary' : 'text-zinc-500'}`}
                        >
                            {t('icons.icons') || 'Icons'}
                        </button>
                    </div>) : <></>}

                    {/* Searching Field */}
                    <div className={showIconsMenu ? "px-3 pb-2 border-b border-zinc-100 dark:border-zinc-800"
                        : "px-3 pb-2 border-b border-zinc-100 dark:border-zinc-800 my-2"
                    }>
                        <input
                            autoFocus
                            placeholder={view === 'emojis' ? t('emojis.search') : t('icons.search') || "Buscar..."}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded-md outline-none focus:ring-1 focus:ring-primary dark:text-zinc-200"
                        />
                    </div>

                    {/* Categories tabs */}
                    {!search && (
                        <div className="flex justify-around p-1 border-b border-zinc-100 dark:border-zinc-800">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`p-1.5 rounded-md transition-colors ${activeCategory === cat.id ? 'bg-primary/10 text-primary' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500'}`}
                                    title={t(cat.label)}
                                >
                                    <Icon d={cat.icon} className="w-6 h-6" strokeWidth={1} />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content grid */}
                    <div ref={scrollContainerRef} className="h-64 overflow-y-auto p-2 custom-scrollbar">
                        <div className="grid grid-cols-8 gap-1">
                            {search ? (
                                filteredItems?.map(item => (
                                    <button key={item.id} onClick={() => handleSelect(item)} style={{ fontFamily: 'var(--font-emoji)' }} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md flex justify-center items-center transition-colors text-zinc-800 dark:text-zinc-100">
                                        {view === 'emojis' ? <span className="text-2xl">{item.char}</span> : <Icon d={item.char} className="w-6 h-6" />}
                                    </button>
                                ))
                            ) : (
                                data.filter(e => e.category === activeCategory).map(item => (
                                    <button key={item.id} onClick={() => handleSelect(item)} style={{ fontFamily: 'var(--font-emoji)' }} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md flex justify-center items-center transition-colors text-zinc-800 dark:text-zinc-100">
                                        {view === 'emojis' ? <span className="text-2xl">{item.char}</span> : <Icon d={item.char} className="w-6 h-6" />}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </FloatingPortal>
        </>
    );
};

export default EmojiPicker;