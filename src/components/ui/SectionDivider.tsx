import { cn } from '@/lib/utils';

export interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4 py-12', className)} aria-hidden="true">
      <span className="bg-line h-px w-12 md:w-20" />
      <span className="text-muted text-[11px] font-bold tracking-[0.3em] uppercase">{label ?? '—'}</span>
      <span className="bg-line h-px w-12 md:w-20" />
    </div>
  );
}
