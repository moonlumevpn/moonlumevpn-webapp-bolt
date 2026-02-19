import { Download, Zap, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: <Download className="w-12 h-12" />,
    emoji: '📥',
    title: 'Скачайте приложение',
    description: 'Загрузите Moonlume VPN на любое устройство'
  },
  {
    icon: <Zap className="w-12 h-12" />,
    emoji: '⚡',
    title: 'Подключитесь',
    description: 'Выберите сервер и нажмите одну кнопку'
  },
  {
    icon: <Sparkles className="w-12 h-12" />,
    emoji: '✨',
    title: 'Наслаждайтесь свободой',
    description: 'Серфите интернет без ограничений'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Как это <span className="text-gradient">работает</span>?
          </h2>
          <p className="text-gray-400 text-lg">
            Всего 3 простых шага до полной свободы в интернете
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-glow">
                  {index + 1}
                </div>

                <div className="text-6xl mb-6 mt-4">{step.emoji}</div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 translate-x-full">
                  <div className="text-purple-500 text-3xl">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
