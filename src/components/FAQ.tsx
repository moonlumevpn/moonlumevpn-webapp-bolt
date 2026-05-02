import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_LINKS } from '../config/links';

const TelegramIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
  </svg>
);

const faqs = [
  {
    question: 'Что такое VPN?',
    answer: 'VPN — это технология защищенного интернет-соединения. Она создает зашифрованный канал для вашего трафика, что помогает защитить личные данные и повысить конфиденциальность в сети.'
  },
  {
    question: 'Какие устройства поддерживает Moonlume VPN?',
    answer: 'MoonlumeVPN можно использовать на смартфонах, планшетах и компьютерах. Поддерживаются платформы iOS, Android, Windows и macOS.'
  },
  {
    question: 'Сколько устройств можно подключить?',
    answer: 'В тариф входит базовое количество устройств: Базовый — 1, Премиум — 2, Безлимит — 3. К любому тарифу можно добавить еще от 1 до 4 устройств.'
  },
  {
    question: 'Как происходит оплата?',
    answer: 'Оплата производится через Систему быстрых платежей (СБП). После успешной оплаты доступ к VPN активируется автоматически.'
  },
  {
    question: 'Есть ли бесплатный пробный период?',
    answer: 'Да. Мы предоставляем 7 дней бесплатного доступа, чтобы вы могли протестировать сервис и оценить скорость и стабильность соединения.'
  },
  {
    question: 'Нужен ли Telegram для подключения?',
    answer: 'Нет. Основной способ начать работу — подключиться через браузер. Telegram-бот, поддержка и канал новостей доступны как дополнительные ссылки.'
  },
  {
    question: 'Что делать, если возникли проблемы с подключением?',
    answer: 'Попробуйте перезапустить приложение и проверить качество сети. Если проблема сохраняется, обратитесь в поддержку — мы поможем решить ее как можно быстрее.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  });

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Частые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Не нашли ответ? Напишите нам в поддержку, мы всегда на связи.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white border border-[var(--color-border)] shadow-[var(--shadow-soft)]"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-[var(--color-surface-soft)] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-[var(--color-text)] font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--color-primary-strong)] flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-[var(--color-text-muted)]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

          <div className="mt-12 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">Остались вопросы?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href={APP_LINKS.telegramBot}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-medium text-[var(--color-primary-strong)] underline-offset-4 transition-colors hover:text-[#229ED9] hover:underline"
              >
                <TelegramIcon className="transition-colors duration-300 group-hover:text-[#229ED9]" />
                <span>Открыть Telegram-бот</span>
              </a>
              <a
                href={APP_LINKS.telegramSupportBot}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-medium text-[var(--color-primary-strong)] underline-offset-4 transition-colors hover:text-[#1f6dff] hover:underline"
              >
                <TelegramIcon className="transition-colors duration-300 group-hover:text-[#1f6dff]" />
                <span>Написать в поддержку</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
    </section>
  );
}
