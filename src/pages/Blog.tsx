import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Calendar, User, ArrowRight, Type, FileText, AlignLeft, Hash, Search, Zap, Database, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useSEO } from '@/hooks/useSEO';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL } from '@/config/site';
import { getPrimaryTool } from '@/lib/blogStructuredData';
import type { BlogPost } from '@/types/blog';

const categories = [
  { id: 'all', name: 'All', icon: Type },
  { id: 'tools', name: 'Tool Tips', icon: Type },
  { id: 'case', name: 'Case', icon: FileText },
  { id: 'diff', name: 'Diff', icon: AlignLeft },
  { id: 'counting', name: 'Counting', icon: Hash },
  { id: 'encoding', name: 'Encoding', icon: Database },
  { id: 'performance', name: 'Performance', icon: Zap },
  { id: 'sorting', name: 'Sorting', icon: Hash },
  { id: 'analysis', name: 'Analysis', icon: Search },
  { id: 'security', name: 'Security', icon: Shield },
];

const START_HERE_SLUGS = [
  'how-many-words-should-a-blog-post-be',
  'remove-extra-line-breaks-from-pdf-word-email',
  'alphabetize-list-online',
] as const;

const startHerePosts = START_HERE_SLUGS.map((slug) =>
  blogPosts.find((p) => p.slug === slug)
).filter((p): p is BlogPost => p !== undefined);

function PostBadge({ post }: { post: BlogPost }) {
  const tool = getPrimaryTool(post);
  if (tool) {
    return (
      <Link to={tool.path} className="badge-pill badge-pill-primary hover:opacity-90">
        {tool.name}
      </Link>
    );
  }
  const cat = categories.find((c) => c.id === post.category);
  return <span className="badge-pill">{cat?.name ?? post.tags[0] ?? 'Guide'}</span>;
}

function BlogCard({ post }: { post: BlogPost }) {
  const tool = getPrimaryTool(post);

  return (
    <article className="tool-surface-interactive flex flex-col h-full overflow-hidden">
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <PostBadge post={post} />
          <span className="text-xs text-muted-foreground shrink-0">{post.readTime}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 truncate min-w-0">
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{post.author}</span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <Link
            to={`/blog/${post.slug}`}
            className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1 min-h-[44px] sm:min-h-0"
          >
            Read more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {tool && (
            <Link
              to={tool.path}
              className="text-sm text-muted-foreground hover:text-foreground min-h-[44px] sm:min-h-0 inline-flex items-center"
            >
              Try tool →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function BlogSectionHeader({ title, description, id }: { title: string; description: string; id?: string }) {
  return (
    <div className="mb-5">
      <h2 id={id} className="text-lg font-bold text-foreground tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
    </div>
  );
}

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'Text Processing Blog - TextCraft',
    description:
      'Discover text processing tips, tutorials, and guides for using TextCraft tools effectively.',
    keywords:
      'text processing blog, text manipulation tips, case conversion, text diff, word counting',
    canonical: `${SITE_URL}/blog`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'TextCraft Text Processing Blog',
      description: 'Text processing tips, tutorials, and guides.',
      url: `${SITE_URL}/blog`,
      publisher: { '@type': 'Organization', name: 'TextCraft', url: SITE_URL },
    },
  });

  const categoryFiltered =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categoryFiltered;
    return categoryFiltered.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q)
    );
  }, [categoryFiltered, searchQuery]);

  return (
    <ToolLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
            TextCraft Guides
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tips, tutorials, and best practices for text processing with TextCraft tools.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-8 max-w-6xl mx-auto space-y-10">
        {/* Start here */}
        <section aria-labelledby="start-here-heading">
          <BlogSectionHeader
            id="start-here-heading"
            title="Start here"
            description="Popular guides for everyday writing and formatting tasks."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {startHerePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Search + filters */}
        <section aria-labelledby="browse-heading">
          <BlogSectionHeader
            id="browse-heading"
            title="Browse all guides"
            description="Search and filter every TextCraft writing guide."
          />
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search guides..."
              aria-label="Search guides"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/30"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] sm:min-h-0 rounded-md border text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/30'
                }`}
              >
                <category.icon className="w-3.5 h-3.5" />
                {category.name}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="tool-surface p-8 text-center">
              <p className="text-muted-foreground mb-3">No guides match your search.</p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </ToolLayout>
  );
};
