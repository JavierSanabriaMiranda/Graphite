/**
 * Registers a new user in the application and waits for the main panel to load.
 */
export async function registerUser(username, email, password) {
    // Change to the registration view if necessary
    const toggleToRegisterBtn = await $('button[data-testid="toggle-auth-mode"]');
    
    // Verify the text or state to ensure we are not already in the registration view
    // (Assuming the button changes to "Go to Login" when you are in the registration view)
    if (await toggleToRegisterBtn.isExisting()) {
        await toggleToRegisterBtn.click();
    }

    // Fill the form
    const usernameInput = await $('input[data-testid="username-input"]');
    const emailInput = await $('input[type="email"]');
    const passwordInput = await $('#password');
    const passwordConfirmInput = await $('#confirm-password');
    const submitBtn = await $('button[type="submit"]');

    await usernameInput.setValue(username);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);
    await passwordConfirmInput.setValue(password);
    await submitBtn.click();

    // Validate transition to the main workspace/editor
    const emptyEditor = await $('div[data-testid="empty-state"]'); 
    
    await emptyEditor.waitForExist({ 
        timeout: 25000,
        timeoutMsg: 'Registration failed or auto-login transition took too long.'
    });
}

/**
 * Logs in with an existing user and waits for the main panel to load.
 */
export async function loginUser(email, password) {
    // Fill the login form
    const emailInput = await $('input[type="email"]');
    const passwordInput = await $('#password');
    const submitBtn = await $('button[type="submit"]');

    await emailInput.setValue(email);
    await passwordInput.setValue(password);
    await submitBtn.click();

    // Validate transition
    const emptyEditor = await $('div[data-testid="empty-state"]');
    
    await emptyEditor.waitForExist({ 
        timeout: 25000,
        timeoutMsg: 'Login failed or transition took too long.'
    });
}