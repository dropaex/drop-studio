import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

interface Project {
 id: number;
 title: string;
 category: string;
 description: string;
 tools: string[];
 image?: string;
 video?: string;
 link?: string;
 isLocalVideo?: boolean;
 isFeatured?: boolean;
}

export default function Portfolio() {
 const [selectedCategory, setSelectedCategory] = useState('all');

 const projects: Project[] = [
 {
 id: 1,
 title: "Personagem Animado 2D",
 category: "2d",
 description: "Rigging completo e animação de personagem",
 tools: ["After Effects", "Photoshop"],
 video: "https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/Comp-1_1.gif"
 },
 {
 id: 3,
 title: "Comissão 2D",
 category: "2d",
 description: "Comissão Animada para Player Tauz",
 tools: ["After Effects", "Photoshop"],
 video: "/videos/comp1.mp4",
 isLocalVideo: true
 },
 {
 id: 5,
 title: "Projetos MMV",
 category: "mmv",
 description: "Projetos de MMV que destacam edição criativa, motion design e narrativa visual.",
 tools: ["After Effects", "Premiere", "Motion Design"],
 image: "/videos/mmv-thumb.png",
 link: "https://www.behance.net/gallery/220541143/MMV-PROJECTS",
 isFeatured: true
 },
 {
 id: 4,
 title: "Rigging Facial 2D",
 category: "2d",
 description: "Rigging facial 2D com expressões dinâmicas",
 tools: ["After Effects", "Duik", "Photoshop"],
 video: "https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/Comp-2.gif"
 },
 {
 id: 6,
 title: "Fake 3D",
 category: "3d",
 description: "Fake 3D usando elementos planos em duas dimensões (2D).",
 tools: ["After Effects", "Photoshop"],
 video: "/videos/ESTADIO_PIKA.mp4",
 isLocalVideo: true
 }
 ];

 const categories = [
 { id: 'all', label: 'Todos' },
 { id: '2d', label: '2D' },
 { id: '3d', label: '3D' }
 ];

 const filteredProjects =
 selectedCategory === 'all'
 ? projects
 : projects.filter(p => p.category === selectedCategory);

 const featured = filteredProjects.find(p => p.isFeatured);
 const sides = filteredProjects.filter(p => !p.isFeatured);
 const leftCards = sides.slice(0, 2);
 const rightCards = sides.slice(2, 4);

 function SmallCard({ project, index }: { project: Project; index: number }) {
 return (
 <div
 className="flex flex-col group rounded-2xl overflow-hidden transition-all duration-700 ease-out animate-fade-in-up opacity-0 animate-fade-in bg-gradient-to-br from-black/40 via-black/30 to-transparent backdrop-blur-sm border border-white/10 hover:border-primary-purple/40 hover:shadow-xl hover:shadow-primary-purple/20 hover:scale-[1.13] cursor-default flex-1"
 style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
 onClick={() => project.link && window.open(project.link, '_blank', 'noopener noreferrer')}
 >
 <div className="relative overflow-hidden flex-1">
 {project.isLocalVideo ? (
 <video src={project.video} autoPlay loop muted playsInline
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ minHeight: "160px" }} />
 ) : project.video ? (
 <img src={project.video} alt={project.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" style={{ minHeight: "160px" }} />
 ) : project.image ? (
 <img src={project.image} alt={project.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" style={{ minHeight: "160px" }} />
 ) : (
 <div className="w-full bg-gradient-to-br from-primary-purple/30 to-primary-pink/30 flex items-center justify-center" style={{ minHeight: "160px" }}>
 <Play size={36} className="text-white/50" />
 </div>
 )}
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
 {(project.video && !project.image) && (
 <div className="absolute top-3 right-3 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white rounded-full p-1.5 animate-pulse shadow-lg">
 <Play size={14} fill="white" />
 </div>
 )}
 </div>
 <div className="p-4 bg-gradient-to-b from-black/60 to-black/40">
 <div className="flex items-center justify-between mb-1.5">
 <span className="text-[10px] font-semibold text-white uppercase tracking-widest px-2 py-0.5 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue rounded-full">
 {project.category}
 </span>
 {project.link && <ExternalLink size={13} className="text-white/40 group-hover:text-primary-purple transition-colors" />}
 </div>
 <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:via-primary-purple group-hover:via-35% group-hover:to-primary-blue group-hover:bg-clip-text transition-all duration-300">
 {project.title}
 </h3>
 <p className="text-white/60 text-xs mb-3 group-hover:text-white/80 transition-colors line-clamp-2">
 {project.description}
 </p>
 <div className="flex flex-wrap gap-1">
 {project.tools.map((tool, i) => (
 <span key={i} className="px-2 py-0.5 text-[10px] font-medium bg-white/10 text-white/80 rounded-full hover:bg-primary-purple/20 transition-all duration-300">
 {tool}
 </span>
 ))}
 </div>
 </div>
 </div>
 );
 }

 function FeaturedCard({ project }: { project: Project }) {
 return (
 <div
 className="flex flex-col group rounded-2xl overflow-hidden transition-all duration-700 ease-out animate-fade-in-up opacity-0 animate-fade-in bg-gradient-to-br from-black/40 via-black/30 to-transparent backdrop-blur-sm border-2 border-primary-purple/40 shadow-2xl shadow-black/40 hover:border-primary-blue/50 hover:shadow-primary-purple/30 hover:scale-[1.11] cursor-pointer z-10 relative h-full"
 style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
 onClick={() => project.link && window.open(project.link, '_blank', 'noopener noreferrer')}
 >
 <div className="relative overflow-hidden">
 {project.image ? (
 <img src={project.image} alt={project.title}
 className="w-full object-cover group-hover:scale-105 transition-transform duration-700 flex-1" style={{ flex: 1, minHeight: "300px" }} />
 ) : (
 <div className="w-full bg-gradient-to-br from-primary-purple/30 to-primary-pink/30 flex items-center justify-center" style={{ height: '370px' }}>
 <Play size={64} className="text-white/50" />
 </div>
 )}
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
 {project.link && (
 <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
 <ExternalLink size={16} />
 </div>
 )}
 </div>
 <div className="p-7 bg-gradient-to-b from-black/60 to-black/40">
 <div className="flex items-center justify-between mb-3">
 <span className="text-xs font-semibold text-white uppercase tracking-widest px-3 py-1 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue rounded-full">
 {project.category}
 </span>
 {project.link && <ExternalLink size={18} className="text-white/50 group-hover:text-primary-purple transition-colors group-hover:rotate-12 duration-300" />}
 </div>
 <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:via-primary-purple group-hover:via-35% group-hover:to-primary-blue group-hover:bg-clip-text transition-all duration-300">
 {project.title}
 </h3>
 <p className="text-white/70 mb-4 text-sm group-hover:text-white/90 transition-colors">
 {project.description}
 </p>
 <div className="flex flex-wrap gap-2">
 {project.tools.map((tool, i) => (
 <span key={i} className="px-3 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full hover:bg-primary-purple/20 hover:scale-110 transition-all duration-300">
 {tool}
 </span>
 ))}
 </div>
 </div>
 </div>
 );
 }

 // Se não há card featured no filtro atual, usa grid normal
 if (!featured) {
 return (
 <section id="portfolio" className="py-24 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16 relative z-10 animate-fade-in-up">
 <h2 className="text-5xl md:text-6xl font-black text-white lightmode:text-gray-900 mb-6">Portf<span className="text-transparent bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue bg-clip-text">ólio</span></h2>
 <p className="text-lg text-white/80 lightmode:text-gray-600 max-w-2xl mx-auto">Seleção de trabalhos em animação 2D e motion design</p>
 </div>
 <div className="flex justify-center mb-12 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
 <div className="bg-ink-900/60 lightmode:bg-white border border-white/10 lightmode:border-gray-200 backdrop-blur-sm rounded-2xl p-2 shadow-xl shadow-black/30 lightmode:shadow-black/5">
 {categories.map(cat => (
 <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
 className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === cat.id ? 'bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white shadow-lg scale-105' : 'text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 hover:bg-white/10 lightmode:hover:bg-gray-100 hover:scale-105'}`}>
 {cat.label}
 </button>
 ))}
 </div>
 </div>
 <div className={`relative z-10 ${filteredProjects.length === 1 ? 'flex justify-center' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
 {filteredProjects.length === 1 ? (
 <div
 className="group rounded-2xl overflow-hidden transition-all duration-700 ease-out animate-fade-in-up opacity-0 animate-fade-in bg-gradient-to-br from-black/40 via-black/30 to-transparent backdrop-blur-sm border-2 border-primary-purple/40 shadow-2xl shadow-black/40 hover:border-primary-blue/50 hover:shadow-primary-purple/30 hover:scale-[1.11] cursor-default w-full max-w-2xl"
 style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
 >
 <div className="relative overflow-hidden">
 {filteredProjects[0].isLocalVideo ? (
 <video src={filteredProjects[0].video} autoPlay loop muted playsInline
 className="w-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ height: '420px' }} />
 ) : (
 <div className="w-full bg-gradient-to-br from-primary-purple/30 to-primary-pink/30 flex items-center justify-center" style={{ height: '420px' }} />
 )}
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
 <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white rounded-full p-2 animate-pulse shadow-lg">
 <Play size={20} fill="white" />
 </div>
 </div>
 <div className="p-7 bg-gradient-to-b from-black/60 to-black/40">
 <span className="text-xs font-semibold text-white uppercase tracking-widest px-3 py-1 bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue rounded-full">
 {filteredProjects[0].category}
 </span>
 <h3 className="text-2xl font-black text-white mt-3 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:via-primary-purple group-hover:via-35% group-hover:to-primary-blue group-hover:bg-clip-text transition-all duration-300">
 {filteredProjects[0].title}
 </h3>
 <p className="text-white/70 mb-4 text-sm group-hover:text-white/90 transition-colors">
 {filteredProjects[0].description}
 </p>
 <div className="flex flex-wrap gap-2">
 {filteredProjects[0].tools.map((tool, i) => (
 <span key={i} className="px-3 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full hover:bg-primary-purple/20 transition-all duration-300">
 {tool}
 </span>
 ))}
 </div>
 </div>
 </div>
 ) : (
 filteredProjects.map((p, i) => <SmallCard key={p.id} project={p} index={i} />)
 )}
 </div>
 </div>
 </section>
 );
 }

 return (
 <section id="portfolio" className="py-24 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16 relative z-10 animate-fade-in-up">
 <h2 className="text-5xl md:text-6xl font-black text-white lightmode:text-gray-900 mb-6">Portf<span className="text-transparent bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue bg-clip-text">ólio</span></h2>
 <p className="text-lg text-white/80 lightmode:text-gray-600 max-w-2xl mx-auto">Seleção de trabalhos em animação 2D e motion design</p>
 </div>

 <div className="flex justify-center mb-12 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
 <div className="bg-ink-900/60 lightmode:bg-white border border-white/10 lightmode:border-gray-200 backdrop-blur-sm rounded-2xl p-2 shadow-xl shadow-black/30 lightmode:shadow-black/5">
 {categories.map(cat => (
 <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
 className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === cat.id ? 'bg-gradient-to-r from-primary-purple via-primary-purple via-35% to-primary-blue text-white shadow-lg scale-105' : 'text-white/70 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 hover:bg-white/10 lightmode:hover:bg-gray-100 hover:scale-105'}`}>
 {cat.label}
 </button>
 ))}
 </div>
 </div>

 {/* Layout: esquerda | destaque | direita */}
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 items-stretch relative z-10">

 {/* Coluna esquerda */}
 <div className="flex flex-col gap-6 h-full">
 {leftCards.map((p, i) => <SmallCard key={p.id} project={p} index={i} />)}
 </div>

 {/* Card destaque */}
 <FeaturedCard project={featured} />

 {/* Coluna direita */}
 <div className="flex flex-col gap-6 h-full">
 {rightCards.map((p, i) => <SmallCard key={p.id} project={p} index={i + 2} />)}
 </div>

 </div>
 </div>
 </section>
 );
}