import type { APIRoute } from 'astro';
import { responseOgImage } from '../../ogp/generate_ogp';

export const GET: APIRoute = async () => {
  return responseOgImage('開発中のプロジェクト');
};
