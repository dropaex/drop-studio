import { useState, useRef } from 'react';
import VideoPreviewModal from '@/react-app/components/VideoPreviewModal';

interface Client {
  id: string;
  artistName: string;
  artistPhoto: string;
  role: string;
  video: string;
  thumbnail?: string;
}

const clients: Client[] = [
  {
    id: 'sayal',
    artistName: 'Sayal',
    artistPhoto: '/images/artist-sayal.jpg',
    role: 'Animação 2D • Rigging',
    video: '/videos/MARINEFORD_2_1.mp4',
  },
  {
    id: 'kaji',
    artistName: 'Kaji Raps',
    artistPhoto: '/images/artist-kaji.jpg',
    role: 'Animação 2D • Motion Design',
    video: '/videos/SAITAMA_KAJI_1.mp4',
  },
  {
    id: 'jrp',
    artistName: 'JRP',
    artistPhoto: '/images/artist-jrp.jpg',
    role: 'Animação 2D • Rigging',
    video: '/videos/OBITO_2_1.mp4',
  },
];

export default function Services() {
  const [preview, setPreview] = useState<{ client: Client; x: number; y: number } | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const openPreview = (client: Client, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview({ client, x: e.clientX, y: e.clientY });
  };

  return (
    <section id="servicos" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-white lightmode:text-gray-900 mb-6">
            Melhores Serviços
          </h2>
          <p className="text-lg text-white/80 lightmode:text-gray-600 max-w-2xl mx-auto">
            Trabalhos reais entregues para artistas de verdade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <div
              key={client.id}
              data-cursor-hover
              onClick={(e: React.MouseEvent) => openPreview(client, e)}
              className="group relative rounded-2xl overflow-hidden bg-ink-900/50 lightmode:bg-white border border-white/10 lightmode:border-gray-200 hover:border-primary-purple/40 hover:shadow-2xl hover:shadow-primary-purple/20 hover:scale-[1.03] transition-all duration-500 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
              onMouseEnter={() => videoRefs.current[client.id]?.play()}
              onMouseLeave={() => {
                const v = videoRefs.current[client.id];
                if (v) { v.pause(); v.currentTime = 0; }
              }}
            >
              {/* Vídeo — começa pausado, toca no hover */}
              <div className="relative overflow-hidden aspect-video">
                <video
                  ref={(el: HTMLVideoElement | null) => { videoRefs.current[client.id] = el; }}
                  src={client.video}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Overlay "Ver prévia" */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <span className="flex items-center gap-2 text-white text-sm font-semibold bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Ver prévia
                  </span>
                </div>
              </div>

              {/* Rodapé com foto + nome do artista */}
              <div className="flex items-center gap-3 p-4">
                <img
                  src={client.artistPhoto}
                  alt={client.artistName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-purple/40 group-hover:border-primary-purple/70 transition-colors flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white lightmode:text-gray-900 truncate group-hover:text-white/90 transition-colors">
                    {client.artistName}
                  </p>
                  <p className="text-xs text-white/55 lightmode:text-gray-500 truncate">{client.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {preview && (
        <VideoPreviewModal
          project={{
            title: preview.client.artistName,
            video: preview.client.video,
            isLocalVideo: true,
          }}
          origin={{ x: preview.x, y: preview.y }}
          onClose={() => setPreview(null)}
        />
      )}
    </section>
  );
}
