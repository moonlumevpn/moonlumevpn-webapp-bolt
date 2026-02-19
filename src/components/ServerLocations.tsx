const servers = [
  { flag: '🇫🇮', country: 'Finland', city: 'Helsinki', ping: '12ms' },
  { flag: '🇩🇪', country: 'Germany', city: 'Frankfurt', ping: '18ms' },
  { flag: '🇳🇱', country: 'Netherlands', city: 'Amsterdam', ping: '15ms' },
  { flag: '🇺🇸', country: 'USA', city: 'New York', ping: '95ms' },
  { flag: '🇬🇧', country: 'UK', city: 'London', ping: '25ms' },
  { flag: '🇸🇬', country: 'Singapore', city: 'Singapore', ping: '120ms' },
  { flag: '🇯🇵', country: 'Japan', city: 'Tokyo', ping: '140ms' },
  { flag: '🇦🇺', country: 'Australia', city: 'Sydney', ping: '180ms' }
];

export default function ServerLocations() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Серверы по всему <span className="text-gradient">миру</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Более 100 серверов в 50+ странах для максимальной скорости
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {servers.map((server, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer animate-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-5xl mb-3">{server.flag}</div>
              <h4 className="text-white font-semibold mb-1">{server.country}</h4>
              <p className="text-gray-400 text-sm mb-2">{server.city}</p>
              <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                {server.ping}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
