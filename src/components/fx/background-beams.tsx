'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Slow diagonal light beams behind a section.
 * Adapted from Aceternity UI's BackgroundBeams (MIT) — the beam geometry is
 * generated rather than hard-coded so the density stays tunable.
 */
export function BackgroundBeams({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const beams = Array.from({ length: 48 }, (_, i) => {
    const x = -900 + i * 52;
    const bend = 120 + (i % 5) * 34;
    return `M${x} -220 C ${x + bend} 140, ${x + bend * 2.4} 380, ${x + bend * 3.4} 920`;
  });

  const stroke = `url(#beam-${uid})`;

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id={`beam-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6A15B" stopOpacity="0" />
            <stop offset="45%" stopColor="#D9BC80" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B7459" stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`vignette-${uid}`} cx="50%" cy="45%" r="68%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="58%" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`sweep-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>

          <mask id={`fade-${uid}`} maskUnits="userSpaceOnUse">
            <rect width="1200" height="700" fill={`url(#vignette-${uid})`} />
          </mask>

          <mask id={`sweep-mask-${uid}`} maskUnits="userSpaceOnUse">
            {/* Same DOM under both preferences — only the motion changes. */}
            <motion.g
              initial={reduce ? { x: 1320 } : { x: -420 }}
              animate={reduce ? { x: 1320 } : { x: 1320 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 11, repeat: Infinity, ease: 'linear', repeatDelay: 3 }
              }
            >
              <rect x="0" y="-220" width="260" height="1140" fill={`url(#sweep-${uid})`} />
            </motion.g>
          </mask>
        </defs>

        {/* resting beams */}
        <g mask={`url(#fade-${uid})`}>
          {beams.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={stroke}
              strokeWidth={0.7}
              strokeOpacity={0.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* travelling highlight */}
        <g mask={`url(#fade-${uid})`}>
          <g mask={`url(#sweep-mask-${uid})`}>
            {beams.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke={stroke}
                strokeWidth={1.1}
                strokeOpacity={0.9}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
