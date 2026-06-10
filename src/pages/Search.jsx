import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/api/products.api';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { EmptyState } from '@/components/common/EmptyState';
import { Seo } from '@/components/common/Seo';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') || '';
  const [q, setQ] = useState(initial);
  const debounced = useDebounce(q, 350);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (debounced) next.set('q', debounced); else next.delete('q');
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => productsApi.list({ search: debounced, limit: 24 }),
    enabled: !!debounced,
  });

  const products = data?.data || [];

  return (
    <div className="container-x py-6 md:py-10">
      <Seo title={debounced ? `Search: ${debounced}` : 'Search'} />
      <h1 className="font-serif text-3xl md:text-5xl mb-6">Search</h1>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search sarees, lehengas, brands…"
        className="input-luxe"
      />

      <div className="mt-10">
        {!debounced && <EmptyState title="Start typing" message="Try Banarasi, bridal, silk, red lehenga…" />}
        {debounced && !isLoading && products.length === 0 && (
          <EmptyState title="No results" message={`Nothing matched "${debounced}". Try a different keyword.`} />
        )}
        {debounced && (isLoading || products.length > 0) && (
          <>
            <p className="text-sm text-brand-muted mb-6">{isLoading ? 'Searching…' : `${products.length} results`}</p>
            <ProductGrid products={products} loading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
}
