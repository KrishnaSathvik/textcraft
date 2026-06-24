import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, Zap, Shield, Clock, Copy } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { blogPosts } from '@/data/blogPosts';
import { TOOL_GUIDES } from '@/lib/toolGuides';

const tools = [
  {
    name: 'Word Counter',
    path: '/word-counter',
    tag: 'COUNT / ANALYZE',
    description:
      'Count words, characters, sentences, and paragraphs. Get reading and speaking time estimates instantly.',
    keywords: ['word', 'count', 'character', 'sentence', 'reading time'],
  },
  {
    name: 'Case Converter',
    path: '/case-converter',
    tag: 'CONVERT / FORMAT',
    description:
      'Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more.',
    keywords: ['case', 'convert', 'uppercase', 'lowercase', 'camelcase', 'title case'],
  },
  {
    name: 'Line Breaks Remover',
    path: '/line-breaks',
    tag: 'CLEAN / FORMAT',
    description:
      'Remove extra line breaks and fix messy text pasted from PDFs, Word, emails, and newsletters.',
    keywords: ['line', 'breaks', 'whitespace', 'format', 'clean', 'pdf', 'email'],
  },
  {
    name: 'Text Diff Checker',
    path: '/diff-checker',
    tag: 'COMPARE / DIFF',
    description:
      'Compare two text versions side by side. Highlight additions, deletions, and changes instantly.',
    keywords: ['diff', 'compare', 'text', 'difference', 'highlight'],
  },
  {
    name: 'Lorem Ipsum Generator',
    path: '/lorem-ipsum',
    tag: 'GENERATE / PLACEHOLDER',
    description:
      'Generate placeholder text by words, sentences, or paragraphs for mockups and layouts.',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generate'],
  },
  {
    name: 'Text Sorter',
    path: '/text-sorter',
    tag: 'SORT / ORGANIZE',
    description:
      'Sort lines alphabetically, remove duplicates, reverse order, and clean up pasted lists.',
    keywords: ['sort', 'text', 'organize', 'duplicates', 'lines', 'alphabetical', 'alphabetize'],
  },
];

const guideByPath = Object.fromEntries(
  Object.values(TOOL_GUIDES).map((g) => [g.toolPath, { slug: g.slug, title: g.title }])
);

const POPULAR_GUIDE_SLUGS = [
  'how-many-words-should-a-blog-post-be',
  'reading-time-speaking-time-word-count',
  'title-case-vs-sentence-case-headlines',
  'remove-extra-line-breaks-from-pdf-word-email',
] as const;

const popularGuides = POPULAR_GUIDE_SLUGS.map((slug) => {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const guideEntry = Object.values(TOOL_GUIDES).find((g) => g.slug === slug);
  const toolPath =
    guideEntry?.toolPath ??
    (post.relatedToolSlug ? `/${post.relatedToolSlug.replace(/^\//, '')}` : '/blog');
  const toolLabel = (guideEntry?.toolName ?? post.relatedTools?.[0]?.name ?? 'Guide').toUpperCase();
  return { post, toolPath, toolLabel };
}).filter((item): item is NonNullable<typeof item> => item !== null);

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your text never leaves your device',
  },
  {
    icon: Clock,
    title: 'Always Available',
    description: 'Works offline once loaded',
  },
  {
    icon: Copy,
    title: 'Copy-Ready Output',
    description: 'One-click copy and download on every tool',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'TextCraft - Professional Text Processing Tools',
    description:
      'TextCraft - Six professional text processing tools that run entirely in your browser. Word counter, case converter, line breaks remover, text diff checker, lorem ipsum generator, and text sorter. Fast, secure, and always available.',
    keywords:
      'text processing tools, word counter, case converter, line breaks, text diff, lorem ipsum, text sorter, online text tools, free text utilities',
    canonical: 'https://www.textcraft.dev',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'TextCraft',
      description: 'Professional text processing tools that run entirely in your browser',
      url: 'https://www.textcraft.dev',
      applicationCategory: 'Text Processing Tools',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  });

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            TextCraft
          </h1>
          <p className="text-base sm:text-lg text-foreground/90 max-w-2xl mx-auto mb-2 leading-relaxed">
            Fast browser tools for counting, cleaning, converting, comparing, and organizing text.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            Paste text, fix it, copy it back — all locally in your browser.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search tools..."
              aria-label="Search tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 bg-card border-border shadow-sm"
            />
          </div>
        </section>

        {/* Tools */}
        <section className="pb-16 sm:pb-20" aria-label="Text tools">
          {filteredTools.length === 0 ? (
            <div className="text-center rounded-lg border border-border bg-card p-10">
              <h2 className="text-lg font-semibold text-foreground mb-2">No tools found</h2>
              <p className="text-muted-foreground mb-4 text-sm">
                No tools match &ldquo;{searchQuery}&rdquo;. Try a different search.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-sm text-primary font-medium hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredTools.map((tool) => {
                const guide = guideByPath[tool.path];
                return (
                  <article
                    key={tool.path}
                    className="home-tool-card group flex flex-col rounded-lg border border-border bg-card p-5 sm:p-6 transition-colors hover:border-primary/35"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="text-base font-semibold text-foreground leading-snug">
                        {tool.name}
                      </h2>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground text-right leading-tight shrink-0 max-w-[42%]">
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <Link
                        to={tool.path}
                        className="font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Try it now →
                      </Link>
                      {guide && (
                        <Link
                          to={`/blog/${guide.slug}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Guide
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Popular guides */}
        <section className="pb-16 sm:pb-20" aria-labelledby="popular-guides-heading">
          <div className="mb-8">
            <h2
              id="popular-guides-heading"
              className="text-xl sm:text-2xl font-bold text-foreground mb-2"
            >
              Popular writing guides
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Practical guides for word counts, formatting, cleaning pasted text, and publishing
              workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {popularGuides.map(({ post, toolPath, toolLabel }) => (
              <article
                key={post.slug}
                className="home-guide-card flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/35"
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  {toolLabel}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-3">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 mb-5 line-clamp-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Read guide
                  </Link>
                  <Link
                    to={toolPath}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Try tool →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why TextCraft */}
        <section className="pb-16 sm:pb-20 text-center" aria-labelledby="why-textcraft-heading">
          <h2 id="why-textcraft-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-10 sm:mb-12">
            Why TextCraft?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 max-w-3xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center px-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-primary mb-4">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
