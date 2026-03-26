import { createContext, useContext, useState, useEffect } from 'react';
import { Stronghold } from '@tauri-apps/plugin-stronghold';
import { appDataDir } from '@tauri-apps/api/path';
import { isTokenValid } from '../../util/auth';
import { deriveKEK, wrapDEK, unwrapDEK, deriveAuthHash } from '../../util/crypto';
import { authService } from '../../services/api';

const AuthContext = createContext();
let strongholdInstance = null;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dek, setDek] = useState(null);

    // Helper for initializing Tauri Stronghold
    const getStronghold = async () => {
        if (strongholdInstance) return strongholdInstance;

        const dataDir = await appDataDir();
        const vaultPath = `${dataDir}/vault.stronghold`;

        console.log("Cargando Stronghold por primera vez...");
        strongholdInstance = await Stronghold.load(vaultPath, "client-key");
        return strongholdInstance;
    };

    useEffect(() => {
        const initAuth = async () => {
            try {
                const stronghold = await getStronghold();

                let client;
                try {
                    // Try to load, if doesn't exist, will throw Error
                    client = await stronghold.loadClient("graphite_auth");
                } catch (e) {
                    console.log("Sesión no iniciada (sin Vault previo)");
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                const store = client.getStore();
                const jwtBytes = await store.get("jwt_token");
                const dekBytes = await store.get("active_dek");

                if (jwtBytes && dekBytes) {
                    const token = new TextDecoder().decode(new Uint8Array(jwtBytes));
                    if (isTokenValid(token)) {
                        setDek(new Uint8Array(dekBytes));
                        setIsAuthenticated(true);
                    }
                }
            } catch (e) {
                // Este catch es para errores reales (archivo corrupto, clave maestra mal, etc.)
                console.error("Error crítico de hardware/Stronghold:", e);
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
        const { token, wrappedDek, dekIv } = await authService.login(email, passwordHash);

        // Cryptographic logic
        const kek = await deriveKEK(password, salt);
        const decryptedDek = await unwrapDEK(wrappedDek, kek, dekIv);

        // Persistence (Tauri/Stronghold)
        await saveSessionLocally(token, decryptedDek);
        setDek(decryptedDek);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        const stronghold = await getStronghold();
        const client = await stronghold.getOrCreateClient(stronghold);
        await client.getStore().clear(); // Safe delete of local session
        await stronghold.save();

        setIsAuthenticated(false);
        setDek(null);
    };

    const signUp = async (email, password) => {
        // Local cryptography setup
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const saltBase64 = btoa(Array.from(salt).map(b => String.fromCodePoint(b)).join(''));

        const newDek = window.crypto.getRandomValues(new Uint8Array(32));
        const kek = await deriveKEK(password, saltBase64);
        const { wrappedDek, iv } = await wrapDEK(newDek, kek);

        const passwordHash = await deriveAuthHash(password, saltBase64);

        // Send to server
        const { token } = await authService.signup({
            email,
            passwordHash: passwordHash,
            cryptoSalt: saltBase64,
            wrappedDek: wrappedDek,
            dekIv: iv
        });

        await saveSessionLocally(token, newDek);
        setDek(newDek);
        setIsAuthenticated(true);
    };

    // Función auxiliar para no repetir código de guardado
    const saveSessionLocally = async (token, dek) => {
        try {
            const stronghold = await getStronghold();
            const client = await getOrCreateClient(stronghold);
            const store = client.getStore();

            await store.insert("jwt_token", Array.from(new TextEncoder().encode(token)));
            await store.insert("active_dek", Array.from(dek));

            await stronghold.save();
            console.log("Sesión persistida en Stronghold");
        } catch (e) {
            console.error("Error persistiendo sesión:", e);
        }
    };

    const getOrCreateClient = async (stronghold) => {
        const clientName = "graphite_auth";
        try {
            // Intentamos cargar el cliente
            return await stronghold.loadClient(clientName);
        } catch (e) {
            // Si falla (porque no existe), lo creamos
            console.log("Cliente no encontrado, creando nuevo espacio en el Vault...");
            return await stronghold.createClient(clientName);
        }
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, dek, login, logout, signUp }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);