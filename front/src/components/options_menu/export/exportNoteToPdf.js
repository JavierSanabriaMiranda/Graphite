import { invoke } from '@tauri-apps/api/core';
import { save } from '@tauri-apps/plugin-dialog';
import { generateFullHtmlString } from './exportUtils';

/**
 * Exports a note to PDF silently using a headless browser in the backend.
 * 1. Opens a native save dialog to pick the destination.
 * 2. Generates the full HTML (including base64 resources).
 * 3. Calls Rust to render and save the PDF without any print dialogs.
 * * @param {Object} editor - Tiptap editor instance.
 * @param {string} title - Note title.
 * @param {string} theme - 'light' or 'dark'.
 */
export const exportNoteToPdf = async (editor, title, theme) => {
    try {
        // STEP 1: Open the native Save File dialog
        // This is much better UX than the print dialog
        const filePath = await save({
            title: 'Export Note to PDF',
            defaultPath: `${title.replace(/[^a-z0-9]/gi, '_')}.pdf`,
            filters: [{
                name: 'PDF Document',
                extensions: ['pdf']
            }]
        });

        // If user closes the dialog without picking a path, we stop
        if (!filePath) return false;

        // STEP 2: Generate the self-contained HTML string
        const htmlContent = await generateFullHtmlString(editor, title, theme);

        // STEP 3: Call our Rust "Nuclear" command
        // We send the HTML and the chosen path
        await invoke('export_pdf_silently', {
            html: htmlContent,
            path: filePath
        });

        return true;
    } catch (error) {
        console.error("Critical PDF Export Error:", error);
        throw error;
    }
};