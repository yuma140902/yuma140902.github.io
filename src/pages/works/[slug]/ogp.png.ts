import { getCollection, getEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { responseOgImage } from '../../../ogp/generate_ogp';

export const GET: APIRoute = async ({ params }) => {
  const workId = params.slug;
  if (!workId) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const work = await getEntry('works', workId);
  if (!work) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return responseOgImage(work.data.name);
};

// 全ての記事ページ分のOGP画像のエンドポイントを生成
export const getStaticPaths = async () => {
  const works = await getCollection('works');
  return works.map((work) => ({
    params: {
      slug: work.id,
    },
  }));
};
