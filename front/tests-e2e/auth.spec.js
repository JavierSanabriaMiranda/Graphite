import { expect } from '@wdio/globals'

describe('Lifecycle and Authentication Flow', () => {

    // Hook: Before starting the suite, navigate to Tauri's internal URL
    // to prevent EdgeDriver's default blank page wipe.
    before(async () => {
        await browser.url('http://tauri.localhost/');
    });

    const shortTime = Date.now().toString(36);
    const testUsername = `usr${shortTime}`;
    const testEmail = `test_${Date.now()}@graphite.com`; 

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
        // Act: Switch to the Registration view
        const toggleToRegisterBtn = await $('button[data-testid="toggle-auth-mode"]');
        if (await toggleToRegisterBtn.isExisting()) {
            await toggleToRegisterBtn.click();
        }

        // Act: Fill in the registration form
        const usernameInput = await $('input[data-testid="username-input"]');
        const emailInput = await $('input[type="email"]');
        const passwordInput = await $('#password');
        const passwordConfirmInput = await $('#confirm-password');
        const submitBtn = await $('button[type="submit"]');

        await usernameInput.setValue(testUsername);
        await emailInput.setValue(testEmail);
        await passwordInput.setValue('Test1234@');
        await passwordConfirmInput.setValue('Test1234@');
        await submitBtn.click();

        // Assert: Validate automatic transition to the Workspace
        const emptyEditor = await $('div[data-testid="empty-state"]'); 
        
        await emptyEditor.waitForExist({ 
            timeout: 25000,
            timeoutMsg: 'Registration failed or auto-login transition took too long.'
        });

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
        // Act: Trigger the logout action
        const settingsBtn = await $('button[data-testid="open-settings-btn"]');
        await settingsBtn.click();

        const accountSettingsBtn = await $('button[data-testid="account-settings-btn"]');
        await accountSettingsBtn.waitForExist({ 
            timeout: 5000,
            timeoutMsg: 'Account settings button not found. Cannot proceed to logout.'
        });
        await accountSettingsBtn.click();

        const logoutBtn = await $('button[data-testid="account-logout-btn"]'); 
        await logoutBtn.waitForExist({ 
            timeout: 5000,
            timeoutMsg: 'Logout button not found in account settings.'
        });
        await logoutBtn.click();

        const confirmLogoutBtn = await $('button[data-testid="confirm-logout-btn"]');
        await confirmLogoutBtn.waitForExist({ 
            timeout: 5000,
            timeoutMsg: 'Confirm logout button did not appear after clicking logout.'
        });
        await confirmLogoutBtn.click();

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
        const emailInput = await $('input[type="email"]');
        const passwordInput = await $('input[type="password"]');
        const submitBtn = await $('button[type="submit"]');

        // Act: Fill login credentials with the user created in Test 1.2
        await emailInput.setValue(testEmail);
        await passwordInput.setValue('Test1234@');
        await submitBtn.click();

        // Assert: Validate transition back to the Workspace
        const emptyEditor = await $('div[data-testid="empty-state"]'); 
        
        await emptyEditor.waitForExist({ 
            timeout: 5000,
            timeoutMsg: 'Standard Login failed for an existing user.'
        });

        await expect(emptyEditor).toBeExisting();
        await expect(emailInput).not.toBeExisting();
    });
});