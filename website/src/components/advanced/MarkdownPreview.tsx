/* eslint-disable @typescript-eslint/no-unused-vars */
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRewrite, { getCodeString } from 'rehype-rewrite';
import rehypeKatex from 'rehype-katex';
import type { Root, Element, RootContent } from 'hast';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';

export default function MarkdownPreview({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  return (
    <Markdown
      className={cn('prose', 'prose-pre:p-0', className)}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeKatex,
        [
          rehypeHighlight,
          {
            detect: true,
          },
        ],
        [
          rehypeRewrite,
          {
            rewrite: (
              node: Root | RootContent,
              index: number | null,
              parent: Root | Element | null
            ) => {
              if (node.type === 'element' && node.tagName === 'pre') {
                const codeElement = node.children[0];
                if (
                  codeElement.type === 'element' &&
                  codeElement.tagName === 'code'
                ) {
                  const code = getCodeString(node.children);
                  const className = codeElement.properties?.className ?? '';
                  const language =
                    /language-(\w+)/.exec(className as string)?.[1] ?? '';
                  codeElement.children.unshift(codeHeader({ code, language }));
                }
              }
            },
          },
        ],
      ]}
    >
      {children}
    </Markdown>
  );
}

function codeHeader({ code, language }: { code: string; language: string }) {
  const iconCheck: Element = {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: 'octicon-check',
      ariaHidden: 'true',
      viewBox: '0 0 16 16',
      fill: 'currentColor',
      height: 12,
      width: 12,
    },
    children: [
      {
        type: 'element',
        tagName: 'path',
        properties: {
          fillRule: 'evenodd',
          d: 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z',
        },
        children: [],
      },
    ],
  };
  const elCopied: Element = {
    type: 'element',
    tagName: 'div',
    properties: {
      className: 'elCopied flex items-center gap-1 text-xs hidden',
    },
    children: [iconCheck, { type: 'text', value: 'Copied' }],
  };
  const iconCopy: Element = {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: 'octicon-copy cursor-pointer',
      ariaHidden: 'true',
      viewBox: '0 0 16 16',
      fill: 'currentColor',
      height: 12,
      width: 12,
      title: 'Copy',
      // @ts-ignore
      onClickCapture: (e: MouseEvent) => {
        navigator.clipboard.writeText(code);
        const trigger = e.target as HTMLElement;
        const self =
          trigger.tagName === 'svg' ? trigger : trigger.parentElement!;
        const elCopied = self.parentElement?.querySelector(
          '.elCopied'
        ) as HTMLElement;

        self.classList.add('hidden');
        elCopied.classList.remove('hidden');

        setTimeout(() => {
          self.classList.remove('hidden');
          elCopied.classList.add('hidden');
        }, 2000);
      },
    },
    children: [
      {
        type: 'element',
        tagName: 'path',
        properties: {
          fillRule: 'evenodd',
          d: 'M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z',
        },
        children: [],
      },
      {
        type: 'element',
        tagName: 'path',
        properties: {
          fillRule: 'evenodd',
          d: 'M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z',
        },
        children: [],
      },
    ],
  };
  const iconGroup: Element = {
    type: 'element',
    tagName: 'div',
    properties: {
      class: 'flex items-center',
    },
    children: [elCopied, iconCopy],
  };
  const elLanguage: Element = {
    type: 'element',
    tagName: 'span',
    properties: {
      className: 'text-xs select-none',
    },
    children: [
      {
        type: 'text',
        value: language || 'text',
      },
    ],
  };
  const header: Element = {
    type: 'element',
    tagName: 'div',
    properties: {
      class: 'flex items-center justify-between mb-1 opacity-50',
    },
    children: [elLanguage, iconGroup],
  };
  return header;
}
