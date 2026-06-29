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

function launchOrbsAndScroll(btnEl: HTMLButtonElement, targetId: string) {
  const btnRect = btnEl.getBoundingClientRect();
  const originX = btnRect.left + btnRect.width / 2;
  const originY = btnRect.top + btnRect.height / 2;
  const W = window.innerWidth;
  const H = window.innerHeight;

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

  const targets = [
    { x: W * 0.06, y: H * 0.44 },
    { x: W * 0.94, y: H * 0.44 },
  ];

  const orbs = targets.map((t) => ({
    x: originX,
    y: originY,
    tx: t.x,
    ty: t.y,
    scale: 1,
  }));

  const ORB_DURATION  = 520;
  const HOLD_DURATION = 1800;
  const FADE_DURATION = 220;

  let startTime: number | null = null;
  let phase: 'flying' | 'holding' | 'fading' = 'flying';
  let holdStart = 0;
  let scrollTriggered = false;
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let prevScrollY = window.scrollY;

  function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  function drawOrb(
    x: number, y: number,
    alpha: number,
    rx: number,
    ry: number,
    angle = 0,
    anchorOffsetX = 0,
    wobble = 0   // tempo em ms para animação orgânica
  ) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x - anchorOffsetX, y);
    ctx.rotate(angle);
    ctx.translate(anchorOffsetX, 0);

    // Forma da bolha com wobble orgânico (distorção senoidal nas bordas)
    ctx.beginPath();
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      // Wobble: ondas de frequência baixa para simular tensão superficial
      const w1 = Math.sin(a * 2 + wobble * 0.003) * 0.06;
      const w2 = Math.sin(a * 3 - wobble * 0.002) * 0.04;
      const w3 = Math.sin(a * 5 + wobble * 0.004) * 0.025;
      const wFactor = 1 + w1 + w2 + w3;
      const px = Math.cos(a) * rx * wFactor;
      const py = Math.sin(a) * ry * wFactor;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    // Glow externo roxo forte antes de tudo
    ctx.shadowBlur = 35;
    ctx.shadowColor = `rgba(147,51,234,${alpha * 0.95})`;

    // Interior — gradiente roxo mais rico e visível
    const fill = ctx.createRadialGradient(rx * 0.15, -ry * 0.25, 0, 0, 0, Math.max(rx, ry) * 1.1);
    fill.addColorStop(0,   `rgba(233,213,255,${alpha * 0.22})`); // lavanda claro
    fill.addColorStop(0.3, `rgba(192,132,252,${alpha * 0.15})`); // roxo médio
    fill.addColorStop(0.7, `rgba(147,51,234,${alpha * 0.12})`);  // roxo forte
    fill.addColorStop(1,   `rgba(88,28,135,${alpha * 0.20})`);   // roxo escuro na borda interna
    ctx.fillStyle = fill;
    ctx.fill();

    // Borda roxa brilhante — mais espessa e saturada
    ctx.shadowBlur = 28;
    ctx.shadowColor = `rgba(167,139,250,${alpha})`;
    const stroke = ctx.createLinearGradient(-rx, -ry, rx, ry);
    stroke.addColorStop(0,    `rgba(245,208,254,${alpha})`);     // pink-roxo topo
    stroke.addColorStop(0.2,  `rgba(192,132,252,${alpha})`);     // roxo claro
    stroke.addColorStop(0.45, `rgba(147,51,234,${alpha})`);      // roxo puro
    stroke.addColorStop(0.6,  `rgba(109,40,217,${alpha})`);      // roxo escuro
    stroke.addColorStop(0.8,  `rgba(167,139,250,${alpha})`);     // lilás
    stroke.addColorStop(1,    `rgba(245,208,254,${alpha})`);     // volta pink-roxo
    ctx.strokeStyle = stroke;
    ctx.lineWidth = Math.max(rx, ry) * 0.16;
    ctx.stroke();

    // Reflexo principal — brilho branco-lilás topo-esquerdo
    ctx.shadowBlur = 0;
    const refX = -rx * 0.3;
    const refY = -ry * 0.32;
    const refGrad = ctx.createRadialGradient(refX, refY, 0, refX, refY, rx * 0.42);
    refGrad.addColorStop(0,   `rgba(255,255,255,${alpha * 0.92})`);
    refGrad.addColorStop(0.35,`rgba(233,213,255,${alpha * 0.35})`);
    refGrad.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = refGrad;
    ctx.beginPath();
    ctx.ellipse(refX, refY, rx * 0.42, ry * 0.3, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Reflexo secundário inferior-direito levemente roxo
    const ref2X = rx * 0.28;
    const ref2Y = ry * 0.35;
    const refGrad2 = ctx.createRadialGradient(ref2X, ref2Y, 0, ref2X, ref2Y, rx * 0.22);
    refGrad2.addColorStop(0,   `rgba(216,180,254,${alpha * 0.65})`);
    refGrad2.addColorStop(1,   'rgba(216,180,254,0)');
    ctx.fillStyle = refGrad2;
    ctx.beginPath();
    ctx.ellipse(ref2X, ref2Y, rx * 0.22, ry * 0.14, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Brilho de estrela no topo (sparkle)
    const spX = -rx * 0.18;
    const spY = -ry * 0.42;
    const spSize = Math.max(rx, ry) * 0.13;
    ctx.save();
    ctx.globalAlpha = alpha * 0.9;
    ctx.strokeStyle = `rgba(255,255,255,0.95)`;
    ctx.lineWidth = spSize * 0.22;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(216,180,254,1)';
    // cruz de 4 pontas
    for (let s = 0; s < 2; s++) {
      ctx.beginPath();
      ctx.save();
      ctx.translate(spX, spY);
      ctx.rotate(s * Math.PI / 4);
      ctx.moveTo(0, -spSize);
      ctx.lineTo(0,  spSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-spSize, 0);
      ctx.lineTo( spSize, 0);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    ctx.restore();
  }

  function draw(ts: number) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    ctx.clearRect(0, 0, W, H);

    if (phase === 'flying') {
      const t = Math.min(elapsed / ORB_DURATION, 1);
      const eased = easeOut(t);
      const speed = 1 - t;

      for (const orb of orbs) {
        orb.x = originX + (orb.tx - originX) * eased;
        orb.y = originY + (orb.ty - originY) * eased;
        const dx = orb.tx - originX;
        const dy = orb.ty - originY;
        const angle = Math.atan2(dy, dx);
        const BASE = 11;
        const longAxis  = BASE * (1 + speed * 2.5);
        const shortAxis = BASE * Math.max(0.35, 1 - speed * 0.65);
        drawOrb(orb.x, orb.y, 1, longAxis, shortAxis, angle, 0, elapsed);
      }

      if (t >= 1) {
        phase = 'holding';
        holdStart = ts;
        lastScrollY = window.scrollY;
        prevScrollY = window.scrollY;
      }

    } else if (phase === 'holding') {
      const holdElapsed = ts - holdStart;
      const holdT = holdElapsed / HOLD_DURATION;
      const currentScrollY = window.scrollY;
      const rawVel = currentScrollY - prevScrollY;
      prevScrollY = currentScrollY;
      scrollVelocity += (rawVel - scrollVelocity) * 0.25;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      const bounceT = Math.min(holdElapsed / 500, 1);
      const bounceDecay = 1 - bounceT;
      const bounceOscillate = Math.sin(bounceT * Math.PI * 4) * bounceDecay;
      const BASE = 11;
      const scrollStretch = Math.abs(scrollVelocity) * 0.22;
      const holdRX = BASE * Math.max(0.75, 1.0 + bounceOscillate * 0.8 - scrollStretch * 0.18);
      const holdRY = BASE * Math.max(0.75, 1.0 - bounceOscillate * 0.5 + scrollStretch * 0.18);

      for (const orb of orbs) {
        orb.y += scrollDelta * 0.07;
        orb.y = Math.max(20, Math.min(H - 20, orb.y));
        const isLeft = orb.tx < W / 2;
        const anchorOffsetX = isLeft ? holdRX : -holdRX;
        drawOrb(orb.x - anchorOffsetX + anchorOffsetX, orb.y, 1, Math.max(3, holdRX), Math.max(3, holdRY), 0, isLeft ? holdRX : -holdRX, holdElapsed);
      }

      if (!scrollTriggered && holdElapsed > 100) {
        scrollTriggered = true;
        smoothScrollTo(targetId);
      }

      if (holdT >= 1) {
        phase = 'fading';
        startTime = ts;
      }

    } else if (phase === 'fading') {
      const t = Math.min((ts - startTime) / FADE_DURATION, 1);
      const alpha = 1 - easeInOut(t);
      const BASE = 11;
      for (const orb of orbs) {
        drawOrb(orb.x, orb.y, alpha, BASE, BASE, 0, 0, ts);
      }
      if (t >= 1) {
        document.body.removeChild(canvas);
        return;
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

export default function Hero() {
  const portfolioBtnRef = useRef<HTMLButtonElement>(null);
  const contactBtnRef   = useRef<HTMLButtonElement>(null);

  const handlePortfolio = () => {
    if (portfolioBtnRef.current) launchOrbsAndScroll(portfolioBtnRef.current, 'portfolio');
  };

  const handleContact = () => {
    if (contactBtnRef.current) launchOrbsAndScroll(contactBtnRef.current, 'contato');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 relative z-10">

          {/* Logo — flutuando, sem caixa */}
          <div className="flex justify-center mb-4 animate-scale-in">
            {/* wrapper com padding generoso para o glow não ser cortado */}
            <div
              className="animate-float group cursor-pointer p-10"
              style={{ display: 'inline-block' }}
            >
              <img
                src="/logo.png"
                alt="Drop Studio"
                className="h-56 md:h-80 w-auto transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.65)) drop-shadow(0 0 12px rgba(168,85,247,0.35))',
                  display: 'block',
                }}
              />
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
        onClick={() => smoothScrollTo('portfolio')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-primary-purple-light hover:text-white transition-colors bg-primary-purple/20 rounded-full p-3"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}