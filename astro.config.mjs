// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yuma14.net',
  markdown: {
    rehypePlugins: [
      rehypeSlug,
    ],
  },

  integrations: [mdx(), sitemap({
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
  })],
});
