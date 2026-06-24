import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, HelpCircle, Lightbulb, Wrench } from 'lucide-react';
import { BlogPostContent } from '@/components/BlogPostContent';
import type { BlogPost } from '@/types/blog';
import { getPrimaryTool } from '@/lib/blogStructuredData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface BlogPostSectionsProps {
  post: BlogPost;
}

export const BlogPostSections = ({ post }: BlogPostSectionsProps) => {
  const primaryTool = getPrimaryTool(post);

  return (
    <div className="space-y-8">
      {post.quickAnswer && (
        <section className="rounded-lg border border-primary/25 bg-primary/[0.04] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground mb-1.5">Quick answer</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{post.quickAnswer}</p>
            </div>
          </div>
        </section>
      )}

      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <h2 className="text-base font-semibold text-foreground mb-3">Key takeaways</h2>
          <ul className="space-y-2.5">
            {post.keyTakeaways.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <BlogPostContent content={post.content} />

      {post.faqs && post.faqs.length > 0 && (
        <section className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-border bg-secondary/40">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <HelpCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground leading-tight">
                Frequently asked questions
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Tap a question to expand the answer</p>
            </div>
          </div>
          <Accordion type="multiple" className="px-4 sm:px-5">
            {post.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-border/70 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-sm sm:text-[0.9375rem] font-medium text-foreground hover:no-underline hover:text-primary py-3.5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 pr-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {post.relatedTools && post.relatedTools.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Wrench className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground leading-tight">Related tools</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Open a tool and apply this guide to your text
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.relatedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/20 px-4 py-3.5 min-h-[52px] hover:border-primary/40 hover:bg-primary/[0.04] transition-colors"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-primary inline-flex items-center gap-1 shrink-0">
                  Open
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <h2 className="text-base font-semibold text-foreground mb-3">Related articles</h2>
          <ul className="space-y-2">
            {post.relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link
                  to={`/blog/${related.slug}`}
                  className="group flex items-start gap-2 rounded-md border border-transparent px-2 py-2 -mx-2 hover:border-border hover:bg-secondary/30 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0 opacity-70 group-hover:opacity-100" />
                  <span className="text-sm text-foreground group-hover:text-primary leading-snug transition-colors">
                    {related.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {primaryTool && (
        <section className="rounded-lg border border-primary/25 bg-gradient-to-br from-primary/[0.07] via-card to-card overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6">
            <div className="text-left min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-primary mb-1">
                TextCraft tool
              </p>
              <h2 className="text-lg font-semibold text-foreground">Try {primaryTool.name}</h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-lg leading-relaxed">
                Paste your text and get results instantly in your browser. No account required — your
                text stays on your device.
              </p>
            </div>
            <Link
              to={primaryTool.path}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Open {primaryTool.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
