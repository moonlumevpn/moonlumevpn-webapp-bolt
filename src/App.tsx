import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import ServerLocations from './components/ServerLocations';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import TemporaryRedirectPage from './pages/TemporaryRedirectPage';
import PayPage from './pages/PayPage';
import SeoLandingPage from './pages/seo/SeoLandingPage';
import seoPages from './pages/seo/seoPages';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (window.location.pathname === '/login') {
    return <TemporaryRedirectPage />;
  }

  if (window.location.pathname === '/register') {
    return <TemporaryRedirectPage />;
  }

  if (window.location.pathname === '/account') {
    return <TemporaryRedirectPage />;
  }

  if (window.location.pathname === '/payment') {
    return <TemporaryRedirectPage />;
  }

  if (/^\/pay\/[^/]+$/.test(window.location.pathname)) {
    return <PayPage />;
  }

  const seoContent = seoPages[window.location.pathname];
  if (seoContent) {
    return <SeoLandingPage isScrolled={isScrolled} content={seoContent} />;
  }

  return (
    <div className="relative bg-dark overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <Header isScrolled={isScrolled} />
        <Hero />
        <Features />
        <Pricing />
        <ServerLocations />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

export default App;
