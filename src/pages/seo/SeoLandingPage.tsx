import BackgroundEffects from '../../components/BackgroundEffects';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useSeoMeta } from '../../hooks/useSeoMeta';

export type SeoSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoScreenshot = {
  title: string;
  description: string;
};

export type SeoPageContent = {
  path: string;
  title: string;
  description: string;
  h1: string;
  heroSubtitle: string;
  sections: SeoSection[];
  faq?: SeoFaqItem[];
  screenshots?: SeoScreenshot[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaHref: string;
};

interface SeoLandingPageProps {
  isScrolled: boolean;
  content: SeoPageContent;
}

const TELEGRAM_BOT_URL =
  import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/moonlumevpn_bot';

export default function SeoLandingPage({ isScrolled, content }: SeoLandingPageProps) {
  useSeoMeta({
    title: content.title,
    description: content.description,
    canonical: `https://moonlumevpn.ru${content.path}`
  });

  return (
    <div className="relative bg-dark overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <Header isScrolled={isScrolled} />

        <main className="pt-28 pb-16">
          <section id="home" className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-purple-300 uppercase tracking-[0.2em] text-xs mb-4">Moonlume VPN</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {content.h1}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {content.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={content.ctaHref}
                  className="btn-gradient px-6 py-3 rounded-full text-white font-semibold text-center"
                >
                  {content.ctaButton}
                </a>
                <a
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-white font-semibold border border-purple-500/50 hover:bg-purple-500/10 transition-colors text-center"
                >
                  Открыть Telegram-бот
                </a>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-6 mt-14 space-y-14">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className="max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.id}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {content.screenshots && content.screenshots.length > 0 && (
              <section id="screenshots" className="max-w-5xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                  Скриншоты приложения
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {content.screenshots.map((shot, index) => (
                    <div
                      key={`${shot.title}-${index}`}
                      className="bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-transparent border border-purple-500/30 rounded-2xl p-5"
                    >
                      <div className="aspect-[9/16] rounded-xl bg-dark/70 border border-purple-500/30 mb-4 flex items-center justify-center text-purple-200 text-sm">
                        {shot.title}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{shot.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.faq && content.faq.length > 0 && (
              <section id="faq" className="max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">FAQ</h2>
                <div className="space-y-6">
                  {content.faq.map((item, index) => (
                    <div
                      key={`${item.question}-${index}`}
                      className="border border-purple-500/20 rounded-2xl p-6 bg-dark/60"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="download" className="max-w-4xl">
              <div className="bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent border border-purple-500/30 rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {content.ctaTitle}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">{content.ctaText}</p>
                <a
                  href={content.ctaHref}
                  className="btn-gradient px-6 py-3 rounded-full text-white font-semibold inline-flex items-center justify-center"
                >
                  {content.ctaButton}
                </a>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
