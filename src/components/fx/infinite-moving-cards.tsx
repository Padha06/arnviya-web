'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Endlessly drifting cards. Adapted from Aceternity's InfiniteMovingCards (MIT).
 * Uses a CSS marquee so it keeps moving even when the tab is throttled.
 */
export function InfiniteMovingCards({
  items,
  className,
  speed = 'slow',
}: {
  items: { quote: string; by: string }[];
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}) {
  const reduce = useReducedMotion();
  const duration = speed === 'fast' ? '22s' : speed === 'normal' ? '42s' : '70s';

  const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div
      className="flex shrink-0 gap-5 pr-5"
      style={reduce ? undefined : { animation: `marquee ${duration} linear infinite` }}
      aria-hidden={ariaHidden}
    >
      {items.map((item, i) => (
        <motion.figure
          key={i}
          className="relative w-[19rem] shrink-0 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:w-[24rem]"
        >
          <span className="font-display text-4xl leading-none text-gold-500/50">&ldquo;</span>
          <blockquote className="mt-3 font-display text-lg leading-relaxed text-cream-100/90">
            {item.quote}
          </blockquote>
          <figcaption className="mt-5 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-cream-100/50">
            {item.by}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );

  if (reduce) {
    /* Static first row — quotes stay readable without drift. */
    return (
      <div className={cn('relative overflow-x-auto mask-fade-x', className)}>
        <Row />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [--duration:70s]',
        'mask-fade-x',
        className,
      )}
    >
      <Row />
      <Row ariaHidden />
    </div>
  );
}
