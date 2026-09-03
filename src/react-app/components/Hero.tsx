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

export default function Hero() {
 const portfolioBtnRef = useRef<HTMLButtonElement>(null);
 const contactBtnRef = useRef<HTMLButtonElement>(null);

 const handlePortfolio = () => {
 smoothScrollTo('portfolio');
 };

 const handleContact = () => {
 smoothScrollTo('contato');
 };

 return (
 <section id="home" className="min-h-screen flex items-center justify-center relative">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="space-y-8 relative z-10">

 {/* Logo — flutuando, sem caixa */}
 <div className="flex justify-center mb-4 animate-scale-in">
 {/* wrapper com padding generoso para o glow não ser cortado */}
 <div
 className="animate-float group p-10"
 style={{ display: 'inline-block' }}
 >
 <img
 src="/logo.webp"
 alt="Drop Studio"
 className="w-full max-w-xl md:max-w-2xl transition-transform duration-700 ease-out group-hover:scale-110"
 style={{
 filter: 'grayscale(var(--logo-grayscale, 0)) drop-shadow(0 0 36px rgb(var(--color-primary-purple) / 0.45)) drop-shadow(0 0 14px rgb(var(--color-primary-blue) / 0.3))',
 display: 'block',
 }}
 />
 </div>
 </div>

 <p className="text-xl text-white lightmode:text-gray-700 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
 Especialista em animação 2D, rigging e motion design profissional
 </p>

 <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
 <button
 ref={portfolioBtnRef}
 onClick={handlePortfolio}
 className="group relative bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-purple/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 overflow-hidden"
 >
 <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 via-primary-purple via-35% to-primary-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
 <span className="relative">Ver Portfólio</span>
 <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
 </button>

 <button
 ref={contactBtnRef}
 onClick={handleContact}
 className="relative bg-white/10 lightmode:bg-gray-100 backdrop-blur-sm text-white lightmode:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border border-white/10 lightmode:border-gray-300 hover:bg-white/15 lightmode:hover:bg-gray-200 hover:border-primary-blue/40 transition-all duration-300 hover:scale-105 overflow-hidden"
 >
 Solicitar Orçamento
 </button>
 </div>
 </div>
 </div>

 <button
 onClick={() => smoothScrollTo('portfolio')}
 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-white/70 lightmode:text-gray-500 hover:text-white lightmode:hover:text-gray-900 transition-colors bg-white/5 lightmode:bg-gray-100 border border-white/10 lightmode:border-gray-300 rounded-full p-3"
 >
 <ChevronDown size={32} />
 </button>
 </section>
 );
}
