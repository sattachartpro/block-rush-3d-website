/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_ANDROID_APK_URL?: string;
  readonly VITE_ANDROID_APK_VERSION?: string;
  readonly VITE_ANDROID_APK_SIZE?: string;
  readonly VITE_ANDROID_APK_SHA256?: string;
  readonly VITE_ANDROID_MIN_OS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
