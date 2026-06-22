import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { workSchema } from './data/works';

const works = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/contents/works',
  }),
  schema: workSchema,
});

export const collections = { works };
