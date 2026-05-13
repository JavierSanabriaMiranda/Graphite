import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchablePicker from '../util/SearchablePicker';
import { useSettings } from '../context/SettingsContext';
import { useToast } from '../context/ToastContext';

const FONTS = [
    { id: 'Inter', label: 'Inter' },
    { id: 'Arial', label: 'Arial' },
    { id: 'Courier New', label: 'Courier New' },
    { id: 'Georgia', label: 'Georgia' },
    { id: 'Times New Roman', label: 'Times New Roman' },
];

const DefaultFontSelector = () => {
    const { t } = useTranslation();
    const { defaultFont, updateDefaultFont } = useSettings();
    const { showToast } = useToast();

    const pickerItems = useMemo(() => {
        return FONTS.map(font => ({
            value: font.id,
            label: font.label,
            display: (
                <span style={{ fontFamily: font.id }} className="text-base">
                    {font.label}
                </span>
            )
        }));
    }, []);

    const handleSelect = (fontId) => {
        updateDefaultFont(fontId);
        showToast(
            t('settings.general.font.restart_notice'),
            "info"
        );
    };

    const activeFont = FONTS.find(f => f.id === defaultFont) || FONTS[0];

    return (
        <SearchablePicker
            items={pickerItems}
            value={defaultFont}
            onSelect={handleSelect}
            buttonLabel={
                <div className="flex items-center gap-2">
                    <span style={{ fontFamily: activeFont.id }}>{activeFont.label}</span>
                </div>
            }
            placeholder={t('settings.general.font.search')}
            placement="bottom-end"
            width="w-52"
            buttonClassName="cursor-pointer flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all min-w-40 justify-between shadow-sm"
        />
    );
};

export default DefaultFontSelector;