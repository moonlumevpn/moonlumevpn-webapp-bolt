import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '150₽',
    period: 'мес',
    features: [
      'Скорость до 50 Mb/s',
      'Доступ ко всем сайтам',
      '1 устройство',
      'Базовая поддержка',
      '7 дней бесплатно'
    ],
    popular: false
  },
  {
    name: 'Premium',
    price: '299₽',
    period: 'мес',
    features: [
      'Скорость до 100 Mb/s',
      'Доступ ко всем сайтам',
      '3 устройства',
      'Приоритетная поддержка',
      'Блокировка рекламы',
      'Бонусы за друзей'
    ],
    popular: true
  },
  {
    name: 'Unlimited',
    price: '499₽',
    period: 'мес',
    features: [
      'Максимальная скорость',
      'Доступ ко всем сайтам',
      'Неограниченно устройств',
      'VIP поддержка 24/7',
      'Блокировка рекламы',
      'Бонусы за друзей',
      'Выделенный IP'
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Выберите свой <span className="text-gradient">тариф</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Прозрачные цены без скрытых платежей
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card rounded-2xl p-8 hover:scale-105 transition-transform animate-on-scroll opacity-0 translate-y-10 ${
                plan.popular ? 'ring-2 ring-purple-500 shadow-glow' : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  ПОПУЛЯРНЫЙ
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">/ {plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                plan.popular
                  ? 'btn-gradient text-white hover:scale-105'
                  : 'glass-button text-white hover:scale-105'
              }`}>
                Выбрать план
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
