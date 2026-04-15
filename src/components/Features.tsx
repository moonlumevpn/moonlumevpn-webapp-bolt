import { Shield, Gauge, Smartphone, Bolt, Globe, Headphones, Check } from 'lucide-react';

const features = [
  {
    icon: Shield,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Максимальная безопасность',
    description: 'AES-256 и VLESS защищают ваши данные',
    bullets: ['Без логирования', 'Kill Switch', 'DNS-защита']
  },
  {
    icon: Gauge,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Высокая скорость',
    description: 'Быстрые серверы без ограничений',
    bullets: ['50+ стран', 'Автовыбор сервера', 'Безлимит']
  },
  {
    icon: Smartphone,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Все платформы',
    description: 'Работает на Android, iOS, Windows, macOS',
    bullets: ['Синхронизация', 'Единый аккаунт']
  },
  {
    icon: Bolt,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    title: 'Простая настройка',
    description: 'Установка за 2 минуты',
    bullets: ['Автонастройка', 'Интуитивно']
  },
  {
    icon: Globe,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'Доступ к ChatGPT и другим нейросетям',
    description: 'YouTube без рекламы',
    bullets: ['Стабильное подключение']
  },
  {
    icon: Headphones,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: '24/7 Поддержка',
    description: 'Поддержка через Telegram-бот',
    bullets: ['Быстрые ответы']
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Почему <span className="text-gradient">MoonlumeVPN</span>?
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Все, что нужно для приватного и стабильного подключения в одной подписке.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="surface-card rounded-lg p-4 sm:p-6 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 sm:w-11 sm:h-11 ${feature.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                  <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">{feature.title}</h3>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2">
                {feature.description}
              </p>

              <ul className="space-y-0.5">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center text-xs text-gray-600">
                    <Check className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

