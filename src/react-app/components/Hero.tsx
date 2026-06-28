import { ChevronDown, ArrowRight } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

function spawnParticles(e: React.MouseEvent<HTMLButtonElement>) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 9999;
  `;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  const colors = ['#9333EA', '#A855F7', '#6366F1', '#C084FC', '#E879F9', '#ffffff'];

  const particles: Particle[] = Array.from({ length: 80 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    return {
      x: e.clientX,
      y: e.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      size: Math.random() * 7 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });

  // Ripple
  let rippleRadius = 0;
  let rippleAlpha = 0.8;

  let animId: number;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o ripple
    if (rippleAlpha > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, ${rippleAlpha})`;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#9333EA';
      ctx.stroke();
      ctx.restore();
      rippleRadius += 6;
      rippleAlpha -= 0.04;
    }

    // Desenha as partículas
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.vx *= 0.97;
      p.life -= 0.018;

      if (p.life > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (alive || rippleAlpha > 0) {
      animId = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(animId);
      document.body.removeChild(canvas);
    }
  }

  animId = requestAnimationFrame(draw);
}

function smoothScrollTo(id: string) {
  const lenis = (window as any).__lenis__;
  const element = document.getElementById(id);
  if (!element) return;

  if (lenis) {
    // Usa o Lenis para scroll animado
    lenis.scrollTo(element, {
      offset: -80,
      duration: 2.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    // Fallback
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export default function Hero() {
  const handlePortfolio = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnParticles(e);
    setTimeout(() => smoothScrollTo('portfolio'), 80);
  };

  const handleContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnParticles(e);
    setTimeout(() => smoothScrollTo('contato'), 80);
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
        onClick={(e) => { spawnParticles(e); setTimeout(() => smoothScrollTo('portfolio'), 80); }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-primary-purple-light hover:text-white transition-colors bg-primary-purple/20 rounded-full p-3"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}