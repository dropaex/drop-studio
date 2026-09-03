import { useState, useEffect } from 'react';
import CustomCursor from '@/react-app/components/CustomCursor';
import Particles from '@/react-app/components/Particles';
import Navigation from '@/react-app/components/Navigation';
import Hero from '@/react-app/components/Hero';
import About from '@/react-app/components/About';
import ToolsUsed from '@/react-app/components/ToolsUsed';
import Portfolio from '@/react-app/components/Portfolio';
import Services from '@/react-app/components/Services';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';

export default function Home() {
 const [currentSection, setCurrentSection] = useState('home');

 useEffect(() => {
 const handleScroll = () => {
 const sections = ['home', 'sobre', 'ferramentas', 'portfolio', 'servicos', 'contato'];
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
 {/* Grid de fundo */}
 <div className="bg-grid" aria-hidden="true"></div>

 {/* Partículas */}
 <Particles />

 {/* Background */}
 <div className="fixed inset-0 -z-10 overflow-hidden">
 <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-purple/6 rounded-full blur-3xl animate-glow-pulse"></div>
 <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
 <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '1s' }}></div>
 <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-purple/6 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
 </div>

 <CustomCursor />
 <Navigation currentSection={currentSection} />
 <Hero />
 <About />
 <ToolsUsed />
 <Portfolio />
 <Services />
 <Contact />
 <Footer />
 </div>
 );
}