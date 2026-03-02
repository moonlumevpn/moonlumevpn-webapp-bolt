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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

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
    return <LoginPage />;
  }

  if (window.location.pathname === '/register') {
    return <RegisterPage />;
  }

  if (window.location.pathname === '/account') {
    return <AccountPage />;
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
        <HowItWorks />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

export default App;
