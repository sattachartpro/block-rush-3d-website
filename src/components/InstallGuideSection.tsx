import { ShieldAlert } from 'lucide-react';
import { BRAND_INFO } from '../config/release';
import { Reveal } from './Reveal';

interface InstallStep {
  step: string;
  title: string;
  body: string;
}

const INSTALL_STEPS: InstallStep[] = [
  {
    step: '01',
    title: 'Download the official APK',
    body: `Use the official download card above once released to save the signed ${BRAND_INFO.appName} Android package to your device.`,
  },
  {
    step: '02',
    title: 'Review browser install permission',
    body: 'When opening the APK file, Android may ask you to review and allow permission for your browser to install apps from this source ("Install unknown apps").',
  },
  {
    step: '03',
    title: 'Confirm package details and install',
    body: `Verify the Android installer prompt displays ${BRAND_INFO.appName} (${BRAND_INFO.packageId}) before proceeding with installation.`,
  },
  {
    step: '04',
    title: 'Launch and play',
    body: 'Once installation completes, open BLOCK RUSH 3D from your app drawer. You can optionally revoke browser install permission afterward in Android Settings.',
  },
];

export function InstallGuideSection() {
  return (
    <section
      id="install-guide"
      aria-labelledby="install-guide-heading"
      className="border-b border-slate-800/70 bg-[#05070D] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-sky-400">
              Android Setup Walkthrough
            </p>
            <h2
              id="install-guide-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
            >
              How to install the official APK
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Installing a direct Android release outside a store takes less than a minute. Follow
              these steps on your Android phone or tablet.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {INSTALL_STEPS.map((item, idx) => (
            <Reveal key={item.step} delay={0.05 * idx}>
              <article className="h-full rounded-2xl border border-slate-800/90 bg-[#0B1120] p-6">
                <p className="font-mono text-xs font-medium text-sky-400">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Official Signed Release Security Notice */}
        <Reveal delay={0.15}>
          <aside
            aria-label="Security notice"
            className="mt-6 flex flex-col gap-4 rounded-2xl border border-violet-500/35 bg-[#0F1326] p-6 sm:flex-row sm:items-start"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/40 bg-violet-950/50 text-violet-300">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Security Notice: Install Only the Official Signed Release
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                Download {BRAND_INFO.appName} exclusively from official {BRAND_INFO.developer}{' '}
                channels. Avoid modified or third-party re-hosted APKs, and check the SHA-256
                checksum published in the Download section once the signed release goes live.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
