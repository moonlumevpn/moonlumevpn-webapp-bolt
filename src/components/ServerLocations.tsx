import { useEffect, useState } from 'react';
import api from '../lib/api';

interface Server {
  flag: string;
  country: string;
  city: string;
  ping: string;
}

export default function ServerLocations() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchOnce = () => {
      api
        .get('/api/servers')
        .then((res) => {
          if (!mounted) return;
          if (Array.isArray(res.data)) {
            setServers(res.data);
            setError(null);
          }
        })
        .catch((err) => {
          if (!mounted) return;
          const msg = err?.message || 'Failed to load servers';
          setError(msg);
          console.error('failed to load servers', err);
          // auto-dismiss error after 5 seconds
          setTimeout(() => mounted && setError(null), 5000);
        })
        .finally(() => mounted && setLoading(false));
    };

    // initial load
    fetchOnce();
    const id = setInterval(fetchOnce, 10000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-red-500/90 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in max-w-xs">
          <p className="text-sm font-semibold">Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}
      <section className="py-20 px-6">  
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Серверы по всей <span className="text-gradient">европе</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {/* Более 100 серверов в 50+ странах для максимальной скорости */}
              Всё что нужно для максимальной скорости и стабильности соединения
            </p>
          </div>

          {loading || error || servers.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="glass-card p-6 rounded-xl text-center border border-gray-600">
                  <div className="text-5xl mb-3 h-12 bg-gray-600/30 rounded animate-pulse" />
                  <div className="h-6 bg-gray-600/30 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-600/30 rounded animate-pulse w-2/3 mx-auto mb-2" />
                  <div className="h-6 bg-gray-600/30 rounded-full animate-pulse w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {servers.map((server, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl text-center hover:scale-110 transition-all duration-150 cursor-pointer hover:shadow-glow hover:ring-2 hover:ring-purple-400"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="text-5xl mb-3 transition-transform duration-150 hover:scale-125">{server.flag}</div>
                <h4 className="text-white font-semibold mb-1">{server.country}</h4>
                <p className="text-gray-400 text-sm mb-2">{server.city}</p>
                <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold transition-all duration-150 hover:bg-green-500/40 hover:shadow-glow">
                  {server.ping}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
