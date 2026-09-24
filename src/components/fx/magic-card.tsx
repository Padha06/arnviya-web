'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

type MagicCardProps = {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
};

/**
 * Gradient-border card with a cursor-following spotlight.
 * Adapted from Magic UI's MagicCard (MIT).
 */
export function MagicCard({
  children,
  className,
  gradientSize = 260,
  gradientColor = 'rgba(198,161,91,0.13)',
  gradientOpacity = 1,
  gradientFrom = '#C6A15B',
  gradientTo = '#E7D2A6',
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
    setHovered(false);
  }, [mouseX, mouseY, gradientSize]);

  const border = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 75%)`;
  const spotlight = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor} 0%, transparent 100%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn('group relative rounded-4xl', className)}
    >
      {/* gradient hairline border */}
      <motion.div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-4xl transition-opacity duration-700',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{ background: border }}
      />

      <div className="relative m-px overflow-hidden rounded-[calc(2.25rem-1px)] bg-forest-900">
        <motion.div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 z-10 transition-opacity duration-700',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
          style={{ background: spotlight, opacity: gradientOpacity }}
        />
        <div className="relative z-20">{children}</div>
      </div>
    </motion.div>
  );
}
