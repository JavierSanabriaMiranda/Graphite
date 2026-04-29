import { useState, useMemo, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useNote } from '../context/NoteContext';
import { useTranslation } from 'react-i18next';
import SearchResultList from './SearchResultList';

/**
 * Component that renders a search overlay when the user clicks the search button in the sidebar
 * It shows a search input and the results using the SearchResultList component. 
 * It can be closed by clicking outside, pressing Esc or clicking the close button.
 */
const SearchOverlay = () => {
    const { t } = useTranslation();
    const { isSearchOpen, closeSearch } = useUI();
    const { allNotes, selectNote } = useNote();
    const [query, setQuery] = useState('');

    const filteredNotes = useMemo(() => {
        const cleanQuery = query.toLowerCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "");
        return allNotes.filter(n =>
            (n.title || '').toLowerCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "").includes(cleanQuery)
        ).slice(0, 8);
    }, [query, allNotes]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') closeSearch(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeSearch]);

    if (!isSearchOpen) return null;

    /**
     * Handles keyboard interaction for the backdrop to satisfy accessibility rules
     */
    const handleBackdropKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            closeSearch();
        }
    };

    return (
        <div className="fixed inset-0 z-1000 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
                onClick={closeSearch}
                onKeyDown={handleBackdropKeyDown}
                role="button"
                tabIndex="-1"
                aria-label={t('common.close_search') || "Close search"}
            />

            {/* Search Box */}
            <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 p-4 border-b border-zinc-100 dark:border-zinc-800">
                    <SearchIcon className="text-zinc-400" size={20} />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('search.placeholder')}
                        className="flex-1 bg-transparent border-none outline-none text-lg"
                    />
                    <button onClick={closeSearch} className="cursor-pointer p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400">
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <SearchResultList
                        query={query}
                        results={filteredNotes}
                        onSelect={(n) => { selectNote(n); closeSearch(); }}
                        t={t}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;