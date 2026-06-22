import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero4 from '../../assets/hero4.jpeg';

const FALLBACK_SLIDES = [
  {
    image: hero1,
    mobilePosition: '70% center',
    eyebrow: 'The Bridal Edit',
    title: 'Women for Forever',
    subtitle: 'Handpicked bridal couture, from Banarasi heirlooms to contemporary lehengas.',
    link: '/bridal',
    cta: 'Explore Bridal',
  },
  {
    image: hero2,
    mobilePosition: '70% center',
    eyebrow: 'New Arrivals',
    title: 'Festive Drape · 2026',
    subtitle: 'Silks, zari and craft — the new season in one curated edit.',
    link: '/collections',
    cta: 'Shop New In',
  },
  {
    image: hero4,
    mobilePosition: 'center center',
    eyebrow: 'Heritage Weaves',
    title: 'Banarasi, Reimagined',
    subtitle: 'A tribute to the loom — modern silhouettes, traditional craftsmanship.',
    link: '/category/saree/banarasi',
    cta: 'Shop Banarasi',
  },
];

export const HeroSlider = ({ slides = FALLBACK_SLIDES, intervalMs = 6000 }) => {
  const [i, setI] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  const s = slides[i];

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <section className="w-full bg-brand-charcoal flex flex-col">
        <div className="relative w-full overflow-hidden" style={{ height: '55svh' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: s.mobilePosition }}
                loading="eager"
                fetchPriority="high"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-charcoal" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-6 pt-4 pb-10 bg-brand-charcoal">
          <motion.div
            key={`text-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white"
          >
            <p className="eyebrow text-brand-gold text-xs tracking-widest">{s.eyebrow}</p>
            <h1 className="heading-display mt-2 leading-tight text-3xl">{s.title}</h1>
            <p className="mt-2 text-white/75 text-sm max-w-sm">{s.subtitle}</p>
            <Link to={s.link} className="btn-gold mt-5 inline-block">{s.cta}</Link>
          </motion.div>

          <div className="flex gap-1.5 mt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1 transition-all ${idx === i ? 'w-8 bg-brand-gold' : 'w-4 bg-white/30'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP LAYOUT ── */
  return (
    <section
      className="relative w-full overflow-hidden bg-brand-charcoal"
      style={{ height: '100svh', maxHeight: '900px', minHeight: '580px' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 container-x flex items-center">
        <motion.div
          key={`text-${i}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white max-w-xl"
        >
          <p className="eyebrow text-brand-gold">{s.eyebrow}</p>
          <h1 className="heading-display mt-3 leading-tight text-5xl lg:text-6xl">{s.title}</h1>
          <p className="mt-4 text-white/85 text-lg max-w-md">{s.subtitle}</p>
          <Link to={s.link} className="btn-gold mt-8 inline-block">{s.cta}</Link>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="hidden md:flex absolute bottom-8 right-8 gap-2 z-10">
          <button
            onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
            className="p-3 border border-white/40 text-white hover:bg-white hover:text-brand-charcoal transition-colors"
            aria-label="Previous slide"
          ><ChevronLeft size={18} /></button>
          <button
            onClick={() => setI((p) => (p + 1) % slides.length)}
            className="p-3 border border-white/40 text-white hover:bg-white hover:text-brand-charcoal transition-colors"
            aria-label="Next slide"
          ><ChevronRight size={18} /></button>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1 transition-all ${idx === i ? 'w-8 bg-brand-gold' : 'w-4 bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};