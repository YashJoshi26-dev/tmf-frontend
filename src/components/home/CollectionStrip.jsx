import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';

/**
 * Horizontal-scroll strip of products with an eyebrow + optional CTA.
 * Used for: Trending, New Arrivals, Bestsellers, Editorial collections.
 */
export const CollectionStrip = ({
  eyebrow,
  title,
  description,
  link,
  cta = 'View all',
  products = [],
  loading = false,
}) => (
  <section className="container-x py-12 md:py-20">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="heading-display mt-2">{title}</h2>
        {description && <p className="text-brand-muted mt-3 max-w-2xl">{description}</p>}
      </motion.div>
      {link && <Link to={link} className="text-sm uppercase tracking-[0.2em] border-b border-brand-charcoal pb-1 hover:text-brand-maroon hover:border-brand-maroon transition-colors self-start md:self-end">{cta}</Link>}
    </div>

    {/* On desktop: grid. On mobile: horizontal scroll for snappy browsing. */}
    <div className="hidden md:grid grid-cols-4 gap-x-4 gap-y-10">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        : products.slice(0, 8).map((p) => <ProductCard key={p._id} product={p} />)
      }
    </div>

    <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-hidden -mx-4 px-4 snap-x snap-mandatory">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-[60vw] shrink-0"><CardSkeleton /></div>)
        : products.slice(0, 8).map((p) => (
            <div key={p._id} className="w-[60vw] shrink-0 snap-start"><ProductCard product={p} /></div>
          ))
      }
    </div>
  </section>
);

const CardSkeleton = () => (
  <div>
    <div className="aspect-[3/4] skeleton" />
    <div className="h-3 mt-3 w-1/3 skeleton" />
    <div className="h-4 mt-2 w-3/4 skeleton" />
    <div className="h-5 mt-2 w-1/4 skeleton" />
  </div>
);
