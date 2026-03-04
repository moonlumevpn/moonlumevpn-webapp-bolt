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

  useEffect(() => {
    let mounted = true;
    api
      .get('/api/v1/public/plans')
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res.data) && res.data.length) {
          setPlans(res.data);
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
          <p className="text-gray-400 text-lg">Прозрачные цены без скрытых платежей</p>
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
                className={`glass-card rounded-2xl p-8 hover:scale-105 transition-transform animate-on-scroll translate-y-10 flex flex-col justify-between h-full ${
                  plan.isPopular ? 'ring-2 ring-purple-500 shadow-glow' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.startPrice} ₽</span>
                  <span className="text-gray-400 ml-2">/ мес</span>
                </div>

                <div
                  className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4 transition-opacity duration-200 ${
                    plan.isPopular ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  ПОПУЛЯРНЫЙ
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.split(';').map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all mt-auto ${
                    plan.isPopular
                      ? 'btn-gradient text-white hover:scale-105'
                      : 'glass-button text-white hover:scale-105'
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
