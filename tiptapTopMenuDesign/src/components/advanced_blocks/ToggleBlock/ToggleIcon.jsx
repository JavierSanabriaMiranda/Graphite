export const ToggleIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Top row */}
    <path d="M4 5l3 3-3 3" />        {/* Chevron > */}
    <path d="M11 8h9" />            {/* Text line */}

    {/* Bottom row */}
    <path d="M4 13l3 3-3 3" />       {/* Chevron > */}
    <path d="M11 16h9" />           {/* Text line */}
  </svg>
);