'use client';

import { MotionConfig } from 'framer-motion';

/**
 * reducedMotion="user": Framer skips transform/layout travel under
 * prefers-reduced-motion and keeps opacity/color — the intentional
 * alternative to a blanket animation kill.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
