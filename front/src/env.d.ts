/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly PAT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
