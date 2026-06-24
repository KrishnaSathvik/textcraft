import { useState } from 'react';
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Zap, Shield, Clock, ArrowRight, BookOpen, PenLine } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import { TOOL_GUIDES } from "@/lib/toolGuides";

const tools = [
  {
    name: 'Word Counter',
    path: '/word-counter',
    badge: 'Count',
    description: 'Check words, characters, reading time, and speaking time before publishing.',
    keywords: ['word', 'count', 'character', 'sentence', 'reading time']
  },
  {
    name: 'Case Converter',
    path: '/case-converter',
    badge: 'Convert',
    description: 'Fix ALL CAPS text, title case headlines, labels, filenames, and pasted content.',
    keywords: ['case', 'convert', 'uppercase', 'lowercase', 'camelcase', 'title case']
  },
  {
    name: 'Line Breaks Remover',
    path: '/line-breaks',
    badge: 'Clean',
    description: 'Clean messy text copied from PDFs, Word docs, emails, and newsletters.',
    keywords: ['line', 'breaks', 'whitespace', 'format', 'clean', 'pdf', 'email']
  },
  {
    name: 'Text Diff Checker',
    path: '/diff-checker',
    badge: 'Compare',
    description: 'Compare drafts, edits, snippets, and two versions of the same text.',
    keywords: ['diff', 'compare', 'text', 'difference', 'highlight']
  },
  {
    name: 'Lorem Ipsum Generator',
    path: '/lorem-ipsum',
    badge: 'Generate',
    description: 'Generate placeholder text for mockups, layouts, wireframes, and demos.',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generate']
  },
  {
    name: 'Text Sorter',
    path: '/text-sorter',
    badge: 'Sort',
    description: 'Alphabetize lists, remove duplicates, sort lines, and organize pasted data.',
    keywords: ['sort', 'text', 'organize', 'duplicates', 'lines', 'alphabetical', 'alphabetize']
  }
];

const guideByPath = Object.fromEntries(
  Object.values(TOOL_GUIDES).map((g) => [g.toolPath, { slug: g.slug, title: g.title }])
);

const LATEST_GUIDE_SLUGS = [
  'how-many-words-should-a-blog-post-be',
  'title-case-vs-sentence-case-headlines',
  'reading-time-speaking-time-word-count',
] as const;

const latestGuides = LATEST_GUIDE_SLUGS.map((slug) => {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const guideEntry = Object.values(TOOL_GUIDES).find((g) => g.slug === slug);
  const toolPath =
    guideEntry?.toolPath ??
    (post.relatedToolSlug ? `/${post.relatedToolSlug.replace(/^\//, '')}` : '/blog');
  const toolName =
    guideEntry?.toolName ??
    post.relatedTools?.[0]?.name ??
    'Guide';
  return { post, toolPath, toolName };
}).filter((item): item is NonNullable<typeof item> => item !== null);

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Always Available',
    description: 'Works offline once loaded'
  },
  {
    icon: <PenLine className="w-5 h-5" />,
    title: 'Built for Writing',
    description: 'Count, clean, convert, and format text for publishing'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'TextCraft - Professional Text Processing Tools',
    description: 'TextCraft - Six professional text processing tools that run entirely in your browser. Word counter, case converter, line breaks remover, text diff checker, lorem ipsum generator, and text sorter. Fast, secure, and always available.',
    keywords: 'text processing tools, word counter, case converter, line breaks, text diff, lorem ipsum, text sorter, online text tools, free text utilities',
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
        priceCurrency: 'USD'
      }
    }
  });

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-14">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            TextCraft
          </h1>
          <p className="text-lg text-foreground/90 max-w-2xl mx-auto mb-2 leading-relaxed">
            Fast browser tools for counting, cleaning, converting, comparing, and organizing text.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            Paste text, fix it, copy it back — no signup and no upload required.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              aria-label="Search tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/30 border-border"
            />
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center mb-12 tool-surface-interactive p-8">
            <h2 className="text-lg font-semibold text-foreground mb-2">No tools found</h2>
            <p className="text-muted-foreground mb-4">
              No tools match &ldquo;{searchQuery}&rdquo;. Try a different search or browse popular tools below.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-sm text-primary hover:underline mb-6"
            >
              Clear search
            </button>
            <div className="flex flex-wrap justify-center gap-2">
              {tools.slice(0, 4).map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary/50 text-foreground"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredTools.map((tool) => {
            const guide = guideByPath[tool.path];
            return (
              <article
                key={tool.path}
                className="tool-surface-interactive p-4 sm:p-5 flex flex-col group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-card-foreground leading-snug">
                    {tool.name}
                  </h3>
                  <span className="badge-pill shrink-0">{tool.badge}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                  {tool.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60">
                  <Button asChild size="sm" className="h-9">
                    <Link to={tool.path}>
                      Try it now
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                  {guide && (
                    <Link
                      to={`/blog/${guide.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors py-2 px-1 min-h-[44px] sm:min-h-0"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Guide
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        )}

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-xl font-bold text-foreground mb-8">
            Why TextCraft?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center px-2">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest writing guides */}
        <section className="mb-8" aria-labelledby="latest-guides-heading">
          <div className="mb-5">
            <div className="flex items-center justify-between gap-4 mb-1">
              <h2 id="latest-guides-heading" className="text-xl font-bold text-foreground">
                Latest writing guides
              </h2>
              <Link
                to="/blog"
                className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1 shrink-0"
              >
                All guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Practical guides for common writing, editing, and formatting tasks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestGuides.map(({ post, toolPath, toolName }) => (
              <article
                key={post.slug}
                className="tool-surface-interactive p-4 sm:p-5 flex flex-col"
              >
                <Link
                  to={toolPath}
                  className="badge-pill badge-pill-primary w-fit mb-3"
                >
                  {toolName}
                </Link>
                <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
                  <Button asChild variant="outline" size="sm" className="h-9">
                    <Link to={`/blog/${post.slug}`}>
                      Read guide
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="h-9 text-muted-foreground">
                    <Link to={toolPath}>
                      Try tool
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Index;
