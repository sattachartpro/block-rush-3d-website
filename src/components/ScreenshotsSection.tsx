import { useEffect, useState } from 'react';
import { Camera, Maximize2, Smartphone, X } from 'lucide-react';
import { SCREENSHOT_SLOTS, type ScreenshotSlot } from '../config/screenshots';
import { Reveal } from './Reveal';

export function ScreenshotsSection() {
  const [activeSlot, setActiveSlot] = useState<ScreenshotSlot | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!activeSlot) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveSlot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlot]);

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
                Gameplay Capture Gallery
              </p>
              <h2
                id="screenshots-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
              >
                In-game Android screenshot slots
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Dedicated slots reserved for verified in-game Android captures from{' '}
                <span className="font-mono text-sm text-sky-300">com.blockrush3d.game</span>.
                Promotional illustrations are never substituted for real gameplay screenshots.
              </p>
            </div>
            <p className="text-xs font-medium text-slate-400">
              4 Capture Slots
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              9:16 Android Portrait
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCREENSHOT_SLOTS.map((slot, idx) => {
            const hasRealImage = Boolean(slot.imageSrc) && !failedImages[slot.id];

            return (
              <Reveal key={slot.id} delay={0.05 * idx}>
                <button
                  type="button"
                  onClick={() => setActiveSlot(slot)}
                  aria-label={`Inspect ${slot.slotNumber}: ${slot.title}`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0B1120] text-left transition-colors duration-150 hover:border-sky-500/60 focus-visible:border-sky-400"
                >
                  {/* 9:16 Portrait Capture Slot */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden border-b border-slate-800/80 bg-[#060A13]">
                    {hasRealImage && slot.imageSrc ? (
                      <img
                        src={slot.imageSrc}
                        alt={slot.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [slot.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-between p-5 text-center">
                        <div className="flex w-full items-center justify-between text-[11px] font-mono text-slate-500">
                          <span>{slot.slotNumber}</span>
                          <Smartphone className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/60 text-sky-400 transition-colors group-hover:border-sky-500/60">
                            <Camera className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <p className="mt-4 font-display text-sm font-semibold text-slate-200">
                            Official Screenshot Slot
                          </p>
                          <p className="mt-1.5 max-w-[19ch] text-xs leading-relaxed text-slate-400">
                            Pending actual Android gameplay capture
                          </p>
                        </div>

                        <div className="w-full border-t border-slate-800/70 pt-3 text-[11px] text-slate-500">
                          Reserved for real APK build
                        </div>
                      </div>
                    )}

                    <span
                      aria-hidden="true"
                      className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/80 bg-[#05070D]/80 text-slate-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Slot Caption */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <p className="text-xs font-medium text-sky-400">
                        {slot.slotNumber}
                        <span aria-hidden="true" className="mx-1.5 text-slate-600">
                          ·
                        </span>
                        {hasRealImage ? 'Verified Capture' : 'Image Slot'}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold text-white">
                        {slot.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {slot.captureSubject}
                      </p>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Slot Inspection Modal */}
      {activeSlot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="screenshot-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveSlot(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B1120] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-sky-400">
                  {activeSlot.slotNumber}
                  <span aria-hidden="true" className="mx-2 text-slate-600">
                    ·
                  </span>
                  {activeSlot.imageSrc && !failedImages[activeSlot.id]
                    ? 'Verified Gameplay Capture'
                    : 'Pending Gameplay Capture'}
                </p>
                <h3
                  id="screenshot-modal-title"
                  className="mt-1 font-display text-xl font-bold text-white"
                >
                  {activeSlot.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveSlot(null)}
                aria-label="Close screenshot slot preview"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-800 bg-[#05070D]">
              {activeSlot.imageSrc && !failedImages[activeSlot.id] ? (
                <img
                  src={activeSlot.imageSrc}
                  alt={activeSlot.alt}
                  referrerPolicy="no-referrer"
                  className="aspect-[9/16] max-h-[60vh] w-full object-contain"
                />
              ) : (
                <div className="flex aspect-[9/16] max-h-[55vh] w-full flex-col items-center justify-center p-8 text-center">
                  <Camera className="h-10 w-10 text-sky-400" aria-hidden="true" />
                  <p className="mt-4 font-display text-base font-semibold text-white">
                    Official Screenshot Slot
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                    {activeSlot.captureSubject}
                  </p>
                  <p className="mt-4 text-xs text-slate-500">
                    Actual Android device screenshots will appear here once captured from the
                    production build.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
