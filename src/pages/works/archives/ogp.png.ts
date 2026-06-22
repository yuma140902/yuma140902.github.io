import type { APIRoute } from 'astro';
import { responseOgImage } from '../../../ogp/generate_ogp';

export const GET: APIRoute = async () => {
  return responseOgImage('過去のプロジェクト');
};
