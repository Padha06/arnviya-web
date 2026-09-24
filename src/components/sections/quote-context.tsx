'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ADDONS, QUOTE_PRODUCTS, TIERS } from '@/lib/data';

type Line = {
  id: string;
  name: string;
  qty: number;
  unit: number;
  line: number;
  lead: number;
};

type QuoteValue = {
  quantities: Record<string, number>;
  setQty: (id: string, qty: number) => void;
  addons: Record<string, boolean>;
  toggleAddon: (id: string, on: boolean) => void;
  express: boolean;
  setExpress: (on: boolean) => void;
  gst: boolean;
  setGst: (on: boolean) => void;
  reset: () => void;
  applyPreset: (items: Record<string, number>) => void;
  lines: Line[];
  subtotal: number;
  gstAmount: number;
  total: number;
  saving: number;
  totalQty: number;
  maxLead: number;
  summaryText: string;
};

const QuoteContext = createContext<QuoteValue | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>');
  return ctx;
}

function tierFor(qty: number) {
  let tier: number = TIERS[0];
  for (const t of TIERS) if (qty >= t) tier = t;
  return tier;
}

const emptyQty = () => Object.fromEntries(QUOTE_PRODUCTS.map((p) => [p.id, 0]));
const emptyAddons = () => Object.fromEntries(ADDONS.map((a) => [a.id, false]));

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>(emptyQty);
  const [addons, setAddons] = useState<Record<string, boolean>>(emptyAddons);
  const [express, setExpress] = useState(false);
  const [gst, setGst] = useState(true);

  const setQty = useCallback((id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, Math.min(5000, qty)) }));
  }, []);

  const toggleAddon = useCallback((id: string, on: boolean) => {
    setAddons((prev) => ({ ...prev, [id]: on }));
  }, []);

  const reset = useCallback(() => {
    setQuantities(emptyQty());
    setAddons(emptyAddons());
    setExpress(false);
  }, []);

  const applyPreset = useCallback((items: Record<string, number>) => {
    setQuantities({ ...emptyQty(), ...items });
  }, []);

  const value = useMemo<QuoteValue>(() => {
    const addonRate = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.rate : 0), 0);

    const lines: Line[] = QUOTE_PRODUCTS.filter((p) => (quantities[p.id] ?? 0) > 0).map((p) => {
      const qty = Math.max(quantities[p.id] ?? 0, TIERS[0]);
      const base = p.tiers[tierFor(qty)] + addonRate;
      const unit = express ? Math.round(base * 1.15) : base;
      return { id: p.id, name: p.name, qty, unit, line: unit * qty, lead: p.lead };
    });

    const subtotal = lines.reduce((s, l) => s + l.line, 0);
    const base25 = QUOTE_PRODUCTS.reduce((s, p) => {
      const q = quantities[p.id] ?? 0;
      if (q <= 0) return s;
      const qty = Math.max(q, TIERS[0]);
      return s + (p.tiers[25] + addonRate) * qty;
    }, 0);

    const gstAmount = gst ? subtotal * 0.18 : 0;
    const totalQty = lines.reduce((s, l) => s + l.qty, 0);
    const maxLead = lines.reduce((m, l) => Math.max(m, l.lead), 0);

    const summaryText = lines.length
      ? lines.map((l) => `\u2022 ${l.name} \u00D7 ${l.qty}`).join('\n')
      : 'No products selected yet.';

    return {
      quantities,
      setQty,
      addons,
      toggleAddon,
      express,
      setExpress,
      gst,
      setGst,
      reset,
      applyPreset,
      lines,
      subtotal,
      gstAmount,
      total: subtotal + gstAmount,
      saving: Math.max(0, base25 - subtotal),
      totalQty,
      maxLead,
      summaryText,
    };
  }, [
    quantities,
    addons,
    express,
    gst,
    setQty,
    toggleAddon,
    reset,
    applyPreset,
  ]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}
