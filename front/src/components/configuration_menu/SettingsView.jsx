import { useState } from 'react';
import { Globe, X, User, LogOut, Briefcase, } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import GeneralSettings from './settings_views/GeneralSettings';
import WorkspaceSettings from './settings_views/WorkspaceSettings';
import AccountSettings from './settings_views/AccountSettings';
import LogoutModal from './settings_views/LogoutModal';

import { noteService } from '../../services/db/noteService';
import { workspaceService } from '../../services/db/workspaceService';

/**
 * Content shown on the SettingsModal. 
 *  On non mobile devices: Has a sidebar with tabs to change the current view displayed and also a logout button
 *  On mobile devices: Has tabs at the top to change the current view displayed
 */
const SettingsView = ({ t, onClose, isMobile }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [hasUnsyncedData, setHasUnsyncedData] = useState(false);
    const { logout } = useAuth();

    // Function to check for unsynced data before opening logout confirmation
    const handleOpenLogout = async () => {
        try {
            const unsyncedWs = await workspaceService.getWorkspacesNotSynced();
            const unsyncedNotes = await noteService.getNotesNotSynced();
            
            const isDirty = unsyncedWs.length > 0 || unsyncedNotes.length > 0;
            setHasUnsyncedData(isDirty);
            setIsLogoutModalOpen(true);
        } catch (error) {
            console.error("Error checking sync status:", error);
            setIsLogoutModalOpen(true); // Open by default if error occurs
        }
    };

    /**
     * Handles the styling of sidebar and mobile navigation buttons
     * based on the currently active tab.
     */
    const getTabClass = (tabId) => {
        const baseClass = "cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ";
        // Desktop sidebar full-width vs Mobile horizontal auto-width
        const layoutClass = isMobile ? "shrink-0 " : "w-full ";

        return activeTab === tabId
            ? baseClass + layoutClass + "bg-primary/10 text-primary shadow-sm shadow-primary/5"
            : baseClass + layoutClass + "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100";
    };

    return (
        <div className="flex h-full w-full bg-main-bg overflow-hidden transition-all duration-200 flex-col sm:flex-row">

            <LogoutModal 
                isOpen={isLogoutModalOpen} 
                onClose={() => setIsLogoutModalOpen(false)} 
                onConfirm={logout} 
                isUnsynced={hasUnsyncedData}
            />

            {/* Sidebar - Desktop & Tablet (Hidden on mobile) */}
            <div className="hidden sm:flex w-56 md:w-64 bg-main-bg border-r border-zinc-200 dark:border-zinc-800 p-5 flex-col shrink-0">
                <div className="flex-1 space-y-6">
                    {/* General section */}
                    <div>
                        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-3 mb-3">
                            {t('settings.title')}
                        </h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={getTabClass('general')}
                            >
                                <Globe className="w-4.5 h-4.5" />
                                {t('settings.general.general')}
                            </button>
                        </div>
                    </div>
                    {/* Workspace section */}
                    <div>
                        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-3 mb-3">
                            {t('settings.workspace.workspace_section') || 'WORKSPACE'}
                        </h3>
                        <div className="space-y-1">
                            <button onClick={() => setActiveTab('workspace')} className={getTabClass('workspace')}>
                                <Briefcase className="w-4.5 h-4.5" />
                                {t('settings.workspace.workspace') || 'Workspace'}
                            </button>
                        </div>
                    </div>

                    {/* Account section */}
                    <div>
                        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-3 mb-3">
                            {t('settings.account.account_section')}
                        </h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveTab('account')}
                                className={getTabClass('account')}
                            >
                                <User className="w-4.5 h-4.5" />
                                {t('settings.account.account')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout button at sidebar end */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={handleOpenLogout}
                        className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200 group"
                    >
                        <LogOut className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                        {t('settings.account.logout.logout')}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950/20">

                {/* Header */}
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-main-bg">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-lg md:text-xl text-zinc-900 dark:text-zinc-100 capitalize">
                            {activeTab === 'general' && t('settings.general.general')}
                            {activeTab === 'workspace' && (t('settings.workspace.workspace'))}
                            {activeTab === 'account' && t('settings.account.account')}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all active:scale-90"
                    >
                        <X className="w-6 h-6 text-zinc-500" />
                    </button>
                </div>

                {/**
                 * Mobile Navigation Tabs
                 * Visible only on mobile screens to allow sub-section switching.
                 */}
                {isMobile && (
                    <div className="flex gap-2 p-3 bg-main-bg border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar shrink-0">
                        <button onClick={() => setActiveTab('general')} className={getTabClass('general')}><Globe className="w-4 h-4" /> {t('settings.general.general')}</button>
                        <button onClick={() => setActiveTab('workspace')} className={getTabClass('workspace')}><Briefcase className="w-4 h-4" /> {t('settings.workspace.workspace')}</button>
                        <button onClick={() => setActiveTab('account')} className={getTabClass('account')}><User className="w-4 h-4" /> {t('settings.account.account')}</button>
                    </div>
                )}

                {/* Settings Content Switch */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {activeTab === 'general' && <GeneralSettings t={t} />}
                        {activeTab === 'workspace' && <WorkspaceSettings t={t} />}
                        {activeTab === 'account' && <AccountSettings t={t} onLogoutClick={handleOpenLogout} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;