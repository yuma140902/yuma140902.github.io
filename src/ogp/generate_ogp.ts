import { Resvg } from '@resvg/resvg-js';
import template from './template.svg?raw';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function renderOgImage(title: string): Uint8Array<ArrayBuffer> {
  const svg = template.replace('{{{TITLE}}}', escapeXml(title));
  const buf: Buffer<ArrayBufferLike> = new Resvg(svg, {
    font: {
      loadSystemFonts: true,
      fontFiles: [
        // 今は動いているが、パス周りの変更で動かなくなるかも知れない
        // フォントの raw data を渡したいが、そういうインターフェースはない
        // [Feature request: support loading fonts with raw data · Issue #101 · thx/resvg-js](https://github.com/thx/resvg-js/issues/101)
        'src/ogp/IBMPlexSansJP-Regular.ttf',
      ],
    },
  })
    .render()
    .asPng();

  /* Buffer<ArrayBufferLike> という型になっているが、そのまま Uint8Array 扱いできるはず*/
  return buf as unknown as Uint8Array<ArrayBuffer>;
}

export function responseOgImage(title: string): Response {
  const png = renderOgImage(title);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
