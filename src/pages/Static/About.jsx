import { Seo } from '@/components/common/Seo';

export default function About() {
  return (
    <div>
      <Seo title="About Us" />
      <section className="relative h-[50vh] min-h-[400px] bg-brand-charcoal">
        <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=2000" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="relative container-x h-full flex items-center text-white">
          <div className="max-w-xl">
            <p className="eyebrow text-brand-gold">Our Story</p>
            <h1 className="heading-display mt-3">Woven with Love, Worn with Pride</h1>
          </div>
        </div>
      </section>

      <section className="container-x py-16 max-w-3xl mx-auto">
        <p className="font-display text-2xl leading-relaxed text-brand-charcoal">
          For three generations, our atelier has been a quiet keeper of the loom — sourcing the finest Banarasi silk,
          Kanjivaram, and contemporary couture from weavers across India. We believe a saree isn't merely worn — it is inherited,
          treasured, retold.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <Stat n="2,500+" l="Hand-curated pieces" />
          <Stat n="120+"   l="Master weavers" />
          <Stat n="40,000" l="Brides dressed" />
        </div>
      </section>
    </div>
  );
}

const Stat = ({ n, l }) => (
  <div>
    <p className="font-serif text-4xl text-brand-maroon">{n}</p>
    <p className="text-sm text-brand-muted mt-2 uppercase tracking-wider">{l}</p>
  </div>
);
