import { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useNote } from '../context/NoteContext';
import { useTranslation } from 'react-i18next';
import SearchResultList from '../note_search/SearchResultList';

/**
 * Component to render the search page on mobile, 
 * it shows a search input and the results using the SearchResultList component. 
 * It is rendered when navigating to /search on mobile devices. 
 */
const MobileSearchView = () => {
    const { t } = useTranslation();
    const { allNotes, selectNote } = useNote();
    const [query, setQuery] = useState('');

    const filteredNotes = useMemo(() => {
        const cleanQuery = query.toLowerCase().trim();
        return allNotes.filter(n => (n.title || '').toLowerCase().includes(cleanQuery)).slice(0, 8);;
    }, [query, allNotes]);

    return (
        <div className="pt-12 flex flex-col h-full bg-main-bg animate-in slide-in-from-bottom-2 duration-300">
            <div className="p-4 sticky top-0 bg-main-bg z-10">
                <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">{t('search.title')}</h1>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('search.placeholder')}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex-1 custom-scrollbar overflow-y-auto px-2">
                <SearchResultList
                    query={query}
                    results={filteredNotes}
                    onSelect={(n) => selectNote(n)}
                    t={t}
                />
            </div>
        </div>
    );
};

export default MobileSearchView;