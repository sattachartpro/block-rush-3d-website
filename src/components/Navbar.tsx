import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_INFO } from '../config/release';

interface NavbarProps {
  currentPage?: 'home' | 'how-to-play';
}

interface NavLinkItem {
  label: string;
  sectionId: string;
  isCurrentPageLink?: boolean;
}

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Features', sectionId: 'features' },
  { label: 'How to Play', sectionId: 'how-to-play', isCurrentPageLink: true },
  { label: 'Screenshots', sectionId: 'screenshots' },
  { label: 'Download', sectionId: 'download' },
  { label: 'Install Guide', sectionId: 'install-guide' },
  { label: 'FAQ', sectionId: 'faq' },
  { label: 'Support', sectionId: 'support' },
];

export function Navbar({ currentPage = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const getHref = (item: NavLinkItem) => {
    if (currentPage === 'how-to-play') {
      if (item.isCurrentPageLink) {
        return `${BASE_URL}how-to-play/`;
      }
      return `${BASE_URL}#${item.sectionId}`;
    }
    return `#${item.sectionId}`;
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, item: NavLinkItem) => {
    setMobileMenuOpen(false);

    if (currentPage === 'how-to-play') {
      if (item.isCurrentPageLink) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    event.preventDefault();
    const target = document.getElementById(item.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${item.sectionId}`);
    }
  };

  const homeHref = currentPage === 'home' ? '#top' : BASE_URL;
  const downloadHref = currentPage === 'home' ? '#download' : `${BASE_URL}#download`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#05070D]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href={homeHref}
          onClick={(e) => {
            if (currentPage === 'home') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', '#top');
            }
          }}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 transition-colors hover:text-sky-300"
        >
          {BRAND_INFO.appName}
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((item) => {
            const isActiveSubpage = currentPage === 'how-to-play' && item.isCurrentPageLink;
            return (
              <a
                key={item.sectionId}
                href={getHref(item)}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={isActiveSubpage ? 'page' : undefined}
                className={`text-sm font-medium whitespace-nowrap shrink-0 underline-offset-8 transition-colors hover:text-white hover:underline decoration-sky-400 ${
                  isActiveSubpage ? 'text-sky-300 underline' : 'text-slate-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={downloadHref}
            onClick={(e) => {
              if (currentPage === 'home') {
                e.preventDefault();
                setMobileMenuOpen(false);
                const target = document.getElementById('download');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                  window.history.replaceState(null, '', '#download');
                }
              }
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-xs font-semibold tracking-wide text-white whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.28)] transition-all duration-150 hover:from-blue-500 hover:to-violet-500"
          >
            Download APK
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-200 transition-colors hover:border-slate-700 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-800/80 bg-[#080C17] px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const isActiveSubpage = currentPage === 'how-to-play' && item.isCurrentPageLink;
              return (
                <a
                  key={item.sectionId}
                  href={getHref(item)}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={isActiveSubpage ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-slate-800/70 hover:text-white ${
                    isActiveSubpage ? 'text-sky-300' : 'text-slate-200'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={downloadHref}
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (currentPage === 'home') {
                  e.preventDefault();
                  const target = document.getElementById('download');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', '#download');
                  }
                }
              }}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Download APK
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
