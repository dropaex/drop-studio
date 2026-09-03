import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  colored: boolean;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const LINK_DIST = 150;
    const MOUSE_LINK_DIST = 170;
    const COUNT = Math.max(20, Math.min(65, Math.floor((width * height) / 26000)));

    const dots: Dot[] = Array.from({ length: COUNT }, () => {
      const colored = Math.random() < 0.12;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: colored ? 2 + Math.random() * 1.3 : 1 + Math.random() * 1.1,
        colored,
      };
    });

    let mouseX = -9999;
    let mouseY = -9999;
    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseout', handleLeave);
    window.addEventListener('resize', setSize);

    const isLight = () => document.documentElement.classList.contains('light');

    let rafId = 0;
    const draw = () => {
      const light = isLight();
      const dotRgb = light ? '15,23,42' : '255,255,255';
      // No tema claro, o roxo de destaque também vira cinza escuro
      const accentRgb = light ? '31,41,55' : '139,92,246';

      ctx.clearRect(0, 0, width, height);

      // Move partículas (com "wrap-around" nas bordas)
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -10) d.x = width + 10;
        else if (d.x > width + 10) d.x = -10;
        if (d.y < -10) d.y = height + 10;
        else if (d.y > height + 10) d.y = -10;
      }

      // Linhas entre partículas próximas
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.055;
            ctx.strokeStyle = `rgba(${dotRgb},${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Linhas conectando ao cursor (efeito interativo)
      for (const d of dots) {
        const dxm = d.x - mouseX;
        const dym = d.y - mouseY;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < MOUSE_LINK_DIST) {
          const opacity = (1 - distM / MOUSE_LINK_DIST) * 0.16;
          ctx.strokeStyle = `rgba(${accentRgb},${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      // Pontos
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.colored ? `rgba(${accentRgb},0.4)` : `rgba(${dotRgb},0.18)`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    if (prefersReducedMotion) {
      draw(); // desenha um único quadro estático, sem animar
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
