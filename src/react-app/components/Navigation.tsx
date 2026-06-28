import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
}

export default function Navigation({ currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'contato', label: 'Contato' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-primary-purple/95 to-primary-purple-light/95 backdrop-blur-md shadow-xl shadow-primary-purple/20'
          : 'bg-gradient-to-r from-primary-purple/80 to-primary-purple-light/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('home')}
            className="transition-transform hover:scale-105 relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-blue/30 to-primary-purple/30 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
            <img
              src="https://mocha-cdn.com/0199ca3f-5871-7d40-b087-febfeb43f048/imagem_2025-10-09_235545032-remov111ebg-previe1w-(1).png"
              alt="Drop Studio"
              className="h-16 w-auto relative z-10"
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
                    ? 'bg-white/20 text-white shadow-lg scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-primary-purple/98 to-primary-purple-light/98 backdrop-blur-md shadow-2xl">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-white bg-white/20 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
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