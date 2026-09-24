import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { TrustStrip } from '@/components/sections/trust-strip';
import { Bestsellers } from '@/components/sections/bestsellers';
import { Collections } from '@/components/sections/collections';
import { Atelier } from '@/components/sections/atelier';
import { QuoteBuilder } from '@/components/sections/quote-builder';
import { HowItWorks } from '@/components/sections/how-it-works';
import { FinalCta } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';
import { QuoteProvider } from '@/components/sections/quote-context';
import { NotesMode } from '@/components/notes-mode';

export default function HomePage() {
  return (
    <QuoteProvider>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Bestsellers />
        <Collections />
        <Atelier />
        <QuoteBuilder />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
      <NotesMode />
    </QuoteProvider>
  );
}
