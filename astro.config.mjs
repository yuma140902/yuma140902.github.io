// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yuma14.net',
  outDir: './dist',
  integrations: [
    icon(),
    sitemap({
      customPages: [
        'https://yuma14.net/web-image-editor/',
        'https://yuma14.net/regend-webui/',
        'https://yuma14.net/dotfiles-public/',
        'https://yuma14.net/tempura-doc/',
        'https://yuma14.net/tempura-example/sample.html',
        'https://yuma14.net/sanmoku-next-js/',
        'https://yuma14.net/gomoku-react/',
        'https://yuma14.net/gomoku-blazor/',
        'https://yuma14.net/gomoku-elm/',
        'https://yuma14.net/simple-canvas-game/',
        'https://yuma14.net/typing/',
        'https://yuma14.net/Reverie/',
      ]
    }),
    react(),
    mdx()
  ],
  redirects: {
    '/deploys/': '/monitor/',
    '/services/': '/monitor/',
    '/works/forks/': '/monitor/',
    '/webtools/': '/apps/',
    '/webtools/sort.html': '/apps/sort/',
    '/webtools/diff.html': 'https://old.yuma14.net/webtools/diff.html',
    '/webtools/csv2tex.html': '/apps/table/',
    '/reverie/': 'https://yuma14.net/Reverie/',
  },
  markdown: {
    shikiConfig: {
      theme: 'one-light',
      wrap: true,
    },
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSlug],
  },
});
