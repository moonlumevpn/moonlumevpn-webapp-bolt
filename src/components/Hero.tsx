import { useEffect, useState } from 'react';
import Moon from './Moon';
import api from '../lib/api';

interface Stat {
  label: string;
  value: string;
  color: 'purple' | 'blue';
}

export default function Hero() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Сервера', value: '0', color: 'purple' },
    { label: 'Страны', value: '0', color: 'blue' },
    { label: 'Скорость', value: 'до 100 Мб/с', color: 'purple' },
    { label: 'Поддержка', value: '24/7', color: 'blue' }
  ]);

  useEffect(() => {
    let mounted = true;
    api
      .get('/api/servers')
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res.data) && res.data.length) {
          const serverCount = res.data.length;
          interface Server { country: string; }
          const uniqueCountries = new Set(res.data.map((s: Server) => s.country)).size;
          
          setStats([
            { label: 'Сервера', value: serverCount.toString(), color: 'purple' },
            { label: 'Страны', value: uniqueCountries.toString(), color: 'blue' },
            { label: 'Скорость', value: 'до 100 Мб/с', color: 'purple' },
            { label: 'Поддержка', value: '24/7', color: 'blue' }
          ]);
        }
      })
      .catch((err) => console.error('Failed to load servers:', err));
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
            Быстрый и безопасный VPN от <span className="text-purple-400 font-bold">150₽/мес.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform shadow-glow">
              Попробовать бесплатно (3 дня)
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

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
