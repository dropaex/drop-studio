import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
}

export default function Navigation({ currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Sincroniza o estado do botão com o tema já aplicado (definido no index.html antes do React montar)
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('drop-studio-theme', next ? 'light' : 'dark');
    } catch (e) {
      // localStorage indisponível (modo privado, etc) — o tema só não persiste entre visitas
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'ferramentas', label: 'Ferramentas' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'contato', label: 'Contato' }
  ];

  return (
    <nav
      data-cursor-hover
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-ink-950/85 lightmode:bg-white/90 backdrop-blur-md shadow-xl shadow-black/30 lightmode:shadow-black/5 border-white/10 lightmode:border-gray-200'
          : 'bg-ink-950/40 lightmode:bg-white/60 backdrop-blur-sm border-white/5 lightmode:border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('home')}
            className="transition-transform hover:scale-105 relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-blue/30 via-primary-purple via-35% to-primary-purple/30 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
            <img
              src="https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/imagem_2025-10-09_235545032-remov111ebg-previe1w-(1).png"
              alt="Drop Studio"
              className="h-16 w-auto relative z-10 lightmode:grayscale lightmode:contrast-125"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-primary-purple/80 via-primary-purple via-35% to-primary-blue/80 text-white shadow-lg scale-105'
                    : 'text-white/80 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 hover:bg-white/10 lightmode:hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Alternador de tema claro/escuro */}
            <button
              onClick={toggleTheme}
              data-cursor-hover
              aria-label={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
              className="ml-2 p-2.5 rounded-lg text-white/80 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 hover:bg-white/10 lightmode:hover:bg-gray-100 transition-all duration-300"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile: tema + menu */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              data-cursor-hover
              aria-label={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
              className="p-2 rounded-lg text-white lightmode:text-gray-700 hover:bg-white/20 lightmode:hover:bg-gray-100 transition-all"
            >
              {isLight ? <Moon size={22} /> : <Sun size={22} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white lightmode:text-gray-700 hover:bg-white/20 lightmode:hover:bg-gray-100 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-ink-950/95 lightmode:bg-white/95 backdrop-blur-md shadow-2xl border-b border-white/10 lightmode:border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-white bg-white/20 lightmode:bg-gray-100 lightmode:text-gray-900 shadow-lg'
                      : 'text-white/80 lightmode:text-gray-600 hover:text-white lightmode:hover:text-gray-900 hover:bg-white/10 lightmode:hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
