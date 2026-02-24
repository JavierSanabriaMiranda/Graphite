import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

const CodeBlockComponent = ({ node: { attrs: { language } }, updateAttributes, extension }) => {
  // Supported languages for syntax highlighting, obtained from the lowlight instance of the CodeBlockLowlight extension
  const languages = extension.options.lowlight.listLanguages();

  const languageNames = {
    'cpp': 'C++',
    'java': 'Java',
    'javascript': 'JavaScript',
    'python': 'Python',
    'html': 'HTML',
    'bash': 'Bash',
  };

  return (
    <NodeViewWrapper className="relative group my-6">
      {/* Language selector */}
      <select
        contentEditable={false}
        value={language || ''} 
        onChange={event => {
          const val = event.target.value;
          updateAttributes({ language: val === '' ? null : val });
        }}
        className="absolute right-3 top-3 z-10 p-1.5 text-xs font-sans font-medium bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer outline-none hover:bg-hover-primary-bg dark:hover:text-white dark:hover:bg-zinc-700"
      >
        <option value="null">Auto-detect</option>
        <option disabled>—</option>
        {languages.map((lang, index) => (
          <option key={index} value={lang}>
            {languageNames[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>

      {/* Code area */}
      <pre className="rounded-xl overflow-hidden shadow-2xs bg-zinc-950 p-5 pt-12 font-mono text-sm leading-relaxed">
        <NodeViewContent as="code" className={`language-${language}`} />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;