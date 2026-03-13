import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/api';

interface Plan {
  id: number;
  name: string;
  speedLimitMbps: number;
  startPrice: number;
  bandwidthLimitGb: number;
  isActive: boolean;
  isPopular: boolean;
  features: string;
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChoosePlan = () => {
    window.location.href = '/payment';
  };

  useEffect(() => {
    let mounted = true;
    api
      .get('/api/v1/vpn-service/public/plans')
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res.data) && res.data.length) {
          const normalized = res.data.map((plan: Plan) => ({ ...plan }));
          if (
            import.meta.env?.DEV &&
            normalized.length > 0 &&
            !normalized.some((plan) => plan.isPopular)
          ) {
            const randomIndex = Math.floor(Math.random() * normalized.length);
            normalized[randomIndex].isPopular = true;
          }
          setPlans(normalized);
          setError(null);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Failed to load plans');
        console.error('Failed to load plans:', err);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-on-scroll translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Выберите свой <span className="text-gradient">тариф</span>
          </h2>
          <p className="text-gray-400 text-lg">
            7 дней бесплатно • Без привязки карты • Отмена в любой момент
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-400 text-sm mb-6">Загрузка тарифов...</p>
        )}

        {loading || error || plans.length === 0 ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-8 flex flex-col justify-between h-full border border-gray-600">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-600/30 rounded w-3/4 animate-pulse" />
                  <div className="h-14 bg-gray-600/30 rounded w-1/2 animate-pulse" />
                </div>
                <div className="space-y-3 my-6">
                  <div className="h-6 bg-gray-600/30 rounded animate-pulse" />
                  <div className="h-6 bg-gray-600/30 rounded animate-pulse" />
                  <div className="h-6 bg-gray-600/30 rounded w-5/6 animate-pulse" />
                </div>
                <div className="h-11 bg-gray-600/30 rounded-full animate-pulse mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 transform animate-on-scroll translate-y-10 flex flex-col justify-between h-full ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-purple-500/20 via-violet-500/10 to-transparent border-2 border-purple-400/60 shadow-2xl shadow-purple-500/40 md:scale-105 hover:border-purple-300/80'
                    : 'bg-white/5 border border-white/10 hover:border-purple-300/60'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="px-5 py-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full text-sm font-bold shadow-lg shadow-purple-500/50 text-white">
                      РЕКОМЕНДУЕТСЯ
                    </span>
                  </div>
                )}

                <div className={`${plan.isPopular ? 'text-center mb-10' : 'text-center mb-8'}`}>
                  <h3
                    className={`${
                      plan.isPopular
                        ? 'text-3xl font-bold mb-6 text-white group-hover:text-purple-300 transition'
                        : 'text-2xl font-bold mb-4 text-white'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className={`flex items-end justify-center ${plan.isPopular ? 'gap-3' : 'gap-2'}`}>
                    <span
                      className={`${
                        plan.isPopular
                          ? 'text-6xl font-bold bg-gradient-to-r from-purple-300 to-violet-400 bg-clip-text text-transparent'
                          : 'text-5xl font-bold text-white'
                      }`}
                    >
                      {plan.startPrice} ₽
                    </span>
                    <span className={`${plan.isPopular ? 'mb-3 text-lg' : 'mb-2'} text-gray-400`}>/мес</span>
                  </div>
                </div>

                <ul className={`${plan.isPopular ? 'space-y-4 mb-10' : 'space-y-4 mb-8'}`}>
                  {plan.features.split(';').map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className={`${plan.isPopular ? 'text-sm' : 'text-base'} text-gray-300`}>
                        {feature.trim()}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={handleChoosePlan}
                  className={`w-full mt-auto transition transform hover:scale-105 ${
                    plan.isPopular
                      ? 'py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-500 to-violet-500 hover:shadow-2xl hover:shadow-purple-500/50 text-white active:scale-95'
                      : 'py-3 rounded-full font-semibold glass-button text-white'
                  }`}
                >
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
