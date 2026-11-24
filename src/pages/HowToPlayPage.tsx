import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Coins,
  Gamepad2,
  HeartHandshake,
  Layers,
  Target,
  Trophy,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Reveal } from '../components/Reveal';
import { BRAND_INFO } from '../config/release';
import { GAME_SCREENSHOTS } from '../config/screenshots';

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const FEATURED_CAPTURES = [
  GAME_SCREENSHOTS[1], // IMG_20261123_181916.jpg - Home Screen & Modes
  GAME_SCREENSHOTS[0], // IMG_20261123_182012.jpg - Active 3D Gameplay
  GAME_SCREENSHOTS[2], // IMG_20261123_182021.jpg - Run Summary & Revive
];

export function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to main content
      </a>

      <Navbar currentPage="how-to-play" />

      <main id="main-content">
        {/* Page Header & Breadcrumb */}
        <section
          id="top"
          className="relative overflow-hidden border-b border-slate-800/70 bg-[#05070D] py-12 sm:py-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/4 h-[340px] w-[340px] rounded-full bg-blue-600/15 blur-[110px] ambient-glow"
          />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
              <a
                href={BASE_URL}
                className="font-medium text-sky-300 underline-offset-4 transition-colors hover:text-sky-200 hover:underline"
              >
                Home
              </a>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
              <span aria-current="page" className="font-medium text-slate-200">
                How to Play
              </span>
            </nav>

            <p className="mt-6 text-xs font-semibold tracking-wider text-sky-400">
              {BRAND_INFO.developer}
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              Android Gameplay Guide
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              <span className="font-mono text-slate-300">{BRAND_INFO.packageId}</span>
            </p>

            <h1 className="mt-3 font-display text-[clamp(2.1rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              How to Play {BRAND_INFO.appName}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
              Learn how to play {BRAND_INFO.appName}, a single-player 3D Android arcade game built
              around high-speed lane navigation, colored block stacking, color gate matching,
              coin rewards, and second-chance revives.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={BASE_URL}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-700/90 bg-[#0B1120] px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-sky-500/60 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 text-sky-400" aria-hidden="true" />
                Back to Homepage
              </a>
              <a
                href={`${BASE_URL}#screenshots`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.28)] transition-all hover:from-blue-500 hover:to-violet-500"
              >
                View All 10 Screenshots
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Core Gameplay Guide */}
        <section
          aria-labelledby="guide-sections-heading"
          className="border-b border-slate-800/70 bg-[#070B14] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="guide-sections-heading" className="sr-only">
              Gameplay Mechanics and Controls Breakdown
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Reveal>
                <article className="h-full rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs font-medium text-sky-400">
                    <span className="font-mono">01. Objective &amp; Modes</span>
                    <Target className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                    Game Modes &amp; Objective
                  </h2>
                  <h3 className="mt-4 font-display text-base font-semibold text-sky-300">
                    Sprint, Stack Blocks, and Shatter Color Gates
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                    In this mobile block game, your core objective is to sprint down the 3D track,
                    build your block stack, shatter matching color gates, and beat your personal
                    best score. From the main menu, select <strong>Endless</strong>,{' '}
                    <strong>Lvl 1</strong> (campaign stages), <strong>Daily</strong> (seeded daily
                    run), or <strong>Practice</strong> mode.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.05}>
                <article className="h-full rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs font-medium text-violet-400">
                    <span className="font-mono">02. Touch Controls</span>
                    <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                    Controls &amp; Track Movement
                  </h2>
                  <h3 className="mt-4 font-display text-base font-semibold text-violet-300">
                    Lane Shifting, Slide, and Jump
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                    {BRAND_INFO.appName} uses smooth touch input tuned for Android screens. Shift
                    across the three lanes on the 3D track to line up with colored blocks and coins,
                    and use the on-screen <strong>SLIDE</strong> and <strong>JUMP</strong> buttons
                    in the lower-right HUD during active runs.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.1}>
                <article className="h-full rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs font-medium text-sky-400">
                    <span className="font-mono">03. Obstacles &amp; Stack</span>
                    <Layers className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                    Blocks, Color Gates &amp; Obstacles
                  </h2>
                  <h3 className="mt-4 font-display text-base font-semibold text-sky-300">
                    Match Your Color Stack to Each Gate
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                    Collect colored blocks placed along the lanes to grow your{' '}
                    <strong>Block Stack</strong> and tier (displayed in the bottom-left HUD). When
                    colored gates appear ahead across the lanes, steer into the gate that matches
                    your color—hitting a mismatched gate ends the run.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.15}>
                <article className="h-full rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs font-medium text-violet-400">
                    <span className="font-mono">04. Progression &amp; Armory</span>
                    <Coins className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                    Scoring, Coins &amp; Revive Flow
                  </h2>
                  <h3 className="mt-4 font-display text-base font-semibold text-violet-300">
                    Live HUD, Run Summary &amp; Second Chance
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                    During a run, the top HUD tracks live <strong>Score</strong>,{' '}
                    <strong>Distance</strong> (in meters), and <strong>Coins</strong>. When a run
                    ends, the <strong>Run Summary</strong> screen reports{' '}
                    <strong>Final Score</strong>, <strong>Distance</strong>,{' '}
                    <strong>Gates Solved</strong>, and <strong>Coins Earned</strong>, with a{' '}
                    <strong>Revive</strong> option to continue mid-run. Earned coins unlock new
                    Runners, Skins, Blocks, and Tracks in the Armory, alongside Missions,
                    Achievements, and 7-Day Daily Rewards.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Visual Reference from Real Android Gameplay Captures */}
        <section
          aria-labelledby="visual-guide-heading"
          className="border-b border-slate-800/70 bg-[#05070D] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-sky-400">
                    Verified In-Game Reference
                  </p>
                  <h2
                    id="visual-guide-heading"
                    className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
                  >
                    Visual Guide from Android Gameplay
                  </h2>
                </div>
                <a
                  href={`${BASE_URL}#screenshots`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline whitespace-nowrap"
                >
                  Open full 10-screenshot gallery
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {FEATURED_CAPTURES.map((shot, idx) => (
                <Reveal key={shot.id} delay={0.05 * idx}>
                  <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0B1120]">
                    <div className="flex aspect-[1076/2212] w-full items-center justify-center border-b border-slate-800/80 bg-[#04060B]">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <figcaption className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-base font-bold text-white">{shot.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                        {shot.caption}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps & Internal Navigation */}
        <section
          aria-labelledby="next-steps-heading"
          className="border-b border-slate-800/70 bg-[#070B14] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="next-steps-heading"
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Next Steps &amp; Official Links
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                Continue exploring {BRAND_INFO.appName} across the official website sections.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href={`${BASE_URL}#screenshots`}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5 transition-colors hover:border-sky-500/60"
                >
                  <div>
                    <Trophy className="h-5 w-5 text-sky-400" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      Gameplay Screenshots
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Browse all 10 Android captures in fullscreen.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-300">
                    View gallery <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>

                <a
                  href={`${BASE_URL}#download`}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5 transition-colors hover:border-sky-500/60"
                >
                  <div>
                    <Layers className="h-5 w-5 text-violet-400" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      Android Download
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Current status: Coming Soon. Check release specifications.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-300">
                    Check status <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>

                <a
                  href={`${BASE_URL}#install-guide`}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5 transition-colors hover:border-sky-500/60"
                >
                  <div>
                    <Gamepad2 className="h-5 w-5 text-sky-400" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      APK Install Guide
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Step-by-step guide for installing the official signed APK.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-300">
                    Read install steps <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>

                <a
                  href={`${BASE_URL}#faq`}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5 transition-colors hover:border-sky-500/60"
                >
                  <div>
                    <HeartHandshake className="h-5 w-5 text-violet-400" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      FAQ &amp; Support
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Read verified answers or contact Block Rush Studios.
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-300">
                    Open FAQ <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer currentPage="how-to-play" />
    </div>
  );
}
