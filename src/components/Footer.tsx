import { MessageCircle } from 'lucide-react';

const TELEGRAM_SUPPORT_URL =
  import.meta.env.VITE_TELEGRAM_SUPPORT_URL || 'https://t.me/mrx_moonlume';
const TELEGRAM_BOT_URL =
  import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/moonlumevpn_bot';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-purple-500/20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🌙</span>
              <span className="text-xl font-bold text-white">
                Moonlume <span className="text-purple-400">VPN</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Лунный свет в кромешной пустоте интернета
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Возможности</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Тарифы</a></li>
              <li>
                <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="Telegram бот">
                  Telegram бот
                </a>
            </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">Вопросы и ответы</a></li>
              <li>
                <a href={TELEGRAM_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-2">

                  Telegram поддержка
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Документы</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/privacy_policy_MoonlumeVPN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/public_offer_MoonlumeVPN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  Публичная оферта
                </a>
              </li>
              <li>
                <a href="/terms_of_use_MoonlumeVPN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  Условия пользования
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center mx-auto">
            <p>© 2026 Moonlume VPN. Все права защищены.</p>
            <p>Разработано ИП Айгиз Искужин, ИНН 024803896842</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
