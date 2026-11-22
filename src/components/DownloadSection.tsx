import { useState } from 'react';
import { Check, Copy, Download, ShieldCheck } from 'lucide-react';
import {
  ANDROID_RELEASE,
  BRAND_INFO,
  isVerifiedProductionApk,
} from '../config/release';
import { Reveal } from './Reveal';

export function DownloadSection() {
  const [copiedHash, setCopiedHash] = useState(false);
  const apkAvailable = isVerifiedProductionApk(ANDROID_RELEASE);

  const handleCopySha256 = async () => {
    if (!ANDROID_RELEASE.sha256) return;
    try {
      await navigator.clipboard.writeText(ANDROID_RELEASE.sha256);
      setCopiedHash(true);
      window.setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="border-b border-slate-800/70 bg-[#070B14] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1120] p-6 sm:p-10">
            {/* Subtle radial highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/15 blur-[90px]"
            />

            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Download Card Info & Primary Action */}
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold tracking-wider text-sky-400">
                  Official Android Distribution
                </p>
                <h2
                  id="download-heading"
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]"
                >
                  Download {BRAND_INFO.appName}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  Published directly by {BRAND_INFO.developer}. Only verified, signed production
                  Android APKs are made available here—never debug builds.
                </p>

                <div className="mt-7">
                  {apkAvailable ? (
                    <a
                      href={ANDROID_RELEASE.apkUrl}
                      download
                      className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-all duration-150 hover:from-blue-500 hover:to-violet-500 sm:w-auto"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      DOWNLOAD FOR ANDROID
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="inline-flex min-h-[50px] w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-6 py-3.5 text-sm font-semibold tracking-wide text-slate-300 sm:w-auto"
                    >
                      <Download className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      Android download coming soon
                    </button>
                  )}

                  <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                      aria-hidden="true"
                    />
                    <span>
                      {apkAvailable
                        ? 'Signed production release verified. Confirm the SHA-256 checksum after downloading.'
                        : 'The verified signed production APK URL has not been published yet. Release metadata below will populate automatically upon release.'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Column: Verified Release Metadata Table */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-slate-800 bg-[#05070D] p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <h3 className="font-display text-base font-bold text-white">
                      Release Specifications
                    </h3>
                    <span className="font-mono text-xs text-slate-400">
                      {BRAND_INFO.packageId}
                    </span>
                  </div>

                  <dl className="mt-4 divide-y divide-slate-800/70 text-sm">
                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <dt className="text-slate-400">APK Version</dt>
                      <dd className="font-mono font-medium tabular-nums text-slate-100">
                        {ANDROID_RELEASE.version ?? 'Pending verified release'}
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <dt className="text-slate-400">File Size</dt>
                      <dd className="font-mono font-medium tabular-nums text-slate-100">
                        {ANDROID_RELEASE.fileSize ?? 'Pending verified release'}
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <dt className="text-slate-400">Package ID</dt>
                      <dd className="font-mono font-medium text-sky-300">
                        {BRAND_INFO.packageId}
                      </dd>
                    </div>

                    <div className="flex flex-col gap-2 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-slate-400">SHA-256 Checksum</dt>
                        {ANDROID_RELEASE.sha256 && (
                          <button
                            type="button"
                            onClick={handleCopySha256}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-sky-500/60 hover:text-white"
                          >
                            {copiedHash ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                Copy
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <dd className="break-all font-mono text-xs leading-relaxed text-slate-200">
                        {ANDROID_RELEASE.sha256 ?? 'Published with official signed APK'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
