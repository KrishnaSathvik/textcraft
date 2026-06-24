/** Primary writing guide for each tool page */
export const TOOL_GUIDES: Record<
  string,
  { slug: string; title: string; toolPath: string; toolName: string }
> = {
  'word-counter': {
    slug: 'how-many-words-should-a-blog-post-be',
    title: 'How Many Words Should a Blog Post Be? A Practical Word Count Guide',
    toolPath: '/word-counter',
    toolName: 'Word Counter',
  },
  'case-converter': {
    slug: 'title-case-vs-sentence-case-headlines',
    title: 'Title Case vs Sentence Case: When to Use Each for Headlines and Buttons',
    toolPath: '/case-converter',
    toolName: 'Case Converter',
  },
  'line-breaks': {
    slug: 'fix-broken-line-breaks-newsletter-paste',
    title: 'Fix Broken Line Breaks When Pasting Into Newsletters and Blog Editors',
    toolPath: '/line-breaks',
    toolName: 'Line Breaks Remover',
  },
  'diff-checker': {
    slug: 'compare-two-text-versions-online',
    title: 'How to Compare Two Text Versions Online Without Installing Software',
    toolPath: '/diff-checker',
    toolName: 'Text Diff Checker',
  },
  'lorem-ipsum': {
    slug: 'lorem-ipsum-generation',
    title: 'Lorem Ipsum Generation: Beyond Placeholder Text',
    toolPath: '/lorem-ipsum',
    toolName: 'Lorem Ipsum Generator',
  },
  'text-sorter': {
    slug: 'sort-bullet-lists-for-blog-posts',
    title: 'How to Sort and Clean Bullet Lists for Blog Posts and Resource Roundups',
    toolPath: '/text-sorter',
    toolName: 'Text Sorter',
  },
};
