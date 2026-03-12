import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
            if (event.key === 'ArrowUp') {
                selectedIndex === 0 ? true :
                setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
                return true;
            }
            if (event.key === 'ArrowDown') {
                selectedIndex === props.items.length-1 ? true :
                setSelectedIndex((selectedIndex + 1) % props.items.length);
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
            {/* Contenedor con Scroll Personalizado */}
            <div
                ref={scrollContainerRef}
                className="max-h-60 overflow-y-auto p-1 custom-scrollbar"
            >
                {props.items.length ? (
                    props.items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => selectItem(index)}
                            onMouseEnter={() => setSelectedIndex(index)} // Sincroniza hover con teclado
                            className={`
                                group w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-lg transition-colors
                                ${index === selectedIndex
                                    ? 'bg-zinc-100 dark:bg-zinc-800 text-primary'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                }`}
                        >
                            {/* Icono (Paths o Lucide) */}
                            {item.icon && (
                                <div className={`w-4 h-4 shrink-0 flex items-center justify-center transition-colors ${index === selectedIndex ? 'text-primary' : 'text-zinc-400 dark:text-zinc-500'
                                    }`}>
                                    {typeof item.icon === 'string' ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                                            <path d={item.icon} />
                                        </svg>
                                    ) : (
                                        <item.icon className="w-full h-full" strokeWidth={2.5} />
                                    )}
                                </div>
                            )}

                            <span className={`flex-1 truncate ${index === selectedIndex ? 'font-bold' : 'font-medium'}`}>
                                {item.title}
                            </span>
                        </button>
                    ))
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