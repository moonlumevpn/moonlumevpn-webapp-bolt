import BackgroundEffects from '../components/BackgroundEffects';
import Moon from '../components/Moon';

const TELEGRAM_SUPPORT_URL =
  import.meta.env.VITE_TELEGRAM_SUPPORT_URL || 'https://t.me/moonlume_support';
const TELEGRAM_BOT_URL =
  import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/moonlumevpn_bot';

export default function TemporaryRedirectPage() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = '/';
  };

  return (
    <div className="relative bg-dark min-h-screen">
      <BackgroundEffects />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-lg text-center">
          <Moon />

          <h1 className="text-4xl font-bold text-white">
            Moonlume <span className="text-purple-400">VPN</span>
          </h1>

          <p className="mt-4 text-gray-300">
            Login, registration, and payment pages are temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 glass-button py-3 rounded-full text-white font-semibold"
            >
              Back
            </button>

            <a
              href={TELEGRAM_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 glass-button py-3 rounded-full text-white font-semibold inline-flex items-center justify-center"
            >
              Open Telegram Support
            </a>

            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-gradient py-3 rounded-full text-white font-semibold inline-flex items-center justify-center"
            >
              Open Telegram Bot
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
