import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ToolActionBarProps {
  children: ReactNode;
  className?: string;
}

/** Single action row — sticks to bottom on mobile, inline on desktop */
export const ToolActionBar = ({ children, className }: ToolActionBarProps) => (
  <div
    className={cn(
      'flex flex-col sm:flex-row gap-3 justify-between',
      'sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur py-3 mt-2',
      'lg:static lg:z-auto lg:border-t-0 lg:bg-transparent lg:backdrop-blur-none lg:py-0 lg:mt-0',
      className
    )}
    role="toolbar"
    aria-label="Tool actions"
  >
    {children}
  </div>
);
