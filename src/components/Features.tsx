import { Rocket, Globe, Users, Gift, Headphones, EyeOff, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-12 h-12" />,
    emoji: "🔐",
    title: "Надёжное шифрование",
    description: "Современные протоколы защищают интернет-трафик от перехвата"
  },
  {
    icon: <EyeOff className="w-12 h-12" />,
    emoji: "🕵️",
    title: "Без логов",
    description: "Мы не храним историю подключений и посещённые сайты"
  },
  {
    icon: <Zap className="w-12 h-12" />,
    emoji: "⚡",
    title: "Высокая скорость",
    description: "Стабильное соединение для стриминга, игр и загрузок"
  },
  {
    icon: <Globe className="w-12 h-12" />,
    emoji: "🌍",
    title: "Доступ к сайтам",
    description: "Обход блокировок и свободный интернет"
  },
  {
    icon: <Rocket className="w-12 h-12" />,
    emoji: "🤖",
    title: "Автоподбор сервера",
    description: "Приложение автоматически выбирает лучший сервер"
  },
  {
    icon: <Gift className="w-12 h-12" />,
    emoji: "🎁",
    title: "Бонус за друзей",
    description: "Приглашайте друзей и получайте бесплатные дни"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Почему <span className="text-gradient">Moonlume</span>?
          </h2>
          <p className="text-gray-400 text-lg">
            Все что нужно для приватного и безопасного интернет-подключения
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
