import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export const PriceRangeFilter = ({ value = {}, onChange, min = 0, max = 50000 }) => {
  const [local, setLocal] = useState({ min: value.minPrice ?? '', max: value.maxPrice ?? '' });
  const debounced = useDebounce(local, 500);

  useEffect(() => {
    onChange({ minPrice: debounced.min || undefined, maxPrice: debounced.max || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div>
      <h4 className="eyebrow mb-3">Price</h4>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder={`₹${min}`}
          value={local.min}
          onChange={(e) => setLocal((s) => ({ ...s, min: e.target.value }))}
          className="input-luxe text-sm py-2"
        />
        <input
          type="number"
          placeholder={`₹${max.toLocaleString('en-IN')}`}
          value={local.max}
          onChange={(e) => setLocal((s) => ({ ...s, max: e.target.value }))}
          className="input-luxe text-sm py-2"
        />
      </div>
    </div>
  );
};
