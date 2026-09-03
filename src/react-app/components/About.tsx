import { Bone, Film, Zap, Camera, Layers } from 'lucide-react';

export default function About() {
  const skills = [
    { icon: <Bone size={14} />, label: 'Rigging 2D' },
    { icon: <Film size={14} />, label: 'Animação de Personagens' },
    { icon: <Zap size={14} />, label: 'Motion Graphics' },
    { icon: <Camera size={14} />, label: 'Direção de Câmera' },
    { icon: <Layers size={14} />, label: 'Composição Visual' },
  ];

  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-12 md:gap-16 items-start">

          {/* Imagem */}
          <div className="relative animate-fade-in-left mx-auto md:mx-0 md:mt-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue rounded-3xl opacity-20 blur-2xl animate-glow-pulse"></div>
              <div className="aspect-square w-64 md:w-full bg-ink-900/60 lightmode:bg-white border border-white/10 lightmode:border-gray-200 rounded-2xl backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <img
                  src="https://0199ca3f-5871-7d40-b087-febfeb43f048.mochausercontent.com/icon(semfundo).gif"
                  alt="Pedro - Animador 2D e Motion Designer"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue rounded-2xl p-6 shadow-2xl hover:shadow-primary-purple/40 hover:scale-110 transition-all duration-300 animate-float">
              <div className="text-white text-center">
                <div className="text-5xl font-bold text-white">2+</div>
                <div className="text-sm opacity-90">Anos</div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-6 animate-fade-in-right">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-purple-light bg-primary-purple/15 border border-primary-purple/30 px-3 py-1.5 rounded-full">
              Sobre Mim
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white lightmode:text-gray-900 flex items-center gap-3 flex-wrap">
              Olá, eu sou o <span className="text-transparent bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue bg-clip-text">Pedro</span>
              <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </h2>

            <p className="text-white/80 lightmode:text-gray-600 leading-relaxed text-lg max-w-xl">
              Sou animador 2D e motion designer especializado em rigging profissional. Com <span className="text-white lightmode:text-gray-900 font-semibold">2+ anos</span> de experiência, combino técnica avançada com visão artística para criar animações que comunicam de verdade e geram resultado para seus projetos.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill.label}
                  data-cursor-hover
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/90 lightmode:text-gray-700 bg-white/5 lightmode:bg-gray-100 border border-white/10 lightmode:border-gray-200 px-3.5 py-2 rounded-full hover:border-primary-purple/40 hover:text-white lightmode:hover:text-gray-900 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-primary-blue-light">{skill.icon}</span>
                  {skill.label}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 lightmode:border-gray-200">
              <h3 className="text-2xl font-black text-white lightmode:text-gray-900 mb-2">
                Vamos criar algo incrível juntos?
              </h3>
              <p className="text-white/70 lightmode:text-gray-600 mb-5 max-w-xl">
                Precisa de animações profissionais que dão vida ao seu projeto? Entre em contato agora e vamos conversar sobre a sua ideia!
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('contato');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                data-cursor-hover
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-primary-purple/30 hover:shadow-xl hover:shadow-primary-purple/50 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6606a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                Fale comigo
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
