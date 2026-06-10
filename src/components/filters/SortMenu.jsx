import { useSearchParams } from 'react-router-dom';

const OPTIONS = [
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

export const SortMenu = () => {
  const [params, setParams] = useSearchParams();
  const value = params.get('sortBy') || 'newest';

  const onChange = (e) => {
    const next = new URLSearchParams(params);
    next.set('sortBy', e.target.value);
    setParams(next, { replace: true });
  };

  return (
    <label className="text-sm flex items-center gap-2">
      <span className="text-brand-muted">Sort by</span>
      <select value={value} onChange={onChange} className="bg-transparent border border-brand-cream px-3 py-2 focus:outline-none focus:border-brand-charcoal">
        {OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
};
