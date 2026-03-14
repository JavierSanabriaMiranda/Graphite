import { useState, useMemo, useEffect, useRef } from 'react';
import { Globe, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    useInteractions,
    useClick,
    useDismiss,
    FloatingPortal
} from '@floating-ui/react';
import DropdownArrow from '../util/DropdownArrow';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);

    const languages = useMemo(() => [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ], []);

    // Floating menu configuration
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-end',
        middleware: [offset(8), flip(), shift({ padding: 10 })],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
    ]);

    // Languages filtering
    const filteredLanguages = useMemo(() => {
        return languages.filter(lang =>
            lang.name.toLowerCase().includes(search.toLowerCase()) ||
            lang.code.toLowerCase().includes(search.toLowerCase())
        );
    }, [languages, search]);

    // Auto focus on text input for filtering
    useEffect(() => {
        if (isOpen) {
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
        setSearch('');
    };

    // Handle arrow up/down for navigation in the menu
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < filteredLanguages.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredLanguages[activeIndex]) {
                selectLanguage(filteredLanguages[activeIndex].code);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <div className="relative">
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="cursor-pointer flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl 
                 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                 border border-zinc-200 dark:border-zinc-700
                 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all min-w-35 justify-between shadow-sm"
            >
                <div className="flex items-center gap-2">
                    <span>{currentLanguage.flag}</span>
                    <span>{currentLanguage.name}</span>
                </div>
                <DropdownArrow menuOpen={isOpen} defaultRotateAngle={0} />
            </button>

            <FloatingPortal>

                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, visibility: isOpen ? 'visible' : 'hidden' }}
                    {...getFloatingProps()}
                    className="z-110 w-52 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-150"
                >
                    <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-zinc-400" />
                            <input
                                ref={inputRef}
                                placeholder={t('settings.language.search')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full pl-7 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border-none rounded-md focus:ring-1 focus:ring-primary outline-none dark:text-zinc-200"
                            />
                        </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map((lang, index) => (
                                <button
                                    key={lang.code}
                                    onClick={() => selectLanguage(lang.code)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`cursor-pointer w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between 
                                            ${activeIndex === index ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
                                            ${i18n.language === lang.code ? 'bg-primary/10 text-primary font-bold' : 'text-zinc-600 dark:text-zinc-400'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </div>
                                    {i18n.language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-xs text-zinc-400 italic">
                                {t('common.no_result')}
                            </div>
                        )}
                    </div>
                </div>

            </FloatingPortal>
        </div>
    );
};

export default LanguageSelector;