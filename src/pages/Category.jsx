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

const CATEGORY_SEO = {
  Sarees: {
    description: 'Shop premium sarees online at The Maharaja Fashion, Indore. Explore Banarasi, Kanjivaram, silk, cotton & bridal sarees. Handpicked ethnic wear with free shipping.',
    content: 'Discover our curated collection of handpicked sarees from India\'s finest weavers. From traditional Banarasi silk sarees to contemporary designer drapes, we bring you authentic ethnic wear at the best prices. Visit our showroom in Indore or shop online.',
  },
  Lehengas: {
    description: 'Buy bridal & designer lehengas online from The Maharaja Fashion, Indore. Sidel lehenga, bridal lehenga & more. Premium ethnic wear with best pricing.',
    content: 'Explore our stunning lehenga collection — from grand bridal lehengas to elegant party wear. Each piece is carefully selected for its craftsmanship, fabric quality, and design. Perfect for weddings, receptions, and festive celebrations.',
  },
  'Bridal Sarees': {
    description: 'Shop bridal sarees online at The Maharaja Fashion Indore. Premium Banarasi, silk & designer bridal sarees for weddings. Explore our bridal collection.',
    content: 'Make your wedding day unforgettable with our exclusive bridal saree collection. Featuring rich Banarasi silk, pure Kanjivaram, and designer bridal drapes — every saree is a masterpiece crafted for your most special moments.',
  },
  Pashmina: {
    description: 'Buy authentic Pashmina sarees & shawls online from The Maharaja Fashion Indore. Pure pashmina collection at best prices.',
    content: 'Indulge in the luxury of pure Pashmina — the finest fabric from Kashmir. Our Pashmina collection features authentic weaves with intricate embroidery, perfect for winters and special occasions.',
  },
  Rajputani: {
    description: 'Shop Rajputani ethnic wear online at The Maharaja Fashion Indore. Traditional Rajasthani sarees, lehengas & more.',
    content: 'Celebrate the royal heritage of Rajasthan with our Rajputani collection. Bold colours, mirror work, and traditional embroidery make each piece a statement of culture and elegance.',
  },
};

const DEFAULT_SEO = {
  description: 'Shop premium ethnic wear online at The Maharaja Fashion, Indore. Sarees, lehengas, bridal wear & more. Handpicked collection with free shipping.',
  content: 'Browse our complete collection of premium ethnic wear. From everyday sarees to grand bridal lehengas, The Maharaja Fashion brings you the finest Indian ethnic wear at the best prices.',
};

export default function Category() {
  const { cat, sub } = useParams();
  const [params, setParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const page = parseInt(params.get('page') || '1', 10);

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

  const seoData = CATEGORY_SEO[sub] || CATEGORY_SEO[cat] || DEFAULT_SEO;
  const pageTitle = [sub, cat].filter(Boolean).join(' · ') || 'Shop';

  return (
    <div className="container-x py-6 md:py-10">
      <Seo
        title={pageTitle}
        description={seoData.description}
        canonical={`/category/${[cat, sub].filter(Boolean).join('/')}`}
      />
      <Breadcrumbs items={crumbs} />

      <div className="flex items-end justify-between mt-4 mb-8">
        <h1 className="font-serif text-3xl md:text-5xl capitalize">{sub || cat || 'All Products'}</h1>
        <p className="text-sm text-brand-muted hidden md:block">{meta.total || 0} pieces</p>
      </div>

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

          {/* Category SEO Description */}
          {!isLoading && seoData.content && (
            <div className="mt-12 pt-8 border-t border-brand-cream">
              <h2 className="font-serif text-xl mb-3">{sub || cat || 'Our Collection'}</h2>
              <p className="text-sm text-brand-muted leading-relaxed max-w-3xl">{seoData.content}</p>
            </div>
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