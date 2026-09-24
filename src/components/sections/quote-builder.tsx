'use client';

import Image from 'next/image';
import { BlurFade } from '@/components/fx/blur-fade';
import { Button, PillIcon } from '@/components/ui/button';
import { ArrowUpRight, Check, Minus, Plus, Printer } from '@/components/icons';
import { ADDONS, PRESETS, QUOTE_PRODUCTS } from '@/lib/data';
import { cn, inr } from '@/lib/utils';
import { useQuote } from './quote-context';

function Stepper({ id, name }: { id: string; name: string }) {
  const { quantities, setQty } = useQuote();
  const qty = quantities[id] ?? 0;

  return (
    <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-forest-900/70">
      <button
        type="button"
        aria-label={`Decrease ${name}`}
        onClick={() => setQty(id, qty - 5)}
        className="grid h-9 w-9 place-items-center text-gold-400 transition-colors duration-300 hover:bg-white/[0.07]"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={5000}
        step={5}
        value={qty}
        aria-label={`Quantity for ${name}`}
        onChange={(e) => setQty(id, parseInt(e.target.value || '0', 10))}
        className="h-9 w-14 border-0 bg-transparent text-center text-sm tabular-nums text-cream-100 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label={`Increase ${name}`}
        onClick={() => setQty(id, qty + 5)}
        className="grid h-9 w-9 place-items-center text-gold-400 transition-colors duration-300 hover:bg-white/[0.07]"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function QuoteBuilder() {
  const {
    lines,
    quantities,
    addons,
    toggleAddon,
    express,
    setExpress,
    gst,
    setGst,
    subtotal,
    gstAmount,
    total,
    saving,
    totalQty,
    maxLead,
    applyPreset,
    reset,
  } = useQuote();

  return (
    <section
      id="quote"
      className="section container"
      data-note="This is the tool that replaces the WhatsApp back-and-forth. The buyer configures the order, sees the real price, and sends a complete brief — so every enquiry that reaches you is already qualified and budgeted."
      data-note-impact="Qualifies every lead before it reaches you"
    >
      <BlurFade inView>
        <p className="eyebrow">Quote builder</p>
        <h2 className="mt-6 max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.875rem)]">
          Build your quote in <span className="italic text-gold-400">two minutes.</span>
        </h2>
        <p className="mt-5 max-w-[54ch] text-cream-100/60">
          Add products and set quantities — the per-piece rate falls automatically at 50, 100, 250
          and 500 pieces. Send the finished brief and you&rsquo;ll have a formal quotation and a
          digital mock-up within 24 hours.
        </p>
      </BlurFade>

      <BlurFade inView delay={0.06}>
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-cream-100/45">
            Quick start
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.items)}
              className="rounded-full border border-white/10 px-4 py-2 text-[0.6875rem] uppercase tracking-[0.13em] text-cream-100/70 transition-colors duration-300 hover:border-gold-500/40 hover:text-cream-100"
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="rounded-full px-3 py-2 text-[0.6875rem] uppercase tracking-[0.13em] text-cream-100/40 transition-colors duration-300 hover:text-cream-100/80"
          >
            Clear
          </button>
        </div>
      </BlurFade>

      <div className="mt-8 grid items-start gap-7 [&>*]:min-w-0 lg:grid-cols-[1.35fr_1fr]">
        {/* ---------- left: selection ---------- */}
        <div>
          <div className="grid gap-2.5">
            {QUOTE_PRODUCTS.map((p) => {
              const qty = quantities[p.id] ?? 0;
              const line = lines.find((l) => l.id === p.id);
              return (
                <div
                  key={p.id}
                  className={cn(
                    'grid grid-cols-[3.5rem_1fr] items-center gap-x-4 gap-y-3 rounded-2xl border p-3 transition-colors duration-500 sm:grid-cols-[3.5rem_1fr_auto]',
                    qty > 0
                      ? 'border-gold-500/45 bg-gold-500/[0.06]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20',
                  )}
                >
                  <Image
                    src={p.image}
                    alt=""
                    width={72}
                    height={72}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-display text-lg leading-tight text-cream-100">
                      {p.name}
                    </div>
                    <div className="mt-1 text-xs text-cream-100/45">{p.sub}</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
                    <Stepper id={p.id} name={p.name} />
                    <span className="w-24 text-right font-display text-lg tabular-nums text-cream-100">
                      {line ? inr(line.line) : '\u2014'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bezel mt-6">
            <div className="bezel-core p-6">
              <h3 className="font-display text-xl text-cream-100">Customisation &amp; production</h3>
              <p className="mt-1.5 text-sm text-cream-100/50">
                Applied per piece across the whole order.
              </p>

              <div className="mt-5 space-y-1">
                {ADDONS.map((a) => (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]"
                  >
                    <input
                      type="checkbox"
                      checked={addons[a.id]}
                      onChange={(e) => toggleAddon(a.id, e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-gold-500/50 bg-transparent transition-colors duration-300 checked:bg-gold-500 checked:shadow-[inset_0_0_0_2px_#0F2118]"
                    />
                    <span className="text-sm text-cream-100/85">
                      {a.label}
                      <span className="mt-0.5 block text-xs text-cream-100/45">
                        +{inr(a.rate)} per piece — {a.hint}
                      </span>
                    </span>
                  </label>
                ))}

                <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]">
                  <input
                    type="checkbox"
                    checked={express}
                    onChange={(e) => setExpress(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-gold-500/50 bg-transparent transition-colors duration-300 checked:bg-gold-500 checked:shadow-[inset_0_0_0_2px_#0F2118]"
                  />
                  <span className="text-sm text-cream-100/85">
                    Express production
                    <span className="mt-0.5 block text-xs text-cream-100/45">
                      +15% — priority slot, from 7 working days
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]">
                  <input
                    type="checkbox"
                    checked={gst}
                    onChange={(e) => setGst(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-gold-500/50 bg-transparent transition-colors duration-300 checked:bg-gold-500 checked:shadow-[inset_0_0_0_2px_#0F2118]"
                  />
                  <span className="text-sm text-cream-100/85">
                    Show GST @ 18%
                    <span className="mt-0.5 block text-xs text-cream-100/45">
                      Rates exclude GST until this is on
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="bezel mt-4">
            <div className="bezel-core p-6">
              <h3 className="font-display text-xl text-cream-100">How the pricing works</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/55">
                Rates fall automatically as quantity crosses 50, 100, 250 and 500 pieces. Below 25
                pieces the 25-piece rate applies — that is our minimum for a corporate run. Above
                500 pieces, and for bespoke wall art, we quote individually because the material
                cost changes with size.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- right: summary ---------- */}
        <div className="lg:sticky lg:top-28">
          <div className="relative">
            <div className="bezel">
              <div className="bezel-core p-5 sm:p-6">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-gold-400">
                  Your estimate
                </p>

                <div className="mt-5 space-y-3">
                  {lines.length === 0 ? (
                    <p className="text-sm text-cream-100/45">
                      Add a quantity to any product to build the quote. Prices fall automatically at
                      50, 100, 250 and 500 pieces.
                    </p>
                  ) : (
                    lines.map((l) => (
                      <div key={l.id}>
                        <div className="flex items-baseline justify-between gap-4 text-sm text-cream-100/85">
                          <span>
                            {l.name} <span className="text-cream-100/40">× {l.qty}</span>
                          </span>
                          <span className="tabular-nums">{inr(l.line)}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-cream-100/40 tabular-nums">
                          {inr(l.unit)} per piece
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {lines.length > 0 ? (
                  <div className="mt-6 space-y-2.5 border-t border-white/[0.09] pt-5 text-sm">
                    <div className="flex justify-between text-cream-100/70">
                      <span>
                        Subtotal <span className="text-cream-100/40">({totalQty} pieces)</span>
                      </span>
                      <span className="tabular-nums text-cream-100/90">{inr(subtotal)}</span>
                    </div>
                    {gst ? (
                      <div className="flex justify-between text-cream-100/70">
                        <span>GST @ 18%</span>
                        <span className="tabular-nums text-cream-100/90">{inr(gstAmount)}</span>
                      </div>
                    ) : null}
                    <div className="flex items-baseline justify-between border-t border-white/[0.09] pt-4 font-display text-3xl text-cream-100">
                      <span>Total</span>
                      <span className="tabular-nums">{inr(total)}</span>
                    </div>
                    {saving > 0 ? (
                      <div className="flex justify-between text-sm text-sage">
                        <span>Volume saving vs 25-pc rate</span>
                        <span className="tabular-nums">{inr(saving)}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between pt-2 text-sm text-cream-100/55">
                      <span>Production window</span>
                      <span className="text-cream-100/80">
                        {maxLead}–{maxLead + 5} working days
                      </span>
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 grid gap-2.5">
                  <Button asChild className="justify-between">
                    <a href="#contact">
                      Send this brief
                      <PillIcon>
                        <ArrowUpRight className="h-4 w-4" />
                      </PillIcon>
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => window.print()} className="justify-between">
                    Print / save as PDF
                    <PillIcon className="bg-white/[0.08]">
                      <Printer className="h-4 w-4" />
                    </PillIcon>
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-cream-100/40">
                  Indicative only. Final pricing confirmed once botanicals, hardware and packaging
                  are chosen.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            <p className="text-xs leading-relaxed text-cream-100/55">
              A sample kit is available for ₹1,200 including delivery — fully credited against your
              first bulk order above 100 pieces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
