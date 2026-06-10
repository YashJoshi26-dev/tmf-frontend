import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggle, selectWishlistIds } from '@/features/wishlist/wishlistSlice';
import { formatPrice, discountPct } from '@/utils/formatPrice';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector(selectWishlistIds);
  const isWishlisted = wishlistIds.includes(product._id);

  // First variant + first size = display price
  const variant = product.subProducts?.[0];
  const sizeRow = variant?.sizes?.[0];
  const price = sizeRow ? Number((sizeRow.price - (sizeRow.price * (variant.discount || 0)) / 100).toFixed(0)) : 0;
  const mrp = sizeRow?.price || 0;
  const pct = discountPct(price, mrp);
  const image = variant?.images?.[0]?.url || '/placeholder.jpg';
  const hover = variant?.images?.[1]?.url;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/product/${product.slug || product._id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream">
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              hover && 'group-hover:opacity-0'
            )}
          />
          {hover && (
            <img
              src={hover}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          {pct > 0 && (
            <Badge tone="maroon" className="absolute top-3 left-3">{pct}% off</Badge>
          )}
          <button
            onClick={(e) => { e.preventDefault(); dispatch(toggle(product._id)); }}
            aria-label="Wishlist"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-soft"
          >
            <Heart size={16} className={cn(isWishlisted && 'fill-brand-maroon stroke-brand-maroon')} />
          </button>
        </div>

        <div className="pt-3 pb-1">
          {product.brand && <p className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">{product.brand}</p>}
          <h3 className="text-sm md:text-base font-medium mt-1 line-clamp-2 leading-snug group-hover:text-brand-maroon transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-lg">{formatPrice(price)}</span>
            {pct > 0 && <span className="text-xs text-brand-muted line-through">{formatPrice(mrp)}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
