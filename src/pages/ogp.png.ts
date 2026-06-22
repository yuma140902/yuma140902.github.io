import type { APIRoute } from 'astro';
import { responseOgImage } from '../ogp/generate_ogp';

export const GET: APIRoute = async () => {
  return responseOgImage(
    'yuma14.net - Rust、Neovim、ゲーム開発などに関する情報とツール',
  );
};
