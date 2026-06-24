import { cn } from '@/lib/utils';

interface StatsPillProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'accent' | 'success';
  className?: string;
}

export function StatsPill({ label, value, variant = 'default', className }: StatsPillProps) {
  return (
    <div
      className={cn(
        'inline-flex items-baseline gap-1.5 rounded-md border px-2.5 py-1 text-xs sm:text-sm',
        'bg-background/40 transition-colors min-w-0',
        {
          'border-border/70': variant === 'default',
          'border-primary/35 bg-primary/5': variant === 'accent',
          'border-success/30 bg-success/5': variant === 'success',
        },
        className
      )}
    >
      <span className="text-muted-foreground truncate">{label}</span>
      <span
        className={cn('font-semibold tabular-nums whitespace-nowrap', {
          'text-foreground': variant === 'default',
          'text-primary': variant === 'accent',
          'text-success': variant === 'success',
        })}
      >
        {value}
      </span>
    </div>
  );
}

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3',
        className
      )}
    >
      {children}
    </div>
  );
}
