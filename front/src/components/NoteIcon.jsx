
/**
 * Component that represents the icon of a page
 * 
 * @param {String} iconChar - Represents the icon that can be an emoji (single char) or an icon (svg path) 
 * @param {String} className - String to represent the style of the NoteIcon
 */
const NoteIcon = ({ iconChar, className = "w-full h-full" }) => {
  if (!iconChar) return null;

  // Detect if it's a SVG path
  const isSvgPath = iconChar.length > 10 && (iconChar.startsWith('m') || iconChar.startsWith('M'));

  if (isSvgPath) {
    return (
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
      >
        <path d={iconChar} />
      </svg>
    );
  }

  // If it's not a path, we use an Emoji (plain text)
  return (
    <span style={{ fontFamily: 'var(--font-emoji)' }} className={className + " flex items-center justify-center"}>
      {iconChar}
    </span>
  );
};

export default NoteIcon;