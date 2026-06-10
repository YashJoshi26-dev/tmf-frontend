import { cn } from '@/utils/cn';

const tones = {
  gold:    'bg-brand-gold/15 text-brand-goldDark border border-brand-gold/30',
  maroon:  'bg-brand-maroon text-white',
  ivory:   'bg-brand-ivory text-brand-charcoal border border-brand-cream',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-800',
  danger:  'bg-red-100 text-red-700',
};

export const Badge = ({ tone = 'gold', children, className }) => (
  <span className={cn('inline-flex items-center text-xs px-2.5 py-1 tracking-wide uppercase font-medium', tones[tone], className)}>
    {children}
  </span>
);
