import { ReactNode } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { ExampleChips } from '@/components/tools/ExampleChips';
import type { ToolExample } from '@/types/tool';

interface ToolLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  examples?: ToolExample[];
  onFillExample?: (example: ToolExample) => void;
  metrics?: ReactNode;
  attachWorkspace?: boolean;
}

export const ToolLayout = ({
  children,
  title,
  description,
  examples,
  onFillExample,
  metrics,
  attachWorkspace = false,
}: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-4xl xl:max-w-5xl mx-auto">
          <div className="mx-0 sm:mx-0">
            <div className="p-3 sm:p-6 pb-2">
              <Breadcrumb />
            </div>

            {(title || description) && (
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-border">
                <div className="text-center">
                  {title && (
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1.5 sm:mb-2 tracking-tight">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}

            <main className="w-full pb-16 lg:pb-6">
              {((examples && examples.length > 0 && onFillExample) || metrics) && (
                <div
                  className={
                    attachWorkspace
                      ? 'px-3 sm:px-6 pt-3 sm:pt-4'
                      : 'px-3 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-5'
                  }
                >
                  <div
                    className={
                      attachWorkspace
                        ? 'tool-workspace-header rounded-t-lg rounded-b-none border border-border/60 border-b-0 bg-secondary/15 divide-y divide-border/40'
                        : 'tool-workspace-header rounded-lg border border-border/60 bg-secondary/15 divide-y divide-border/40'
                    }
                  >
                    {examples && examples.length > 0 && onFillExample && (
                      <ExampleChips examples={examples} onSelect={onFillExample} />
                    )}
                    {metrics}
                  </div>
                </div>
              )}
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
