import { createContext, useContext, useState, useEffect, Component } from 'react';
import { isTokenValid } from '../../util/auth';
import { deriveKEK, wrapDEK, unwrapDEK, deriveAuthHash } from '../../util/crypto';
import { authService } from '../../services/api';
import { userService } from '../../services/db/userService';
import { invoke } from '@tauri-apps/api/core';
import { workspaceService } from '../../services/db/workspaceService';
import { noteService } from '../../services/db/noteService';
import { syncService } from '../../services/db/syncService';
import ApiError from '../../custom_errors/ApiError';

const AuthContext = createContext();

/**
 * This wrapper manages the state of the current authenticated user
 * 
 * @param {Component} children - Component that will be able to access to the auth functions 
 */
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
                    const dekBytes = new Uint8Array(data.dek);
                    setDek(dekBytes);
                    setIsAuthenticated(true);
                    const user = await userService.getCurrentUser()
                    // INITIAL SYNC: Refresh metadata on app start
                    if (navigator.onLine) {
                        await syncService.pullAllMetadata(dekBytes, user.user_id);
                    }
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

        // SYNC AFTER LOGIN: Populate the app for the first time
        if (navigator.onLine) {
            await syncService.pullAllMetadata(decryptedDek, userId);
        }
        await syncService.purgeSyncedDeletes();

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
        validateSignUpData(email, password, username);

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

    // Validation logic for sign-up data
    const validateSignUpData = (email, password, username) => {
        // Username validation (3-20 chars, no special chars)
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
            throw new ApiError("invalid_username_format", 400);
        }
        // Password validation (min 8 chars, at least one uppercase, one lowercase, one number, one special char)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new ApiError("weak_password", 400);
        }
        // Email validation (basic regex)
        if (!validateEmail(email)) {
            throw new ApiError("invalid_email_format", 400);
        }
    }

    const validateEmail = (email) => {
        // Limit email length (based on RFC 5321 it's 254 chars)
        if (!email || email.length > 254) return false;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        return emailRegex.test(email);
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