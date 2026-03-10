import { useState } from 'react';
import { FileText } from 'lucide-react';
import DropdownArrow from './util/DropdownArrow';
import NoteIcon from './NoteIcon';

/**
 * Component that represents a page with its children in the sidebar
 * 
 * @param {Object} note - Note to represent in the navItem
 * @param {Array<Object>} allNotes - All notes of the user to get the children 
 * @param {Function} onNoteSelect - Function to be called when a note is selected
 * @param {String} activeNoteId - Id of the current active note
 * @param {number} level - Level to calculate the padding of the NavItem 
 */
const NavItem = ({ note, allNotes, onNoteSelect, activeNoteId, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const children = allNotes.filter(n => n.parent_id === note.note_id && !n.is_deleted);
    const hasChildren = children.length > 0;
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
                        setIsExpanded(!isExpanded);
                    }}
                    className={`p-0.5 hover:bg-zinc-800 rounded transition-transform ${!hasChildren && 'opacity-0 pointer-events-none'}`}
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

            {isExpanded && hasChildren && (
                <ul className="mt-0.5">
                    {children.map(child => (
                        <NavItem
                            key={child.note_id}
                            note={child}
                            allNotes={allNotes}
                            onNoteSelect={onNoteSelect}
                            activeNoteId={activeNoteId}
                            level={level + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default NavItem