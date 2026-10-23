import { cn } from '@/lib/utils';

export interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4 py-12', className)} aria-hidden="true">
      <span className="h-px w-12 bg-line md:w-20" />
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
        {label ?? '—'}
      </span>
      <span className="h-px w-12 bg-line md:w-20" />
    </div>
  );
}
