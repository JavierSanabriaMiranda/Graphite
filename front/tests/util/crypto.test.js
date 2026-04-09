import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    deriveKEK,
    unwrapDEK,
    wrapDEK,
    deriveAuthHash,
    encryptData,
    decryptData,
} from '../../src/util/crypto';

describe('Crypto Utilities', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Mock the crypto API using vi.stubGlobal (proper way for read-only properties)
        const mockSubtle = {
            importKey: vi.fn(),
            deriveKey: vi.fn(),
            encrypt: vi.fn(),
            decrypt: vi.fn(),
            exportKey: vi.fn(),
        };

        const mockCrypto = {
            subtle: mockSubtle,
            getRandomValues: vi.fn((arr) => {
                // Simple mock: just fill with incremental values
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = i % 256;
                }
                return arr;
            }),
        };

        vi.stubGlobal('crypto', mockCrypto);
    });

    describe('deriveKEK', () => {
        it('should derive a KEK from password and salt', async () => {
            const mockKey = { type: 'secret', extractable: true };
            const mockDerivedKey = { type: 'secret', algorithm: { name: 'AES-GCM' } };

            crypto.subtle.importKey.mockResolvedValue(mockKey);
            crypto.subtle.deriveKey.mockResolvedValue(mockDerivedKey);

            const result = await deriveKEK('mypassword', 'mysalt');

            expect(crypto.subtle.importKey).toHaveBeenCalled();
            expect(crypto.subtle.importKey.mock.calls[0][0]).toBe('raw');
            expect(crypto.subtle.importKey.mock.calls[0][2]).toBe('PBKDF2');

            expect(crypto.subtle.deriveKey).toHaveBeenCalled();
            const deriveCall = crypto.subtle.deriveKey.mock.calls[0][0];
            expect(deriveCall.name).toBe('PBKDF2');
            expect(deriveCall.iterations).toBe(100000);
            expect(deriveCall.hash).toBe('SHA-256');

            expect(result).toEqual(mockDerivedKey);
        });
    });

    describe('deriveAuthHash', () => {
        it('should derive an authentication hash with salt suffix', async () => {
            const mockKey = { type: 'secret', extractable: true };
            const mockDerivedKey = { type: 'secret', algorithm: { name: 'AES-GCM' } };
            const mockExported = new Uint8Array([1, 2, 3, 4, 5]);

            crypto.subtle.importKey.mockResolvedValue(mockKey);
            crypto.subtle.deriveKey.mockResolvedValue(mockDerivedKey);
            crypto.subtle.exportKey.mockResolvedValue(mockExported);

            const result = await deriveAuthHash('password', 'salt');

            expect(crypto.subtle.importKey).toHaveBeenCalled();
            expect(crypto.subtle.deriveKey).toHaveBeenCalled();

            // Verify the salt suffix "auth_v1" is added by checking the salt parameter
            const deriveCalls = crypto.subtle.deriveKey.mock.calls;
            expect(deriveCalls.length).toBeGreaterThan(0);
            const saltArg = deriveCalls[0][0].salt;
            // Should contain 'auth_v1' in the salt
            const saltString = new TextDecoder().decode(saltArg);
            expect(saltString).toContain('auth_v1');

            expect(crypto.subtle.exportKey).toHaveBeenCalledWith('raw', mockDerivedKey);
            expect(result).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64 format
        });
    });

    describe('wrapDEK and unwrapDEK', () => {
        it('should wrap and unwrap a DEK correctly', async () => {
            const mockKEK = { type: 'secret', algorithm: { name: 'AES-GCM' } };
            const originalDEK = new Uint8Array([10, 20, 30, 40, 50]);
            const encryptedData = new Uint8Array([100, 110, 120]);

            crypto.subtle.encrypt.mockResolvedValue(encryptedData);
            crypto.subtle.decrypt.mockResolvedValue(originalDEK);

            // Wrap
            const wrapped = await wrapDEK(originalDEK, mockKEK);

            expect(crypto.subtle.encrypt).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'AES-GCM', iv: expect.any(Uint8Array) }),
                mockKEK,
                originalDEK
            );

            expect(wrapped).toHaveProperty('wrappedDek');
            expect(wrapped).toHaveProperty('iv');
            expect(typeof wrapped.wrappedDek).toBe('string');
            expect(typeof wrapped.iv).toBe('string');

            // Unwrap
            const unwrapped = await unwrapDEK(wrapped.wrappedDek, mockKEK, wrapped.iv);

            expect(crypto.subtle.decrypt).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'AES-GCM', iv: expect.any(Uint8Array) }),
                mockKEK,
                expect.any(Uint8Array)
            );

            expect(unwrapped).toEqual(originalDEK);
        });
    });

    describe('encryptData and decryptData', () => {
        it('should encrypt and decrypt data consistently', async () => {
            const plaintext = 'Secret message';
            const mockDEK = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
            const mockKey = { type: 'secret', algorithm: { name: 'AES-GCM' } };
            const encryptedData = new Uint8Array([50, 60, 70, 80]);

            crypto.subtle.importKey.mockResolvedValue(mockKey);
            crypto.subtle.encrypt.mockResolvedValue(encryptedData);
            crypto.subtle.decrypt.mockResolvedValue(new TextEncoder().encode(plaintext));

            // Encrypt
            const encrypted = await encryptData(plaintext, mockDEK);

            expect(crypto.subtle.importKey).toHaveBeenCalledWith(
                'raw',
                mockDEK,
                'AES-GCM',
                false,
                ['encrypt']
            );

            expect(crypto.subtle.encrypt).toHaveBeenCalled();
            const encryptCall = crypto.subtle.encrypt.mock.calls[0][0];
            expect(encryptCall.name).toBe('AES-GCM');
            expect(encryptCall.iv).toBeDefined();

            expect(encrypted).toHaveProperty('ciphertext');
            expect(encrypted).toHaveProperty('iv');

            // Reset and decrypt
            crypto.subtle.importKey.mockClear();
            crypto.subtle.importKey.mockResolvedValue(mockKey);

            const decrypted = await decryptData(encrypted.ciphertext, mockDEK, encrypted.iv);

            expect(crypto.subtle.importKey).toHaveBeenCalledWith(
                'raw',
                mockDEK,
                'AES-GCM',
                false,
                ['decrypt']
            );

            expect(decrypted).toBe(plaintext);
        });

        it('should handle encryption with different message types', async () => {
            const mockDEK = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
            const mockKey = { type: 'secret', algorithm: { name: 'AES-GCM' } };

            crypto.subtle.importKey.mockResolvedValue(mockKey);
            crypto.subtle.encrypt.mockResolvedValue(new Uint8Array([1, 2, 3]));

            // Test with empty string
            await encryptData('', mockDEK);
            expect(crypto.subtle.encrypt).toHaveBeenCalled();

            // Test with special characters
            await encryptData('🔐 Secure!', mockDEK);
            expect(crypto.subtle.encrypt).toHaveBeenCalledTimes(2);
        });
    });
});
