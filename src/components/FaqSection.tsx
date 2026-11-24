import { type KeyboardEvent, type ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ANDROID_RELEASE, BRAND_INFO, isVerifiedProductionApk } from '../config/release';
import { Reveal } from './Reveal';

interface FaqItem {
  id: string;
  question: string;
  renderAnswer: (scrollToSection: (id: string) => void) => ReactNode;
}

const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  }
};

export function FaqSection() {
  const apkAvailable = isVerifiedProductionApk(ANDROID_RELEASE);
  const prefersReducedMotion = useReducedMotion();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'what-is-block-rush-3d': true,
  });
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const faqItems: FaqItem[] = [
    {
      id: 'what-is-block-rush-3d',
      question: 'What is BLOCK RUSH 3D?',
      renderAnswer: () => (
        <p>
          {BRAND_INFO.appName} is a single-player 3D arcade game developed by{' '}
          {BRAND_INFO.developer} (package ID{' '}
          <span className="font-mono text-xs text-sky-300">{BRAND_INFO.packageId}</span>). You
          guide a runner down a 3D track, stack colored blocks, clear color gates, collect coins,
          and push for higher scores.
        </p>
      ),
    },
    {
      id: 'target-platform',
      question: 'Which platform is BLOCK RUSH 3D designed for?',
      renderAnswer: () => (
        <p>
          {BRAND_INFO.appName} is designed specifically for Android mobile devices with touch
          controls tuned for Android screens. Availability on other platforms, offline mode, or
          age ratings has not yet been officially confirmed.
        </p>
      ),
    },
    {
      id: 'main-objective',
      question: 'What is the main objective of the game?',
      renderAnswer: () => (
        <p>
          Guided by the game&apos;s tagline—{BRAND_INFO.tagline}—the objective is to sprint through
          an accelerating 3D block course, navigate obstacles and color gates, collect coins, and
          set a new personal best score on each run.
        </p>
      ),
    },
    {
      id: 'scoring-system',
      question: 'How does the scoring system work?',
      renderAnswer: () => (
        <p>
          During an active run, your live score and distance increase as you progress down the
          track and clear obstacles and gates, while the game tracks your personal best across
          sessions. Detailed scoring formulas or additional ranking modes have not yet been
          officially confirmed.
        </p>
      ),
    },
    {
      id: 'collect-coins',
      question: 'Can players collect coins during gameplay?',
      renderAnswer: () => (
        <p>
          Yes. Coins appear along the 3D lane during gameplay so players can collect them through
          skillful movement and build their coin balance across runs.
        </p>
      ),
    },
    {
      id: 'revive-feature',
      question: 'What does the revive feature do?',
      renderAnswer: () => (
        <p>
          The revive feature offers a second-chance option after a run-ending collision or gate
          mismatch, letting you recover mid-run and continue your current attempt instead of
          starting over immediately.
        </p>
      ),
    },
    {
      id: 'gameplay-screenshots',
      question: 'Where can I find real gameplay screenshots?',
      renderAnswer: (navigate) => (
        <p>
          All 10 real Android gameplay captures are available in the{' '}
          <a
            href="#screenshots"
            onClick={(e) => {
              e.preventDefault();
              navigate('screenshots');
            }}
            className="font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
          >
            Gameplay Screenshots gallery
          </a>{' '}
          on this page, where you can select any capture to view it in fullscreen.
        </p>
      ),
    },
    {
      id: 'download-availability',
      question: 'Is BLOCK RUSH 3D available to download?',
      renderAnswer: (navigate) => (
        <p>
          {apkAvailable ? (
            <>
              The verified signed production APK is available in the{' '}
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('download');
                }}
                className="font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
              >
                Download section
              </a>
              .
            </>
          ) : (
            <>
              Current release status on this official website is{' '}
              <strong className="font-semibold text-white">Coming Soon</strong>. A verified signed
              production APK has not yet been published in the{' '}
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('download');
                }}
                className="font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
              >
                Download section
              </a>
              , and release dates, pricing, or Google Play availability have not yet been
              officially confirmed.
            </>
          )}
        </p>
      ),
    },
    {
      id: 'contact-developers',
      question: 'How can I contact the developers?',
      renderAnswer: (navigate) => (
        <p>
          For support questions, bug reports, or privacy inquiries, visit the{' '}
          <a
            href="#support"
            onClick={(e) => {
              e.preventDefault();
              navigate('support');
            }}
            className="font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
          >
            Privacy &amp; Player Support section
          </a>{' '}
          to use the contact form, or email {BRAND_INFO.developer} directly at{' '}
          <a
            href={`mailto:${BRAND_INFO.supportEmail}`}
            className="font-mono text-xs text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline sm:text-sm"
          >
            {BRAND_INFO.supportEmail}
          </a>
          .
        </p>
      ),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = faqItems.length - 1;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      buttonRefs.current[index === lastIndex ? 0 : index + 1]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      buttonRefs.current[index === 0 ? lastIndex : index - 1]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      buttonRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-slate-800/70 bg-[#05070D] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-sky-400">
              Verified Game &amp; Release Information
            </p>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Clear answers about {BRAND_INFO.appName} gameplay mechanics, Android release status,
              screenshots, and developer support.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = Boolean(openIds[item.id]);
            const buttonId = `faq-trigger-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <Reveal key={item.id} delay={Math.min(idx * 0.03, 0.2)}>
                <div className="overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0B1120] transition-colors duration-150 hover:border-slate-700">
                  <h3 className="m-0">
                    <button
                      ref={(el) => {
                        buttonRefs.current[idx] = el;
                      }}
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      onKeyDown={(e) => handleHeaderKeyDown(e, idx)}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-900/50 sm:px-6 sm:py-5"
                    >
                      <span className="font-display text-base font-bold text-white sm:text-lg">
                        {item.question}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-sky-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-800/80 px-5 py-4 text-sm leading-relaxed text-slate-300 sm:px-6 sm:py-5 sm:text-[15px]">
                          {item.renderAnswer(scrollToSection)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
