export default function About() {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-left">
            <h2 className="text-5xl md:text-6xl font-black text-primary-purple mb-4">
              Sobre Mim
            </h2>
            
            <div className="space-y-4 text-white/90 leading-relaxed">
              <p className="hover:text-white transition-colors">
                Sou <span className="text-primary-purple font-semibold">Pedro</span>, animador 2D e motion designer especializado em rigging profissional. 
              </p>
              
              <p className="hover:text-white transition-colors">
                Com <span className="text-primary-purple font-semibold">2+ anos</span> de experiência, desenvolvo soluções criativas em animação para clientes que buscam qualidade e inovação visual.
              </p>
              
              <p className="hover:text-white transition-colors">
                Combino técnica avançada com visão artística para criar animações que comunicam efetivamente e geram resultados para seus projetos.
              </p>
              
              <div className="pt-4">
                <p className="font-semibold text-white mb-3 text-lg">Áreas de especialização:</p>
                <ul className="space-y-3">
                  <li className="flex items-start hover:translate-x-2 transition-transform duration-300 group">
                    <span className="text-primary-purple mr-3 text-xl">▸</span>
                    <span>Rigging avançado para personagens 2D</span>
                  </li>
                  <li className="flex items-start hover:translate-x-2 transition-transform duration-300 group">
                    <span className="text-primary-purple mr-3 text-xl">▸</span>
                    <span>Animação de personagens e objetos</span>
                  </li>
                  <li className="flex items-start hover:translate-x-2 transition-transform duration-300 group">
                    <span className="text-primary-purple mr-3 text-xl">▸</span>
                    <span>Motion graphics e design de movimento</span>
                  </li>
                  <li className="flex items-start hover:translate-x-2 transition-transform duration-300 group">
                    <span className="text-primary-purple mr-3 text-xl">▸</span>
                    <span>Direção de câmera e composição</span>
                  </li>
                  <li className="flex items-start hover:translate-x-2 transition-transform duration-300 group">
                    <span className="text-primary-purple mr-3 text-xl">▸</span>
                    <span>Composição e Direção Visual</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-purple via-primary-blue to-primary-purple-light rounded-3xl opacity-30 blur-2xl animate-glow-pulse"></div>
              <div className="aspect-square bg-gradient-to-br from-primary-purple/20 to-primary-purple-light/20 rounded-2xl backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <img 
                  src="https://0199ca3f-5871-7d40-b087-febfeb43f048.mochausercontent.com/icon(semfundo).gif" 
                  alt="Pedro - Animador 2D e Motion Designer"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-2xl p-6 shadow-2xl hover:shadow-primary-purple/60 hover:scale-110 transition-all duration-300 animate-float">
              <div className="text-white text-center">
                <div className="text-5xl font-bold text-white">2+</div>
                <div className="text-sm opacity-90">Anos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
