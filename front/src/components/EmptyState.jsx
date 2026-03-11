import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ onCreateNote }) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden bg-main-bg">
      
      {/* LOGO DE FONDO (Watermark con PNG Mask desde /public) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none p-10">
        <div 
          className="w-full h-full max-w-lg max-h-96 opacity-[0.04] dark:opacity-[0.03] transition-colors duration-500 bg-zinc-900 dark:bg-zinc-100"
          style={{
            // Referenciamos directamente a la raíz de public
            maskImage: 'url(/app_icon.png)',
            WebkitMaskImage: 'url(/app_icon.png)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center'
          }}
        />
      </div>

      {/* CONTENIDO DEL FRONT */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 px-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2 opacity-80">
          {t('editor.empty_state.title') || 'Graphite'}
        </h3>
        
        <p className="text-zinc-500 dark:text-zinc-500 text-sm max-w-70 text-center mb-8 italic">
            {t('editor.empty_state.description') || 'Selecciona una nota para empezar a escribir'}
        </p>

        <button
          onClick={onCreateNote}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-text-primary hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-medium rounded-xl transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm"
        >
          <Plus className="w-4 h-4 text-primary" />
          {t('sidebar.new_note')}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;