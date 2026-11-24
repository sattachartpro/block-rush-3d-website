import { ArrowRight, Coins, Compass, Gamepad2, Layers, Target } from 'lucide-react';
import { BRAND_INFO } from '../config/release';
import { Reveal } from './Reveal';

interface GuideCard {
  step: string;
  label: string;
  heading: string;
  body: string;
  icon: typeof Target;
}

const HOW_TO_PLAY_CARDS: GuideCard[] = [
  {
    step: '01',
    label: 'Objective & Modes',
    heading: 'Sprint, Stack Blocks, and Shatter Color Gates',
    body: 'In this single-player 3D Android arcade game, your goal is to run as far as possible, stack colored blocks along the track, and shatter matching color gates. Choose from Endless, campaign levels (Lvl 1), Daily seeded runs, or Practice mode from the home screen.',
    icon: Target,
  },
  {
    step: '02',
    label: 'Android Touch Controls',
    heading: 'Shift Lanes, Slide, and Jump',
    body: 'Steer smoothly across the three-lane 3D course using mobile touch controls tuned for Android screens. Use the on-screen Slide and Jump controls at the right moment to stay aligned with upcoming pickups and track layouts.',
    icon: Gamepad2,
  },
  {
    step: '03',
    label: 'Blocks & Gate Obstacles',
    heading: 'Match Your Color Stack to Each Gate',
    body: 'Pick up colored blocks on the lane to build your active Block Stack and tier. Watch the colored gates spanning the lanes ahead and steer into the gate that matches your color—hitting a mismatched gate ends the run.',
    icon: Layers,
  },
  {
    step: '04',
    label: 'Score, Coins & Revive',
    heading: 'Beat Your Best and Continue with Revive',
    body: 'Your live HUD tracks Score, Distance in meters, and collected Coins throughout each attempt. After a run ends, the Run Summary displays your Final Score, Distance, Gates Solved, and Coins Earned—with a Revive option to continue mid-run and an Armory to unlock runners, skins, blocks, and tracks with coins.',
    icon: Coins,
  },
];

interface QuickLink {
  label: string;
  href: string;
}

const RELATED_SECTIONS: QuickLink[] = [
  { label: 'View Gameplay Screenshots', href: '#screenshots' },
  { label: 'Check Android Download Status', href: '#download' },
  { label: 'Read APK Install Guide', href: '#install-guide' },
  { label: 'Browse FAQ', href: '#faq' },
];

export function HowToPlaySection() {
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', href);
    }
  };

  return (
    <section
      id="how-to-play"
      aria-labelledby="how-to-play-heading"
      className="border-b border-slate-800/70 bg-[#060A14] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-violet-400">
              Gameplay Overview &amp; Controls
            </p>
            <h2
              id="how-to-play-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
            >
              How to Play {BRAND_INFO.appName}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Learning how to play {BRAND_INFO.appName} takes seconds, while mastering fast 3D
              runs rewards sharp timing. Built as a focused mobile block game for Android, every
              run challenges you to stack blocks, clear color gates, collect coins, and beat your
              personal best.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {HOW_TO_PLAY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.step} delay={0.05 * idx}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium">
                      <span className="font-mono text-sky-400">
                        {card.step}. {card.label}
                      </span>
                      <Icon className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                      {card.heading}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                      {card.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Helpful Internal Navigation Links */}
        <Reveal delay={0.15}>
          <div className="mt-8 rounded-2xl border border-slate-800/90 bg-[#0B1120] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <Compass className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    Explore More of {BRAND_INFO.appName}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                    See the in-game HUD and track screens in real captures, or check release and
                    setup details.
                  </p>
                </div>
              </div>

              <nav
                aria-label="Related gameplay sections"
                className="flex flex-wrap items-center gap-x-6 gap-y-2"
              >
                {RELATED_SECTIONS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="inline-flex min-h-[36px] items-center gap-1.5 text-sm font-semibold text-sky-300 underline-offset-4 transition-colors hover:text-sky-200 hover:underline whitespace-nowrap"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
