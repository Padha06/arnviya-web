import Image from 'next/image';
import { BlurFade } from '@/components/fx/blur-fade';
import { MagicCard } from '@/components/fx/magic-card';
import { Badge } from '@/components/ui/badge';
import { inr } from '@/lib/utils';
import { BESTSELLERS } from '@/lib/data';

export function Bestsellers() {
  return (
    <section
      id="bestsellers"
      className="section container"
      data-note="Every product carries an indicative price band instead of “price on request”. Procurement can shortlist and get internal budget approval without waiting for a reply — which is what actually shortens the sales cycle."
      data-note-impact="Removes the #1 reason corporate buyers drop off"
    >
      <BlurFade inView>
        <p className="eyebrow">Bestsellers</p>
        <h2 className="mt-6 max-w-[22ch] text-[clamp(1.75rem,3.4vw,2.875rem)]">
          The pieces that go <span className="italic text-gold-400">straight onto a desk.</span>
        </h2>
        <p className="mt-5 max-w-[52ch] text-cream-100/60">
          Daily visibility, not consumables. Rates shown are indicative per-piece at the 100-piece
          tier, excluding GST — so your team can budget before the first conversation.
        </p>
      </BlurFade>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BESTSELLERS.map((p, i) => (
          <BlurFade key={p.id} inView delay={i * 0.06}>
            <MagicCard className="h-full">
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-1000 ease-silk group-hover:scale-[1.05]"
                  />
                  {p.tag ? (
                    <Badge
                      variant={p.tag === 'New' ? 'gold' : 'forest'}
                      className="absolute left-4 top-4 z-20"
                    >
                      {p.tag}
                    </Badge>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-xl leading-snug text-cream-100">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-cream-100/55">{p.blurb}</p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                    <div>
                      <div className="font-display text-2xl leading-none text-gold-400">
                        {inr(p.priceAt100)}
                      </div>
                      <div className="mt-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-cream-100/40">
                        per piece at 100 · MOQ {p.moq}
                      </div>
                    </div>
                    <a
                      href="#quote"
                      className="shrink-0 border-b border-gold-500/40 pb-0.5 text-[0.6875rem] uppercase tracking-[0.16em] text-gold-400 transition-colors duration-300 hover:text-gold-300"
                    >
                      Add to quote
                    </a>
                  </div>
                </div>
              </article>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
