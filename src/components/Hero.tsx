import { useEffect, useState } from 'react';
import Moon from './Moon';
import api from '../lib/api';

interface Stat {
  label: string;
  value: string;
  color: 'purple' | 'blue';
}

interface Proxy {
  stableId: string;
  name: string;
}

function extractCountryName(proxyName: string): string {
  const countryPart = proxyName.split(' - ')[0]?.trim() ?? '';
  const [firstToken, ...restTokens] = countryPart.split(' ');

  if (!firstToken) return countryPart;

  const hasFlagToken = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u.test(firstToken);
  if (hasFlagToken && restTokens.length > 0) {
    return restTokens.join(' ').trim();
  }

  return countryPart;
}

export default function Hero() {
  const reconnectPath = '/payment';
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Сервера', value: '0', color: 'purple' },
    { label: 'Страны', value: '0', color: 'blue' },
    { label: 'Скорость', value: 'до 100 Мб/с', color: 'purple' },
    { label: 'Поддержка', value: '24/7', color: 'blue' }
  ]);

  useEffect(() => {
    let mounted = true;
    api
      .get('/api/v1/public/proxies')
      .then((res) => {
        if (!mounted) return;
        if (res.data?.success && Array.isArray(res.data.data)) {
          const proxies: Proxy[] = res.data.data;
          const serverCount = proxies.length;
          const uniqueCountries = new Set(proxies.map((p) => extractCountryName(p.name))).size;
          
          setStats([
            { label: 'Сервера', value: serverCount.toString(), color: 'purple' },
            { label: 'Страны', value: uniqueCountries.toString(), color: 'blue' },
            { label: 'Скорость', value: 'до 100 Мб/с', color: 'purple' },
            { label: 'Поддержка', value: '24/7', color: 'blue' }
          ]);
        }
      })
      .catch((err) => console.error('Failed to load proxies:', err));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center">
        <div className="animate-on-scroll opacity-0 translate-y-10">
          <Moon />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Лунный свет в кромешной<br />
            <span className="text-gradient">пустоте интернета</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Защищённое интернет-подключение от <span className="text-purple-400 font-bold">79₽/мес.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={() => {
                window.location.href = reconnectPath;
              }}
              className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform shadow-glow"
            >
              Попробовать бесплатно (7 дней)
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="glass-button px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform"
            >
              Выбрать тариф
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

