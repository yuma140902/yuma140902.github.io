// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeTextAutospace from 'rehype-text-autospace';
import remarkMath from 'remark-math';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yuma14.net',
  integrations: [icon(), sitemap(), react(), mdx()],
  redirects: {
    '/deploys/': '/monitor/',
    '/services/': '/monitor/',
    '/works/forks/': '/monitor/',
    '/webtools/': '/apps/',
    '/webtools/sort.html': '/apps/sort/',
    '/webtools/diff.html': 'https://old.yuma14.net/webtools/diff.html',
    '/webtools/csv2tex.html': '/apps/table/',
  },
  markdown: {
    shikiConfig: {
      theme: 'one-light',
      wrap: true,
    },
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeTextAutospace, rehypeKatex, rehypeSlug],
  },
});
