import { useState } from 'react';
import { Coins, Gamepad2, HeartHandshake, Layers, TrendingUp } from 'lucide-react';
import emblemArtwork from '../assets/images/block_rush_emblem_1795383412567.jpg';
import { Reveal } from './Reveal';

interface GameFeature {
  index: string;
  title: string;
  description: string;
  detail: string;
  icon: typeof Layers;
}

const VERIFIED_FEATURES: GameFeature[] = [
  {
    index: '02',
    title: 'Score Progression',
    description:
      'Every second and obstacle cleared pushes your live run score forward while tracking your personal best across sessions.',
    detail: 'Beat Your Best',
    icon: TrendingUp,
  },
  {
    index: '03',
    title: 'Coin Rewards',
    description:
      'Collect coins placed along the 3D lane during active runs to build your coin balance through skillful movement.',
    detail: 'In-Run Collection',
    icon: Coins,
  },
  {
    index: '04',
    title: 'Revive Feature',
    description:
      'Recover from a collision mid-run with the built-in revive option so a single mistake does not end a strong attempt.',
    detail: 'Second Chance',
    icon: HeartHandshake,
  },
  {
    index: '05',
    title: 'Smooth Mobile Controls',
    description:
      'Responsive touch input tuned specifically for Android screens, delivering crisp lane shifts and predictable timing.',
    detail: 'Touch Tuned',
    icon: Gamepad2,
  },
];

export function FeaturesSection() {
  const [emblemError, setEmblemError] = useState(false);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-b border-slate-800/70 bg-[#070B14] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-sky-400">
              Verified Gameplay Mechanics
            </p>
            <h2
              id="features-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
            >
              Built around focused 3D arcade runs
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Every mechanic in BLOCK RUSH 3D serves fast single-player arcade flow on Android—clean
              visuals, responsive steering, and rewarding high-score chases.
            </p>
          </div>
        </Reveal>

        {/* Asymmetric Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Marquee Feature 01 (Spans 2 columns on desktop) */}
          <Reveal className="lg:col-span-2">
            <article className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-8 lg:flex-row lg:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs font-medium text-sky-400">
                  <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>01. Core Experience</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                  Engaging 3D Block Gameplay
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  Navigate cleanly rendered 3D block formations with clear depth perception and
                  high-contrast lane geometry. Patterns escalate naturally as your run continues,
                  testing reaction speed and spatial timing.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
                  <span>Single-Player Arcade</span>
                  <span aria-hidden="true" className="text-slate-600">
                    ·
                  </span>
                  <span>3D Obstacle Courses</span>
                  <span aria-hidden="true" className="text-slate-600">
                    ·
                  </span>
                  <span>Android Optimized</span>
                </div>
              </div>

              <div className="w-full shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-[#05070D] sm:w-52">
                {!emblemError ? (
                  <img
                    src={emblemArtwork}
                    alt="Faceted 3D neon cube artwork representing BLOCK RUSH 3D block design"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setEmblemError(true)}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-blue-950/60 to-violet-950/60">
                    <Layers className="h-10 w-10 text-sky-400" aria-hidden="true" />
                  </div>
                )}
              </div>
            </article>
          </Reveal>

          {/* Feature 02 */}
          <Reveal delay={0.05}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="text-violet-400">{VERIFIED_FEATURES[0].index}. {VERIFIED_FEATURES[0].detail}</span>
                  <TrendingUp className="h-4 w-4 text-violet-400" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white">
                  {VERIFIED_FEATURES[0].title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {VERIFIED_FEATURES[0].description}
                </p>
              </div>
            </article>
          </Reveal>

          {/* Features 03, 04, 05 across bottom row */}
          {VERIFIED_FEATURES.slice(1).map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.index} delay={0.05 * (idx + 2)}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                      <span className="text-sky-400">
                        {feature.index}. {feature.detail}
                      </span>
                      <Icon className="h-4 w-4 text-sky-400" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
