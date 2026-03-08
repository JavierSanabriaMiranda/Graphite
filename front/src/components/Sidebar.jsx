import { useState } from 'react';
import { PanelLeft, Settings, Plus, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isOpen, setIsOpen, workspaceName = "Mi Workspace" }) => {
    const { t } = useTranslation();

    const [isHovered, setIsHovered] = useState(false); // Para el efecto de asomar

    // If closed but mouse on the left border show it
    const showSidebar = isOpen || isHovered;

    return (
        <>
            {/* Sensor to detect mouse on left side */}
            {!isOpen && (
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    className="fixed top-0 left-0 z-40 h-full w-4 cursor-e-resize"
                />
            )}

            {/* Sidebar */}
            <aside
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed top-0 left-0 z-50 h-full bg-main-bg border-r border-gray-300 dark:border-zinc-700 transition-transform duration-300 ease-in-out flex flex-col
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          w-64`}
            >
                {/* HEADER: Workspace name */}
                <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-zinc-700">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 bg-primary rounded shrink-0 flex items-center justify-center text-xs font-bold text-white">G</div>
                        <h2 className="font-semibold text-gray-700 dark:text-zinc-300 truncate">{workspaceName}</h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 hover:bg-hover-primary-bg rounded text-zinc-400 transition-colors"
                    >
                        <PanelLeft
                            className={`w-4.5 h-4.5 transition-colors ${isOpen ? 'text-primary' : 'text-gray-700 dark:text-zinc-300'}`}
                        />
                    </button>
                </div>

                <div className="p-3">
                    <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-hover-primary-bg rounded-md transition-all">
                        <Settings className="w-4 h-4" />
                        <span>{t('sidebar.configuration')}</span>
                    </button>
                </div>

                {/* BODY: Notes list */}
                <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                    <div className="flex items-center justify-between text-zinc-500 mb-2 px-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">{t('sidebar.notes')}</span>
                    </div>

                    <ul className="space-y-0.5">
                        {/* Notes */}
                        {['Introducción', 'Ideas Proyecto', 'Borrador'].map((note) => (
                            <li key={note}>
                                <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-hover-primary-bg rounded-md transition-all group">
                                    <FileText className="w-4 h-4 text-gray-500 dark:text-zinc-500 group-hover:text-primary" />
                                    <span className="truncate">{note}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* FOOTER: Add new note */}
                <div className="p-3 border-t border-gray-300 dark:border-zinc-700">
                    <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-hover-primary-bg rounded-md transition-all">
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t('sidebar.new_note')}</span>
                    </button>
                </div>
            </aside>

            {/* 3. OVERLAY: Puts blur effect is sidebar is floating */}
            {!isOpen && isHovered && (
                <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[0.5px] transition-opacity" />
            )}
        </>
    );
};

export default Sidebar;