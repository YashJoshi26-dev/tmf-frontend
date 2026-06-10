import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal } from 'lucide-react';
import { productsApi } from '@/api/products.api';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { SortMenu } from '@/components/filters/SortMenu';
import { Drawer } from '@/components/ui/Drawer';
import { Pagination } from '@/components/common/Pagination';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { Seo } from '@/components/common/Seo';

export default function Category() {
  const { cat, sub } = useParams();
  const [params, setParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);

  const page = parseInt(params.get('page') || '1', 10);

  // Compose query for backend
  const query = {
    page,
    limit: 24,
    ...(cat && { category: cat }),
    ...(sub && { subCategory: sub }),
    ...Object.fromEntries(params),
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'list', query],
    queryFn: () => productsApi.list(query),
    keepPreviousData: true,
  });

  const products = data?.data || [];
  const meta = data?.meta || {};

  const setPage = (p) => {
    const next = new URLSearchParams(params);
    next.set('page', p);
    setParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const crumbs = [];
  if (cat) crumbs.push({ label: cat, to: `/category/${cat}` });
  if (sub) crumbs.push({ label: sub });

  return (
    <div className="container-x py-6 md:py-10">
      <Seo title={[sub, cat].filter(Boolean).join(' · ') || 'Shop'} />
      <Breadcrumbs items={crumbs} />

      <div className="flex items-end justify-between mt-4 mb-8">
        <h1 className="font-serif text-3xl md:text-5xl capitalize">{sub || cat || 'All Products'}</h1>
        <p className="text-sm text-brand-muted hidden md:block">{meta.total || 0} pieces</p>
      </div>

      {/* Mobile filter trigger row */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button onClick={() => setMobileFilters(true)} className="btn-outline text-sm py-2">
          <SlidersHorizontal size={16} className="mr-2" /> Filters
        </button>
        <SortMenu />
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-8">
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        <div>
          <div className="hidden md:flex justify-end mb-4">
            <SortMenu />
          </div>

          {!isLoading && products.length === 0 ? (
            <EmptyState title="No products match these filters" message="Try clearing some filters." />
          ) : (
            <>
              <ProductGrid products={products} loading={isLoading} />
              <Pagination page={meta.page || page} totalPages={meta.totalPages || 1} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      <Drawer open={mobileFilters} onClose={() => setMobileFilters(false)} title="Filters" side="left">
        <div className="p-6">
          <FilterSidebar onClose={() => setMobileFilters(false)} />
        </div>
      </Drawer>
    </div>
  );
}
