import { BRAND_INFO } from '../config/release';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070D] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-800/80 pb-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-white">
              {BRAND_INFO.appName}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {BRAND_INFO.developer}
              <span aria-hidden="true" className="mx-2 text-slate-600">
                ·
              </span>
              <span className="font-mono">{BRAND_INFO.packageId}</span>
            </p>
          </div>

          <nav aria-label="Footer links" className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href={BRAND_INFO.privacyPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#support"
              className="font-medium text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Contact
            </a>
            <a
              href={`mailto:${BRAND_INFO.supportEmail}`}
              className="font-medium text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {BRAND_INFO.supportEmail}
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {BRAND_INFO.developer}. All rights reserved.
          </p>
          <p>Official game website for {BRAND_INFO.appName} on Android.</p>
        </div>
      </div>
    </footer>
  );
}
