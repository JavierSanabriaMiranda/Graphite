import { expect } from '@wdio/globals'

describe('Graphite Desktop - Smoke Test', () => {
    it('Debería levantar el binario nativo y renderizar la pantalla de Login', async () => {
        
        // Force the app to load the internal URL, which is where our React app lives. 
        // This is crucial for the test to work.
        await browser.url('http://tauri.localhost/');

        try {
            const emailInput = await $('input[type="email"]');

            // Give it more time to render, especially on slower machines or CI environments
            await emailInput.waitForExist({ 
                timeout: 30000,
                timeoutMsg: 'The internal interface did not render.'
            });

            await expect(emailInput).toBeExisting();
            
        } catch (error) {
            // Print the current URL to help debug where the robot got stuck
            const currentUrl = await browser.getUrl();
            console.log('\n[DEBUG] The robot got stuck at URL:', currentUrl);
            throw error;
        }
    });
});