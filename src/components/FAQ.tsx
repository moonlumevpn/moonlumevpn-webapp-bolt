import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    question: "Что такое VPN?",
    answer: "VPN — это технология защищённого интернет-соединения. Она создаёт зашифрованный канал между вашим устройством и сервером VPN, что помогает защитить личные данные и повысить конфиденциальность в сети."
  },
  {
    question: "Безопасно ли использовать MoonlumeVPN?",
    answer: "Да. MoonlumeVPN использует современный протокол VLESS и шифрование трафика, что помогает защитить данные пользователя при работе в интернете."
  },
  {
    question: "Какие устройства поддерживает MoonlumeVPN?",
    answer: "MoonlumeVPN можно использовать на смартфонах, планшетах и компьютерах. Поддерживаются платформы iOS, Android, Windows и macOS."
  },
  {
    question: "Сколько устройств можно подключить?",
    answer: "Количество устройств зависит от выбранного тарифа. Базовый план позволяет подключить 1 устройство, Премиум — до 2 устройств, Безлимит — до 3 устройств одновременно."
  },
  {
    question: "Как происходит оплата?",
    answer: "Оплата производится через Систему быстрых платежей (СБП). После успешной оплаты доступ к VPN активируется автоматически."
  },
  {
    question: "Есть ли ограничения по скорости?",
    answer: "Скорость зависит от выбранного тарифа. Базовый план — до 10 Мб/с, Премиум — до 50 Мб/с, тариф Безлимит — максимальная доступная скорость сети."
  },
  {
    question: "Есть ли бесплатный пробный период?",
    answer: "Да. Мы предоставляем 7 дней бесплатного доступа, чтобы вы могли протестировать сервис и оценить скорость и стабильность соединения."
  },
  {
    question: "Что делать, если возникли проблемы с подключением?",
    answer: "Попробуйте сменить сервер или перезапустить приложение. Если проблема сохраняется, обратитесь в поддержку — мы поможем решить её как можно быстрее."
  },
  {
    question: "Хранит ли MoonlumeVPN данные о пользователях?",
    answer: "MoonlumeVPN не ведёт журналов активности пользователей. Мы не храним историю посещённых сайтов или интернет-трафика."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Частые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Не нашли ответ? Напишите нам в поддержку — мы всегда рады помочь.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden animate-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-400 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          <div className="mt-12 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">Остались вопросы?</p>
            <a
              href="https://t.me/zero_ping_support"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-sm font-medium transition-[border-color,background-color,color] duration-500 hover:border-[#229ED9] hover:bg-[#229ED9]/5 active:border-[#229ED9] active:bg-[#229ED9]/10"
            >
              <TelegramIcon className="text-white transition-colors duration-300 group-hover:text-[#229ED9] group-active:text-[#229ED9]" />
              <span className="text-white transition-colors duration-300 group-hover:text-[#229ED9] group-active:text-[#229ED9]">
                Написать в Telegram
              </span>
            </a>
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
