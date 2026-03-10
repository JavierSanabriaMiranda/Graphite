import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import DropdownArrow from './util/DropdownArrow';
import NoteIcon from './NoteIcon';
import { noteService } from '../services/db/noteService';

/**
 * Component that represents a page with its subnotes in the sidebar
 * 
 * @param {Object} note - Note to represent in the navItem
 * @param {Function} onNoteSelect - Function to be called when a note is selected
 * @param {String} activeNoteId - Id of the current active note
 * @param {number} level - Level to calculate the padding of the NavItem 
 */
const NavItem = ({ note, onNoteSelect, activeNoteId, level = 0, refreshTrigger}) => {
    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);
    const [subnotes, setSubnotes] = useState([]);
    const [hasSubnotes, setHasSubnotes] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Verify if the note has subnotes (to know if a DropdownArrow is needed)
    useEffect(() => {
        noteService.hasSubnotes(note.note_id).then(setHasSubnotes);
    }, [note.note_id, refreshTrigger]);

    // Load subnotes just when expanded and if are not loaded yet
    useEffect(() => {
        if (isExpanded) {
            setIsLoading(true);
            noteService.getSubnotes(note.note_id).then(res => {
                setSubnotes(res);
                setHasSubnotes(res.length > 0);
                setIsLoading(false);
            });
        }
    }, [isExpanded, note.note_id, subnotes.length, refreshTrigger]);

    const isActive = activeNoteId === note.note_id;

    return (
        <li>
            <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer transition-all group
          ${isActive ? 'bg-primary/10 text-primary' : 'text-text-primary hover:bg-hover-primary-bg'}`}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={() => onNoteSelect(note)}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasSubnotes) setIsExpanded(!isExpanded);
                    }}
                    className={`p-0.5 hover:bg-zinc-800 rounded transition-transform ${!hasSubnotes ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <DropdownArrow menuOpen={isExpanded} defaultRotateAngle={-90} rotateAngle={0} />
                </button>
                <div className={`w-4 h-4 shrink-0 flex items-center justify-center ${isActive ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>
                    {note.icon ? (
                        <NoteIcon iconChar={note.icon} className="w-full h-full" />
                    ) : (
                        <FileText className="w-full h-full" />
                    )}
                </div>
                <span className="truncate text-sm font-medium">{note.title}</span>
            </div>

            {isExpanded && hasSubnotes && (
                <ul className="mt-0.5">
                    {isLoading ? (
                        <li className="text-[10px] text-zinc-500 animate-pulse" style={{ paddingLeft: `${(level + 1) * 12 + 24}px` }}>
                            {t('sidebar.loading')}
                        </li>
                    ) : (
                        subnotes.map(subnote => (
                            <NavItem
                                key={subnote.note_id}
                                note={subnote}
                                onNoteSelect={onNoteSelect}
                                activeNoteId={activeNoteId}
                                level={level + 1}
                            />
                        ))
                    )}
                </ul>
            )}
        </li>
    );
};

export default NavItem