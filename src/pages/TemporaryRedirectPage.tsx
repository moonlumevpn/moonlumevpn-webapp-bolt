import BackgroundEffects from '../components/BackgroundEffects';
import Moon from '../components/Moon';

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

          <h1 className="text-4xl font-bold text-white">Moonlume VPN</h1>

          <div className="mt-8">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
              <div className="flex items-center justify-center gap-4">
                <a
                  href="tg://resolve?domain=moonlumevpn_bot"
                  className="shrink-0"
                >
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src="https://cdn4.telesco.pe/file/Qy5BIo2oLTLaUDGwcizlh1PPat3rRsbDDz7XbpPPQ5N6RwhFEU96krmFy6qIIXeAISNMaQN7fJsq_2MjIRo-9G-LhKpH_ZT5ub-Ne1IrPTEdoT9liD5jYJKFZlzaiZTyBD6WPZiG9gK3U4NTHldWfqUn57qomZI29z9K2Iv9P7L44OvkSohA76xCryJXQrDn1TFwM4Y2u_cbbAsWdh9teDHgnCpXe2np0XkihiZfT1xT3BSqtasJozXEwb-_hTfsMKn2wdjSlG8nWV3xVW2GtPMB5k7PU3Zc_L-beMy40VhYOWF0rAs7MhTiaq66ltSgBZ0wNnxszAZiqCBzf3ch-Q.jpg"
                    alt="Moonlume VPN"
                  />
                </a>
                <div className="text-left">
                  <div className="text-xl font-semibold text-white">
                    Moonlume VPN
                  </div>
                  <div className="text-sm text-gray-300">@moonlumevpn_bot</div>
                </div>
              </div>

              <div
                className="mt-4 text-gray-200"
                dangerouslySetInnerHTML={{
                  __html:
                    '🔐 Приватность от 79Р/мес.<br>⚡ Быстро | 🌍 Без границ',
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <a
              href="tg://resolve?domain=moonlumevpn_bot"
              className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-[#2AABEE] px-5 py-3 text-white font-semibold"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M21.9 3.6c-.4-.4-1-.5-1.6-.3L3 9.6c-.7.3-1.1 1-1 1.7.1.7.6 1.2 1.3 1.4l4.5 1.4 2.1 6.1c.2.6.7 1 1.3 1.1.6.1 1.2-.1 1.6-.6l3-3.5 4.2 3.1c.5.4 1.2.4 1.7.1.5-.3.9-.9 1-1.5l2.1-13.7c.1-.6-.1-1.2-.5-1.6ZM9.2 13.6l8.9-7.6-6.6 9.2-.2 2.8-1.2-3.4-2.9-.9Z" />
              </svg>
              Подключиться
            </a>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleBack}
              className="w-full max-w-md glass-button py-2.5 rounded-lg text-white font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
