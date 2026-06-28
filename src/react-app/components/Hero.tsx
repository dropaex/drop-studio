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
  const FADE_DURATION = 480;

  let startTime: number | null = null;
  let phase: 'flying' | 'holding' | 'fading' = 'flying';
  let holdStart = 0;
  let scrollTriggered = false;
  let lastScrollY = window.scrollY;

  // Squash durante o scroll — acumula velocidade de scroll
  let scrollVelocity = 0;
  let prevScrollY = window.scrollY;

  function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  // Bolinha simples: círculo sólido roxo com glow, sem gradiente complexo
  function drawOrb(
    x: number, y: number,
    alpha: number,
    rx: number,   // raio X (para squash/stretch)
    ry: number,   // raio Y
    angle = 0
  ) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Glow simples
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#A855F7';

    // Corpo elíptico
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#A855F7';
    ctx.fill();

    // Brilho interno pequeno
    ctx.globalAlpha = alpha * 0.5;
    ctx.fillStyle = '#E9D5FF';
    ctx.beginPath();
    ctx.ellipse(-rx * 0.25, -ry * 0.25, rx * 0.3, ry * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function draw(ts: number) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    ctx.clearRect(0, 0, W, H);

    if (phase === 'flying') {
      const t = Math.min(elapsed / ORB_DURATION, 1);
      const eased = easeOut(t);
      const speed = 1 - t; // 1 no início, 0 no fim

      for (const orb of orbs) {
        orb.x = originX + (orb.tx - originX) * eased;
        orb.y = originY + (orb.ty - originY) * eased;

        const dx = orb.tx - originX;
        const dy = orb.ty - originY;
        const angle = Math.atan2(dy, dx);

        // BASE menor: r=7
        const BASE = 7;
        // Stretch exagerado no voo: eixo longo até 3.5x, eixo curto até 0.4x
        const longAxis  = BASE * (1 + speed * 2.5);
        const shortAxis = BASE * Math.max(0.35, 1 - speed * 0.65);

        drawOrb(orb.x, orb.y, 1, longAxis, shortAxis, angle);
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

      // Velocidade de scroll para squash dinâmico
      const currentScrollY = window.scrollY;
      const rawVel = currentScrollY - prevScrollY;
      prevScrollY = currentScrollY;
      // Suaviza a velocidade
      scrollVelocity += (rawVel - scrollVelocity) * 0.25;

      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Bounce de chegada nos primeiros 500ms
      const bounceT = Math.min(holdElapsed / 500, 1);
      const bounceDecay = 1 - bounceT;
      const bounceOscillate = Math.sin(bounceT * Math.PI * 4) * bounceDecay;

      // BASE menor em hold: r=7
      const BASE = 7;
      // Squash do scroll: quanto mais rápido o scroll, mais achatada verticalmente
      const scrollSquash = Math.abs(scrollVelocity) * 0.18; // exagerado
      const holdRX = BASE * (1.0 + bounceOscillate * 0.8 + scrollSquash);
      const holdRY = BASE * (1.0 - bounceOscillate * 0.5 - scrollSquash * 0.6);

      for (const orb of orbs) {
        orb.y += scrollDelta * 0.07;
        orb.y = Math.max(20, Math.min(H - 20, orb.y));
        drawOrb(orb.x, orb.y, 1, Math.max(3, holdRX), Math.max(3, holdRY));
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
      // Estica verticalmente ao sumir como se estivesse sendo puxada pra baixo
      const BASE = 7;
      const rx = BASE * (1 + t * 0.4);
      const ry = BASE * (1 + t * 3.5);

      for (const orb of orbs) {
        drawOrb(orb.x, orb.y, alpha, rx, ry);
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
        onClick={() => smoothScrollTo('portfolio')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-primary-purple-light hover:text-white transition-colors bg-primary-purple/20 rounded-full p-3"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}