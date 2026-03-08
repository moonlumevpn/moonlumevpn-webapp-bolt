import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { isAuthenticated, clearTokens } from '../lib/auth';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const handleLogout = () => {
    clearTokens();
    setIsAuth(false);
    window.location.href = '/';
  };

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
            <span className="text-2xl font-bold text-white">Moonlume</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-purple-400 transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('features')} className="text-white hover:text-purple-400 transition-colors">
              Преимущества
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-purple-400 transition-colors">
              Тарифы
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-white hover:text-purple-400 transition-colors">
              Вопросы и ответы
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
              <>
                <button
                  onClick={() => (window.location.href = '/account')}
                  className="btn-gradient px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform"
                >
                  Личный кабинет
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full text-white font-semibold border border-purple-500/50 hover:bg-purple-500/10 transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <button
                onClick={() => (window.location.href = '/login')}
                className="btn-gradient px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform"
              >
                Подключиться
              </button>
            )}
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
              Главная
            </button>
            <button onClick={() => scrollToSection('features')} className="block text-white hover:text-purple-400 transition-colors">
              Преимущества
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block text-white hover:text-purple-400 transition-colors">
              Тарифы
            </button>
            <button onClick={() => scrollToSection('faq')} className="block text-white hover:text-purple-400 transition-colors">
              Вопросы и ответы
            </button>
            <div className="flex gap-2 pt-2">
              {isAuth ? (
                <>
                  <button
                    onClick={() => (window.location.href = '/account')}
                    className="btn-gradient px-6 py-2 rounded-full text-white font-semibold flex-1"
                  >
                    Личный кабинет
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-full text-white font-semibold border border-purple-500/50 hover:bg-purple-500/10 transition-colors flex-1"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <button
                  onClick={() => (window.location.href = '/login')}
                  className="btn-gradient px-6 py-2 rounded-full text-white font-semibold w-full"
                >
                  Подключиться
                </button>
              )}
            </div>
          </div>
        )}
        
      </nav>
    </header>
  );
}
