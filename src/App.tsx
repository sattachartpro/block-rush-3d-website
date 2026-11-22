import { useEffect } from 'react';
import { DownloadSection } from './components/DownloadSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { InstallGuideSection } from './components/InstallGuideSection';
import { Navbar } from './components/Navbar';
import { ScreenshotsSection } from './components/ScreenshotsSection';
import { SupportSection } from './components/SupportSection';

export default function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#top') {
      const targetId = hash.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <DownloadSection />
        <InstallGuideSection />
        <SupportSection />
      </main>

      <Footer />
    </div>
  );
}
