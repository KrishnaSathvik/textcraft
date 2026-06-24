import { join } from 'path';
import { SITE_URL } from './site';
import { blogPosts } from '@/data/blogPosts';
import {
  buildBlogStructuredData,
  getBlogSeoDescription,
  getBlogSeoTitle,
} from '@/lib/blogStructuredData';
import {
  buildBlogStructuredData,
  getBlogSeoDescription,
  getBlogSeoTitle,
} from '@/lib/blogStructuredData';

export interface SeoRouteConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  robots?: string;
  structuredData?: Record<string, unknown>;
}

const toolSchema = (
  name: string,
  description: string,
  path: string
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: `${SITE_URL}${path}`,
  applicationCategory: 'Text Processing Tool',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
});

export const staticSeoRoutes: SeoRouteConfig[] = [
  {
    path: '/',
    title: 'TextCraft - Professional Text Processing Tools',
    description:
      'Six free browser-based text tools: word counter, case converter, line breaks remover, text diff checker, lorem ipsum generator, and text sorter. Fast, private, and always available.',
    keywords:
      'text processing tools, word counter, case converter, line breaks, text diff, lorem ipsum, text sorter, online text tools',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'TextCraft',
      description: 'Professional text processing tools that run entirely in your browser',
      url: SITE_URL,
      applicationCategory: 'Text Processing Tools',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  {
    path: '/word-counter',
    title: 'Word Counter - Free Online Text Analysis Tool | TextCraft',
    description:
      'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time estimates and text statistics.',
    keywords: 'word counter, character count, text analysis, reading time',
    structuredData: toolSchema(
      'Word Counter',
      'Free online word counting and text analysis tool',
      '/word-counter'
    ),
  },
  {
    path: '/case-converter',
    title: 'Case Converter - Free Online Text Case Tool | TextCraft',
    description:
      'Convert text between uppercase, lowercase, title case, camelCase, kebab-case, snake_case, and more. Free online case converter.',
    keywords: 'case converter, uppercase, lowercase, camelcase, kebab case',
    structuredData: toolSchema(
      'Case Converter',
      'Free online text case conversion tool',
      '/case-converter'
    ),
  },
  {
    path: '/line-breaks',
    title: 'Line Breaks Remover - Clean & Normalize Text | TextCraft',
    description:
      'Remove extra line breaks, trim trailing spaces, normalize whitespace, and clean pasted text. Free browser-based text cleanup tool.',
    keywords: 'line breaks remover, whitespace cleaner, text normalizer, trim spaces',
    structuredData: toolSchema(
      'Line Breaks Remover',
      'Clean and normalize text whitespace and line breaks',
      '/line-breaks'
    ),
  },
  {
    path: '/diff-checker',
    title: 'Text Diff Checker - Compare Two Texts Online | TextCraft',
    description:
      'Compare two texts side by side with line or word diff highlighting. Free online text diff checker with unified diff export.',
    keywords: 'text diff, compare text, diff checker, text comparison',
    structuredData: toolSchema(
      'Text Diff Checker',
      'Compare two texts and highlight differences',
      '/diff-checker'
    ),
  },
  {
    path: '/lorem-ipsum',
    title: 'Lorem Ipsum Generator - Placeholder Text | TextCraft',
    description:
      'Generate lorem ipsum placeholder text by words, sentences, or paragraphs. Free online lorem ipsum generator with HTML output.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text',
    structuredData: toolSchema(
      'Lorem Ipsum Generator',
      'Generate placeholder text for designs and mockups',
      '/lorem-ipsum'
    ),
  },
  {
    path: '/text-sorter',
    title: 'Text Sorter - Sort Lines & Remove Duplicates | TextCraft',
    description:
      'Sort text lines alphabetically, by length, or reverse order. Remove duplicates and organize lists instantly in your browser.',
    keywords: 'text sorter, sort lines, remove duplicates, alphabetical sort',
    structuredData: toolSchema(
      'Text Sorter',
      'Sort and organize text lines alphabetically',
      '/text-sorter'
    ),
  },
  {
    path: '/blog',
    title: 'Text Processing Blog - TextCraft',
    description:
      'Text processing tips, tutorials, and guides for word counting, case conversion, diffing, and more.',
    keywords: 'text processing blog, writing tools, text manipulation',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'TextCraft Text Processing Blog',
      description: 'Text processing tips and tutorials',
      url: `${SITE_URL}/blog`,
      publisher: { '@type': 'Organization', name: 'TextCraft', url: SITE_URL },
    },
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions - TextCraft',
    description:
      'Answers about TextCraft text tools, privacy, offline use, and browser support.',
    keywords: 'TextCraft FAQ, text tools help, privacy',
  },
  {
    path: '/about',
    title: 'About TextCraft - Privacy-Focused Text Tools',
    description:
      'Learn about TextCraft — free browser-based text processing tools built for writers and developers.',
    keywords: 'about TextCraft, text tools, privacy-focused',
  },
  {
    path: '/comparisons',
    title: 'TextCraft vs Other Text Processing Tools',
    description:
      'Compare TextCraft with other online text tools for privacy, speed, and features.',
    keywords: 'text tools comparison, word counter comparison',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy - TextCraft',
    description: 'How TextCraft handles privacy, cookies, and local browser processing.',
    keywords: 'TextCraft privacy policy',
  },
  {
    path: '/terms',
    title: 'Terms of Service - TextCraft',
    description: 'Terms of use for TextCraft text processing tools.',
    keywords: 'TextCraft terms of service',
  },
];

