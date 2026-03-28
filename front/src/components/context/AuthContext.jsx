import { createContext, useContext, useState, useEffect } from 'react';
import { isTokenValid } from '../../util/auth';
import { deriveKEK, wrapDEK, unwrapDEK, deriveAuthHash } from '../../util/crypto';
import { authService } from '../../services/api';
import { userService } from '../../services/db/userService';
import { invoke } from '@tauri-apps/api/core';
import { workspaceService } from '../../services/db/workspaceService';
import { noteService } from '../../services/db/noteService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dek, setDek] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const data = await invoke('load_secure_data');
                if (!data || !isTokenValid(data.token)) {
                    await logout();
                }
                else {
                    setDek(new Uint8Array(data.dek));
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.error("Error cargando vault rápido:", e);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const { salt } = await authService.getSalt(email);
        const passwordHash = await deriveAuthHash(password, salt);

        // Call to remote service
        const { token, wrappedDek, dekIv, username, userId } = await authService.login(email, passwordHash);

        // Cryptographic logic
        const kek = await deriveKEK(password, salt);
        const decryptedDek = await unwrapDEK(wrappedDek, kek, dekIv);

        // Persistence (Tauri/Stronghold)
        await saveSessionLocally(token, decryptedDek);
        setDek(decryptedDek);

        await userService.saveCloudSession(userId, email, username, token)

        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            // Clear binary file on rust
            await invoke('clear_secure_data');
            await userService.logout()
        } catch (e) {
            console.error("Error al borrar el vault:", e);
        } finally {
            // Clear React state
            setIsAuthenticated(false);
            setDek(null);
        }
    };

    const signUp = async (email, password, username) => {
        // Local cryptography setup
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const saltBase64 = btoa(Array.from(salt).map(b => String.fromCodePoint(b)).join(''));

        const newDek = window.crypto.getRandomValues(new Uint8Array(32));
        const kek = await deriveKEK(password, saltBase64);
        const { wrappedDek, iv } = await wrapDEK(newDek, kek);

        const passwordHash = await deriveAuthHash(password, saltBase64);

        // Send to server
        const { token, userId, } = await authService.signup({
            username,
            email,
            passwordHash: passwordHash,
            cryptoSalt: saltBase64,
            wrappedDek: wrappedDek,
            dekIv: iv
        });

        await userService.saveCloudSession(userId, email, username, token);
        const workspaceId = await workspaceService.addWelcomeWorkspace(userId);
        await noteService.addWelcomeNotes(workspaceId)

        await saveSessionLocally(token, newDek);
        setDek(newDek);
        setIsAuthenticated(true);
    };

    const saveSessionLocally = async (token, dek) => {
        await invoke('save_secure_data', {
            token,
            dek: Array.from(dek)
        });
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, dek, login, logout, signUp }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);