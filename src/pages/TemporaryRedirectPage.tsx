import Moon from '../components/Moon';
import { APP_LINKS } from '../config/links';

export default function TemporaryRedirectPage() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = '/';
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-[#dce9ff]/90 via-[#eff5ff]/80 to-transparent" />
      <div className="pointer-events-none absolute left-[-8rem] top-[12rem] h-[18rem] w-[18rem] rounded-full bg-[#9bc8ff]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-[8rem] h-[16rem] w-[16rem] rounded-full bg-[#9ae8ff]/20 blur-3xl" />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl text-center">
          <div className="surface-card rounded-[2rem] p-8 md:p-10">
            <Moon />

            <h1 className="text-4xl font-bold text-[var(--color-text)]">MoonlumeVPN</h1>
            <p className="mt-3 text-[var(--color-text-muted)]">
              Выберите удобную платформу
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a
                href={APP_LINKS.telegramBotDeepLink}
                className="group rounded-2xl border border-[var(--color-border)] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
              >
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2AABEE] overflow-visible">

                    <span className="absolute inset-0 flex items-center justify-center">

                      <span className="inline-flex items-center justify-center rounded-full bg-white text-[#2AABEE] p-1">

                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-10 w-10 -m-1"
                          aria-hidden="true"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.820 1.23-.696.065-1.225-.46-1.900-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.830-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                        </svg>

                      </span>

                    </span>

                  </span>
                  <div>
                    <div className="text-[var(--color-text)] font-semibold">Телеграм Бот</div>
                    <div className="text-sm text-[var(--color-text-muted)]">@moonlumevpn_bot</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  Быстрый запуск и управление VPN
                </p>
              </a>

              <a
                href={APP_LINKS.webApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[var(--color-border)] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" aria-hidden="true">
                      <circle fill="#ffffff" cx="11.44" cy="11.5" r="2.97" />
                      <circle fill="#ffffff" cx="4.02" cy="10.79" r="2.02" />
                      <circle fill="#ffffff" cx="14.52" cy="18.62" r="2.02" />
                      <path fill="#ffffff" d="M19.57,4.2A2.43,2.43,0,1,0,22,6.63,2.43,2.43,0,0,0,19.57,4.2Zm0,3.8a1.37,1.37,0,1,1,1.36-1.37h0A1.37,1.37,0,0,1,19.57,8Z" />
                      <path fill="#ffffff" d="M18.2,6.68a8.29,8.29,0,0,0-5.06-3.32L12.86,4.7a6.95,6.95,0,1,1-8.22,5.38A6.88,6.88,0,0,1,6.51,6.61l-1-1A8.31,8.31,0,1,0,18.89,7.81,1.36,1.36,0,0,1,18.2,6.68Z" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-[var(--color-text)] font-semibold">Веб-приложение</div>
                    <div className="text-sm text-[var(--color-text-muted)]">web.moonlumevpn.ru</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  Больше функций, постоянный доступ
                </p>
              </a>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={handleBack}
                className="w-full max-w-md py-3 rounded-xl text-[var(--color-text)] font-semibold border border-[var(--color-border)] bg-white hover:bg-[var(--color-surface-soft)] transition-colors"
              >
                Вернуться
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
