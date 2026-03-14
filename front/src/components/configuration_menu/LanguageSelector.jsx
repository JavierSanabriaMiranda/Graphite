import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SearchablePicker from '../util/SearchablePicker';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    // language data
    const languages = useMemo(() => [
        { code: 'en', label: 'English', icon: '🇺🇸' },
        { code: 'es', label: 'Español', icon: '🇪🇸' },
    ], []);

    // Find current language for button label
    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <SearchablePicker
            items={languages}
            value={i18n.language}
            onSelect={(code) => i18n.changeLanguage(code)}
            buttonLabel={
                <div className="flex items-center gap-2">
                    <span>{currentLanguage.icon}</span>
                    <span>{currentLanguage.label}</span>
                </div>
            }
            placeholder={t('settings.language.search')}
            placement="bottom-end"
            width="w-52"
            buttonClassName= "cursor-pointer flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all min-w-35 justify-between shadow-sm"
        />
    );
};

export default LanguageSelector;