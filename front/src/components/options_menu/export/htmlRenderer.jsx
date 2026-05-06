import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import VideoAttachmentView from '../../advanced_blocks/file_attachment/VideoAttachmentView';
import AudioAttachmentView from '../../advanced_blocks/file_attachment/AudioAttachmentView';
import ImageAttachmentView from '../../advanced_blocks/file_attachment/ImageAttachmentView';

/**
 * Maps Tiptap JSON nodes to actual React components.
 * This ensures that the export uses the EXACT same styling as the editor.
 */
const renderNodeToJSX = (node, index) => {
    // Handle Text nodes
    if (node.type === 'text') {
        return node.text;
    }

    // Handle Custom Attachment Nodes
    if (node.type === 'attachment') {
        const { attrs } = node;
        const isVideo = attrs.mimeType?.startsWith('video/');
        const isAudio = attrs.mimeType?.startsWith('audio/');
        const isImage = attrs.mimeType?.startsWith('image/');

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
    const children = node.content ? node.content.map((child, i) => renderNodeToJSX(child, i)) : null;

    switch (node.type) {
        case 'paragraph': return <p key={index}>{children}</p>;
        case 'heading': {
            const Tag = `h${node.attrs.level}`;
            return <Tag key={index}>{children}</Tag>;
        }
        case 'bulletList': return <ul key={index}>{children}</ul>;
        case 'orderedList': return <ol key={index}>{children}</ol>;
        case 'listItem': return <li key={index}>{children}</li>;
        case 'blockquote': return <blockquote key={index}>{children}</blockquote>;
        case 'bold': return <strong key={index}>{children}</strong>;
        // Add more Tiptap nodes here as needed
        default: return <div key={index}>{children}</div>;
    }
};

/**
 * Main function to convert Tiptap JSON to a static HTML string using React.
 */
export const convertJsonToHtml = (json) => {
    const jsxContent = json.content.map((node, i) => renderNodeToJSX(node, i));
    // renderToStaticMarkup transforms JSX into a plain HTML string
    return renderToStaticMarkup(<>{jsxContent}</>);
};