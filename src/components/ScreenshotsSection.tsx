import { type TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GAME_SCREENSHOTS } from '../config/screenshots';
import { Reveal } from './Reveal';

export function ScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const total = GAME_SCREENSHOTS.length;
  const activeShot = activeIndex !== null ? GAME_SCREENSHOTS[activeIndex] : null;

  const openLightbox = useCallback((idx: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(idx);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + total) % total));
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % total));
  }, [total]);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      lastFocusedRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        goPrev();
      } else if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, closeLightbox, goNext, goPrev]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? null;
    if (endX === null) return;

    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 48) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-heading"
      className="border-b border-slate-800/70 bg-[#05070D] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-violet-400">
                In-Game Android Captures
              </p>
              <h2
                id="screenshots-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
              >
                Gameplay screenshots
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Real screenshots captured directly from{' '}
                <span className="font-mono text-sm text-sky-300">com.blockrush3d.game</span> on
                Android. Select any capture to inspect it in fullscreen.
              </p>
            </div>
            <p className="text-xs font-medium tabular-nums text-slate-400">
              {total} Captures
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              Android Portrait
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {GAME_SCREENSHOTS.map((shot, idx) => (
            <Reveal key={shot.id} delay={Math.min(idx * 0.04, 0.24)}>
              <button
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={`Open fullscreen preview of ${shot.title}`}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0B1120] text-left transition-colors duration-150 hover:border-sky-500/60 focus-visible:border-sky-400"
              >
                <div className="relative flex aspect-[1076/2212] w-full items-center justify-center overflow-hidden border-b border-slate-800/80 bg-[#04060B]">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute right-2.5 bottom-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/80 bg-[#05070D]/85 text-slate-200 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <p className="font-mono text-[11px] font-medium tabular-nums text-sky-400">
                    {String(idx + 1).padStart(2, '0')} / {total}
                  </p>
                  <h3 className="mt-1 font-display text-sm font-bold text-white sm:text-base">
                    {shot.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {shot.caption}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeShot !== null && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="screenshot-lightbox-title"
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 border-b border-slate-800/80 bg-[#05070D]/90 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-mono text-xs tabular-nums text-sky-400">
                Screenshot {String(activeIndex + 1).padStart(2, '0')} of {total}
              </p>
              <h3
                id="screenshot-lightbox-title"
                className="truncate font-display text-base font-bold text-white sm:text-lg"
              >
                {activeShot.title}
              </h3>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close fullscreen preview"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:border-sky-500/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Center Image Viewport (Preserves Original Proportions) */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-3 sm:p-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous screenshot"
              className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-[#0B1120]/90 text-slate-200 transition-colors hover:border-sky-500/60 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              className="flex max-h-full max-w-full flex-1 items-center justify-center px-2 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeShot.src}
                alt={activeShot.alt}
                width={activeShot.width}
                height={activeShot.height}
                referrerPolicy="no-referrer"
                className="max-h-[calc(100dvh-13rem)] w-auto max-w-full rounded-xl border border-slate-800/90 object-contain shadow-2xl"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next screenshot"
              className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-[#0B1120]/90 text-slate-200 transition-colors hover:border-sky-500/60 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom Caption + Mobile Navigation Controls */}
          <div
            className="border-t border-slate-800/80 bg-[#05070D]/90 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-center text-xs leading-relaxed text-slate-300 sm:text-left sm:text-sm">
                {activeShot.caption}
              </p>

              <div className="flex items-center gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-100"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-100"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
