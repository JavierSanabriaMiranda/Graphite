import { browser, expect } from '@wdio/globals';
import { registerUser, logoutUser, loginUser } from './helpers/auth.helper.js';

describe('End-to-End Encryption (E2EE) & Network Privacy', () => {

    const shortTime = Date.now().toString(36);
    const testUsername = `crypto${shortTime}`;
    const testEmail = `test_${Date.now()}@crypto.com`;
    const testPassword = 'Test1234@';

    const plainTextSecret = "TFG-SECRET-123";

    before(async () => {
        await browser.url('http://tauri.localhost/');
        const emptyState = await $('div[data-testid="empty-state"]');
        try {
            // If this exists, it means we are already logged in and we have to logout
            await emptyState.waitForExist({
                timeout: 25000,
                timeoutMsg: 'Not logged in'
            });
            await logoutUser();
        } catch (error) {
            // If we catch an error, it means we are not logged in and need to register a new user
            console.log('[Setup] No user session detected. Registering a new user for testing...');
        }

        // Register a new user to ensure we have a clean session for encryption tests
        await registerUser(testUsername, testEmail, testPassword);

        // Create a new page
        const newPageBtn = await $('[data-testid="btn-create-root-note"]');
        await newPageBtn.waitForExist();
        await newPageBtn.click();

        const titleInput = await $('[data-testid="note-title-input"]');
        await titleInput.waitForExist({
            timeout: 3000,
            timeoutMsg: 'Input for page title did not appear after clicking the create page button.'
        });
        await titleInput.setValue('Crypto Test');
        browser.keys('Enter');
    });

    it('Network Shield: Should encrypt payload before sending it to the backend', async () => {
        // Inject the spy
        await browser.execute(() => {
            // Initialize an array to capture the payloads of interest
            window.__capturedSyncPayloads = [];

            const originalFetch = window.fetch;

            window.fetch = async function () {
                const url = arguments[0];
                const options = arguments[1] || {};

                // Capture all the PUT requests to notes
                if (typeof url === 'string' && url.includes('/api/v1/notes') && options.method === 'PUT') {
                    if (options.body) {
                        window.__capturedSyncPayloads.push(options.body);
                    }
                }

                return originalFetch.apply(this, arguments);
            };
        });

        // Write the secret text in the editor
        const editorCanvas = await $('.ProseMirror');
        await editorCanvas.waitForExist();
        await editorCanvas.click();
        await browser.keys(plainTextSecret);

        // Wait for autosave to trigger
        await browser.pause(3000);

        // Get all captured payloads from the spy
        const payloads = await browser.execute(() => {
            return window.__capturedSyncPayloads;
        });

        // Validate that at least one request was intercepted
        expect(payloads.length).toBeGreaterThan(0);

        // Get the specific payload that contains the note body
        // Search for a string in the array that contains the key 'encryptedPayload'
        const notePayloadString = payloads.find(payload => payload.includes('encryptedPayload'));

        // If it's undefined, it means the actual save request never went out
        expect(notePayloadString).toBeDefined();

        // Verify that in that specific payload, the plaintext does not exist
        expect(notePayloadString).not.toContain(plainTextSecret);

        // And confirm that the encryption structure is present
        expect(notePayloadString).toContain('encryptedPayload');
    });

    it('Vault Unlock: Should reconstruct DEK and display plain text after app restart', async () => {
        // Simulate the user closed the app
        await browser.refresh();

        // Remove session to force the dek to get reconstructed from the password again
        // and to remove the local data of the note, forcing it to fetch from the server again
        await logoutUser();
        await loginUser(testEmail, testPassword);

        // Look for the page created with the secret in the sidebar and click it to load the content
        const cryptoPageItem = await $('*=Crypto Test');

        await cryptoPageItem.waitForExist({
            timeout: 5000,
            timeoutMsg: 'No page was found on sidebar with the text "Crypto Test"'
        });
        await cryptoPageItem.click();

        // Verify that Tiptap initializes and decrypts the content
        const editorCanvas = await $('.ProseMirror');

        await browser.pause(2000); // Wait a bit for the decryption and rendering to happen

        await editorCanvas.waitForExist({
            timeout: 8000,
            timeoutMsg: 'The editor did not initialize after reloading the page.'
        });

        // Read all the plaintext that has been rendered by the DOM
        const fullContent = await editorCanvas.getText();

        // The secret should be perfectly readable.
        // This demonstrates that SQLite/SyncService delivered the data and React processed it correctly.
        expect(fullContent).toContain(plainTextSecret);
    });
});