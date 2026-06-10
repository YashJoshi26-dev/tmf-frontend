import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

/** images: [{ url, ... }] */
export const ImageGallery = ({ images = [], alt = '' }) => {
  const [idx, setIdx] = useState(0);
  if (!images.length) return <div className="aspect-[3/4] bg-brand-cream" />;
  const active = images[idx];

  return (
    <div className="flex gap-4">
      {/* Thumbs — desktop vertical, mobile hidden */}
      <div className="hidden md:flex flex-col gap-3 w-20 sticky top-24 self-start max-h-[80vh] overflow-y-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={cn(
              'aspect-[3/4] overflow-hidden border-2 transition-colors',
              i === idx ? 'border-brand-maroon' : 'border-transparent hover:border-brand-cream'
            )}
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1">
        <motion.div
          key={idx}
          initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
          className="aspect-[3/4] bg-brand-cream overflow-hidden"
        >
          <img src={active.url} alt={alt} className="w-full h-full object-cover" />
        </motion.div>

        {/* Mobile dots / horizontal thumbs */}
        <div className="md:hidden flex gap-2 mt-3 overflow-x-auto scrollbar-hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                'shrink-0 w-16 aspect-[3/4] overflow-hidden border-2',
                i === idx ? 'border-brand-maroon' : 'border-transparent'
              )}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
