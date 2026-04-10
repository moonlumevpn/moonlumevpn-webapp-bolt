import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import ServerLocations from './components/ServerLocations';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import TemporaryRedirectPage from './pages/TemporaryRedirectPage';
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

  if (window.location.pathname === '/login') {
    return <TemporaryRedirectPage />;
  }

  const seoContent = seoPages[window.location.pathname];
  if (seoContent) {
    return <SeoLandingPage isScrolled={isScrolled} content={seoContent} />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#dce9ff]/90 via-[#eff5ff]/80 to-transparent" />
      <div className="pointer-events-none absolute left-[-12rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-[#9bc8ff]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[48rem] h-[22rem] w-[22rem] rounded-full bg-[#9ae8ff]/20 blur-3xl" />

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
