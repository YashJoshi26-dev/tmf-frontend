import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Share2, Truck, RotateCw, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { productsApi } from '@/api/products.api';
import { addItem } from '@/features/cart/cartSlice';
import { toggle, selectWishlistIds } from '@/features/wishlist/wishlistSlice';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ColorSwatch } from '@/components/product/ColorSwatch';
import { SizeSelector } from '@/components/product/SizeSelector';
import { PriceTag } from '@/components/product/PriceTag';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Loader } from '@/components/common/Loader';
import { Seo } from '@/components/common/Seo';
import { discountPct, formatPrice } from '@/utils/formatPrice';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistIds = useSelector(selectWishlistIds);

  const { data, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      try { return await productsApi.bySlug(slug); }
      catch { return await productsApi.byId(slug); }
    },
  });

  const product = data?.data;
  const [variantIdx, setVariantIdx] = useState(0);
  const [size, setSize] = useState(null);

  const variant = product?.subProducts?.[variantIdx];
  const selectedSize = useMemo(
    () => variant?.sizes?.find((s) => s.size === size) || variant?.sizes?.[0],
    [variant, size]
  );

  if (isLoading) return <Loader label="Loading product" />;
  if (!product) return <div className="container-x py-20 text-center">Product not found</div>;

  const mrp = selectedSize?.price || 0;
  const price = Math.round(mrp - (mrp * (variant?.discount || 0)) / 100);
  const inStock = (selectedSize?.qty || 0) > 0;
  const isWishlisted = wishlistIds.includes(product._id);

  const handleAddToCart = () => {
    if (!size) return toast.error('Please select a size');
    if (!inStock) return toast.error('Out of stock');
    dispatch(addItem({
      product: product._id,
      name: product.name,
      image: variant.images?.[0]?.url || '',
      size,
      qty: 1,
      price,
      mrp,
      color: variant.color,
      style: variantIdx,
      productSubId: variant._id,
    }));
    toast.success('Added to bag');
  };

  const handleBuyNow = () => {
    if (!size) return toast.error('Please select a size');
    if (!inStock) return toast.error('Out of stock');
    dispatch(addItem({
      product: product._id,
      name: product.name,
      image: variant.images?.[0]?.url || '',
      size,
      qty: 1,
      price,
      mrp,
      color: variant.color,
      style: variantIdx,
      productSubId: variant._id,
    }));
    navigate('/cart');
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); } catch { }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied');
    }
  };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: variant?.images?.map(i => i.url) || [],
  url: `https://themaharajafashion.com/product/${product.slug}`,
  brand: { '@type': 'Brand', name: product.brand || 'The Maharaja Fashion' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price,
    url: `https://themaharajafashion.com/product/${product.slug}`,
    seller: { '@type': 'Organization', name: 'The Maharaja Fashion' },
    availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  },
  aggregateRating: product.numReviews ? {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.numReviews,
  } : undefined,
};

  return (
    <div className="container-x py-6 md:py-10">
<Seo
  title={product.name}
  description={product.description?.slice(0, 155)}
  image={variant?.images?.[0]?.url}
  type="product"
  canonical={`/product/${product.slug}`}
  jsonLd={jsonLd}
/>
      <Breadcrumbs items={[
        { label: product.category?.name || 'Shop', to: `/category/${product.category?.slug}` },
        { label: product.name },
      ]} />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={variant?.images || []} alt={product.name} />
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            {product.brand && <p className="eyebrow">{product.brand}</p>}
            <h1 className="font-serif text-3xl md:text-4xl mt-2">{product.name}</h1>

            {product.numReviews > 0 && (
              <p className="mt-2 text-sm text-brand-muted">
                ★ {product.rating?.toFixed(1)} · {product.numReviews} reviews
              </p>
            )}

            <div className="mt-6">
              <PriceTag price={price} mrp={mrp} size="lg" />
              {discountPct(price, mrp) > 0 && (
                <p className="text-xs text-emerald-700 mt-1">You save {formatPrice(mrp - price)}</p>
              )}
              <p className="text-xs text-brand-muted mt-1">Inclusive of all taxes</p>
            </div>

            {/* Color */}
            {product.subProducts?.length > 1 && (
              <div className="mt-8">
                <p className="text-sm text-brand-muted mb-3">Color: <span className="text-brand-charcoal">{variant?.color?.color}</span></p>
                <ColorSwatch variants={product.subProducts} value={variantIdx} onChange={setVariantIdx} />
              </div>
            )}

            {/* Size */}
            <div className="mt-6">
              <div className="flex justify-between mb-3">
                <p className="text-sm text-brand-muted">Size</p>
                <button className="text-xs underline text-brand-muted hover:text-brand-charcoal">Size Guide</button>
              </div>
              <SizeSelector sizes={variant?.sizes || []} value={size} onChange={setSize} />
            </div>

            {/* Stock pill */}
            {selectedSize && (
              <div className="mt-3">
                {inStock
                  ? selectedSize.qty < 5
                    ? <Badge tone="warning">Only {selectedSize.qty} left</Badge>
                    : <Badge tone="success">In stock</Badge>
                  : <Badge tone="danger">Out of stock</Badge>}
              </div>
            )}

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button onClick={handleAddToCart} className="btn-primary">Add to Bag</button>
              <button onClick={handleBuyNow} className="btn-gold">Buy Now</button>
            </div>

            <div className="flex gap-4 mt-4 text-sm">
              <button onClick={() => dispatch(toggle(product._id))} className="flex items-center gap-2 text-brand-muted hover:text-brand-maroon">
                <Heart size={16} className={isWishlisted ? 'fill-brand-maroon stroke-brand-maroon' : ''} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button onClick={share} className="flex items-center gap-2 text-brand-muted hover:text-brand-maroon">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* USPs */}
            <div className="mt-8 grid grid-cols-3 gap-2 text-center">
              <USP icon={Truck} label="Free shipping" />
              <USP icon={RotateCw} label="Easy returns" />
              <USP icon={Shield} label="Genuine craft" />
            </div>

            {/* Details */}
            <div className="mt-10">
              <Accordion items={[
                { title: 'Description', content: product.description, defaultOpen: true },
                { title: 'Fabric & Care', content: product.details?.map((d) => `${d.name}: ${d.value}`).join(' · ') || 'Dry clean only.' },
                { title: 'Returns', content: '7-day return policy. Items must be unworn, unwashed, and in original packaging.' },
                { title: 'Shipping', content: 'Free shipping on orders above ₹1,999. Delivered in 3-7 business days.' },
              ]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const USP = ({ icon: Icon, label }) => (
  <div className="border border-brand-cream py-3 text-xs">
    <Icon size={16} className="mx-auto text-brand-gold mb-1" />
    {label}
  </div>
);