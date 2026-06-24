import { renderBlogMarkdown } from '@/lib/renderBlogMarkdown';

interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent = ({ content }: BlogPostContentProps) => (
  <div
    className="blog-prose"
    dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(content) }}
  />
);
