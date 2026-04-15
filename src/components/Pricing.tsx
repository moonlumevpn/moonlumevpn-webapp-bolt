import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { APP_LINKS } from '../config/links';

interface Plan {
  id: string;
  name: string;
  code: string;
  startPrice: number;
  currency: string;
  isPopular: boolean;
  features: string[];
}

function extractPlansPayload(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.plans)) return payload.data.plans;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.plans)) return payload.plans;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.result)) return payload.result;

  const queue: any[] = [payload];
  const seen = new Set<any>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== 'object' || seen.has(current)) continue;
    seen.add(current);

    for (const value of Object.values(current)) {
      if (Array.isArray(value) && value.length > 0) {
        const hasPlanLikeItems = value.every(
          (item) =>
            item &&
            typeof item === 'object' &&
            ('startPrice' in item || 'price' in item || 'name' in item || 'code' in item)
        );
        if (hasPlanLikeItems) return value;
      } else if (value && typeof value === 'object') {
        queue.push(value);
      }
    }
  }

  return [];
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChoosePlan = () => {
    window.open(APP_LINKS.webApp, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    let mounted = true;

    const fetchPlans = async () => {
      const endpoints = ['/api/v1/vpn-service/public/plans', '/api/v1/public/plans'];
      let lastError: any = null;

      for (const endpoint of endpoints) {
        try {
          const res = await api.get(endpoint);
          const rawPlans = extractPlansPayload(res.data);
          if (!rawPlans.length) {
            continue;
          }

          const normalized = rawPlans.map((plan: any, index: number): Plan => {
            const code = typeof plan.code === 'string' ? plan.code : `PLAN_${index}`;
            const name = typeof plan.name === 'string' ? plan.name : `Тариф ${index + 1}`;
            const startPrice = Number(plan.startPrice ?? 0);
            const currency = typeof plan.currency === 'string' ? plan.currency : 'RUB';
            const isPopular = Boolean(plan.popular ?? plan.isPopular);
            const features = Array.isArray(plan.features)
              ? plan.features.map((item: any) => String(item).trim()).filter(Boolean)
              : String(plan.features ?? '')
                  .split(';')
                  .map((item: string) => item.trim())
                  .filter(Boolean);

            return {
              id: `${code}-${index}`,
              code,
              name,
              startPrice,
              currency,
              isPopular,
              features
            };
          });

          if (
            import.meta.env?.DEV &&
            normalized.length > 0 &&
            !normalized.some((plan) => plan.isPopular)
          ) {
            const randomIndex = Math.floor(Math.random() * normalized.length);
            normalized[randomIndex].isPopular = true;
          }

          if (!mounted) return;
          setPlans(normalized);
          setError(null);
          return;
        } catch (err) {
          lastError = err;
        }
      }

      if (!mounted) return;
      setError(lastError?.message || 'Failed to load plans');
      console.error('Failed to load plans:', lastError);
    };

    fetchPlans().finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

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

        {loading && (
          <p className="text-center text-[var(--color-text-muted)] text-sm mb-6">Загрузка тарифов...</p>
        )}
        {!loading && error && (
          <p className="text-center text-red-500 text-sm mb-6">Не удалось загрузить тарифы: {error}</p>
        )}

        {loading || error || plans.length === 0 ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="surface-card rounded-2xl p-8 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="h-8 bg-slate-100 rounded w-3/4 animate-pulse" />
                  <div className="h-14 bg-slate-100 rounded w-1/2 animate-pulse" />
                </div>
                <div className="space-y-3 my-6">
                  <div className="h-6 bg-slate-100 rounded animate-pulse" />
                  <div className="h-6 bg-slate-100 rounded animate-pulse" />
                  <div className="h-6 bg-slate-100 rounded w-5/6 animate-pulse" />
                </div>
                <div className="h-11 bg-slate-100 rounded-full animate-pulse mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
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

