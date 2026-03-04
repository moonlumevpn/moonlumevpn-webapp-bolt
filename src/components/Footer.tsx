import { MessageCircle, Mail, Twitter } from 'lucide-react';

const TELEGRAM_SUPPORT_URL =
  import.meta.env.VITE_TELEGRAM_SUPPORT_URL || 'https://t.me/moonlume_support';
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
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Download</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Блог</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Карьера</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li>
                <a href={TELEGRAM_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Telegram Support
                </a>
              </li>
              <li><a href="mailto:support@moonlume.com" className="hover:text-purple-400 transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Moonlume VPN. Все права защищены.
          </p>

          <div className="flex items-center gap-4">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/moonlume" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:support@moonlume.com" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
