import type { ToolExample } from '@/types/tool';

export const TOOL_EXAMPLES: Record<string, ToolExample[]> = {
  'word-counter': [
    {
      name: 'Essay sample',
      input:
        'Writing tools should stay out of your way. Paste your draft here to check word count, reading time, and structure before you submit or publish.',
    },
  ],
  'case-converter': [
    { name: 'hello world', input: 'hello world example' },
    { name: 'Product title', input: 'convert this title to title case' },
  ],
  'line-breaks': [
    {
      name: 'PDF paste',
      input: 'This text was copied\nfrom a PDF and has\nawkward line breaks\nin the middle of sentences.',
    },
  ],
  'diff-checker': [
    {
      name: 'Edited paragraph',
      input: 'The quick brown fox jumps over the lazy dog.',
      input2: 'The quick brown fox leaps over the lazy dog.',
    },
  ],
  'lorem-ipsum': [
    { name: '3 paragraphs', input: 'paragraphs:3' },
    { name: '50 words', input: 'words:50' },
  ],
  'text-sorter': [
    {
      name: 'Names list',
      input: 'Zoe Martinez\nAaron Kim\nMia Patel\nBrian Okafor\nLena Singh',
    },
  ],
};
