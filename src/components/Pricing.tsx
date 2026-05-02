import { Check } from 'lucide-react';
import { APP_LINKS } from '../config/links';
import { STATIC_PLANS } from '../config/staticContent';

export default function Pricing() {
  const handleChoosePlan = () => {
    window.open(APP_LINKS.webApp, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Выберите свой <span className="text-gradient">тариф</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            7 дней бесплатно • Без привязки карты • Отмена в любой момент
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {STATIC_PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={`group relative p-8 rounded-3xl transition-all duration-500 transform flex flex-col justify-between h-full ${
                plan.isPopular
                  ? 'surface-card border-2 border-[#b8d0ff] md:scale-[1.02]'
                  : 'surface-card'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="px-5 py-2 bg-gradient-to-r from-[#1f6dff] to-[#0ba5e9] rounded-full text-sm font-bold text-white shadow-lg">
                    РЕКОМЕНДУЕТСЯ
                  </span>
                </div>
              )}

              <div className={`${plan.isPopular ? 'text-center mb-10' : 'text-center mb-8'}`}>
                <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]">
                  {plan.name}
                </h3>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-bold text-[var(--color-primary-strong)]">
                    {plan.startPrice} {plan.currency === 'RUB' ? '₽' : plan.currency}
                  </span>
                  <span className="mb-2 text-[var(--color-text-muted)]">/мес</span>
                </div>
              </div>

              <ul className={`${plan.isPopular ? 'space-y-4 mb-10' : 'space-y-4 mb-8'}`}>
                {plan.features.map((feature) => (
                  <li key={`${plan.code}-${feature}`} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text-muted)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleChoosePlan}
                className={`w-full mt-auto transition transform hover:scale-[1.02] ${
                  plan.isPopular
                    ? 'py-4 rounded-xl font-bold text-lg btn-gradient active:scale-95'
                    : 'py-3 rounded-full font-semibold border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-[var(--color-surface-soft)]'
                }`}
              >
                Подключиться
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
