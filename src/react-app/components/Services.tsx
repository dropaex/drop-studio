import { Zap, Target } from 'lucide-react';

export default function Services() {
 const services = [
 {
 icon: <Zap className="w-10 h-10" />,
 title: "Animação & Rigging 2D",
 description: "Criação de personagens animados com rigging profissional para projetos 2D",
 features: [
 "Rigging facial e corporal 2D",
 "Animação de personagens"
 ],
 color: "from-primary-purple via-primary-purple via-35% to-primary-blue "
 },
 {
 icon: <Target className="w-10 h-10" />,
 title: "Motion Design",
 description: "Design de movimento para marcas e conteúdo digital",
 features: [
 "Motion graphics",
 "Identidade visual animada"
 ],
 color: "from-primary-blue to-primary-blue"
 }
 ];

 return (
 <section id="servicos" className="py-24 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="text-center mb-16 animate-fade-in-up">
 <h2 className="text-5xl md:text-6xl font-black text-white lightmode:text-gray-900 mb-6">
 Serv<span className="text-transparent bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue bg-clip-text">iços</span>
 </h2>
 <p className="text-lg text-white/80 lightmode:text-gray-600 max-w-2xl mx-auto">
 Soluções profissionais em animação e motion design
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 {services.map((service, index) => (
 <div
 key={index}
 className="group p-8 rounded-2xl bg-ink-900/50 lightmode:bg-white border border-white/10 lightmode:border-gray-200 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary-purple/20 lightmode:hover:shadow-primary-purple/10 hover:border-primary-purple/30 transition-all duration-500 hover:scale-105 animate-fade-in-up relative overflow-hidden"
 style={{ animationDelay: `${0.2 + index * 0.1}s` }}
 >
 <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-purple/15 via-primary-purple via-35% to-primary-blue/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
 
 <div className="flex items-start space-x-4 relative z-10">
 <div className={`flex-shrink-0 p-4 bg-gradient-to-br ${service.color} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white shadow-xl shadow-black/30`}>
 {service.icon}
 </div>
 
 <div className="flex-1">
 <h3 className="text-2xl font-semibold text-white lightmode:text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:via-primary-purple group-hover:via-35% group-hover:to-primary-blue group-hover:bg-clip-text transition-all duration-300">
 {service.title}
 </h3>
 
 <p className="text-white/70 lightmode:text-gray-600 mb-6 group-hover:text-white/90 lightmode:group-hover:text-gray-900 transition-colors">
 {service.description}
 </p>
 
 <ul className="space-y-3">
 {service.features.map((feature, featureIndex) => (
 <li key={featureIndex} className="flex items-center text-white/80 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 hover:translate-x-2 transition-all duration-300 group/item">
 <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3 group-hover/item:scale-150 transition-transform`}></div>
 <span>{feature}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
