import { formatPrice, discountPct } from '@/utils/formatPrice';

export const PriceTag = ({ price, mrp, size = 'md' }) => {
  const pct = discountPct(price, mrp);
  const sizes = {
    sm: { p: 'text-base',     m: 'text-xs' },
    md: { p: 'text-2xl',      m: 'text-sm' },
    lg: { p: 'text-3xl md:text-4xl', m: 'text-base' },
  }[size];
  return (
    <div className="flex items-baseline gap-3">
      <span className={`font-serif ${sizes.p}`}>{formatPrice(price)}</span>
      {pct > 0 && (
        <>
          <span className={`text-brand-muted line-through ${sizes.m}`}>{formatPrice(mrp)}</span>
          <span className="text-xs text-emerald-700 font-medium uppercase tracking-wider">Save {pct}%</span>
        </>
      )}
    </div>
  );
};
