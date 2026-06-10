import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { selectCart, setCoupon } from '@/features/cart/cartSlice';
import { ordersApi } from '@/api/orders.api';
import { formatPrice } from '@/utils/formatPrice';

const FREE_SHIP_OVER = 2999;

export const CartSummary = ({ showCheckoutButton = true }) => {
  const dispatch = useDispatch();
  const { items, subtotal, couponCode, totalAfterDiscount } = useSelector(selectCart);
  const [code, setCode] = useState(couponCode || '');
  const [applying, setApplying] = useState(false);

  const discount = totalAfterDiscount > 0 ? subtotal - totalAfterDiscount : 0;
  const shipping = subtotal >= FREE_SHIP_OVER ? 0 : (items.length ? 99 : 0);
  const grand = (totalAfterDiscount || subtotal) + shipping;

  const applyCoupon = async () => {
    if (!code.trim()) return;
    setApplying(true);
    try {
      const res = await ordersApi.applyCoupon(code.trim());
      dispatch(setCoupon({ code: code.trim(), totalAfterDiscount: res.data.totalAfterDiscount }));
      toast.success(`Coupon applied · ${res.data.percent}% off`);
    } catch (e) {
      toast.error(e.message || 'Could not apply coupon');
    } finally { setApplying(false); }
  };

  return (
    <div className="bg-white p-6 md:p-8 border border-brand-cream sticky top-24">
      <h3 className="font-serif text-xl mb-6">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <Row label="Subtotal"        value={formatPrice(subtotal)} />
        {discount > 0 && <Row label={`Discount (${couponCode})`} value={`- ${formatPrice(discount)}`} accent />}
        <Row label="Shipping"        value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
        <div className="border-t border-brand-cream pt-3 mt-3">
          <Row label="Total" value={formatPrice(grand)} bold large />
        </div>
        {subtotal < FREE_SHIP_OVER && subtotal > 0 && (
          <p className="text-xs text-brand-muted">Add {formatPrice(FREE_SHIP_OVER - subtotal)} more for free shipping</p>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Coupon code"
          className="input-luxe text-sm flex-1"
        />
        <button onClick={applyCoupon} disabled={applying} className="btn-outline text-sm">
          {applying ? '…' : 'Apply'}
        </button>
      </div>

      {showCheckoutButton && items.length > 0 && (
        <Link to="/checkout" className="btn-primary w-full mt-6">Proceed to Checkout</Link>
      )}
    </div>
  );
};

const Row = ({ label, value, accent, bold, large }) => (
  <div className="flex justify-between">
    <span className={`${bold ? 'font-medium' : 'text-brand-muted'}`}>{label}</span>
    <span className={`${large ? 'font-serif text-xl' : ''} ${accent ? 'text-emerald-700' : ''} ${bold ? 'font-medium' : ''}`}>{value}</span>
  </div>
);
