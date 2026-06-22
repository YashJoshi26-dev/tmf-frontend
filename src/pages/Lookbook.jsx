import { Seo } from '@/components/common/Seo';

const SHOTS = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200',
  'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=1200',
  'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=1200',
  'https://images.unsplash.com/photo-1583391733975-4d2c1a4d8a16?w=1200',
  'https://images.unsplash.com/photo-1614623064333-c92b5c6e76d6?w=1200',
];

export default function Lookbook() {
  return (
    <div>
      <Seo
  title="Lookbook 2026"
  description="Explore The Maharaja Fashion Lookbook – an editorial collection of premium sarees, lehengas and bridal wear."
  canonical="/lookbook"
/>
      <section className="container-x py-12 md:py-20 text-center">
        <p className="eyebrow">Edit · 2026</p>
        <h1 className="heading-display mt-3">The Lookbook</h1>
        <p className="text-brand-muted mt-3 max-w-xl mx-auto">An editorial gaze at the season's drapes, weaves and silhouettes.</p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-2 md:px-6 max-w-7xl mx-auto pb-20">
        {SHOTS.map((src, i) => (
          <figure key={i} className={`overflow-hidden ${i % 5 === 0 ? 'md:row-span-2' : ''}`}>
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </figure>
        ))}
      </div>
    </div>
  );
}
