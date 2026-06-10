import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FeatureBanner = ({ eyebrow, title, copy, image, cta = 'Discover', link = '/collections', reverse = false }) => (
  <section className="container-x py-12 md:py-20">
    <div className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
      <motion.div
        className="aspect-[4/5] overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        className="px-2 md:px-8 [direction:ltr]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="heading-display mt-3">{title}</h2>
        <p className="text-brand-muted mt-4 max-w-md leading-relaxed">{copy}</p>
        <Link to={link} className="btn-outline mt-8 inline-flex">{cta}</Link>
      </motion.div>
    </div>
  </section>
);
