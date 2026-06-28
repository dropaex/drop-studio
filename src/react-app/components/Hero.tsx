import { ChevronDown, ArrowRight } from 'lucide-react';

function smoothScrollTo(id: string) {
  const lenis = (window as any).__lenis__;
  const element = document.getElementById(id);
  if (!element) return;

  if (lenis) {
    lenis.scrollTo(element, {
      offset: -80,
      duration: 2.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function launchOrbsAndScroll(
  e: React.MouseEvent<HTMLButtonElement>,
  targetId: string
) {
  const btn = e.currentTarget.getBoundingClientRect();
  const originX = btn.left + btn.width / 2;
  const originY = btn.top + btn.height / 2;

  const W = window.innerWidth;
  const H = window.innerHeight;

  // Dois cantos: top-left e top-right
  const corners = [
    { tx: 0, ty: 0 },
    { tx: W, ty: 0 },
  ];

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 9999;
  `;
  canvas.width = W;
  canvas.height = H;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Estado das bolinhas
  const orbs = corners.map((c) => ({
    x: originX,
    y: originY,
    tx: c.tx,
    ty: c.ty,
    progress: 0,
  }));

  // Skew na página
  const appEl = document.getElementById('root') as HTMLElement;
  let skewProgress = 0; // 0 → 1 → 0
  let phase: 'skewIn' | 'hold' | 'skewOut' | 'done' = 'skewIn';
  const MAX_SKEW = 8; // graus
  let scrollTriggered = false;

  let animId: number;
  let startTime: number | null = null;
  const ORB_DURATION = 700; // ms para as bolinhas chegarem aos cantos
  const HOLD_DURATION = 200; // ms segurando nos cantos
  const SKEW_IN = 250;
  const SKEW_OUT = 350;

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function draw(ts: number) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;

    ctx.clearRect(0, 0, W, H);

    // --- Bolinhas ---
    const orbT = Math.min(elapsed / ORB_DURATION, 1);
    const orbEased = easeInOut(orbT);

    for (const orb of orbs) {
      orb.progress = orbEased;
      const cx = originX + (orb.tx - originX) * orbEased;
      const cy = originY + (orb.ty - originY) * orbEased;

      // Trilha
      const trail = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      trail.addColorStop(0, 'rgba(168,85,247,0.18)');
      trail.addColorStop(1, 'rgba(168,85,247,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fillStyle = trail;
      ctx.fill();

      // Glow externo
      ctx.save();
      ctx.shadowBlur = 60;
      ctx.shadowColor = '#9333EA';
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      grad.addColorStop(0, '#E879F9');
      grad.addColorStop(0.4, '#A855F7');
      grad.addColorStop(1, '#6366F1');
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Brilho interno
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(cx - 6, cy - 6, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // --- Skew na página ---
    if (phase === 'skewIn') {
      skewProgress = Math.min(elapsed / SKEW_IN, 1);
      const skewDeg = easeInOut(skewProgress) * MAX_SKEW;
      appEl.style.transform = `skewX(${skewDeg}deg)`;
      appEl.style.transition = 'none';
      if (skewProgress >= 1) {
        phase = 'hold';
        startTime = ts; // reset timer para hold
      }
    } else if (phase === 'hold') {
      const holdElapsed = ts - startTime;

      // Dispara scroll no meio do hold
      if (!scrollTriggered && holdElapsed > HOLD_DURATION * 0.3) {
        scrollTriggered = true;
        smoothScrollTo(targetId);
      }

      if (holdElapsed >= HOLD_DURATION) {
        phase = 'skewOut';
        startTime = ts;
      }
    } else if (phase === 'skewOut') {
      const outElapsed = ts - startTime;
      skewProgress = 1 - Math.min(outElapsed / SKEW_OUT, 1);
      const skewDeg = easeInOut(skewProgress) * MAX_SKEW;
      appEl.style.transform = `skewX(${skewDeg}deg)`;
      if (skewProgress <= 0) {
        appEl.style.transform = '';
        phase = 'done';
      }
    }

    // Fade out das bolinhas quando chegam ao canto
    if (orbT >= 1) {
      // Pulsa nos cantos enquanto faz skew
      for (const orb of orbs) {
        const pulse = 1 + 0.2 * Math.sin(ts * 0.01);
        const cx = orb.tx === 0 ? 22 : W - 22;
        const cy = 22;

        ctx.save();
        ctx.shadowBlur = 80;
        ctx.shadowColor = '#9333EA';
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22 * pulse);
        grad.addColorStop(0, '#E879F9');
        grad.addColorStop(0.4, '#A855F7');
        grad.addColorStop(1, '#6366F1');
        ctx.beginPath();
        ctx.arc(cx, cy, 22 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    }

    if (phase !== 'done') {
      animId = requestAnimationFrame(draw);
    } else {
      // Fade out bolinhas
      let fadeAlpha = 1;
      function fadeOut(ts2: number) {
        ctx.clearRect(0, 0, W, H);
        fadeAlpha -= 0.06;
        if (fadeAlpha > 0) {
          for (const orb of orbs) {
            const cx = orb.tx === 0 ? 22 : W - 22;
            const cy = 22;
            ctx.save();
            ctx.globalAlpha = fadeAlpha;
            ctx.shadowBlur = 60;
            ctx.shadowColor = '#9333EA';
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
            grad.addColorStop(0, '#E879F9');
            grad.addColorStop(1, '#6366F1');
            ctx.beginPath();
            ctx.arc(cx, cy, 22, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
          }
          requestAnimationFrame(fadeOut);
        } else {
          document.body.removeChild(canvas);
        }
      }
      requestAnimationFrame(fadeOut);
      cancelAnimationFrame(animId);
    }
  }

  animId = requestAnimationFrame(draw);
}

function applyClickSkew(e: React.MouseEvent<HTMLButtonElement>, targetId: string) {
  launchOrbsAndScroll(e, targetId);
}

export default function Hero() {
  const handlePortfolio = (e: React.MouseEvent<HTMLButtonElement>) => {
    applyClickSkew(e, 'portfolio');
  };

  const handleContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    applyClickSkew(e, 'contato');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-4 animate-scale-in relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-purple via-primary-blue to-primary-purple-light rounded-3xl opacity-30 blur-2xl animate-glow-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary-purple/20 to-primary-purple-light/20 rounded-2xl p-6 shadow-2xl shadow-primary-purple/30">
                <img
                  src="https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/imagem_2025-10-09_235545032-remov111ebg-previe1w-(1).png"
                  alt="Drop Studio"
                  className="h-40 md:h-64 w-auto hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <p className="text-xl text-white max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Especialista em animação 2D, rigging e motion design profissional
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={handlePortfolio}
              className="group relative bg-gradient-to-r from-primary-purple to-primary-purple-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-purple/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">Ver Portfólio</span>
              <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleContact}
              className="relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-purple/20 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => applyClickSkew(e, 'portfolio')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-primary-purple-light hover:text-white transition-colors bg-primary-purple/20 rounded-full p-3"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}