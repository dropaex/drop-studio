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

  // Posições finais nos cantos (fixas na tela)
  const targets = [
    { x: W * 0.08, y: H * 0.42 },   // lateral-esquerda
    { x: W * 0.92, y: H * 0.42 },   // lateral-direita
  ];

  // Estado das bolinhas
  const orbs = targets.map((t) => ({
    x: originX,
    y: originY,
    tx: t.x,
    ty: t.y,
    scale: 1,
    alpha: 1,
  }));

  const ORB_DURATION  = 550;   // ms voando até o canto
  const HOLD_DURATION = 1800;  // ms ficando nos cantos (acompanha scroll)
  const FADE_DURATION = 500;   // ms sumindo

  let startTime: number | null = null;
  let phase: 'flying' | 'holding' | 'fading' = 'flying';
  let holdStart = 0;
  let scrollTriggered = false;

  // Scroll acumulado durante o hold, para acompanhar a página
  let lastScrollY = window.scrollY;

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // angle: direção do movimento (em radianos) para squash & stretch
  // stretchX: quanto esticar no eixo do movimento (>1 = oval no sentido do voo)
  // stretchY: quanto achatar perpendicular
  function drawOrb(x: number, y: number, alpha: number, scale: number, angle = 0, stretchX = 1, stretchY = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.shadowBlur = 55;
    ctx.shadowColor = '#9333EA';

    // Glow externo — esticado na direção do movimento
    ctx.save();
    ctx.scale(stretchX, stretchY);
    const glowR = 28 * scale;
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
    glow.addColorStop(0,   'rgba(168,85,247,0.4)');
    glow.addColorStop(0.5, 'rgba(99,102,241,0.15)');
    glow.addColorStop(1,   'rgba(99,102,241,0)');
    ctx.beginPath();
    ctx.arc(0, 0, glowR, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Corpo — oval no sentido do voo
    const r = 12 * scale;
    const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
    grad.addColorStop(0,   '#F0ABFC');
    grad.addColorStop(0.4, '#A855F7');
    grad.addColorStop(1,   '#6366F1');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Brilho interno (não esticado, fica circular)
    ctx.globalAlpha = alpha * 0.65;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-3 * scale, -3 * scale, 3 * scale, 0, Math.PI * 2);
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
      // Velocidade normalizada para calcular o stretch (mais rápido = mais oval)
      const speed = Math.max(0, 1 - t); // desacelera no final

      for (const orb of orbs) {
        orb.x = originX + (orb.tx - originX) * eased;
        orb.y = originY + (orb.ty - originY) * eased;
        orb.scale = 1 + 1.2 * eased;

        // Ângulo da direção de voo
        const dx = orb.tx - originX;
        const dy = orb.ty - originY;
        const angle = Math.atan2(dy, dx);

        // Stretch: estica na direção do voo, achata perpendicular
        const stretchX = 1 + speed * 1.8;  // oval no sentido do movimento
        const stretchY = 1 - speed * 0.45; // achata perpendicular

        drawOrb(orb.x, orb.y, 1, orb.scale, angle, stretchX, stretchY);
      }

      if (t >= 1) {
        phase = 'holding';
        holdStart = ts;
        lastScrollY = window.scrollY;
      }

    } else if (phase === 'holding') {
      const holdElapsed = ts - holdStart;
      const holdT = holdElapsed / HOLD_DURATION;

      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      // Bounce de squash ao chegar: nos primeiros 400ms faz um squash-stretch
      const bounceT = Math.min(holdElapsed / 400, 1);
      // Squash inicial (achatado verticalmente), depois normaliza com bounce
      const bounceSquash = bounceT < 0.4
        ? 1 - (1 - bounceT / 0.4) * 0.5   // achata ao chegar
        : 0.5 + ((bounceT - 0.4) / 0.6) * 0.5 + 0.1 * Math.sin((bounceT - 0.4) / 0.6 * Math.PI * 3) * (1 - bounceT); // bounce de volta
      const bounceStretch = bounceT < 0.4
        ? 1 + (1 - bounceT / 0.4) * 0.7   // estica ao achatar
        : 1 + 0.08 * Math.sin((bounceT - 0.4) / 0.6 * Math.PI * 3) * (1 - bounceT);

      // Pulso suave depois do bounce
      const pulse = 2.2 + 0.3 * Math.sin(holdElapsed * 0.005);

      for (const orb of orbs) {
        orb.y += scrollDelta * 0.08;
        orb.y = Math.max(20, Math.min(H - 20, orb.y));
        // Squash = achata no eixo Y, estica no X (horizontal ao chegar)
        drawOrb(orb.x, orb.y, 1, pulse, 0, bounceStretch, bounceSquash);
      }

      // Dispara scroll cedo
      if (!scrollTriggered && holdElapsed > 120) {
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
      // Scale explode levemente ao sumir
      const scale = 2.2 + t * 2.0;

      for (const orb of orbs) {
        drawOrb(orb.x, orb.y, alpha, scale);
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