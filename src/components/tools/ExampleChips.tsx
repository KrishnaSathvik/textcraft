import { Sparkles } from 'lucide-react';
import type { ToolExample } from '@/types/tool';

interface ExampleChipsProps {
  examples: ToolExample[];
  onSelect: (example: ToolExample) => void;
}

export const ExampleChips = ({ examples, onSelect }: ExampleChipsProps) => (
  <div className="flex flex-col gap-2.5 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3">
    <div className="flex items-center gap-1.5 shrink-0">
      <Sparkles className="h-3.5 w-3.5 text-primary/70" aria-hidden />
      <span className="text-xs font-medium text-muted-foreground">Try an example</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {examples.map((example) => (
        <button
          key={example.name}
          type="button"
          onClick={() => onSelect(example)}
          className="badge-pill badge-pill-primary cursor-pointer transition-colors hover:bg-primary/15"
        >
          {example.name}
        </button>
      ))}
    </div>
  </div>
);
