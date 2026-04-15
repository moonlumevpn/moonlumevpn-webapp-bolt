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
        .get('/v1/public/proxies')
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
          setTimeout(() => mounted && setError(null), 5000);
        })
        .finally(() => mounted && setLoading(false));
    };

    fetchOnce();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    twemoji.parse(sectionRef.current, { folder: 'svg', ext: '.svg' });
  }, [proxies]);

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-xs">
          <p className="text-sm font-semibold">Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}
      <section ref={sectionRef} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Серверы по всей <span className="text-gradient">Европе</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
              Подключайтесь к быстрым узлам для стабильного и защищенного соединения.
            </p>
          </div>

          {loading || error || proxies.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="surface-card p-6 rounded-xl text-center">
                  <div className="text-5xl mb-3 h-12 bg-slate-100 rounded animate-pulse" />
                  <div className="h-6 bg-slate-100 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3 mx-auto mb-2" />
                  <div className="h-6 bg-slate-100 rounded-full animate-pulse w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {proxies.map((proxy, index) => {
                const parts = splitNameParts(proxy.name);
                return (
                  <div
                    key={proxy.stableId || index}
                    className="group p-5 rounded-xl bg-white border border-[var(--color-border)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[52px] leading-[52px] flag-symbol">
                        {extractFlag(proxy.name)}
                      </span>
                      <div>
                        <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary-strong)] transition">
                          {parts.country}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)]">{parts.detail || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border)]">
                      <span className="text-sm text-[var(--color-text-muted)]">Статус</span>
                      <span className={`inline-flex items-center gap-2 text-sm font-semibold ${proxy.online ? 'text-green-600' : 'text-red-500'}`}>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            proxy.online ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.45)]' : 'bg-red-500'
                          }`}
                          aria-hidden="true"
                        />
                        {proxy.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

