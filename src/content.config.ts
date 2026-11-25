import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { technologySchema } from './data/technology_enum';

const works = defineCollection({
  loader: glob({
    base: './src/content/works',
    pattern: '{main,old,scrap}/*.md',
  }),
  schema: z.object({
    name: z.string(),
    order: z.number().int().optional(),
    description: z.string(),
    repo: z.url().optional(),
    since: z.string().optional(),
    until: z.string().optional(),
    technologies: z.array(technologySchema).optional(),
    hasPage: z.boolean().default(false),
  }),
});

export const collections = { works };
