export interface AndroidReleaseInfo {
  /**
   * Direct HTTPS or relative URL to the verified, signed production APK.
   * Leave empty ('') until an official signed production release is published.
   * Debug APKs are automatically rejected.
   */
  apkUrl: string;
  /**
   * Verified release version string (e.g., "1.0.0").
   * Keep null until a verified release is published.
   */
  version: string | null;
  /**
   * Verified APK file size (e.g., "42.6 MB").
   * Keep null until a verified release is published.
   */
  fileSize: string | null;
  /**
   * Verified SHA-256 checksum of the signed production APK.
   * Keep null until a verified release is published.
   */
  sha256: string | null;
  /**
   * Minimum Android OS requirement once verified for the release build.
   */
  minAndroid: string | null;
}

export const BRAND_INFO = {
  appName: 'BLOCK RUSH 3D',
  packageId: 'com.blockrush3d.game',
  developer: 'Block Rush Studios',
  tagline: 'Play. Score. Beat Your Best.',
  supportEmail: 'sajidmalik0511@gmail.com',
  privacyPolicyUrl: 'https://sattachartpro.github.io/block-rush-3d-legal/privacy-policy.html',
} as const;

/**
 * Verified Android release configuration.
 * Configured via Vite environment variables at build time or updated directly
 * when publishing a signed production release.
 * Never populate with debug APKs or unverified placeholder numbers.
 */
export const ANDROID_RELEASE: AndroidReleaseInfo = {
  apkUrl: (import.meta.env.VITE_ANDROID_APK_URL ?? '').trim(),
  version: (import.meta.env.VITE_ANDROID_APK_VERSION ?? '').trim() || null,
  fileSize: (import.meta.env.VITE_ANDROID_APK_SIZE ?? '').trim() || null,
  sha256: (import.meta.env.VITE_ANDROID_APK_SHA256 ?? '').trim() || null,
  minAndroid: (import.meta.env.VITE_ANDROID_MIN_OS ?? '').trim() || null,
};

/**
 * Validates that a configured APK URL is a safe, non-debug production download.
 */
export function isVerifiedProductionApk(release: AndroidReleaseInfo): boolean {
  const url = release.apkUrl.trim();
  if (!url) return false;

  const lower = url.toLowerCase();
  if (lower.includes('debug')) {
    return false;
  }

  return url.startsWith('https://') || url.startsWith('./');
}
