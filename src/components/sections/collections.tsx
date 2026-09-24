import Image from 'next/image';
import { BlurFade } from '@/components/fx/blur-fade';
import { BentoGrid, BentoGridItem } from '@/components/fx/bento-grid';
import { Building, Cap, Flask, Home, Spark } from '@/components/icons';
import { COLLECTIONS } from '@/lib/data';

const ICONS: Record<string, React.ReactNode> = {
  welcome: <Spark />,
  doctor: <Flask />,
  possession: <Home />,
  festive: <Cap />,
  keepsakes: <Building />,
};

export function Collections() {
  return (
    <section
      id="collections"
      className="section container"
      data-note="Bundled collections lift average order value. A buyer who arrived for keychains leaves with a ₹2,500 kit — and the kit is what they actually hand over."
      data-note-impact="Raises value per enquiry"
    >
      <BlurFade inView>
        <p className="eyebrow">Collections</p>
        <h2 className="mt-6 max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.875rem)]">
          Curated for the moments your <span className="italic text-gold-400">people remember.</span>
        </h2>
        <p className="mt-5 max-w-[52ch] text-cream-100/60">
          Assembled, branded and boxed before they reach you. Every collection can be adjusted —
          swap an item, change a palette, add a card.
        </p>
      </BlurFade>

      <BlurFade inView delay={0.1}>
        <BentoGrid className="mt-14">
          {COLLECTIONS.map((c) => (
            <BentoGridItem
              key={c.id}
              className={c.span}
              title={c.name}
              description={c.blurb}
              meta={c.meta}
              icon={ICONS[c.id]}
              header={
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-silk group-hover/bento:scale-[1.04]"
                />
              }
            />
          ))}
        </BentoGrid>
      </BlurFade>
    </section>
  );
}
