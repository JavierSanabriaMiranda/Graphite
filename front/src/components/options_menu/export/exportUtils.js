import { attachmentService } from '../../../services/db/attachmentService';
import { invoke } from '@tauri-apps/api/core';
import { convertJsonToHtml } from './htmlRenderer';

/**
 * Utility to trigger a file download in the browser/Tauri.
 */
export const saveAsFile = (content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Generates the full HTML document string with all resources embedded as Base64.
 * This is the single source of truth for the export design.
 */
export const generateFullHtmlString = async (editor, title, theme = 'light') => {
    if (!editor) return '';

    // Generate HTML from React Components
    const json = editor.getJSON();
    const rawHtml = convertJsonToHtml(json);

    const parser = new DOMParser();
    const virtualDoc = parser.parseFromString(rawHtml, 'text/html');

    // PHASE 1: RESOURCE INJECTION (Base64)
    const mediaElements = virtualDoc.querySelectorAll('img, audio, video');
    for (const el of mediaElements) {
        const src = el.getAttribute('src');
        if (src?.startsWith('attachment://')) {
            const id = src.replace('attachment://', '');
            try {
                const metadata = await attachmentService.getById(id);
                const base64Data = await invoke('get_file_base64', { path: metadata.local_path });
                el.setAttribute('src', `data:${metadata.mime_type};base64,${base64Data}`);
            } catch (e) {
                console.error(`Failed to inject resource ${id}:`, e);
            }
        }
    }

    // PHASE 2: HTML TEMPLATE GENERATION
    const isDark = theme === 'dark';
    const tailwindConfig = `
      tailwind.config = {
          darkMode: 'class',
          theme: { extend: { colors: { primary: '#4f46e5' } } }
      }
    `;

    const globalExportStyles = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      body { 
        font-family: 'Inter', sans-serif; 
        background: ${isDark ? '#101822' : '#f6f7f8'}; 
        padding: 3rem 2rem; 
        color: ${isDark ? '#d4d4d8' : '#374151'}; 
      }
      .export-container { 
          max-width: 850px; margin: 0 auto; background: ${isDark ? '#18181b' : '#ffffff'}; 
          padding: 5rem; border-radius: 2rem; 
          ${!isDark ? 'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);' : 'border: 1px solid #27272a;'}
      }
      .document-title { font-size: 4rem; line-height: 1.1; font-weight: 900; margin-bottom: 1.5rem; color: ${isDark ? '#ffffff' : '#09090b'}; }
      .ProseMirror h1 { color: ${isDark ? '#f4f4f5' : '#18181b'}; }
      .ProseMirror p { color: ${isDark ? '#a1a1aa' : '#3f3f46'}; line-height: 1.8; }
      
      @media print {
          @page { size: A4; margin: 20mm; }
          body { background: white !important; color: black !important; padding: 0 !important; }
          .export-container { box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .export-node { page-break-inside: avoid; }
          .no-print { display: none; }
      }
    `;

    return `
      <!DOCTYPE html>
      <html lang="en" class="${theme}">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <script>${tailwindConfig}</script>
          <style>${globalExportStyles}</style>
      </head>
      <body class="${isDark ? 'dark' : ''}">
          <div class="export-container">
              <header style="margin-bottom: 4rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid ${isDark ? '#27272a' : '#f4f4f5'}; padding-bottom: 1rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em;">From Graphite</span>
                      <span style="font-size: 0.75rem; font-weight: 500; color: #a1a1aa;">${title}</span>
                  </div>
                  <h1 class="document-title">${title}</h1>
                  <div style="width: 200px; background: #4f46e5; height: 6px; border-radius: 99px; margin-top: 2rem;"></div>
              </header>
              <article class="ProseMirror">
                  ${virtualDoc.body.innerHTML}
              </article>
          </div>
      </body>
      </html>
    `;
};