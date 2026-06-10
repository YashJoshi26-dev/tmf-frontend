import { cn } from '@/utils/cn';

export const SizeSelector = ({ sizes = [], value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {sizes.map((s) => {
      const disabled = s.qty <= 0;
      const selected = s.size === value;
      return (
        <button
          key={s.size}
          disabled={disabled}
          onClick={() => onChange(s.size)}
          className={cn(
            'min-w-[56px] px-4 py-2 border text-sm tracking-wide transition-colors',
            selected ? 'bg-brand-charcoal border-brand-charcoal text-white' : 'border-brand-cream hover:border-brand-charcoal',
            disabled && 'opacity-40 line-through cursor-not-allowed'
          )}
        >{s.size}</button>
      );
    })}
  </div>
);
