import { attachmentService } from '../../services/db/attachmentService';
import { invoke } from '@tauri-apps/api/core';

/**
 * Generic utility to trigger a file download from a string or blob.
 * @param {string|Blob} content - The file content.
 * @param {string} fileName - The name of the file including extension.
 * @param {string} contentType - The MIME type of the file.
 */
const saveAsFile = (content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Enhanced HTML export engine.
 * Processes the editor content, injects binary resources as Base64,
 * and wraps everything in a standalone HTML template with Tailwind support.
 * 
 * @param {Object} editor - The Tiptap editor instance.
 * @param {string} title - The document title (used for filename).
 */
export const exportNoteToHtml = async (editor, title = "Graphite_Document") => {
    if (!editor) return;

    const rawHtml = editor.getHTML();
    const parser = new DOMParser();
    const virtualDoc = parser.parseFromString(rawHtml, 'text/html');

    // PHASE 1: GENERIC RESOURCE INJECTION
    // We look for any node marked as an attachment. The visual style (Tailwind classes)
    // is already defined in the extension's renderHTML method.
    const attachments = virtualDoc.querySelectorAll('[data-type="attachment"]');

    for (const node of attachments) {
        // Tiptap converts attributes to lowercase in static HTML: attachmentId -> attachmentid
        const id = node.getAttribute('attachmentid') || node.getAttribute('data-attachment-id');
        if (!id) continue;

        try {
            const metadata = await attachmentService.getById(id);
            if (metadata?.local_path) {
                // Fetch binary data from Rust and convert to Data URL
                const base64Data = await invoke('get_file_base64', { path: metadata.local_path });
                const dataUrl = `data:${metadata.mime_type};base64,${base64Data}`;

                // Find the first media element inside the component and inject the resource
                const media = node.querySelector('img, audio, video');
                if (media) media.setAttribute('src', dataUrl);
            }
        } catch (e) {
            console.error(`Failed to inject resource for attachment ${id}:`, e);
        }
    }

    // PHASE 2: HTML TEMPLATE GENERATION
    const tailwindConfig = `
      tailwind.config = {
          theme: {
              extend: {
                  colors: { primary: '#4f46e5' }
              }
          }
      }
  `;

    // Global layout styles for the exported document
    const globalExportStyles = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      body { font-family: 'Inter', sans-serif; background: #f4f4f5; padding: 3rem 2rem; color: #18181b; }
      
      .export-container { 
          max-width: 850px; 
          margin: 0 auto; 
          background: white; 
          padding: 5rem; 
          border-radius: 2rem; 
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); 
      }

      /* Hero Title Style */
      .document-title {
          font-size: 4rem; /* Significantly larger than standard H1 */
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          color: #09090b;
      }

      .ProseMirror h1 { font-size: 2.5rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1.5rem; color: #18181b; }
      .ProseMirror h2 { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #27272a; }
      .ProseMirror p { line-height: 1.8; margin-bottom: 1.5rem; color: #3f3f46; font-size: 1.125rem; }
      
      .export-attachment { page-break-inside: avoid; }
      
      /* Print optimization */
      @media print {
          body { background: white; padding: 0; }
          .export-container { box-shadow: none; padding: 2rem; width: 100%; max-width: none; }
      }
    `;

    const finalHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <script>${tailwindConfig}</script>
          <style>${globalExportStyles}</style>
      </head>
      <body>
          <div class="export-container">
              <header style="margin-bottom: 4rem;">
                  <!-- Metadata Header -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #f4f4f5; padding-bottom: 1rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em;">
                          Graphite Archive
                      </span>
                      <span style="font-size: 0.75rem; font-weight: 500; color: #a1a1aa;">
                          ${title}
                      </span>
                  </div>

                  <!-- Main Hero Title -->
                  <h1 class="document-title">${title}</h1>
                  
                  <!-- Subtle Divider -->
                  <div style="width: 200px; h-height: 4px; background: #4f46e5; height: 6px; border-radius: 99px; margin-top: 2rem;"></div>
              </header>
              <article class="ProseMirror">
                  ${virtualDoc.body.innerHTML}
              </article>
          </div>
      </body>
      </html>
  `;

    // Sanitize filename and trigger download
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    saveAsFile(finalHtml, `${safeTitle}.html`, 'text/html');
};