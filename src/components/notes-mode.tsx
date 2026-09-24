'use client';

import { useEffect, useState } from 'react';

type Note = { text: string; impact?: string };

/**
 * Internal-only annotation layer.
 *
 * Never visible to a normal visitor: it activates only when the URL carries
 * ?notes=1, and nothing is added to the DOM otherwise. Use it to walk a client
 * through why each section exists, then share the clean URL.
 */
export function NotesMode() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const enabled = new URLSearchParams(window.location.search).get('notes') === '1';
    if (!enabled) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-note]'));
    if (!els.length) return;

    document.documentElement.dataset.notes = '1';
    setOn(true);

    els.forEach((el, i) => {
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      const badge = document.createElement('span');
      badge.className = 'note-badge';
      badge.textContent = String(i + 1);
      badge.setAttribute('aria-hidden', 'true');
      el.appendChild(badge);
    });

    setNotes(
      els.map((el) => ({
        text: el.dataset.note ?? '',
        impact: el.dataset.noteImpact,
      })),
    );

    return () => {
      els.forEach((el) => el.querySelector('.note-badge')?.remove());
      delete document.documentElement.dataset.notes;
    };
  }, []);

  if (!on) return null;

  return (
    <aside
      aria-label="Internal consultant notes"
      className="fixed bottom-4 right-4 z-[70] w-[min(23rem,calc(100vw-2rem))] max-h-[62vh] overflow-y-auto rounded-2xl border border-gold-500/25 bg-forest-950/96 p-5 text-cream-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.09] pb-3">
        <strong className="font-display text-lg font-normal">Why this page sells</strong>
        <span className="text-[0.625rem] uppercase tracking-[0.18em] text-gold-400">
          Internal · ?notes=1
        </span>
      </div>

      <ol className="mt-4 space-y-4">
        {notes.map((n, i) => (
          <li key={i} className="grid grid-cols-[1.6rem_1fr] gap-3 text-[0.8125rem] leading-relaxed">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-500 text-[0.7rem] font-medium text-forest-950">
              {i + 1}
            </span>
            <span className="text-cream-100/85">
              {n.text}
              {n.impact ? (
                <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.14em] text-gold-400">
                  {n.impact}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