export const blogSeoRoutes: SeoRouteConfig[] = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: getBlogSeoTitle(post),
  description: getBlogSeoDescription(post),
  keywords: post.tags.join(', '),
  ogType: 'article',
  structuredData: buildBlogStructuredData(post),
}));

export const allSeoRoutes: SeoRouteConfig[] = [...staticSeoRoutes, ...blogSeoRoutes];

export const getSeoForPath = (pathname: string): SeoRouteConfig | undefined =>
  allSeoRoutes.find((route) => route.path === pathname);

/** Extract Article headline from flat or @graph structured data. */
function getStructuredHeadline(data?: Record<string, unknown>): string | undefined {
  if (!data) return undefined;
  if (typeof data.headline === 'string') return data.headline;

  const graph = data['@graph'];
  if (Array.isArray(graph)) {
    for (const item of graph) {
      if (
        item &&
        typeof item === 'object' &&
        (item as Record<string, unknown>)['@type'] === 'Article' &&
        typeof (item as Record<string, unknown>).headline === 'string'
      ) {
        return (item as Record<string, unknown>).headline as string;
      }
    }
  }

  if (typeof data.name === 'string') return data.name;
  return undefined;
}

/** Visible text that must appear in the prerendered body for a route. */
export function getPrerenderExpectText(route: SeoRouteConfig): string {
  switch (route.path) {
    case '/faq':
      return 'Frequently Asked Questions';
    case '/blog':
      return 'Start here';
    case '/comparisons':
      return 'Why Choose TextCraft?';
    case '/about':
      return 'About TextCraft';
    case '/privacy':
      return 'Privacy Policy';
    case '/terms':
      return 'Terms of Service';
    default:
      break;
  }

  const headline = getStructuredHeadline(route.structuredData);
  if (headline) return headline;

  const blogPost = blogPosts.find((post) => route.path === `/blog/${post.slug}`);
  if (blogPost) return blogPost.title;

  return route.title.split('|')[0].split(' - ')[0].trim();
}

export function getPrerenderOutputPath(distDir: string, routePath: string): string {
  return routePath === '/'
    ? join(distDir, 'index.html')
    : join(distDir, routePath.slice(1), 'index.html');
}
