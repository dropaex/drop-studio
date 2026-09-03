import { MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
 const scrollToTop = () => {
 window.scrollTo({ 
 top: 0, 
 behavior: 'smooth'
 });
 };

 return (
 <footer className="bg-ink-950/90 lightmode:bg-white/95 backdrop-blur-sm text-white lightmode:text-gray-900 py-12 relative overflow-hidden border-t border-white/10 lightmode:border-gray-200">
 <div className="absolute inset-0">
 <div className="absolute top-0 left-0 w-64 h-64 bg-primary-purple/12 rounded-full blur-2xl animate-glow-pulse"></div>
 <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl animate-float-slow"></div>
 </div>
 
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid md:grid-cols-3 gap-8">
 {/* Brand */}
 <div>
 <button
 onClick={scrollToTop}
 className="mb-4 transition-transform hover:scale-105 relative group"
 >
 <div className="absolute -inset-2 bg-gradient-to-r from-primary-blue/30 via-primary-purple via-35% to-primary-purple/30 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
 <img 
 src="https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/imagem_2025-10-09_235545032-remov111ebg-previe1w-(1).png" 
 alt="Drop Studio" 
 className="h-16 w-auto relative z-10"
 />
 </button>
 <p className="text-white/80 lightmode:text-gray-600 leading-relaxed">
 Animação 2D profissional | Rigging especializado | Motion design criativo.
 </p>
 </div>

 {/* Quick Links */}
 <div>
 <h4 className="font-semibold mb-4 text-white lightmode:text-gray-900 text-lg">
 Links Rápidos
 </h4>
 <div className="space-y-2">
 <button 
 onClick={() => {
 const element = document.getElementById('sobre');
 if (element) {
 const yOffset = -80;
 const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
 window.scrollTo({ top: y, behavior: 'smooth' });
 }
 }}
 className="block text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 transition-colors text-left hover:translate-x-2 duration-300"
 >
 → Sobre
 </button>
 <button 
 onClick={() => {
 const element = document.getElementById('portfolio');
 if (element) {
 const yOffset = -80;
 const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
 window.scrollTo({ top: y, behavior: 'smooth' });
 }
 }}
 className="block text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 transition-colors text-left font-semibold hover:translate-x-2 duration-300"
 >
 → Portfólio
 </button>
 <button 
 onClick={() => {
 const element = document.getElementById('servicos');
 if (element) {
 const yOffset = -80;
 const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
 window.scrollTo({ top: y, behavior: 'smooth' });
 }
 }}
 className="block text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 transition-colors text-left font-semibold hover:translate-x-2 duration-300"
 >
 → Serviços
 </button>
 <button 
 onClick={() => {
 const element = document.getElementById('contato');
 if (element) {
 const yOffset = -80;
 const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
 window.scrollTo({ top: y, behavior: 'smooth' });
 }
 }}
 className="block text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 transition-colors text-left font-semibold hover:translate-x-2 duration-300"
 >
 → Contato
 </button>
 </div>
 </div>

 {/* Contact & Social */}
 <div>
 <h4 className="font-semibold mb-4 text-white lightmode:text-gray-900 text-lg">
 Contato
 </h4>
 <div className="space-y-2 mb-6">
 <div className="flex items-center space-x-2 text-white/80 lightmode:text-gray-700 bg-white/10 lightmode:bg-gray-100 px-3 py-2 rounded-lg">
 <MessageCircle size={18} />
 <span>drop_aex</span>
 </div>
 </div>
 
 <div className="flex space-x-4">
 <a
 href="https://x.com/Drop_aex"
 className="text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 transition-all hover:scale-125 bg-white/10 lightmode:bg-gray-100 p-3 rounded-lg"
 aria-label="X (Twitter)"
 target="_blank"
 rel="noopener noreferrer"
 >
 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
 </svg>
 </a>
 </div>
 </div>
 </div>

 <div className="border-t border-white/10 lightmode:border-gray-200 mt-8 pt-8">
 <div className="flex flex-col md:flex-row justify-between items-center">
 <p className="text-white/70 lightmode:text-gray-500 text-sm">
 © 2024 Drop Studio. Todos os direitos reservados.
 </p>
 
 <p className="text-white/70 lightmode:text-gray-500 text-sm flex items-center mt-4 md:mt-0">
 Feito com <Heart size={18} className="mx-1 text-primary-pink animate-pulse" fill="currentColor" /> e muita ARTE por Pedro
 </p>
 </div>
 </div>
 </div>
 </footer>
 );
}
