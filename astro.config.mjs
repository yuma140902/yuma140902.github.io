// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      'rehype-slug',
      ['rehype-toc', { headings: ['h2', 'h3'] }],
    ],
  },
});
