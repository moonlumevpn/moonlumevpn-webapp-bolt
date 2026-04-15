import { APP_LINKS } from '../config/links';

const DOCS_BASE_URL = 'https://docs.moonlumevpn.ru';
const LINKS_CONFIG = {
  version: '2026-04-08',
  sections: {
    legal: {
      privacy_policy: '/docs/legal/privacy_policy',
      terms_of_use: '/docs/legal/terms_of_use',
      public_offer: '/docs/legal/public_offer',
      referral_program: '/docs/legal/referral_program',
    },
  },
} as const;

export default function Footer() {
  return (
    <footer className="py-14 px-6 border-t border-[var(--color-border)] bg-white/70">
      <div className="container mx-4 mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li><a href="#features" className="hover:text-[var(--color-primary-strong)] transition-colors">Возможности</a></li>
              <li><a href="#pricing" className="hover:text-[var(--color-primary-strong)] transition-colors">Тарифы</a></li>
              <li>
                <a href={APP_LINKS.telegramBot} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Telegram бот">
                  Телеграм бот
                </a>
              </li>
              <li>
                <a href={APP_LINKS.webApp} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Moonlume Web App">
                  Веб-приложение
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4">Ссылки</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li>
                <a href="/vpn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Telegram бот">
                  VPN
                </a>
              </li>

              <li>
                <a href="/free-vpn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Moonlume Web App">
                  Free VPN
                </a>
              </li>
              <li>
                <a href="/vpn-for-android" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Moonlume Web App">
                  VPN для Android
                </a>
              </li>
              <li>
                <a href="/vpn-for-ios" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Moonlume Web App">
                  VPN для iOS
                </a>
              </li>
              <li>
                <a href="/vpn-for-windows" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Moonlume Web App">
                  VPN для Windows
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li><a href="#faq" className="hover:text-[var(--color-primary-strong)] transition-colors">Вопросы и ответы</a></li>
              <li>
                <a href={APP_LINKS.telegramNews} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors flex items-center gap-2">
                  Новости
                </a>
              </li>
              <li>
                <a href={APP_LINKS.businessEmail} className="hover:text-[var(--color-primary-strong)] transition-colors flex items-center gap-2">
                  {APP_LINKS.businessEmailAddress}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4">Документы</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li>
                <a href={`${DOCS_BASE_URL}${LINKS_CONFIG.sections.legal.privacy_policy}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href={`${DOCS_BASE_URL}${LINKS_CONFIG.sections.legal.public_offer}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Публичная оферта
                </a>
              </li>
              <li>
                <a href={`${DOCS_BASE_URL}${LINKS_CONFIG.sections.legal.terms_of_use}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Условия пользования
                </a>
              </li>
              <li>
                <a href={`${DOCS_BASE_URL}${LINKS_CONFIG.sections.legal.referral_program}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Реферальная программа
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[var(--color-text-muted)] text-sm text-center mx-auto">
            <p className="text-[var(--color-text-muted)] text-sm">
              Ваш надежный проводник в мире свободного интернета. Быстро, безопасно, конфиденциально.
            </p>
            <br/>
            <p>© 2026 MoonlumeVPN. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
