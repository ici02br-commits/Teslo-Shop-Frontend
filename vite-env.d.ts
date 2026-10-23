/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Aquí puedes ir agregando las demás variables que uses en tu proyecto...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}