import { Minus, Plus, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setQty, removeItem, cartKey } from '@/features/cart/cartSlice';
import { formatPrice } from '@/utils/formatPrice';

export const CartLine = ({ item }) => {
  const dispatch = useDispatch();
  const key = cartKey(item);

  return (
    <div className="flex gap-4 py-5 border-b border-brand-cream">
      <Link to={`/product/${item.product}`} className="shrink-0">
        <div className="w-20 h-28 md:w-24 md:h-32 bg-brand-cream overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/product/${item.product}`} className="text-sm md:text-base font-medium line-clamp-2 hover:text-brand-maroon transition">
            {item.name}
          </Link>
          <button
            onClick={() => dispatch(removeItem(key))}
            className="text-brand-muted hover:text-brand-maroon shrink-0"
            aria-label="Remove"
          ><X size={16} /></button>
        </div>

        <p className="text-xs text-brand-muted mt-1">
          {item.color?.color && <>Color: {item.color.color} · </>}
          Size: {item.size}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center border border-brand-cream">
            <button
              onClick={() => dispatch(setQty({ key, qty: item.qty - 1 }))}
              disabled={item.qty <= 1}
              className="w-8 h-8 flex items-center justify-center disabled:opacity-40"
              aria-label="Decrease"
            ><Minus size={14} /></button>
            <span className="w-8 text-center text-sm">{item.qty}</span>
            <button
              onClick={() => dispatch(setQty({ key, qty: item.qty + 1 }))}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="Increase"
            ><Plus size={14} /></button>
          </div>

          <div className="text-right">
            <p className="font-serif text-lg">{formatPrice(item.price * item.qty)}</p>
            {item.mrp > item.price && (
              <p className="text-xs text-brand-muted line-through">{formatPrice(item.mrp * item.qty)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
