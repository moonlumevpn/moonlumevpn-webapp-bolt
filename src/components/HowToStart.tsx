import { ExternalLink, Gift, Smartphone } from 'lucide-react';
import { APP_LINKS } from '../config/links';

const steps = [
  {
    icon: ExternalLink,
    title: 'Нажмите «Подключиться»',
    text: 'Управление подпиской и старт доступны в браузере, без обязательного Telegram.',
  },
  {
    icon: Gift,
    title: 'Активируйте 7 дней',
    text: 'Пробный период помогает проверить скорость и стабильность до оплаты.',
  },
  {
    icon: Smartphone,
    title: 'Подключите устройство',
    text: 'Следуйте подсказкам и используйте VPN на телефоне или компьютере.',
  },
];

export default function HowToStart() {
  return (
    <section id="start" className="py-20 px-6 bg-white/55">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Подключитесь <span className="text-gradient">в браузере</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Основной способ подключения работает в браузере. Telegram остается дополнительным каналом для управления, новостей и поддержки.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="surface-card rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[var(--color-primary-strong)]">
                  Шаг {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={APP_LINKS.webApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex px-7 py-3 rounded-full font-semibold hover:scale-[1.02] transition-transform"
          >
            Подключиться
          </a>
        </div>
      </div>
    </section>
  );
}
