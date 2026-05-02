import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { APP_LINKS } from '../config/links';

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

  const glassPrimaryButton = 'bg-white/55 backdrop-blur-xl border border-white/60 shadow-[0_8px_18px_rgba(44,88,165,0.14)]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-white/72 via-white/64 to-white/72 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/45 shadow-[0_10px_30px_rgba(33,77,154,0.16)]'
          : 'bg-transparent'
      }`}
    >
      <nav className={`container mx-auto px-6 py-4 ${isScrolled ? 'relative after:content-[\'\'] after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/85 after:to-transparent' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer"
                onClick={() => (window.location.href = '/')}>
            <img
              src="/icon.png"
              alt="Moonlume VPN"
              className="h-9 w-9 rounded-full ring-2 ring-blue-100"
            />
            <span className="text-xl md:text-2xl font-bold text-[var(--color-text)]">Moonlume VPN</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors font-medium">
              Преимущества
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors font-medium">
              Тарифы
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors font-medium">
              Вопросы и ответы
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a
              href={APP_LINKS.webApp}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-gradient px-6 py-2.5 rounded-full font-semibold hover:scale-[1.02] transition-transform ${glassPrimaryButton}`}
            >
              Подключиться
            </a>
          </div>

          <button
            className="md:hidden text-[var(--color-text)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-2xl bg-white/95 border border-[var(--color-border)] shadow-[var(--shadow-soft)] space-y-4">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors">
              Преимущества
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors">
              Тарифы
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors">
              Вопросы и ответы
            </button>
            <div className="flex gap-2 pt-2">
              <a
                href={APP_LINKS.webApp}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-gradient px-4 py-2 rounded-full font-semibold w-full text-center ${glassPrimaryButton}`}
              >
                Подключиться
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
