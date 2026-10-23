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
    <section className={cn('relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-44', className)}>
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-glow blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/4 size-80 rounded-full bg-glow blur-3xl animate-float"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal>
          {index || kicker ? (
            <div className="inline-flex items-center gap-3 rounded-full border border-line bg-glass-bg px-4 py-1.5 backdrop-blur-md">
              {index ? (
                <span className="text-xs font-bold tracking-[0.2em] text-accent-500">{index}</span>
              ) : null}
              {index && kicker ? <span className="size-1 rounded-full bg-line-strong" aria-hidden="true" /> : null}
              {kicker ? (
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  {kicker}
                </span>
              ) : null}
            </div>
          ) : null}
          <h1 className="mt-7 text-5xl font-extrabold tracking-[-0.035em] text-balance md:text-7xl">
            {title}
          </h1>
          {desc ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{desc}</p> : null}
          {children ? (
            <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
