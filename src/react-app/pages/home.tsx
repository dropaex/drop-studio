import { useState, useEffect } from 'react';
import Navigation from '@/react-app/components/Navigation';
import Hero from '@/react-app/components/Hero';
import About from '@/react-app/components/About';
import Portfolio from '@/react-app/components/Portfolio';
import Services from '@/react-app/components/Services';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';
import AnimatedBackground from '@/react-app/components/AnimatedBackground';
import ParticlesBackground from '@/react-app/components/ParticlesBackground';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'sobre', 'portfolio', 'servicos', 'contato'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* BACKGROUNDS NOVOS */}
      <AnimatedBackground />
      <ParticlesBackground />

      <Navigation currentSection={currentSection} />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}