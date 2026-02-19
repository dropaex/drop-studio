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
      id: 4,
      title: "Rigging Facial 2D",
      category: "2d",
      description: "Rigging facial 2D com expressões dinâmicas",
      tools: ["After Effects", "Duik", "Photoshop"],
      video: "https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/Comp-2.gif"
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: '2d', label: '2D' }
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
        <div
          className="flex justify-center mb-12 relative z-10 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-primary-purple/40 hover:scale-105 animate-fade-in-up opacity-0 animate-fade-in bg-gradient-to-br from-black/40 via-black/30 to-transparent backdrop-blur-sm border border-white/5"
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
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
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={project.video}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/50 via-primary-purple/10 to-transparent pointer-events-none"></div>

                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-purple to-primary-purple-light backdrop-blur-sm text-white rounded-full p-3 animate-pulse shadow-lg">
                      <Play size={24} fill="white" />
                    </div>
                  </div>
                ) : project.image ? (
                  <div className="relative bg-gradient-to-br from-black/60 to-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/50 via-primary-purple/10 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-primary-purple/30 to-primary-pink/30 flex items-center justify-center">
                    <Play size={64} className="text-white/50" />
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-b from-black/60 to-black/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-white uppercase tracking-widest px-3 py-1 bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-full">
                    {project.category}
                  </span>
                  {project.link && (
                    <ExternalLink
                      size={20}
                      className="text-white/50 hover:text-primary-purple transition-colors group-hover:rotate-12 duration-300"
                    />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:to-primary-purple-light group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-white/70 mb-4 text-sm group-hover:text-white/90 transition-colors">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full hover:bg-primary-purple/20 hover:scale-110 transition-all duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}