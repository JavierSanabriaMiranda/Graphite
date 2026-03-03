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
{/* FILA SUPERIOR (Centrada en y=8) */}
    <path d="M4 5l3 3-3 3" />        {/* Chevron > */}
    <path d="M11 8h9" />            {/* Línea de texto */}

    {/* FILA INFERIOR (Centrada en y=16) */}
    <path d="M4 13l3 3-3 3" />       {/* Chevron > */}
    <path d="M11 16h9" />           {/* Línea de texto */}
  </svg>
);