import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
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
import DropdownArrow from './DropdownArrow';
import { useTranslation } from 'react-i18next';

/**
 * Generic Picker with search and keyboard navigation.
 * @param {Array} items - List of objects { value, label, icon, ... }
 * @param {Function} onSelect - Callback when an item is picked
 * @param {any} value - Currently selected value
 * @param {string} placeholder - Search input placeholder
 * @param {string} buttonLabel - Text to show on the trigger button
 * @param {string} width - Tailwinds width class (default: 'w-52')
 */
const SearchablePicker = ({
    items = [],
    onSelect,
    value,
    placeholder,
    buttonLabel,
    width = "w-52",
    placement = "bottom-end",
    buttonClassName = "cursor-pointer flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-sm transition-colors",
    fontSize = "text-xs"
}) => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const inputRef = useRef(null);
    const listRef = useRef(null);

    const searchPlaceholder = placeholder ? placeholder : t('common.search')

    // Floating UI Setup
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: placement,
        middleware: [offset(8), flip(), shift({ padding: 10 })],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
    ]);

    /**
    * Normalize text to remove accents
    * 
    * @param {String} text to normalize
    */
    const normalizeText = (text) =>
        text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    // Filtering logic
    const filteredItems = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return items.filter(item =>
            normalizeText(item.label).includes(normalizedSearch)
        );
    }, [items, search]);

    // Handle focus and reset index
    useEffect(() => {
        if (isOpen) {
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    // auto-scroll logic
    useEffect(() => {
        if (isOpen && listRef.current) {
            const buttons = listRef.current.querySelectorAll('.picker-item');
            const activeItem = buttons[activeIndex];
            if (activeItem) {
                activeItem.scrollIntoView({ block: 'nearest', behavior: 'auto' });
            }
        }
    }, [activeIndex, isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredItems[activeIndex]) {
                onSelect(filteredItems[activeIndex].value);
                setIsOpen(false);
                setSearch('');
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative inline-block">
            {/* TRIGGER BUTTON */}
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={buttonClassName}
            >
                <span>{buttonLabel}</span>
                <DropdownArrow menuOpen={isOpen} defaultRotateAngle={0} />
            </button>

            {/* FLOATING MENU */}
            {isOpen && (
                <FloatingPortal>

                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles }}
                    {...getFloatingProps()}
                    className={`z-1100 ${width} overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-150`}
                >
                    {/* Search Input */}
                    <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="relative">
                            <Search className="absolute left-2 top-2 w-3.5 h-3.5 text-zinc-400" />
                            <input
                                ref={inputRef}
                                placeholder={searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={`w-full pl-7 pr-3 py-1.5 ${fontSize} bg-zinc-50 dark:bg-zinc-950 border-none rounded-md focus:ring-1 focus:ring-primary outline-none dark:text-zinc-200`}
                            />
                        </div>
                    </div>

                    {/* List Area */}
                    <div ref={listRef} className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <button
                                    key={item.value}
                                    onClick={() => {
                                        onSelect(item.value);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`picker-item cursor-pointer w-full text-left px-3 py-2 ${fontSize} rounded-lg transition-colors flex items-center justify-between 
                                            ${activeIndex === index ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}
                                            ${value === item.value ? 'bg-primary/10 text-primary font-bold' : 'text-zinc-600 dark:text-zinc-400'}`}
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        {item.icon && <span className="shrink-0">{item.icon}</span>}
                                        {/* If exists, priorize 'display' to use an stylized font */}
                                        <span className="truncate">{item.display || item.label}</span>
                                    </div>
                                    {value === item.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-xs text-zinc-400 italic">{t('common.no_result')}</div>
                        )}
                    </div>
                </div>

            </FloatingPortal>)}
        </div>
    );
};

export default SearchablePicker;