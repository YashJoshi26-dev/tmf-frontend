import { cn } from '@/utils/cn';

/** Visual selector for color variants. variants: [{ color: {color, image}, ... }] */
export const ColorSwatch = ({ variants = [], value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {variants.map((v, i) => {
      const selected = i === value;
      const colorName = v.color?.color || `Color ${i + 1}`;
      const swatch = v.color?.image || v.images?.[0]?.url;
      return (
        <button
          key={i}
          onClick={() => onChange(i)}
          title={colorName}
          aria-label={colorName}
          className={cn(
            'w-10 h-10 overflow-hidden border-2 transition-all',
            selected ? 'border-brand-maroon ring-2 ring-brand-maroon/20' : 'border-brand-cream hover:border-brand-gold'
          )}
        >
          {swatch
            ? <img src={swatch} alt="" className="w-full h-full object-cover" />
            : <span className="block w-full h-full" style={{ background: colorName.toLowerCase() }} />}
        </button>
      );
    })}
  </div>
);
