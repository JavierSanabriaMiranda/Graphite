import { expect } from '@wdio/globals'
import { registerUser, logoutUser, loginUser } from './helpers/auth.helper.js';

describe('Lifecycle and Authentication Flow', () => {

    // Hook: Before starting the suite, navigate to Tauri's internal URL
    // to prevent EdgeDriver's default blank page wipe.
    before(async () => {
        await browser.url('http://tauri.localhost/');
    });

    const shortTime = Date.now().toString(36);
    const testUsername = `usr${shortTime}`;
    const testEmail = `test_${Date.now()}@graphite.com`; 
    const testPassword = 'Test1234@';

    it('Smoke Test: Should boot clean and display the Auth screen', async () => {
        // Arrange: Locate key input elements
        const emailInput = await $('input[type="email"]');
        const passwordInput = await $('input[type="password"]');
        
        // Act & Assert: Wait for the black screen to disappear and render React
        await emailInput.waitForExist({ 
            timeout: 15000,
            timeoutMsg: 'Auth screen did not render in time. App might be stuck on black screen.'
        });

        await expect(emailInput).toBeExisting();
        await expect(passwordInput).toBeExisting();
    });

    it('Registration Flow: Should create a new user and auto-login', async () => {
        // Register a new user to ensure we have a clean session for testing
        await registerUser(testUsername, testEmail, testPassword);

        // Assert: Validate automatic transition to the Workspace
        const emptyEditor = await $('div[data-testid="empty-state"]'); 

        await expect(emptyEditor).toBeExisting();
    });

    it('Session Persistence (JWT): Should remember the user after app restart', async () => {
        // Act: Simulate app restart by navigating to the root URL again.
        // This forces React to unmount and read from the SQLite DB/LocalStorage from scratch.
        await browser.url('http://tauri.localhost/');

        const emptyEditor = await $('div[data-testid="empty-state"]'); 

        // Assert: The app should bypass the Login screen entirely
        await emptyEditor.waitForExist({ 
            timeout: 8000,
            timeoutMsg: 'JWT was not persisted in SQLite. The app failed to remember the session.'
        });

        await expect(emptyEditor).toBeExisting();
    });

    it('Secure Logout: Should destroy local credentials and block access', async () => {
        await logoutUser();

        // Assert: The app must return to the Login screen immediately
        const emailInput = await $('input[type="email"]');
        await emailInput.waitForExist({ 
            timeout: 5000,
            timeoutMsg: 'Logout button did not return the user to the Login screen.'
        });
        await expect(emailInput).toBeExisting();

        // Critical Security Check: Reload the app to prove the token is physically gone
        await browser.url('http://tauri.localhost/');
        await emailInput.waitForExist({ 
            timeout: 5000,
            timeoutMsg: 'CRITICAL: Token persisted in database after logout and app restart.'
        });
        await expect(emailInput).toBeExisting();
    });

    it('Standard Login: Should authenticate the previously registered user', async () => {
        await loginUser(testEmail, testPassword);

        // Assert: Validate transition back to the Workspace
        const emptyEditor = await $('div[data-testid="empty-state"]'); 
        const emailInput = await $('input[type="email"]');

        await expect(emptyEditor).toBeExisting();
        await expect(emailInput).not.toBeExisting();
    });
});