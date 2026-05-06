import { generateFullHtmlString, saveAsFile } from './exportUtils';

export const exportNoteToHtml = async (editor, title = "Graphite_Document", theme = 'light') => {
    const finalHtml = await generateFullHtmlString(editor, title, theme, 'html');
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    saveAsFile(finalHtml, `${safeTitle}.html`, 'text/html');
};