import { useState } from 'react';
import { ArrowDown, Compass, Download } from 'lucide-react';
import heroArtwork from '../assets/images/hero_block_rush_1795383412257.jpg';
import { ANDROID_RELEASE, BRAND_INFO, isVerifiedProductionApk } from '../config/release';

export function HeroSection() {
  const [imageError, setImageError] = useState(false);
  const apkReady = isVerifiedProductionApk(ANDROID_RELEASE);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-800/70 bg-[#05070D]"
    >
      {/* Subtle futuristic neon gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/18 blur-[120px] ambient-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/5 h-[360px] w-[360px] rounded-full bg-violet-600/18 blur-[120px] ambient-glow"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Brand & Proposition */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-medium tracking-wider text-sky-400">
              {BRAND_INFO.developer}
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              Android Official Release
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              <span className="font-mono text-slate-300">{BRAND_INFO.packageId}</span>
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.04] tracking-tight text-white [text-wrap:balance]">
              {BRAND_INFO.appName}
            </h1>

            <p className="mt-4 font-display text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-violet-400 sm:text-2xl">
              {BRAND_INFO.tagline}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
              Guide your runner through an accelerating 3D block course built for precision mobile play.
              Push your score higher each run, collect coins along the lane, and use a second-chance
              revive to set a new personal best.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {apkReady ? (
                <a
                  href={ANDROID_RELEASE.apkUrl}
                  download
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-bold tracking-wide text-white whitespace-nowrap shrink-0 shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-all duration-150 hover:from-blue-500 hover:to-violet-500 active:scale-[0.99]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  DOWNLOAD FOR ANDROID
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection('download')}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-bold tracking-wide text-white whitespace-nowrap shrink-0 shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-all duration-150 hover:from-blue-500 hover:to-violet-500 active:scale-[0.99]"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  DOWNLOAD FOR ANDROID
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollToSection('features')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-700/90 bg-[#0B1120] px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-sky-500/60 hover:bg-[#11192E] hover:text-white"
              >
                <Compass className="h-4 w-4 text-sky-400" aria-hidden="true" />
                EXPLORE GAME
              </button>
            </div>

            {/* Verified Platform Metadata Row (Unboxed, Zero-Pill) */}
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <dt className="text-xs font-medium text-slate-400">Platform</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-100">Android Mobile</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400">Package ID</dt>
                <dd className="mt-1 truncate font-mono text-xs font-medium text-sky-300 sm:text-sm">
                  {BRAND_INFO.packageId}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400">Release Status</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-100">
                  {apkReady ? 'Signed APK Live' : 'Coming Soon'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Original 3D Block Gaming Promotional Artwork */}
          <div className="flex flex-col lg:col-span-6">
            <figure className="relative flex-1 overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0B1120] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
              {!imageError ? (
                <img
                  src={heroArtwork}
                  alt="Original 3D block promotional artwork for BLOCK RUSH 3D with illuminated electric blue and purple geometric blocks"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full min-h-[300px] object-cover lg:min-h-[420px]"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center bg-gradient-to-br from-[#0B1224] via-[#0F172A] to-[#1A103D] p-8 text-center">
                  <div className="h-16 w-16 rotate-12 rounded-xl border-2 border-sky-400/70 bg-blue-950/60 shadow-[0_0_24px_rgba(56,189,248,0.3)]" />
                  <p className="mt-5 font-display text-lg font-bold text-white">
                    {BRAND_INFO.appName}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Original 3D Block Key Artwork</p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070D]/85 via-transparent to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-xs font-medium text-slate-200">
                    Original Promotional Key Artwork
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Conceptual 3D block visual · Not an in-game screenshot
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
