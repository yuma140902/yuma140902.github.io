import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

import Head from '@/layouts/HeadDefault';
import Layout from '@/layouts/LayoutDefault';

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  title: 'yuma14.net',
  extends: vikeReact,
  lang: 'ja',
} satisfies Config;
