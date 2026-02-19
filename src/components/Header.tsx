import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-lg border-b border-purple-500/20' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="text-3xl">🌙</span>
            <span className="text-2xl font-bold text-white">
              Moonlume <span className="text-purple-400">VPN</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-purple-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="text-white hover:text-purple-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-purple-400 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-white hover:text-purple-400 transition-colors">
              Support
            </button>
          </div>

          <div className="hidden md:block">
            <button className="btn-gradient px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <button onClick={() => scrollToSection('home')} className="block text-white hover:text-purple-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="block text-white hover:text-purple-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block text-white hover:text-purple-400 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="block text-white hover:text-purple-400 transition-colors">
              Support
            </button>
            <button className="btn-gradient px-6 py-2 rounded-full text-white font-semibold w-full">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
