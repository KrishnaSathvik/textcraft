import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ToolPanelProps {
  title: string;
  titleIcon?: ReactNode;
  headerExtra?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/** Shared tool workspace section using the tool-surface style. */
export const ToolPanel = ({
  title,
  titleIcon,
  headerExtra,
  children,
  className,
  bodyClassName,
}: ToolPanelProps) => (
  <section className={cn('tool-surface', className)}>
    <div
      className={cn(
        'py-3 px-4',
        headerExtra ? 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3' : undefined
      )}
    >
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
        {titleIcon}
        {title}
      </h3>
      {headerExtra}
    </div>
    <div className={cn('px-4 pb-4 pt-0', bodyClassName)}>{children}</div>
  </section>
);
