import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import VideoAttachmentView from '../../advanced_blocks/file_attachment/VideoAttachmentView';
import AudioAttachmentView from '../../advanced_blocks/file_attachment/AudioAttachmentView';
import ImageAttachmentView from '../../advanced_blocks/file_attachment/ImageAttachmentView';

/**
 * Helper to apply Tiptap marks (bold, italic, color, font, etc.) to a text node.
 */
const applyMarks = (text, marks) => {
    if (!marks || marks.length === 0) return text;

    return marks.reduce((content, mark) => {
        switch (mark.type) {
            case 'bold':
                return <strong className="font-bold">{content}</strong>;
            case 'italic':
                return <em className="italic">{content}</em>;
            case 'underline':
                return <u className="underline">{content}</u>;
            case 'strike':
                return <s className="line-through">{content}</s>;
            case 'code':
                return <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-500">{content}</code>;
            case 'textStyle':
                // Color and font
                return (
                    <span style={{
                        color: mark.attrs?.color || undefined,
                        fontFamily: mark.attrs?.fontFamily || undefined
                    }}>
                        {content}
                    </span>
                );
            case 'highlight':
                return (
                    <span style={{
                        background: mark.attrs?.color || undefined,
                    }}>
                        {content}
                    </span>
                )
            default:
                return content;
        }
    }, text);
};

/**
 * Maps Tiptap JSON nodes to actual React components.
 * This ensures that the export uses the EXACT same styling as the editor.
 */
const renderNodeToJSX = (node, index, exportFormat) => {
    // Handle Text nodes
    if (node.type === 'text') {
        return <React.Fragment key={index}>{applyMarks(node.text, node.marks)}</React.Fragment>;
    }

    // Callout
    if (node.type === 'callout') {
        const emojiValue = node.attrs.emoji || '💡';
        // Is an svg or an emoji
        const isSvg = emojiValue.length > 10 || emojiValue.includes('M');

        // Process children
        const children = node.content ? node.content.map((child, i) => renderNodeToJSX(child, i, exportFormat)) : null;

        return (
            <div
                key={index}
                className="flex gap-3 p-4 my-4 rounded-xl bg-gray-200/50 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 items-start export-node"
            >
                {/* Emoji container */}
                <div className="text-2xl mt-1 select-none shrink-0 text-zinc-800 dark:text-zinc-100">
                    {isSvg ? (
                        <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d={emojiValue} />
                        </svg>
                    ) : (
                        <span style={{ fontFamily: 'var(--font-emoji)' }}>{emojiValue}</span>
                    )}
                </div>

                {/* Content container */}
                <div className="flex-1 min-w-0 prose-compact">
                    {children}
                </div>
            </div>
        );
    }

    // Alignment
    const textAlignClass = node.attrs?.textAlign ? `text-${node.attrs.textAlign}` : '';

    // Handle Custom Attachment Nodes
    if (node.type === 'attachment') {
        const { attrs } = node;
        const isVideo = attrs.mimeType?.startsWith('video/');
        const isAudio = attrs.mimeType?.startsWith('audio/');
        const isImage = attrs.mimeType?.startsWith('image/');

        if (exportFormat === 'pdf' && (isVideo || isAudio)) {
            return null;
        }

        // We pass "isExporting={true}" so the component can hide interactive 
        // elements like resize handles or download buttons if needed.
        if (isVideo) return (
            <div key={index} className="export-node">
                <VideoAttachmentView
                    {...attrs}
                    url={`attachment://${attrs.attachmentId}`}
                    isExporting={true}
                />
            </div>
        );

        if (isAudio) return (
            <div key={index} className="export-node">
                <AudioAttachmentView
                    {...attrs}
                    url={`attachment://${attrs.attachmentId}`}
                    isExporting={true}
                />
            </div>
        );

        if (isImage) return (
            <div key={index} className="export-node">
                <ImageAttachmentView
                    {...attrs}
                    url={`attachment://${attrs.attachmentId}`}
                    isExporting={true}
                />
            </div>
        );
    }

    // Handle Standard HTML tags (Recursive)
    const children = node.content ? node.content.map((child, i) => renderNodeToJSX(child, i, exportFormat)) : null;

    switch (node.type) {
        case 'paragraph':
            return <p key={index} className={`mb-4 leading-relaxed ${textAlignClass}`}>{children}</p>;
        case 'heading': {
            const Tag = `h${node.attrs.level}`;
            const levels = {
                1: "text-4xl font-black mb-6 mt-8 tracking-tight",
                2: "text-3xl font-bold mb-4 mt-6",
                3: "text-2xl font-bold mb-3 mt-4"
            };
            return <Tag key={index} className={`${levels[node.attrs.level] || ''} ${textAlignClass}`}>{children}</Tag>;
        }
        case 'bulletList':
            return <ul key={index} className="list-disc ml-6 mb-4 space-y-2">{children}</ul>;

        case 'orderedList':
            return <ol key={index} className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>;

        case 'listItem':
            return <li key={index} className="pl-1">{children}</li>;

        case 'blockquote':
            return <blockquote key={index} className="border-l-4 border-primary-500 pl-4 italic my-4 text-zinc-600 dark:text-zinc-400">{children}</blockquote>;

        default:
            return <div key={index} className={textAlignClass}>{children}</div>;
    }
};

/**
 * Main function to convert Tiptap JSON to a static HTML string using React.
 */
export const convertJsonToHtml = (json, exportFormat) => {
    const jsxContent = json.content.map((node, i) => renderNodeToJSX(node, i, exportFormat));
    // renderToStaticMarkup transforms JSX into a plain HTML string
    return renderToStaticMarkup(<>{jsxContent}</>);
};