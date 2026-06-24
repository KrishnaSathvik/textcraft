import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { BlogPostSections } from '@/components/blog/BlogPostSections';
import { useSEO } from '@/hooks/useSEO';
import { getBlogPostBySlug } from '@/data/blogPosts';
import { SITE_URL } from '@/config/site';
import {
  buildBlogStructuredData,
  getBlogSeoDescription,
  getBlogSeoTitle,
  getPrimaryTool,
} from '@/lib/blogStructuredData';
import { Button } from '@/components/ui/button';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useSEO({
    title: post ? getBlogSeoTitle(post) : 'Blog Post Not Found | TextCraft',
    description: post ? getBlogSeoDescription(post) : 'The requested blog post could not be found.',
    keywords: post?.tags.join(', ') ?? 'TextCraft blog',
    canonical: post ? `${SITE_URL}/blog/${post.slug}` : `${SITE_URL}/blog`,
    ogType: post ? 'article' : 'website',
    robots: post ? 'index, follow' : 'noindex, nofollow',
    structuredData: post ? buildBlogStructuredData(post) : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const displayDate = post.updated ?? post.date;
  const primaryTool = getPrimaryTool(post);

  return (
    <ToolLayout>
      <article className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to guides
          </Link>
          {primaryTool && (
            <Button asChild size="sm" variant="outline" className="h-9">
              <Link to={primaryTool.path}>
                Open {primaryTool.name}
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Tag className="w-4 h-4 text-primary shrink-0" />
          <span className="text-primary font-medium">{post.tags[0]}</span>
          <span aria-hidden="true">•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(displayDate).toLocaleDateString()}
          </div>
          {post.updated && post.updated !== post.date && (
            <span className="text-xs">
              Updated {new Date(post.updated).toLocaleDateString()}
            </span>
          )}
        </div>

        <BlogPostSections post={post} />
      </article>
    </ToolLayout>
  );
};
