import { Rocket, Globe, Youtube, Users, Gift, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="w-12 h-12" />,
    emoji: '🚀',
    title: 'Скорость до 100 Mb/s',
    description: 'Молниеносная скорость для стриминга и загрузок'
  },
  {
    icon: <Globe className="w-12 h-12" />,
    emoji: '🌐',
    title: 'Доступ к Instagram, TikTok, Twitter',
    description: 'Полный доступ ко всем соцсетям без ограничений'
  },
  {
    icon: <Youtube className="w-12 h-12" />,
    emoji: '🔞',
    title: 'YouTube без рекламы',
    description: 'Смотрите любимые видео без назойливой рекламы'
  },
  {
    icon: <Users className="w-12 h-12" />,
    emoji: '🫂',
    title: 'Бонус до 36 дней за друга',
    description: 'Приглашайте друзей и получайте бесплатные дни'
  },
  {
    icon: <Gift className="w-12 h-12" />,
    emoji: '🆓',
    title: '7 дней бесплатно',
    description: 'Полнофункциональный пробный период без оплаты'
  },
  {
    icon: <Headphones className="w-12 h-12" />,
    emoji: '📱',
    title: 'Поддержка 24/7',
    description: 'Всегда готовы помочь в любое время суток'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Почему <span className="text-gradient">Moonlume VPN</span>?
          </h2>
          <p className="text-gray-400 text-lg">
            Все что нужно для безопасного и свободного интернета
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform animate-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
