import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-brand bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </header>

      <section className="bg-tool-bg border border-tool-border rounded-xl p-6 shadow-xl mb-8">
        {children}
      </section>

      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="px-4 py-2 rounded-lg bg-secondary hover:bg-hover transition-colors duration-200 text-secondary-foreground"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold mb-3 text-foreground">How to use</h2>
        <ol className="text-muted-foreground space-y-1">
          <li>Paste or type your text in the input area</li>
          <li>Choose any available options for processing</li>
          <li>Copy the result or download it as a file</li>
        </ol>
        
        <div className="mt-6 p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">
            <strong className="text-foreground">Privacy:</strong> All processing happens in your browser. 
            Your text is never sent to our servers or stored anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}