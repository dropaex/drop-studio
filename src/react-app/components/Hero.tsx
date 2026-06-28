import { useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

function smoothScrollTo(id: string) {
  const lenis = (window as any).__lenis__;
  const element = document.getElementById(id);
  if (!element) return;
  if (lenis) {
    lenis.scrollTo(element, {
      offset: -80,
      duration: 2.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function launchOrbsAndScroll(
  btnEl: HTMLButtonElement,
  targetId: string
) {
  const btnRect = btnEl.getBoundingClientRect();
  const originX = btnRect.left + btnRect.width / 2;
  const originY = btnRect.top + btnRect.height / 2;
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Skew só no botão
  btnEl.style.transition = 'transform 0.25s ease';
  btnEl.style.transform = 'skewX(12deg) scale(0.96)';
  setTimeout(() => {
    btnEl.style.transform = 'skewX(-6deg) scale(1.02)';
    setTimeout(() => {
      btnEl.style.transform = '';
      btnEl.style.transition = '';
    }, 300);
  }, 250);

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none; z-index: 9999;
  `;
  canvas.width = W;
  canvas.height = H;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const corners = [
    { tx: 30, ty: 30 },
    { tx: W - 30, ty: 30 },
  ];

  const orbs = corners.map((c) => ({
    x: originX,
    y: originY,
    tx: c.tx,
    ty: c.ty,
    arrived: false,
  }));

  const ORB_DURATION = 600;
  const HOLD_DURATION = 400;
  let startTime: number | null = null;
  let phase: 'flying' | 'holding' | 'releasing' = 'flying';
  let holdStart = 0;
  let scrollTriggered = false;

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function drawOrb(x: number, y: number, alpha = 1, scale = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 50;
    ctx.shadowColor = '#9333EA';
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 18 * scale);
    grad.addColorStop(0, '#F0ABFC');
    grad.addColorStop(0.4, '#A855F7');
    grad.addColorStop(1, '#6366F1');
    ctx.beginPath();
    ctx.arc(x, y, 18 * scale, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    // Brilho interno
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 5 * scale, y - 5 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number, alpha: number) {
    ctx.save();
    ctx.globalAlpha = alpha;
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, '#E879F9');
    grad.addColorStop(0.5, '#A855F7');
    grad.addColorStop(1, '#6366F1');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#9333EA';
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  function draw(ts: number) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    ctx.clearRect(0, 0, W, H);

    if (phase === 'flying') {
      const t = Math.min(elapsed / ORB_DURATION, 1);
      const eased = easeInOut(t);

      for (const orb of orbs) {
        const cx = originX + (orb.tx - originX) * eased;
        const cy = originY + (orb.ty - originY) * eased;

        // Linha do centro do botão até a bolinha
        drawLine(originX, originY, cx, cy, eased * 0.8);
        drawOrb(cx, cy);
      }

      if (t >= 1) {
        phase = 'holding';
        holdStart = ts;
        orbs.forEach((o) => { o.arrived = true; });
      }
    } else if (phase === 'holding') {
      const holdElapsed = ts - holdStart;
      const pulse = 1 + 0.15 * Math.sin(holdElapsed * 0.015);
      const lineAlpha = 0.8 - (holdElapsed / HOLD_DURATION) * 0.3;

      for (const orb of orbs) {
        // Linha ficando mais "esticada" e brilhante
        drawLine(originX, originY, orb.tx, orb.ty, lineAlpha);
        drawOrb(orb.tx, orb.ty, 1, pulse);
      }

      if (!scrollTriggered && holdElapsed > HOLD_DURATION * 0.4) {
        scrollTriggered = true;
        smoothScrollTo(targetId);
      }

      if (holdElapsed >= HOLD_DURATION) {
        phase = 'releasing';
        startTime = ts;
      }
    } else if (phase === 'releasing') {
      const t = Math.min((ts - startTime) / 400, 1);
      const alpha = 1 - easeInOut(t);

      for (const orb of orbs) {
        // Linha "soltando" — encolhe de volta para o botão
        const lineEndX = orb.tx + (originX - orb.tx) * easeInOut(t);
        const lineEndY = orb.ty + (originY - orb.ty) * easeInOut(t);
        drawLine(originX, originY, lineEndX, lineEndY, alpha * 0.8);
        drawOrb(orb.tx, orb.ty, alpha, 1 + t * 0.5);
      }

      if (t >= 1) {
        document.body.removeChild(canvas);
        return;
      }
    }

    requestAnimationFrame(draw);
  }

  let animId = requestAnimationFrame(draw);
  void animId;
}

export default function Hero() {
  const portfolioBtnRef = useRef<HTMLButtonElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  const handlePortfolio = () => {
    if (portfolioBtnRef.current) launchOrbsAndScroll(portfolioBtnRef.current, 'portfolio');
  };

  const handleContact = () => {
    if (contactBtnRef.current) launchOrbsAndScroll(contactBtnRef.current, 'contato');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 relative z-10">
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
              ref={portfolioBtnRef}
              onClick={handlePortfolio}
              className="group relative bg-gradient-to-r from-primary-purple to-primary-purple-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-purple/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">Ver Portfólio</span>
              <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              ref={contactBtnRef}
              onClick={handleContact}
              className="relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-purple/20 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
    smoothScrollTo('portfolio');
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-primary-purple-light hover:text-white transition-colors bg-primary-purple/20 rounded-full p-3"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}