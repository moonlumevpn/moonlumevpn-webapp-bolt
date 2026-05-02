import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { APP_LINKS } from '../../config/links';
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

export default function SeoLandingPage({ isScrolled, content }: SeoLandingPageProps) {
  useSeoMeta({
    title: content.title,
    description: content.description,
    canonical: `https://moonlumevpn.ru${content.path}`
  });

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#dce9ff]/90 via-[#eff5ff]/80 to-transparent" />
      <div className="pointer-events-none absolute left-[-12rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-[#9bc8ff]/25 blur-3xl" />

      <div className="relative z-10">
        <Header isScrolled={isScrolled} />

        <main className="pt-28 pb-16">
          <section id="home" className="container mx-auto px-6">
            <div className="max-w-3xl rounded-3xl p-8 md:p-10 surface-card">
              <p className="text-[var(--color-primary-strong)] uppercase tracking-[0.2em] text-xs mb-4 font-semibold">Moonlume VPN</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight mb-6">
                {content.h1}
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                {content.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={content.ctaHref}
                  className="btn-gradient px-6 py-3 rounded-full font-semibold text-center"
                >
                  {content.ctaButton}
                </a>
                <a
                  href={APP_LINKS.telegramBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-center text-[var(--color-primary-strong)] font-semibold underline-offset-4 hover:underline"
                >
                  Открыть Telegram-бот
                </a>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-6 mt-14 space-y-14">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className="max-w-4xl rounded-3xl p-8 md:p-10 surface-card">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.id}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {content.screenshots && content.screenshots.length > 0 && (
              <section id="screenshots" className="max-w-5xl rounded-3xl p-8 md:p-10 surface-card">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-6">
                  Скриншоты приложения
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {content.screenshots.map((shot, index) => (
                    <div
                      key={`${shot.title}-${index}`}
                      className="rounded-2xl p-5 border border-[var(--color-border)] bg-[var(--color-surface-soft)]"
                    >
                      <div className="aspect-[9/16] rounded-xl border border-[var(--color-border)] mb-4 flex items-center justify-center text-[var(--color-primary-strong)] bg-white text-sm font-medium">
                        {shot.title}
                      </div>
                      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{shot.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.faq && content.faq.length > 0 && (
              <section id="faq" className="max-w-4xl rounded-3xl p-8 md:p-10 surface-card">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-6">FAQ</h2>
                <div className="space-y-6">
                  {content.faq.map((item, index) => (
                    <div
                      key={`${item.question}-${index}`}
                      className="border border-[var(--color-border)] rounded-2xl p-6 bg-white"
                    >
                      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">{item.question}</h3>
                      <p className="text-[var(--color-text-muted)] leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="download" className="max-w-4xl">
              <div className="rounded-3xl p-8 md:p-10 surface-card border-2 border-[#cddfff]">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-4">
                  {content.ctaTitle}
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">{content.ctaText}</p>
                <a
                  href={content.ctaHref}
                  className="btn-gradient px-6 py-3 rounded-full font-semibold inline-flex items-center justify-center"
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
