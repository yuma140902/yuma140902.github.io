// @ts-check

import katex from 'katex';
import { defineHastPlugin } from 'satteri';

/** @typedef {Extract<import('satteri').HastNode, { type: 'element' }>} HastElement */
/** @typedef {Extract<import('satteri').HastNode, { type: 'raw' }>} HastRaw */

/** Render Satteri's math HAST nodes with KaTeX. */
export function satteriKatex() {
  return defineHastPlugin({
    name: 'satteri-katex',
    element: [
      {
        filter: ['pre'],
        visit(node, ctx) {
          const child =
            node.children.length === 1 ? node.children[0] : undefined;
          if (
            child?.type !== 'element' ||
            child.tagName !== 'code' ||
            !isMath(child)
          )
            return;
          return renderMath(ctx.textContent(child), true, child, ctx);
        },
      },
      {
        filter: ['code'],
        visit(node, ctx) {
          if (!hasClass(node, 'math-inline')) return;
          return renderMath(ctx.textContent(node), false, node, ctx);
        },
      },
    ],
  });
}

/** @param {HastElement} node */
function isMath(node) {
  return hasClass(node, 'language-math') || hasClass(node, 'math-display');
}

/** @param {HastElement} node @param {string} className */
function hasClass(node, className) {
  const classes = node.properties.className;
  return Array.isArray(classes) && classes.includes(className);
}

/**
 * @param {string} value
 * @param {boolean} displayMode
 * @param {HastElement} node
 * @param {import('satteri').HastVisitorContext} ctx
 * @returns {HastRaw}
 */
function renderMath(value, displayMode, node, ctx) {
  try {
    return {
      type: 'raw',
      value: katex.renderToString(value, { displayMode, throwOnError: true }),
    };
  } catch (error) {
    ctx.report({
      message: `Could not render math with KaTeX: ${String(error)}`,
      node,
      severity: 'warning',
    });
    return {
      type: 'raw',
      value: katex.renderToString(value, {
        displayMode,
        strict: 'ignore',
        throwOnError: false,
      }),
    };
  }
}
