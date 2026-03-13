import { useEffect, useRef, useState } from 'react';
import api from '../lib/api';
import twemoji from 'twemoji';

interface Proxy {
  stableId: string;
  name: string;
  online: boolean;
  latencyMs: number;
}

const FLAG_REGEX = /^[\u{1F1E6}-\u{1F1FF}]{2}/u;

function extractFlag(name: string): string {
  const match = name.match(FLAG_REGEX);
  if (match) return match[0];
  return name.trim().split(/\s+/)[0] || '';
}

function stripLeadingFlag(name: string): string {
  return name.replace(FLAG_REGEX, '').trim();
}

function splitNameParts(name: string): { country: string; detail: string } {
  const [countryPart, detailPart] = stripLeadingFlag(name).split(' - ');
  return {
    country: (countryPart || '').trim(),
    detail: (detailPart || '').trim(),
  };
}

export default function ServerLocations() {
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchOnce = () => {
      api
        .get('/api/v1/public/proxies')
        .then((res) => {
          if (!mounted) return;
          if (res.data.success && Array.isArray(res.data.data)) {
            setProxies(res.data.data);
            setError(null);
          }
        })
        .catch((err) => {
          if (!mounted) return;
          const msg = err?.message || 'Failed to load proxies';
          setError(msg);
          console.error('failed to load proxies', err);
          // auto-dismiss error after 5 seconds
          setTimeout(() => mounted && setError(null), 5000);
        })
        .finally(() => mounted && setLoading(false));
    };

    // initial load
    fetchOnce();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    // Ensure emojis (including flags) render consistently across platforms.
    twemoji.parse(sectionRef.current, { folder: 'svg', ext: '.svg' });
  }, [proxies]);

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-red-500/90 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in max-w-xs">
          <p className="text-sm font-semibold">Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}
      <section ref={sectionRef} className="py-20 px-6">  
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Серверы по всей <span className="text-gradient">европе</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Подключайтесь к быстрым серверам в Европе
              для стабильного и защищённого интернет-соединения
            </p>
          </div>

          {loading || error || proxies.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-5xl mx-auto">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-5xl mx-auto">
              {proxies.map((proxy, index) => (
                (() => {
                  const parts = splitNameParts(proxy.name);
                  return (
                <div
                  key={index}
                  className="group p-5 md:p-6 lg:p-7 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 w-full"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[64px] leading-[64px] group-hover transition flag-symbol">
                      {extractFlag(proxy.name)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                        {parts.country}
                      </h3>
                      <p className="text-sm text-gray-400">{parts.detail || '—'}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-gray-400">Status</span>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${proxy.online ? 'text-green-400' : 'text-red-400'}`}>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          proxy.online ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'bg-red-400'
                        }`}
                        aria-hidden="true"
                      />
                      {proxy.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                  );
                })()
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
