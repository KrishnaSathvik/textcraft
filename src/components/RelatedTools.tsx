import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';

export interface RelatedToolLink {
  name: string;
  path: string;
}

interface RelatedToolsProps {
  tools: RelatedToolLink[];
  blogPost?: { title: string; slug: string };
}

export const RelatedTools = ({ tools, blogPost }: RelatedToolsProps) => (
  <section className="tool-surface p-4 sm:p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Wrench className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground leading-tight">Related tools</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Continue with another TextCraft tool</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tools.map((tool) => (
        <Link
          key={tool.path}
          to={tool.path}
          className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/20 px-4 py-3 min-h-[48px] hover:border-primary/40 hover:bg-primary/[0.04] transition-colors"
        >
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
        </Link>
      ))}
    </div>
    {blogPost && (
      <p className="text-sm text-muted-foreground border-t border-border mt-4 pt-4">
        More help:{' '}
        <Link to={`/blog/${blogPost.slug}`} className="text-primary font-medium hover:underline">
          {blogPost.title}
        </Link>
      </p>
    )}
  </section>
);
