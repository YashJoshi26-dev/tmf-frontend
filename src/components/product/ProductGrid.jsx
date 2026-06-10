import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products = [], loading = false, skeletonCount = 8 }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {Array.from({ length: skeletonCount }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </div>
  );
};

const ProductCardSkeleton = () => (
  <div>
    <div className="aspect-[3/4] skeleton" />
    <div className="h-3 mt-3 w-1/3 skeleton" />
    <div className="h-4 mt-2 w-3/4 skeleton" />
    <div className="h-5 mt-2 w-1/4 skeleton" />
  </div>
);
