import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'default' | 'code';
  label?: string;
  hideLabel?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, value, onValueChange, variant = 'default', rows = 12, label, hideLabel = true, id, ...props }, ref) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={hideLabel ? 'sr-only' : 'text-sm font-medium text-foreground'}
          >
            {label}
          </label>
        )}
      <textarea
        id={textareaId}
        aria-label={label}
        className={cn(
          "w-full rounded-lg border border-input bg-input p-4 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none",
          variant === 'code' && "font-mono bg-code-bg",
          className
        )}
        rows={rows}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        ref={ref}
        spellCheck={false}
        {...props}
      />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };