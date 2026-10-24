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
    <section className={cn('border-line relative overflow-hidden border-b pt-32 pb-16 md:pt-44', className)}>
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="bg-glow animate-float-slow pointer-events-none absolute -top-32 right-0 size-96 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="bg-glow animate-float pointer-events-none absolute -bottom-40 left-1/4 size-80 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal>
          {index || kicker ? (
            <div className="border-line bg-glass-bg inline-flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-md">
              {index ? (
                <span className="text-accent-500 text-xs font-bold tracking-[0.2em]">{index}</span>
              ) : null}
              {index && kicker ? (
                <span className="bg-line-strong size-1 rounded-full" aria-hidden="true" />
              ) : null}
              {kicker ? (
                <span className="text-muted text-[11px] font-bold tracking-[0.18em] uppercase">{kicker}</span>
              ) : null}
            </div>
          ) : null}
          <h1 className="mt-7 text-5xl font-extrabold tracking-[-0.035em] text-balance md:text-7xl">
            {title}
          </h1>
          {desc ? <p className="text-ink-soft mt-6 max-w-2xl text-lg leading-relaxed">{desc}</p> : null}
          {children ? <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
