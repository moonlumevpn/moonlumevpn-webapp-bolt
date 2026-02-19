export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center">
        <div className="animate-on-scroll opacity-0 translate-y-10">
          <div className="mb-8 flex justify-center">
            <div className="moon-glow">
              <span className="text-8xl md:text-9xl">🌙</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Лунный свет в кромешной<br />
            <span className="text-gradient">пустоте интернета</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Быстрый и безопасный VPN за <span className="text-purple-400 font-bold">150₽/мес</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform shadow-glow">
              Попробовать бесплатно (7 дней)
            </button>
            <button className="glass-button px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform">
              Выбрать тариф
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">100+</div>
              <div className="text-gray-400 mt-2">Серверов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-gray-400 mt-2">Стран</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">100 Mb/s</div>
              <div className="text-gray-400 mt-2">Скорость</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400 mt-2">Поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
