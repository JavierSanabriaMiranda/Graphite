import { Search, FileText } from 'lucide-react';
import NoteIcon from '../util/NoteIcon';

/**
 * Component to render note searching results
 */
const SearchResultList = ({ results, onSelect, query, t }) => {
    if (query && results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 opacity-50">
                <Search size={40} className="mb-4" />
                <p className="text-sm">{t('search.no_results')}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 p-2">
            {results.map(note => (
                <button
                    key={note.note_id}
                    onClick={() => onSelect(note)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left group"
                >
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                        {note.icon ? <NoteIcon iconChar={note.icon} /> : <FileText size={16} />}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-medium text-sm truncate">{note.title || 'Untitled'}</span>
                        <span className="text-xs opacity-60 truncate">{note.note_path}</span>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default SearchResultList;