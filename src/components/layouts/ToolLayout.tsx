import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';

interface RelatedTool {
  href: string;
  label: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  related?: RelatedTool[];
}

export default function ToolLayout({ title, description, children, related = [] }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </header>

        <section className="bg-card border border-border rounded-lg p-6 mb-8">
          {children}
        </section>

        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Related Tools</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="px-3 py-2 rounded-md bg-secondary hover:bg-hover transition-colors duration-200 text-secondary-foreground text-sm"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="text-sm text-muted-foreground bg-secondary/30 rounded-lg p-4">
          <p>
            <strong className="text-foreground">Privacy:</strong> All processing happens in your browser. 
            Your text is never sent to our servers or stored anywhere.
          </p>
        </section>
      </main>
    </div>
  );
}