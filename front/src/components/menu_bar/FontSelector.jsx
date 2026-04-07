import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SearchablePicker from '../util/SearchablePicker';

const FONTS = [
    { id: 'Inter', label: 'Inter', type: 'sans' },
    { id: 'Arial', label: 'Arial', type: 'sans' },
    { id: 'Courier New', label: 'Courier New', type: 'mono' },
    { id: 'Georgia', label: 'Georgia', type: 'serif' },
    { id: 'Times New Roman', label: 'Times New Roman', type: 'serif' },
];

/**
 * Component to select the font of the text. Opens a floating menu to select the font with a 
 * field to search by text
 * 
 * @param {Object} editor - The editor instance
 * @param {Object} state - The state of the menu bar, used to know the current text type 
 */
const FontSelector = ({ editor, state, userDefaultFont }) => {
    const { t } = useTranslation();
    const EMOJI_STACK = 'var(--font-emoji)';

    const pickerItems = useMemo(() => {
        return FONTS.map(font => ({
            value: font.id,
            // Guardamos el label como string para que el buscador del Picker no falle
            label: font.label,
            // Usamos el "icon" para mostrar la previsualización de la fuente
            // o simplemente pasamos el label estilizado (ver nota abajo)
            display: <span style={{ fontFamily: font.id }}>{font.label}</span>
        }));
    }, []);

    const getBaseFont = (fontValue) => {
        if (!fontValue) return userDefaultFont || 'Inter';
        return fontValue.split(',')[0].replace(/['"]/g, '').trim();
    };

    const handleSelect = (fontId) => {
        // Concat selected font with emoji font
        // Example result: "Georgia, var(--font-emoji)"
        const fullFontStack = `${fontId}, ${EMOJI_STACK}`;
        editor.chain().focus().setFontFamily(fullFontStack).run();
    };

    const activeFontId = getBaseFont(state.currentFont);
    const currentFont = FONTS.find(f => f.id === activeFontId) || {
        label: activeFontId || 'Inter',
        id: activeFontId || 'Inter'
    };

    return (
        <SearchablePicker
            items={pickerItems}
            value={activeFontId}
            onSelect={handleSelect}
            buttonLabel={
                <span style={{ fontFamily: `${currentFont.id}, var(--font-emoji)` }}>
                    {currentFont.label}
                </span>
            }
            placeholder={t('editor.toolbar.text_font.search') || "Search font..."}
            width="w-56"
            placement="bottom-start"
            fontSize="text-sm"
            buttonClassName="cursor-pointer flex items-center justify-between gap-2 min-w-32.5 p-1.5 px-3 bg-main-bg border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-text-primary outline-none focus:ring-2 focus:ring-primary/50"
        />
    );
};

export default FontSelector;