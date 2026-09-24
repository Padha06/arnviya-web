'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * The R3F scene is loaded only when the section scrolls into view, so the
 * three.js bundle never blocks first paint.
 */
const ResinScene = dynamic(() => import('./resin-scene'), {
  ssr: false,
  loading: () => null,
});

export function ProductViewer({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setMount(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'relative aspect-square w-full max-w-full overflow-hidden rounded-4xl',
        className,
      )}
    >
      {/* Poster: holds until the GLB has actually loaded (it is ~2 MB), and
          doubles as the no-WebGL fallback — if the canvas never reports ready,
          the photo simply stays. */}
      <Image
        src="/images/clock-hex-floral.jpg"
        alt="Handcrafted resin clock with pressed botanicals and gold Roman numerals"
        fill
        sizes="(max-width: 768px) 100vw, 560px"
        className={cn(
          'object-cover transition-opacity duration-700',
          ready ? 'opacity-0' : 'opacity-100',
        )}
        priority={false}
      />

      {mount ? (
        <div className="absolute inset-0 overflow-hidden">
          <ResinScene onReady={() => setReady(true)} />
        </div>
      ) : null}

      {/* grounding glow, since the canvas itself stays transparent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-16 rounded-[50%] bg-[radial-gradient(closest-side,rgba(10,23,15,0.85),transparent)] blur-md"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,transparent_0%,rgba(10,23,15,0.55)_100%)]" />

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[0.625rem] uppercase tracking-[0.2em] text-cream-100/50">
        Drag to rotate
      </div>
    </div>
  );
}
