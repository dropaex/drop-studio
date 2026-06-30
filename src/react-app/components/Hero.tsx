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

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function launchHandsAndScroll(btnEl: HTMLButtonElement, targetId: string) {
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

  // Destinos: esquerda e direita
  const targets = [
    { x: W * 0.06, y: H * 0.42, side: 'left' as const },
    { x: W * 0.94, y: H * 0.42, side: 'right' as const },
  ];

  const HAND_SIZE = 70;     // tamanho base da mão em px
  const FLY_DURATION = 480;     // ms voando até o canto
  const GRAB_DURATION = 220;    // ms fechando a mão (squeeze)
  const HOLD_DURATION = 1600;   // ms puxando a tela
  const RELEASE_DURATION = 260; // ms soltando + fade

  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none; z-index: 9999;
  `;
  document.body.appendChild(container);

  const hands = targets.map((t) => {
    const img = document.createElement('img');
    img.src = '/hand-open.png';
    img.style.cssText = `
      position: absolute;
      width: ${HAND_SIZE}px;
      height: ${HAND_SIZE}px;
      left: ${originX}px;
      top: ${originY}px;
      transform: translate(-50%, -50%);
      will-change: transform, left, top, opacity;
      opacity: 1;
    `;
    // Mão da esquerda espelhada, para "agarrar" virada para dentro
    if (t.side === 'left') {
      img.style.transform = 'translate(-50%, -50%) scaleX(-1)';
    }
    container.appendChild(img);
    return { el: img, tx: t.x, ty: t.y, side: t.side, curX: originX, curY: originY };
  });

  let scrollTriggered = false;
  let lastScrollY = window.scrollY;

  function setHandTransform(hand: typeof hands[0], scale: number, rotate: number, flipped: boolean) {
    const flip = flipped ? -1 : 1;
    hand.el.style.left = `${hand.curX}px`;
    hand.el.style.top = `${hand.curY}px`;
    hand.el.style.transform = `translate(-50%, -50%) scaleX(${flip}) scale(${scale}) rotate(${rotate}deg)`;
  }

  // FASE 1: voando até o canto, mão aberta
  function flyPhase(startTs: number) {
    function step(ts: number) {
      const elapsed = ts - startTs;
      const t = Math.min(elapsed / FLY_DURATION, 1);
      const eased = easeOut(t);
      const speed = 1 - t;

      for (const hand of hands) {
        hand.curX = originX + (hand.tx - originX) * eased;
        hand.curY = originY + (hand.ty - originY) * eased;
        const dx = hand.tx - originX;
        const dy = hand.ty - originY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // leve "estica" na direção do movimento via scale assimétrico simulado com rotate + scale
        const scale = 0.85 + speed * 0.25;
        setHandTransform(hand, scale, angle * 0.15, hand.side === 'left');
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        grabPhase(ts);
      }
    }
    requestAnimationFrame(step);
  }

  // FASE 2: fecha a mão (troca sprite) com squeeze
  function grabPhase(startTs: number) {
    // Troca para mão fechada
    for (const hand of hands) {
      hand.el.src = '/hand-closed.png';
    }

    function step(ts: number) {
      const elapsed = ts - startTs;
      const t = Math.min(elapsed / GRAB_DURATION, 1);
      // squeeze: aperta e solta rapidinho
      const squeeze = t < 0.5
        ? 1 - (t / 0.5) * 0.22
        : 0.78 + ((t - 0.5) / 0.5) * 0.22;

      for (const hand of hands) {
        setHandTransform(hand, squeeze, 0, hand.side === 'left');
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        lastScrollY = window.scrollY;
        holdPhase(ts);
      }
    }
    requestAnimationFrame(step);
  }

  // FASE 3: mão fechada "puxa" a tela — acompanha o scroll com leve arrasto/overshoot
  function holdPhase(startTs: number) {
    function step(ts: number) {
      const elapsed = ts - startTs;
      const t = elapsed / HOLD_DURATION;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Pulso sutil de "puxando"
      const pulse = 1 + 0.05 * Math.sin(elapsed * 0.01);

      for (const hand of hands) {
        hand.curY += scrollDelta * 0.06;
        hand.curY = Math.max(30, Math.min(H - 30, hand.curY));
        // Pequena rotação para dentro, como se estivesse tracionando
        const pullRotate = hand.side === 'left' ? -6 : 6;
        setHandTransform(hand, pulse, pullRotate, hand.side === 'left');
      }

      if (!scrollTriggered && elapsed > 80) {
        scrollTriggered = true;
        smoothScrollTo(targetId);
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        releasePhase(ts);
      }
    }
    requestAnimationFrame(step);
  }

  // FASE 4: solta a mão (abre de novo) e some com fade + leve recuo
  function releasePhase(startTs: number) {
    for (const hand of hands) {
      hand.el.src = '/hand-open.png';
    }

    function step(ts: number) {
      const elapsed = ts - startTs;
      const t = Math.min(elapsed / RELEASE_DURATION, 1);
      const eased = easeInOut(t);
      const opacity = 1 - eased;
      const scale = 1 + eased * 0.3; // expande levemente ao soltar

      for (const hand of hands) {
        hand.el.style.opacity = `${opacity}`;
        setHandTransform(hand, scale, 0, hand.side === 'left');
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        document.body.removeChild(container);
      }
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(flyPhase);
}

export default function Hero() {
  const portfolioBtnRef = useRef<HTMLButtonElement>(null);
  const contactBtnRef   = useRef<HTMLButtonElement>(null);

  const handlePortfolio = () => {
    if (portfolioBtnRef.current) launchHandsAndScroll(portfolioBtnRef.current, 'portfolio');
  };

  const handleContact = () => {
    if (contactBtnRef.current) launchHandsAndScroll(contactBtnRef.current, 'contato');
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
                className="w-full max-w-xl md:max-w-2xl transition-transform duration-700 ease-out group-hover:scale-110"
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