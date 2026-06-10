/** Format paise/rupees in Indian rupee notation. */
export const formatPrice = (n) => {
  if (n == null || isNaN(n)) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
};

/** Percent off: (mrp - price) / mrp */
export const discountPct = (price, mrp) => {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

export const slugify = (s = '') =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Pluralize naive: ('item', 1) → 'item'; ('item', 2) → 'items'. */
export const plural = (word, n) => (n === 1 ? word : `${word}s`);
