import { useSearchParams } from 'react-router-dom';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PillFilter } from './PillFilter';

// Stable option lists — replace with backend-driven facets later.
const COLORS    = ['Red', 'Maroon', 'Pink', 'Blue', 'Green', 'Gold', 'Black', 'White', 'Ivory'];
const FABRICS   = ['Silk', 'Banarasi', 'Cotton', 'Georgette', 'Chiffon', 'Net', 'Velvet'];
const OCCASIONS = ['Bridal', 'Festive', 'Party', 'Casual', 'Reception'];
const WORK      = ['Zari', 'Embroidery', 'Sequins', 'Stone', 'Print'];

export const FilterSidebar = ({ onClose }) => {
  const [params, setParams] = useSearchParams();

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v == null || v === '' || v === undefined) next.delete(k);
    else next.set(k, v);
    next.delete('page'); // reset pagination on any filter change
    setParams(next, { replace: true });
  };

  const setPrice = ({ minPrice, maxPrice }) => {
    const next = new URLSearchParams(params);
    if (minPrice) next.set('minPrice', minPrice); else next.delete('minPrice');
    if (maxPrice) next.set('maxPrice', maxPrice); else next.delete('maxPrice');
    next.delete('page');
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl">Filter</h3>
        <button onClick={clearAll} className="text-xs uppercase tracking-wider text-brand-muted hover:text-brand-maroon">
          Clear all
        </button>
      </div>

      <PriceRangeFilter
        value={{ minPrice: params.get('minPrice'), maxPrice: params.get('maxPrice') }}
        onChange={setPrice}
      />
      <PillFilter title="Color"    options={COLORS}    value={params.get('color')    || ''} onChange={(v) => setParam('color', v)} />
      <PillFilter title="Fabric"   options={FABRICS}   value={params.get('fabric')   || ''} onChange={(v) => setParam('fabric', v)} />
      <PillFilter title="Occasion" options={OCCASIONS} value={params.get('occasion') || ''} onChange={(v) => setParam('occasion', v)} />
      <PillFilter title="Work"     options={WORK}      value={params.get('work')     || ''} onChange={(v) => setParam('work', v)} />

      {onClose && (
        <button onClick={onClose} className="btn-primary w-full md:hidden">View results</button>
      )}
    </aside>
  );
};
