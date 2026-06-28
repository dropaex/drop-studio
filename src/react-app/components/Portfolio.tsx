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
    // CARD DESTAQUE — centro
    {
      id: 5,
      title: "Projetos MMV",
      category: "motion",
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
      category: "motion",
      description: "Fake 3D usando elementos planos em duas dimensões (2D).",
      tools: ["After Effects", "Photoshop"],
      video: "/videos/ESTADIO_PIKA.mp4",
      isLocalVideo: true
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: '2d', label: '2D' },
    { id: 'motion', label: 'Motion' }
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-primary-purple mb-6">
            Portfólio
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Seleção de trabalhos em animação 2D e motion design
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gradient-to-r from-primary-purple/20 to-primary-purple-light/20 backdrop-blur-sm rounded-2xl p-2 shadow-xl shadow-primary-purple/30">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-purple to-primary-purple-light text-white shadow-lg shadow-primary-purple/50 scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative z-10 items-center">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.isFeatured;

            return (
              <div
                key={project.id}
                className={`
                  group rounded-2xl overflow-hidden
                  transition-all duration-500
                  animate-fade-in-up opacity-0 animate-fade-in
                  bg-gradient-to-br from-black/40 via-black/30 to-transparent
                  backdrop-blur-sm
                  ${isFeatured
                    ? 'lg:col-span-2 row-span-1 border-2 border-primary-purple/60 shadow-2xl shadow-primary-purple/40 hover:shadow-primary-purple/70 hover:scale-[1.07] z-10 relative'
                    : 'border border-white/5 hover:shadow-xl hover:shadow-primary-purple/30 hover:scale-[1.03]'
                  }
                  ${project.link ? 'cursor-pointer' : ''}
                `}
                style={{
                  animationDelay: `${0.2 + index * 0.1}s`,
                  animationFillMode: 'forwards',
                }}
                onClick={() => project.link && window.open(project.link, '_blank', 'noopener noreferrer')}
              >
                {/* Media */}
                <div className="relative overflow-hidden">
                  {project.video ? (
                    <div className="relative bg-gradient-to-br from-black/60 to-black/40">
                      {project.isLocalVideo ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isFeatured ? 'h-80' : 'h-52'}`}
                        />
                      ) : (
                        <img
                          src={project.video}
                          alt={project.title}
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isFeatured ? 'h-80' : 'h-52'}`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/50 via-primary-purple/10 to-transparent pointer-events-none"></div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-purple to-primary-purple-light text-white rounded-full p-2 animate-pulse shadow-lg">
                        <Play size={isFeatured ? 20 : 16} fill="white" />
                      </div>
                    </div>
                  ) : project.image ? (
                    <div className="relative bg-gradient-to-br from-black/60 to-black/40">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isFeatured ? 'h-80' : 'h-52'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/60 via-primary-purple/10 to-transparent pointer-events-none"></div>
                      {project.link && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-purple to-primary-purple-light text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink size={16} />
                        </div>
                      )}
                      {isFeatured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-purple to-primary-purple-light text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg tracking-widest uppercase">
                          ⭐ Destaque
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`w-full bg-gradient-to-br from-primary-purple/30 to-primary-pink/30 flex items-center justify-center ${isFeatured ? 'h-80' : 'h-52'}`}>
                      <Play size={48} className="text-white/50" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className={`bg-gradient-to-b from-black/60 to-black/40 ${isFeatured ? 'p-7' : 'p-5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold text-white uppercase tracking-widest px-3 py-1 bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-full ${isFeatured ? 'text-xs' : 'text-[10px]'}`}>
                      {project.category}
                    </span>
                    {project.link && (
                      <ExternalLink
                        size={isFeatured ? 18 : 15}
                        className="text-white/50 group-hover:text-primary-purple transition-colors group-hover:rotate-12 duration-300"
                      />
                    )}
                  </div>

                  <h3 className={`font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:to-primary-purple-light group-hover:bg-clip-text transition-all duration-300 ${isFeatured ? 'text-2xl font-black' : 'text-base'}`}>
                    {project.title}
                  </h3>

                  <p className={`text-white/70 mb-4 group-hover:text-white/90 transition-colors ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className={`px-2 py-1 font-medium bg-white/10 text-white/90 rounded-full hover:bg-primary-purple/20 hover:scale-110 transition-all duration-300 ${isFeatured ? 'text-xs' : 'text-[10px]'}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}