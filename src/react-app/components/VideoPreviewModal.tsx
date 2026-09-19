import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface PreviewProject {
  title: string;
  video?: string;
  isLocalVideo?: boolean;
}

interface VideoPreviewModalProps {
  project: PreviewProject;
  origin: { x: number; y: number };
  onClose: () => void;
}

export default function VideoPreviewModal({ project, origin, onClose }: VideoPreviewModalProps) {
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setShowContent(false);
    setExpanded(false);
    setTimeout(onClose, 450);
  };

  useEffect(() => {
    // Espera um frame antes de expandir, pra garantir que o estado "fechado"
    // (bolinha no ponto do clique) seja pintado primeiro e a transição rode.
    const rafId = requestAnimationFrame(() => setExpanded(true));
    // O conteúdo (título + vídeo) só aparece depois que a caixa termina de crescer
    const contentTimer = setTimeout(() => setShowContent(true), 420);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(contentTimer);
      document.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const boxStyle: CSSProperties = expanded
    ? {
        top: '50%',
        left: '50%',
        width: 'min(92vw, 920px)',
        height: 'min(82vh, 560px)',
        borderRadius: '1.25rem',
        transform: 'translate(-50%, -50%)',
      }
    : {
        top: origin.y,
        left: origin.x,
        width: '12px',
        height: '12px',
        borderRadius: '9999px',
        transform: 'translate(-50%, -50%)',
      };

  return createPortal(
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true" aria-label={`Prévia: ${project.title}`}>
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-500 ${
          expanded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* "Bolha" que nasce no ponto do clique e vira o container do player */}
      <div
        style={boxStyle}
        className="fixed overflow-hidden shadow-2xl shadow-black/50 bg-gradient-to-br from-primary-purple via-primary-purple via-35% to-primary-blue transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
      >
        {showContent && !closing && (
          <div className="absolute inset-[2px] rounded-[1.1rem] bg-ink-950 flex flex-col overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10 bg-ink-900/80 flex-shrink-0">
              <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                {project.title} <span className="text-white/50 font-normal hidden sm:inline">— prévia da edição</span>
              </h3>
              <button
                onClick={handleClose}
                data-cursor-hover
                aria-label="Fechar prévia"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
              {project.isLocalVideo ? (
                <video
                  src={project.video}
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={project.video}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
