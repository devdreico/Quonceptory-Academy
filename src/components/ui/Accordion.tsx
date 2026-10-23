import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT_EXPO } from '@/lib/animations';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
}

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);
  const reduced = useReducedMotion();

  return (
    <div className={cn('border-y border-line', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-line last:border-b-0">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-accent-500"
              >
                <span className="text-base font-semibold md:text-lg">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                    isOpen ? 'border-accent-500 text-accent-500' : 'border-line-strong text-muted',
                  )}
                >
                  <motion.span
                    className="absolute h-px w-3 bg-current"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT_EXPO }}
                  />
                  <motion.span
                    className="absolute h-3 w-px bg-current"
                    animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT_EXPO }}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.4,
                    ease: EASE_OUT_EXPO,
                    opacity: { duration: reduced ? 0 : 0.25 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-6 pr-10 text-sm leading-relaxed text-ink-soft">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
