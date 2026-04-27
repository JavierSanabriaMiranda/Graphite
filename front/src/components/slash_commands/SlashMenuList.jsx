import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

/**
 * Component that represents the floating menu shown when using "/" on editor
 */
const SlashMenuList = forwardRef((props, ref) => {
    const { t } = useTranslation();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const selectItem = index => {
        const item = props.items[index];
        if (item) {
            props.command(item);
        }
    };

    // Helper to render different types of icons safely
    const renderIcon = (icon, isSelected) => {
        if (!icon) {
            return <FileText className="w-full h-full" strokeWidth={2.5} />;
        }

        // If it's a React Component (Lucide icons)
        if (typeof icon !== 'string') {
            const IconComponent = icon;
            return <IconComponent className="w-full h-full" strokeWidth={2.5} />;
        }

        // If it's an SVG Path (Starts with M)
        if (icon.startsWith('M')) {
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d={icon} />
                </svg>
            );
        }

        // If it's an Emoji or plain text
        return (
            <span
                style={{ fontFamily: 'var(--font-emoji)' }}
                className={`text-lg leading-none ${isSelected ? 'brightness-110' : ''}`}
            >
                {icon}
            </span>
        );
    };

    // Makes the scrollbar follow the option selected by keyboard
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && container.children[selectedIndex]) {
            const selectedElement = container.children[selectedIndex];
            selectedElement.scrollIntoView({
                block: 'nearest',
                behavior: 'auto'
            });
        }
    }, [selectedIndex]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }) => {
            if (props.items.length === 0) return false;

            if (event.key === 'ArrowUp') {
                // Circular navigation: if at top, goes to bottom
                setSelectedIndex(prev => (prev + props.items.length - 1) % props.items.length);
                return true;
            }

            if (event.key === 'ArrowDown') {
                // Circular navigation: if at bottom, goes to top
                setSelectedIndex(prev => (prev + 1) % props.items.length);
                return true;
            }

            if (event.key === 'Enter') {
                selectItem(selectedIndex);
                return true;
            }

            return false;
        },
    }));

    useEffect(() => setSelectedIndex(0), [props.items]);

    return (
        <div className="z-1000 w-64 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-150">
            {/* Scroll container */}
            <div
                ref={scrollContainerRef}
                className="max-h-60 overflow-y-auto p-1 custom-scrollbar"
            >
                {props.items.length ? (
                    props.items.map((item, index) => {
                        const isSelected = index === selectedIndex;
                        return (
                            <button
                                key={index}
                                onClick={() => selectItem(index)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={`
                                    cursor-pointer group w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-lg transition-all
                                    ${isSelected
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-primary'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                    }`}
                            >
                                {/* Icon Wrapper */}
                                <div className={`w-5 h-5 shrink-0 flex items-center justify-center transition-colors 
                                    ${isSelected ? 'text-primary' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                    {renderIcon(item.icon, isSelected)}
                                </div>

                                <span className={`flex-1 truncate ${isSelected ? 'font-bold' : 'font-medium'}`}>
                                    {item.title}
                                </span>
                            </button>
                        );
                    })
                ) : (
                    <div className="px-3 py-4 text-center text-xs text-zinc-400 italic">
                        {t('common.no_result')}
                    </div>
                )}
            </div>
        </div>
    );
});

export default SlashMenuList;