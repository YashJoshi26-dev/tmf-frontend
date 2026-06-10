import { Star } from 'lucide-react';

const items = [
  { name: 'Priya · Mumbai',     text: 'My wedding saree felt like an heirloom from the moment I unwrapped it. The zari work is exquisite.', rating: 5 },
  { name: 'Aishwarya · Delhi',  text: 'I ordered three sarees. Each one arrived perfectly packed, with the colors exactly as shown.',     rating: 5 },
  { name: 'Meera · Bengaluru',  text: 'Quality you can feel. The Banarasi I bought is now my mother\'s favorite — that says everything.',  rating: 5 },
];

export const Testimonials = () => (
  <section className="bg-brand-cream py-16 md:py-24">
    <div className="container-x">
      <div className="text-center mb-12">
        <p className="eyebrow">Loved by Brides & Connoisseurs</p>
        <h2 className="heading-display mt-3">Stories from Our Clients</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="bg-white p-8 shadow-soft">
            <div className="flex gap-0.5 text-brand-gold mb-4">
              {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
            </div>
            <p className="font-display text-lg italic text-brand-charcoal leading-relaxed">“{t.text}”</p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brand-muted">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
