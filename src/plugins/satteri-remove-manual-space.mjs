import Slugger from 'github-slugger';
import { defineHastPlugin } from 'satteri';

/** @typedef {import('satteri').HastNode} HastNode */
/** @typedef {Extract<HastNode, { type: 'text' }>} Text */
/** @typedef {import('satteri').HastVisitorContext} Context */

const japanese = String.raw`[\p{Script=Han}ぁ-ゖァ-ヺー\u31F0-\u31FF]`;
const latinOrDigit = String.raw`[[\p{Script=Latin}--[\uFF00-\uFFEF]]0-9]`;
const mixedSpaces = new RegExp(
  String.raw`(?<=${japanese}\p{M}*) +(?=${latinOrDigit})|(?<=${latinOrDigit}\p{M}*) +(?=${japanese})`,
  'gv',
);

const inlineTags = new Set(['a', 'b', 'del', 'em', 'i', 's', 'span', 'strong']);
const preservedTags = new Set([
  'code',
  'kbd',
  'math',
  'pre',
  'samp',
  'script',
  'style',
  'svg',
  'textarea',
]);

export function satteriRemoveManualSpace() {
  return defineHastPlugin({
    name: 'satteri-remove-manual-space',
    before(root, ctx) {
      normalizeChildren(root.children, ctx, new Slugger());
    },
  });
}

/** @param {readonly HastNode[]} children @param {Context} ctx @param {Slugger} slugger */
function normalizeChildren(children, ctx, slugger) {
  /** @type {Text[]} */
  const run = [];

  /** @param {readonly HastNode[]} nodes */
  function visit(nodes) {
    for (const node of nodes) {
      if (node.type === 'text') {
        run.push(node);
        continue;
      }

      const tag =
        node.type === 'element'
          ? node.tagName
          : 'name' in node
            ? node.name
            : '';
      // Raw Markdown HTML can open a tag in one node and close it in another.
      const hasTextChildren =
        'children' in node &&
        !node.children.some((child) => child.type === 'raw');
      if (hasTextChildren && inlineTags.has(tag)) {
        visit(node.children);
        continue;
      }

      normalizeRun(run, ctx);
      run.length = 0;
      if (!('children' in node) || preservedTags.has(tag)) continue;

      // Astro generates heading IDs after this plugin. Use the original text
      // and the same slugger so existing heading links keep working.
      if (
        node.type === 'element' &&
        /^h[1-6]$/.test(tag) &&
        typeof node.properties.id !== 'string'
      ) {
        ctx.setField(node, 'properties', {
          ...node.properties,
          id: slugger.slug(ctx.textContent(node)),
        });
      }

      if (tag && hasTextChildren) {
        normalizeChildren(node.children, ctx, slugger);
      }
    }
  }

  visit(children);
  normalizeRun(run, ctx);
}

/** @param {Text[]} run @param {Context} ctx */
function normalizeRun(run, ctx) {
  if (run.length === 0) return;

  const text = run.map((node) => node.value).join('');
  const removed = new Set();
  for (const match of text.matchAll(mixedSpaces)) {
    for (let i = 0; i < match[0].length; i++) removed.add(match.index + i);
  }
  if (removed.size === 0) return;

  let offset = 0;
  for (const node of run) {
    const value = node.value.replace(/ /g, (space, index) =>
      removed.has(offset + index) ? '' : space,
    );
    offset += node.value.length;
    if (value !== node.value) ctx.setField(node, 'value', value);
  }
}
