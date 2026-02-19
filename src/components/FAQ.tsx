import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Что такое VPN?',
    answer: 'VPN (Virtual Private Network) - это технология, которая создает защищенное соединение между вашим устройством и интернетом. Она шифрует ваш трафик и скрывает ваш реальный IP-адрес, обеспечивая конфиденциальность и безопасность.'
  },
  {
    question: 'Как установить Moonlume VPN?',
    answer: 'Установка очень проста: скачайте приложение для вашей платформы (iOS, Android, Windows, macOS), установите его, войдите в свой аккount и нажмите кнопку подключения. Весь процесс занимает не более 2 минут!'
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем банковские карты (Visa, Mastercard, МИР), криптовалюту, Яндекс.Деньги, QIWI и другие популярные платежные системы. Все платежи защищены и проходят через безопасные каналы.'
  },
  {
    question: 'Могу ли я использовать VPN на нескольких устройствах?',
    answer: 'Да! В зависимости от выбранного тарифа вы можете использовать VPN на 1, 3 или неограниченном количестве устройств одновременно. Все ваши устройства будут защищены.'
  },
  {
    question: 'Как работает бесплатный пробный период?',
    answer: 'Мы предоставляем 7 дней полностью бесплатного доступа ко всем функциям VPN. Вам не нужно вводить данные карты при регистрации. После окончания пробного периода вы можете выбрать подходящий тариф.'
  },
  {
    question: 'Могу ли я получить возврат средств?',
    answer: 'Да, мы предлагаем 30-дневную гарантию возврата денег. Если вас что-то не устроит, мы вернем полную стоимость подписки без лишних вопросов.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Частые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Ответы на самые популярные вопросы
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
                  className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
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
        </div>
      </div>
    </section>
  );
}
