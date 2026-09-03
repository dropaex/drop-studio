export default function ToolsUsed() {
 const tools = [
 {
 badge: 'Ae',
 badgeClass: 'bg-gradient-to-br from-primary-purple-dark to-primary-purple text-white',
 title: 'After Effects',
 description: 'Animação, composição e efeitos visuais de alto impacto',
 },
 {
 badge: 'Ps',
 badgeClass: 'bg-gradient-to-br from-primary-blue to-primary-blue-dark text-white',
 title: 'Photoshop',
 description: 'Preparação de assets e composição de imagens para animação',
 },
 ];

 return (
 <section id="ferramentas" className="py-24 relative overflow-hidden">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="text-center mb-16 animate-fade-in-up">
 <h2 className="text-5xl md:text-6xl font-black text-white lightmode:text-gray-900 mb-6">
 Ferramentas que <span className="text-transparent bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue bg-clip-text">utilizo</span>
 </h2>
 <p className="text-lg text-white/80 lightmode:text-gray-600 max-w-2xl mx-auto">
 Um fluxo de trabalho pensado para transformar ideias em animações profissionais
 </p>
 </div>

 <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
 {tools.map((tool, index) => (
 <div
 key={tool.title}
 data-cursor-hover
 className="group p-8 rounded-2xl bg-ink-900/50 lightmode:bg-white border border-white/10 lightmode:border-gray-200 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary-blue/20 lightmode:hover:shadow-primary-purple/10 hover:border-primary-blue/30 hover:scale-105 transition-all duration-500 animate-fade-in-up text-center"
 style={{ animationDelay: `${0.15 + index * 0.1}s` }}
 >
 <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${tool.badgeClass}`}>
 {tool.badge}
 </div>
 <h3 className="text-xl font-semibold text-white lightmode:text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:via-primary-purple group-hover:via-35% group-hover:to-primary-blue group-hover:bg-clip-text transition-all duration-300">
 {tool.title}
 </h3>
 <p className="text-white/60 lightmode:text-gray-500 text-sm group-hover:text-white/80 lightmode:group-hover:text-gray-700 transition-colors">
 {tool.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
