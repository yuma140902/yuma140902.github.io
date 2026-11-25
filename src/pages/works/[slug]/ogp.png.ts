import type { APIRoute } from 'astro';
import { getWorkPagePaths, type Work } from '../../../data/works';
import { responseOgImage } from '../../../ogp/generate_ogp';

export const GET: APIRoute<{ work: Work }> = ({ props }) => {
  return responseOgImage(props.work.data.name);
};

export const getStaticPaths = getWorkPagePaths;
