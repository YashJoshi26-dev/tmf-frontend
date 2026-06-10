import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { CartLine } from './CartLine';
import { EmptyState } from '@/components/common/EmptyState';
import { selectCartItems, selectCart } from '@/features/cart/cartSlice';
import { formatPrice } from '@/utils/formatPrice';

export const CartDrawer = ({ open, onClose }) => {
  const items = useSelector(selectCartItems);
  const { subtotal } = useSelector(selectCart);

  return (
    <Drawer open={open} onClose={onClose} title={`Your Bag (${items.length})`}>
      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your bag is empty"
          message="Discover sarees, lehengas and bridal couture you'll fall in love with."
          action={<Link to="/collections" onClick={onClose} className="btn-primary">Shop now</Link>}
        />
      ) : (
        <>
          <div className="px-6">{items.map((i) => <CartLine key={`${i.product}-${i.size}-${i.style}`} item={i} />)}</div>
          <div className="border-t border-brand-cream p-6 bg-brand-ivory">
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
            </div>
            <Link to="/cart" onClick={onClose} className="btn-outline w-full mb-2">View Bag</Link>
            <Link to="/checkout" onClick={onClose} className="btn-primary w-full">Checkout</Link>
          </div>
        </>
      )}
    </Drawer>
  );
};
