import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { selectWishlistIds } from '@/features/wishlist/wishlistSlice';
import { productsApi } from '@/api/products.api';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/common/EmptyState';

export default function Wishlist() {
  const ids = useSelector(selectWishlistIds);

  // Fetch each wishlisted product. For larger wishlists, add a batch endpoint to backend.
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist', ids],
    enabled: ids.length > 0,
    queryFn: async () => {
      const results = await Promise.allSettled(ids.map((id) => productsApi.byId(id)));
      return results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value.data);
    },
  });

  if (ids.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        message="Tap the heart on any product to save it for later."
        action={<Link to="/collections" className="btn-primary">Browse collections</Link>}
      />
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Wishlist <span className="text-brand-muted text-base">({ids.length})</span></h1>
      <ProductGrid products={data || []} loading={isLoading} />
    </div>
  );
}
