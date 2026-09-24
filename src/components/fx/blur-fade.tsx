'use client';

import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
};

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin as never });
  const isInView = !inView || inViewResult;
  const reduce = useReducedMotion();
  const flatY = reduce ? 0 : yOffset;

  const defaultVariants: Variants = {
    hidden: { y: flatY, opacity: 0, filter: reduce ? 'none' : `blur(${blur})` },
    visible: { y: reduce ? 0 : -yOffset, opacity: 1, filter: 'none' },
  };

  const combinedVariants = variant ?? defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="hidden"
      variants={combinedVariants}
      transition={
        reduce
          ? { duration: 0.2, ease: 'easeOut' }
          : { delay: 0.04 + delay, duration, ease: [0.22, 1, 0.36, 1] }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
