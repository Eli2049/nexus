/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_DEFAULT_LANGUAGE: 'en' | 'ru';
  readonly VITE_SUPPORTED_LANGUAGES: string;
  readonly VITE_MAX_UPLOAD_SIZE: number;
  readonly VITE_DEFAULT_AVATAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}