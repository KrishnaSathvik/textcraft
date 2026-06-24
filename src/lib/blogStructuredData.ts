import type { BlogPost, BlogFaq } from '@/types/blog';
import { SITE_URL, OG_IMAGE } from '@/config/site';

export const TOOL_BY_SLUG: Record<string, { name: string; path: string }> = {
  'word-counter': { name: 'Word Counter', path: '/word-counter' },
  'case-converter': { name: 'Case Converter', path: '/case-converter' },
  'line-breaks': { name: 'Line Breaks Remover', path: '/line-breaks' },
  'diff-checker': { name: 'Text Diff Checker', path: '/diff-checker' },
  'lorem-ipsum': { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum' },
  'text-sorter': { name: 'Text Sorter', path: '/text-sorter' },
};

export function normalizeToolSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  return slug.replace(/^\//, '');
}

export function getPrimaryTool(post: BlogPost): { name: string; path: string } | undefined {
  const key = normalizeToolSlug(post.relatedToolSlug);
  if (key && TOOL_BY_SLUG[key]) return TOOL_BY_SLUG[key];
  return post.relatedTools?.[0];
}

export function buildFaqPageSchema(faqs: BlogFaq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema(post: BlogPost) {
  const description = post.metaDescription ?? post.excerpt;
  const modified = post.updated ?? post.date;

  return {
    '@type': 'Article',
    headline: post.title,
    description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: modified,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'TextCraft', url: SITE_URL },
    image: OG_IMAGE,
  };
}

export function buildBlogStructuredData(post: BlogPost): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [buildArticleSchema(post)];

  if (post.faqs && post.faqs.length > 0) {
    graph.push(buildFaqPageSchema(post.faqs));
  }

  if (graph.length === 1) {
    return {
      '@context': 'https://schema.org',
      ...graph[0],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function getBlogSeoTitle(post: BlogPost): string {
  if (post.metaTitle) {
    return post.metaTitle.includes('TextCraft') ? post.metaTitle : `${post.metaTitle} | TextCraft`;
  }
  return `${post.title} | TextCraft Blog`;
}

export function getBlogSeoDescription(post: BlogPost): string {
  return post.metaDescription ?? post.excerpt;
}
