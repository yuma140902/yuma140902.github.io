import { markdownToHtml, mdxToJs } from 'satteri';
import { describe, expect, it } from 'vitest';

import { satteriRemoveManualSpace } from '../src/plugins/satteri-remove-manual-space.mjs';

const options = { hastPlugins: [satteriRemoveManualSpace()] };

describe('satteriRemoveManualSpace', () => {
  it('removes spaces around links and emphasis while retaining heading IDs', () => {
    const { html } = markdownToHtml(
      '## Rust の使い方\n\n## Rust の使い方\n\n日本語 [Rust](https://example.com) で **Open GL** を 2 回試す。',
      options,
    );
    expect(html).toContain('<h2 id="rust-の使い方">Rustの使い方</h2>');
    expect(html).toContain('<h2 id="rust-の使い方-1">Rustの使い方</h2>');
    expect(html).toContain(
      '<p>日本語<a href="https://example.com">Rust</a>で<strong>Open GL</strong>を2回試す。</p>',
    );
  });

  it('preserves code, fullwidth characters and explicit nonbreaking spaces', () => {
    const { html } = markdownToHtml(
      '日本語　Rust / Ｒｕｓｔ の例 / 日本語&nbsp;Rust\n\n`日本語 Rust` を使用\n\n```text\n日本語 Rust\n```',
      options,
    );
    expect(html).toContain('日本語　Rust / Ｒｕｓｔ の例');
    expect(html.replaceAll('&nbsp;', '\u00a0')).toContain('日本語\u00a0Rust');
    expect(html).toContain('<code>日本語 Rust</code> を使用');
    expect(html).toContain('<pre><code class="language-text">日本語 Rust\n');
  });

  it('normalizes MDX prose and JSX text while preserving attributes and expressions', () => {
    const { code } = mdxToJs(
      'Rust の例\n\n<p title="Rust の例">日本語 English</p>\n\n<pre>日本語 English</pre>\n\n{message}',
      options,
    );
    expect(code).toContain('children: "Rustの例"');
    expect(code).toContain('title: "Rust の例"');
    expect(code).toContain('children: "日本語English"');
    expect(code).toContain('children: "日本語 English"');
    expect(code).toContain('message');
  });
});
