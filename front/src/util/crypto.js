/**
 * Cryptographic utilities for E2EE encrypting
 */

// Turns a buffer to Base64 to send it to server or save it
const bufToBase64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

// Turns Base64 into Uint8Array
const base64ToBuf = (base64) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));

/**
 * Get a KEK (Key Encryption Key) from a password and user salt
 * Uses PBKDF2 with 100,000 iterations (security standard).
 */
export async function deriveKEK(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]
    );
    return await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode(salt),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

/**
 * Decrypt DEK (Data Encryption Key) that comes from server using the KEK.
 */
export async function unwrapDEK(wrappedDekBase64, kek, ivBase64) {
    const data = base64ToBuf(wrappedDekBase64);
    const iv = base64ToBuf(ivBase64);

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv }, kek, data
    );
    return new Uint8Array(decrypted);
}

/**
 * Encrypts generic data using a KEK.
 */
export async function wrapDEK(dekBuf, kek) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv }, kek, dekBuf
    );
    return {
        wrappedDek: bufToBase64(encrypted),
        iv: bufToBase64(iv)
    };
}

/**
 * Generates a hash to send to remote server (Authentication Hash)
 */
export async function deriveAuthHash(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode(salt + "auth_v1"), // Added suffix to salt
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt"]
    );

    const exported = await window.crypto.subtle.exportKey("raw", derivedKey);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

/**
 * Encrypts a string (plaintext) using the DEK.
 * Used for Note content, titles, and Workspace names.
 * @param {string} plaintext - The data to encrypt.
 * @param {Uint8Array} dekBuf - The raw Data Encryption Key.
 * @returns {Object} { ciphertext: string (base64), iv: string (base64) }
 */
export async function encryptData(plaintext, dekBuf) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Import the raw DEK buffer as a CryptoKey object
    const key = await window.crypto.subtle.importKey(
        "raw",
        dekBuf,
        "AES-GCM",
        false,
        ["encrypt"]
    );

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        data
    );

    return {
        ciphertext: bufToBase64(encrypted),
        iv: bufToBase64(iv)
    };
}

/**
 * Decrypts a base64 ciphertext using the DEK and provided IV.
 * @param {string} ciphertextBase64 - The encrypted data in base64.
 * @param {Uint8Array} dekBuf - The raw Data Encryption Key.
 * @param {string} ivBase64 - The IV in base64.
 * @returns {string} The original plaintext.
 */
export async function decryptData(ciphertextBase64, dekBuf, ivBase64) {
    const data = base64ToBuf(ciphertextBase64);
    const iv = base64ToBuf(ivBase64);

    const key = await window.crypto.subtle.importKey(
        "raw",
        dekBuf,
        "AES-GCM",
        false,
        ["decrypt"]
    );

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        data
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}