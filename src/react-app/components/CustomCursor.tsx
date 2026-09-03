import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Só ativa em dispositivos com ponteiro de precisão (mouse/trackpad)
    const isPrecisionPointer = window.matchMedia('(pointer: fine)').matches;
    if (!isPrecisionPointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const revealCursor = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      revealCursor();

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('a, button, [data-cursor-hover], input, textarea, select');
      ring.classList.toggle('is-hovering', isInteractive);
    };

    const handleWindowOut = (e: MouseEvent) => {
      // Só esconde quando o mouse realmente sai da janela do navegador
      if (!e.relatedTarget && !(e as any).toElement) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
    };

    const animate = () => {
      // Suaviza o movimento do anel (o ponto segue o mouse direto, o anel "arrasta" atrás)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseout', handleWindowOut);
    document.addEventListener('visibilitychange', handleVisibility);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('mouseout', handleWindowOut);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Sempre renderiza os elementos (começam invisíveis via CSS opacity:0).
  // Isso garante que dotRef/ringRef já existam no DOM quando o efeito acima
  // rodar pela primeira vez — antes, eles só eram criados depois de um estado
  // ser atualizado, e o efeito de rastreamento rodava cedo demais, contra
  // elementos que ainda não existiam, deixando o cursor "conectado a nada".
  return createPortal(
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>,
    document.body
  );
}
