import { markdownToHtml } from 'satteri';
import { describe, expect, it } from 'vitest';

import { satteriKatex } from '../src/plugins/satteri-katex.mjs';

describe('satteriKatex', () => {
  it('renders inline and display math with KaTeX', () => {
    const result = markdownToHtml('inline $x^2$\n\n$$\ny = 1\n$$', {
      features: { math: true },
      hastPlugins: [satteriKatex()],
    });
    expect(result.html).toContain('<span class="katex">');
    expect(result.html).toContain('<span class="katex-display">');
    expect(result.html).toContain(
      '<annotation encoding="application/x-tex">x^2</annotation>',
    );
    expect(result.html).toContain(
      '<annotation encoding="application/x-tex">y = 1</annotation>',
    );
    expect(result.html).not.toContain('class="language-math');
    expect(result.html).not.toContain('<pre>');
  });

  it('renders math code fences as display math', () => {
    const result = markdownToHtml('```math\na + b\n```', {
      hastPlugins: [satteriKatex()],
    });
    expect(result.html).toContain('<span class="katex-display">');
    expect(result.html).toContain(
      '<annotation encoding="application/x-tex">a + b\n</annotation>',
    );
    expect(result.html).not.toContain('<pre>');
  });
});
