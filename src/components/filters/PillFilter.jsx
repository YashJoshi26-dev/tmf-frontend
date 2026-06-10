import { cn } from '@/utils/cn';

/**
 * Multi-select pill filter.
 * value: comma-separated string ("red,blue") to play nicely with URL params.
 */
export const PillFilter = ({ title, options = [], value = '', onChange }) => {
  const selected = value ? value.split(',') : [];

  const toggle = (opt) => {
    const next = selected.includes(opt)
      ? selected.filter((s) => s !== opt)
      : [...selected, opt];
    onChange(next.join(','));
  };

  return (
    <div>
      <h4 className="eyebrow mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={cn(
                'px-3 py-1.5 text-xs border transition-colors',
                active
                  ? 'bg-brand-charcoal text-white border-brand-charcoal'
                  : 'border-brand-cream hover:border-brand-charcoal'
              )}
            >{opt}</button>
          );
        })}
      </div>
    </div>
  );
};
