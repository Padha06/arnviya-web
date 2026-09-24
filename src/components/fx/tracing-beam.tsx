'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A gold line that draws itself down the page as you scroll.
 * Adapted from Aceternity UI's TracingBeam (MIT).
 *
 * The beam is clamped to the measured height of its own container. A hardcoded
 * pixel offset (as in the original) lets the glowing head escape the section
 * and silently extends the document, leaving dead space below the footer.
 */
export function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 45%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 500, damping: 90 });

  const HEAD = 40;
  const headY = useTransform(progress, [0, 1], [0, Math.max(0, height - HEAD)]);

  return (
    <div ref={ref} className={cn('relative mx-auto max-w-5xl', className)}>
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-12 sm:block"
        aria-hidden
      >
        {/* rail */}
        <div className="absolute left-[0.3rem] top-0 h-full w-px -translate-x-1/2 bg-gold-500/15" />

        {/* progress line */}
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-[0.3rem] top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold-500/0 via-gold-500/60 to-gold-400"
        />

        {/* glowing head */}
        <motion.div
          style={{ top: headY, height: HEAD }}
          className="absolute left-[0.3rem] w-[0.4rem] -translate-x-1/2 rounded-full bg-gold-400 shadow-[0_0_18px_2px_rgba(217,188,128,0.55)]"
        />
      </div>

      <div className="sm:pl-20">{children}</div>
    </div>
  );
}
