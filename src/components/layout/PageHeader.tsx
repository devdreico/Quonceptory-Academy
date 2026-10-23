import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  index?: string;
  kicker?: string;
  title: string;
  desc?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ index, kicker, title, desc, children, className }: PageHeaderProps) {
  return (
    <section className={cn('grid-bg border-b border-line pt-32 pb-16 md:pt-44', className)}>
      <div className="shell">
        <Reveal>
          {index || kicker ? (
            <div className="flex items-baseline gap-3">
              {index ? (
                <span className="text-xs font-bold tracking-[0.2em] text-accent-500">{index}</span>
              ) : null}
              {kicker ? (
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  {kicker}
                </span>
              ) : null}
            </div>
          ) : null}
          <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.03em] text-balance md:text-7xl">
            {title}
          </h1>
          {desc ? <p className="mt-6 max-w-2xl text-lg text-ink-soft">{desc}</p> : null}
          {children ? (
            <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
