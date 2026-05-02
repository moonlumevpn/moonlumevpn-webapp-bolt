import { APP_LINKS } from '../config/links';

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
                <a href={APP_LINKS.webApp} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Подключиться к MoonlumeVPN">
                  Подключиться
                </a>
              </li>
              <li>
                <a href={APP_LINKS.telegramBot} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Telegram бот">
                  Telegram-бот
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
                <a href="/free-vpn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="Free VPN">
                  Free VPN
                </a>
              </li>
              <li>
                <a href="/vpn-for-android" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="VPN для Android">
                  VPN для Android
                </a>
              </li>
              <li>
                <a href="/vpn-for-ios" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="VPN для iOS">
                  VPN для iOS
                </a>
              </li>
              <li>
                <a href="/vpn-for-windows" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors" aria-label="VPN для Windows">
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
                <a href={APP_LINKS.telegramSupportBot} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors flex items-center gap-2">
                  Telegram-поддержка
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4">Документы</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li>
                <a href={APP_LINKS.docs.privacyPolicy} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href={APP_LINKS.docs.publicOffer} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Публичная оферта
                </a>
              </li>
              <li>
                <a href={APP_LINKS.docs.termsOfUse} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
                  Условия пользования
                </a>
              </li>
              <li>
                <a href={APP_LINKS.docs.referralProgram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-strong)] transition-colors">
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
