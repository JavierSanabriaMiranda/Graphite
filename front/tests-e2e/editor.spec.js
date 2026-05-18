import { browser, expect } from '@wdio/globals'
import { registerUser } from './helpers/auth.helper.js';

describe('Core Editor and Workspaces Lifecycle', () => {

    // Unique name to avoid conflicts in the backend database
    const shortTime = Date.now().toString(36);
    const testUsername = `usr${shortTime}`;
    const testEmail = `test_${Date.now()}@graphite.com`;
    const testPassword = 'Test1234@';

    const testWorkspaceName = `WS_${shortTime}`;

    before(async () => {
        await browser.url('http://tauri.localhost/');
        const emptyState = await $('div[data-testid="empty-state"]');
        try {
            // If this exists, it means we are already logged in and can proceed with the tests
            await emptyState.waitForExist({
                timeout: 25000,
                timeoutMsg: 'Not logged in'
            });
            console.log('[Setup] User session detected. Proceeding with tests.');

        } catch (error) {
            // If we catch an error, it means we are not logged in and need to register a new user
            console.log('[Setup] No user session detected. Registering a new user for testing...');
            await registerUser(testUsername, testEmail, testPassword);
        }
    });

    it('Create Workspace Flow: Should fill the creation form and render an empty workspace', async () => {
        // Click on the "Create New Workspace" trigger button
        const workspaceBtn = await $('[data-testid="workspace-selector-btn"]');
        await workspaceBtn.click();

        const newWorkspaceBtn = await $('[data-testid="btn-new-workspace"]');
        await newWorkspaceBtn.waitForExist({
            timeout: 5000,
            timeoutMsg: 'Create New Workspace button did not appear in the workspace selector dropdown.'
        });
        await newWorkspaceBtn.click();

        // Locate and fill the workspace creation window/modal inputs
        const nameInput = await $('[data-testid="input-workspace-name"]');
        const emojiTriggerBtn = await $('[data-testid="workspace-emoji-picker"]');
        const confirmBtn = await $('[data-testid="btn-create-workspace"]');

        await nameInput.waitForExist({
            timeout: 5000,
            timeoutMsg: 'Workspace creation window/modal did not appear.'
        });

        // Fill the workspace details
        await nameInput.setValue(testWorkspaceName);

        // Submit the form
        await confirmBtn.click();

        // Verify the workspace entry exists in the sidebar list
        const workspaceItem = await $(`[data-testid="sidebar-ws-${testWorkspaceName}"]`);
        await workspaceItem.waitForExist({
            timeout: 5000,
            timeoutMsg: 'The newly created workspace was not found in the sidebar list.'
        });
        await expect(workspaceItem).toBeExisting();

        // Verify the sidebar has NO NavItems inside this new workspace (no pages created yet)
        const navItems = await $$('[data-testid*="nav-item"]');
        await expect(navItems).toHaveLength(0);
    });

    it('Create Page Flow: Should create a new page inside the active workspace', async () => {
        // Look for create page button in the sidebar and click it
        const newPageBtn = await $('[data-testid="btn-create-root-note"]');

        await newPageBtn.waitForExist({
            timeout: 5000,
            timeoutMsg: 'El botón para crear una nueva página no está visible.'
        });
        await newPageBtn.click();

        // Change title of the new page
        const titleInput = await $('[data-testid="note-title-input"]');
        await titleInput.waitForExist({
            timeout: 3000,
            timeoutMsg: 'Input for page title did not appear after clicking the create page button.'
        });
        await titleInput.setValue('Test Page Title');
        browser.keys('Enter'); // Simulate Enter to confirm the title and create the page

        // Validate page appears in the sidebar and the editor canvas is rendered
        const navItems = await $$('[data-testid*="nav-item"]');

        // Wait until at least one nav item appears, which indicates the page was created and rendered in the sidebar
        await browser.waitUntil(async () => {
            const items = await $$('[data-testid*="nav-item"]');
            return items.length > 0;
        }, {
            timeout: 5000,
            timeoutMsg: 'The page was not added to the sidebar after clicking create.'
        });

        await expect(navItems).toBeElementsArrayOfSize({ gte: 1 }); // Greater than or equal to 1

        // Validate that the editor canvas is rendered and ready for input
        const editorCanvas = await $('.ProseMirror');
        await editorCanvas.waitForExist({
            timeout: 5000,
            timeoutMsg: 'The editor canvas was not rendered after creating the page.'
        });
        await expect(editorCanvas).toBeExisting();
    });

    it('Text Editor & Formatting: Should type text and apply rich formatting', async () => {
        const navItems = await $$('[data-testid*="nav-item"]');
        await expect(navItems).toBeElementsArrayOfSize({ gte: 1 });
        navItems[0].click(); // Click the first page to ensure the editor is focused on a known page

        // Get the editor canvas
        const editorCanvas = await $('.ProseMirror');
        await editorCanvas.waitForExist({
            timeout: 5000,
            timeoutMsg: 'Editor canvas not found for formatting test.'
        });

        // Hacemos clic dentro para que el cursor tome el foco
        await editorCanvas.click();

        // Type some text to ensure the editor is active and can receive input
        await browser.keys('Hello, this is a formatting test. ');

        // Test Bold formatting: Click the bold button in the menu bar and type some text
        const boldBtn = await $('[data-testid="toolbar-bold"]');

        if (await boldBtn.isExisting()) {
            await boldBtn.click(); // Set active bold formatting
            await browser.keys('This is important.');
            await boldBtn.click(); // Set inactive to stop bold formatting

            // Assert: Tiptap should have wrapped "This is important." in a <strong> tag. We check the DOM for this.
            const boldTextNode = await editorCanvas.$('strong');
            await boldTextNode.waitForExist({
                timeout: 2000,
                timeoutMsg: 'The <strong> tag was not generated in the DOM.'
            });
            await expect(boldTextNode).toHaveText('This is important.');
        } else {
            console.log('Bold button not found in the menu bar. Skipping formatting test');
        }
    });

    it('Autosave & Persistence: Should retain editor content after application restart', async () => {
        const editorCanvas = await $('.ProseMirror');
        await editorCanvas.click();

        // Write a unique phrase to ensure we can identify it after reload
        const persistentPhrase = `Persitent text ${Date.now()}`;

        // Use enter to create a new paragraph and then type the unique phrase
        await browser.keys(['Enter']);
        await browser.keys(persistentPhrase);

        // Wait a bit to ensure the autosave mechanism has time to trigger and save the content
        await browser.pause(3500);

        // Simulate a app restart by refreshing the page. 
        // This will unmount React and force it to read from SQLite/localStorage again.
        await browser.refresh();

        // Enter in the workspace we were editing to ensure the editor is focused and tries to load the content
        const workspaceBtn = await $('[data-testid="workspace-selector-btn"]');
        await workspaceBtn.click();
        const workspaceOption = await $(`[data-testid="workspace-option-${testWorkspaceName}"]`);
        await workspaceOption.waitForExist({
            timeout: 5000,
            timeoutMsg: 'Workspace option did not appear in the dropdown after refresh.'
        });
        await workspaceOption.click();

        // Enter again in the page we were editing to ensure the editor is focused and tries to load the content
        const navItems = await $$('[data-testid*="nav-item"]');

        await expect(navItems).toBeElementsArrayOfSize({ gte: 1 });
        navItems[0].click(); // Click the first page which should be the one we edited

        const reloadedEditor = await $('.ProseMirror');
        await reloadedEditor.waitForExist({
            timeout: 8000,
            timeoutMsg: 'Editor did not reload after app refresh, or took too long. This may indicate a problem with the persistence mechanism.'
        });

        // Read all the text in the editor and look for our key phrase
        const fullContent = await reloadedEditor.getText();

        // If the text is present, it means SQLite did its job perfectly
        expect(fullContent).toContain(persistentPhrase);
    });
});