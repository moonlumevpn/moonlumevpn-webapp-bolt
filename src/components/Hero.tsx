import { ShieldCheck, Sparkles, Zap, HelpCircle } from 'lucide-react';
import { APP_LINKS } from '../config/links';

interface Stat {
  label: string;
  value: string;
  accent: 'blue' | 'cyan';
}

export const glassPrimaryButton =
  "relative isolate overflow-hidden bg-blue-500/15 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 text-blue-700 font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.12)]";
  
export const glassSecondaryButton =
  "relative isolate overflow-hidden bg-white/25 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 text-[var(--color-text)] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.08)]";
export const glassHover =
  "hover:bg-white/70 hover:shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300";

export default function Hero() {
  const stats: Stat[] = [
    { label: 'Скорость', value: 'до 100 Мб/с', accent: 'blue' },
    { label: 'Приватность', value: 'AES-256', accent: 'cyan' },
    { label: 'Пробный период', value: '7 дней', accent: 'blue' },
    { label: 'Поддержка', value: '24/7', accent: 'cyan' }
  ];

  return (
    <section id="home"
      className="
    relative min-h-screen flex items-center justify-center
    pt-24 pb-16 px-6
    bg-gradient-to-b from-sky-50 via-white to-blue-50
  ">
    <div className="backdrop-blur-2xl bg-white/40 border border-white/30 shadow-xl"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[-200px] w-[600px] h-[600px] bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] left-1/3 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="surface-card rounded-[2rem] p-8 md:p-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-blue-50 border border-blue-100 text-[var(--color-primary-strong)] text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Быстрый и безопасный VPN на каждый день
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
              Подключите VPN
              <br />
              <span className="text-gradient">в браузере</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-10 max-w-3xl">
              7 дней бесплатно, тарифы от 79 ₽ и управление подпиской в браузере.
              Telegram доступен как дополнительный канал, если он работает в вашей сети.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                type="button"
                onClick={() => {
                  window.open(APP_LINKS.webApp, '_blank', 'noopener,noreferrer');
                }}
                className={`
    px-8 py-4 rounded-full text-lg
    ${glassPrimaryButton}
    ${glassHover}
    transition-all duration-300
  `}
              >
  <span className="relative z-10">
    Подключиться
  </span>
                <span className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('pricing');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}

                className={`
    px-8 py-4 rounded-full text-lg
    ${glassSecondaryButton}
    ${glassHover}
  `}

              >
                Смотреть тарифы
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xl font-bold ${stat.accent === 'blue' ? 'text-[#1f6dff]' : 'text-[#0ba5e9]'}`}>
                      {stat.value}
                    </span>
                    {stat.label === 'Скорость' && <Sparkles className="w-4 h-4 text-[#1f6dff]" />}
                    {stat.label === 'Приватность' && <ShieldCheck className="w-4 h-4 text-[#0ba5e9]" />}
                    {stat.label === 'Пробный период' && <Zap className="w-4 h-4 text-[#1f6dff]" />}
                    {stat.label === 'Поддержка' && <HelpCircle className="w-4 h-4 text-[#0ba5e9]" />}
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
