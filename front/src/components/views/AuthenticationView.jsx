import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import ChangeThemeButton from '../util/ChangeThemeButton';
import { useIsMobile } from '../../hooks/useIsMobile';
import PasswordInput from '../util/PasswordInput';

const AuthenticationView = () => {
    const { t } = useTranslation();
    const { login, signUp } = useAuth();
    const isMobile = useIsMobile();

    const [authMode, setAuthMode] = useState('login');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('idle');

    const toggleMode = () => {
        setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
        setStatus('idle');
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            if (authMode === 'login') {
                await login(email, password);
            } else {
                await signUp(email, password, username);
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="h-dvh w-full flex flex-col bg-zinc-50 dark:bg-main-bg-darker font-sans transition-colors duration-500 overflow-hidden">

            {/* Top Bar */}
            <div className="w-full h-16 flex bg-zinc-50 dark:bg-main-bg-darker items-center justify-between px-6 sm:px-10 border-b border-zinc-200/50 dark:border-zinc-900/50 backdrop-blur-md z-20 shrink-0">
                <h1 className="text-xl font-bold text-text-primary tracking-tight">Graphite</h1>
                <div className="flex items-center">
                    <ChangeThemeButton />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full overflow-y-auto custom-scrollbar relative">

                <div className={`flex flex-col min-h-full w-full ${isMobile ? 'p-0' : 'p-6 sm:p-10'}`}>

                    {/* Background glows */}
                    {!isMobile && (
                        <>
                            <div className="absolute w-200 h-200 bg-primary/10 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute w-75 h-75 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -top-10 -left-10 pointer-events-none" />
                        </>
                    )}

                    {/* Login Card */}
                    <div className={`
                        relative z-10 bg-main-bg m-auto transition-all duration-300
                        ${isMobile
                            ? 'w-full min-h-[calc(100dvh-4rem)] flex flex-col justify-center px-8 py-10 space-y-10 border-none rounded-none'
                            : 'shadow-2xl w-full max-w-xl space-y-16 p-12 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800'
                        }
                    `}>

                        {/* Centered Main Title */}
                        <div className="space-y-4 text-center">
                            <h2 className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-medium text-text-primary brightness-0 dark:brightness-150 tracking-tighter leading-tight`}>
                                {authMode === 'login' ? t('identification.login.title') : t('identification.register.title')}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {authMode === 'signup' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest block">{t('identification.username')}</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={t('identification.username_placeholder')}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-text-primary border-2 border-transparent focus:border-primary/30 transition-all outline-none"
                                    />
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest block">{t('identification.email')}</label>
                                <input
                                    type="email"
                                    required
                                    placeholder={t('identification.email_placeholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-text-primary border-2 border-transparent focus:border-primary/30 transition-all outline-none"
                                />
                            </div>

                            {/* Password */}
                            <PasswordInput
                                id="password"
                                label={t('identification.password')}
                                placeholder={t('identification.password_placeholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={status === 'password_mismatch'}
                            />

                            {/* Confirm Password */}
                            {authMode === 'signup' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <PasswordInput
                                        id="confirm-password"
                                        label={t('identification.confirm_password')}
                                        placeholder={t('identification.password_placeholder')}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        error={status === 'password_mismatch'}
                                    />
                                </div>
                            )}

                            {/* Alerts */}
                            {(status === 'error' || status === 'password_mismatch') && (
                                <div className="flex items-center gap-2 text-red-500 text-[11px] font-bold bg-red-500/10 p-4 rounded-2xl animate-in shake">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {status === 'error' ? t('identification.invalid_credentials') : t('identification.passwords_dont_match')}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="cursor-pointer w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xl mt-4"
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : (authMode === 'login' ? t('identification.login.button').toUpperCase() : t('identification.register.button').toUpperCase())}
                            </button>
                        </form>

                        {/* Footer Toggle */}
                        <div className="text-center">
                            <p className="text-sm text-zinc-500 font-medium tracking-tight leading-relaxed">
                                {authMode === 'login' ? t('identification.login.register_footer') : t('identification.register.login_footer')}
                                <button
                                    onClick={toggleMode}
                                    className="font-bold text-primary cursor-pointer hover:underline ml-1 uppercase tracking-wider"
                                >
                                    {authMode === 'login' ? t('identification.register.register') : t('identification.login.login')}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationView;