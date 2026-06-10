import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { selectCartItems, cartKey } from '@/features/cart/cartSlice';
import { CartLine } from '@/components/cart/CartLine';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyState } from '@/components/common/EmptyState';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Seo } from '@/components/common/Seo';

export default function Cart() {
  const items = useSelector(selectCartItems);

  return (
    <div className="container-x py-6 md:py-10">
      <Seo title="Your Bag" />
      <Breadcrumbs items={[{ label: 'Bag' }]} />
      <h1 className="font-serif text-3xl md:text-5xl mt-6 mb-10">Your Bag</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your bag is empty"
          message="Add some sarees you love and they'll appear here."
          action={<Link to="/collections" className="btn-primary">Continue shopping</Link>}
        />
      ) : (
        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          <div>{items.map((i) => <CartLine key={cartKey(i)} item={i} />)}</div>
          <CartSummary />
        </div>
      )}
    </div>
  );
}
