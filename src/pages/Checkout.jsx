import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ordersApi } from '@/api/orders.api';
import { authApi } from '@/api/auth.api';
import { selectIsAuthed, selectUser } from '@/features/auth/authSlice';
import { selectCart, clearCart } from '@/features/cart/cartSlice';
import { AddressForm } from '@/components/checkout/AddressForm';
import { CartSummary } from '@/components/cart/CartSummary';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Seo } from '@/components/common/Seo';
import { openRazorpay } from '@/utils/razorpay';

const PAYMENT_METHODS = [
  {
    id: 'razorpay',
    label: 'UPI / Cards / Netbanking',
    desc: 'PhonePe, GPay, Paytm, Cards · Powered by Razorpay',
    icon: '💳',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    desc: 'Pay when you receive your order',
    icon: '💵',
    disabed: true, 
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authed   = useSelector(selectIsAuthed);
  const user     = useSelector(selectUser);
  const cart     = useSelector(selectCart);

  const [addresses, setAddresses]           = useState([]);
  const [selectedAddrId, setSelectedAddrId] = useState(null);
  const [adding, setAdding]                 = useState(false);
  const [method, setMethod]                 = useState('razorpay');
  const [placing, setPlacing]               = useState(false);

  // Idempotency key — one per checkout session
  const idempotencyKey = useRef(crypto.randomUUID());

  useEffect(() => {
    if (!authed) navigate('/auth/login?next=/checkout', { replace: true });
    else if (cart.items.length === 0) navigate('/cart', { replace: true });
  }, [authed, cart.items.length, navigate]);

  // Load addresses
  useEffect(() => {
    if (!authed) return;
    authApi.me().then((res) => {
      const list = res.data?.address || [];
      setAddresses(list);
      const def = list.find((a) => a.isDefault) || list[0];
      if (def) setSelectedAddrId(def._id);
      else setAdding(true);
    }).catch(() => setAdding(true));
  }, [authed]);

  // Pre-sync cart on mount
  useEffect(() => {
    if (!authed || !cart.items.length) return;
    ordersApi.saveCart(cart.items.map((i) => ({
      product:      i.product,
      size:         i.size,
      qty:          i.qty,
      style:        i.style ?? 0,
      productSubId: i.productSubId || '',
    }))).catch(() => {});
  }, [authed]);

  const saveAddress = async (payload) => {
    try {
      const res = await authApi.addAddress({ ...payload, isDefault: addresses.length === 0 });
      setAddresses(res.data);
      setSelectedAddrId(res.data[res.data.length - 1]._id);
      setAdding(false);
    } catch (e) { toast.error(e.message); }
  };

  const placeOrder = async () => {
    if (placing) return;
    const addr = addresses.find((a) => a._id === selectedAddrId);
    if (!addr) return toast.error('Please choose a delivery address');

    // Block COD
    if (method === 'cod') {
      toast.error('Cash on Delivery is not available at your location. Please choose UPI / Cards / Netbanking.');
      return;
    }

    setPlacing(true);
    try {
      // Sync cart to server
      await ordersApi.saveCart(cart.items.map((i) => ({
        product:      i.product,
        size:         i.size,
        qty:          i.qty,
        style:        i.style ?? 0,
        productSubId: i.productSubId || '',
      })));

      const { data: { order, payment } } = await ordersApi.create({
        shippingAddress: {
          fullName:    addr.fullName,
          phoneNumber: addr.phoneNumber,
          state:       addr.state,
          city:        addr.city,
          zipCode:     addr.zipCode,
          address1:    addr.address1,
          address2:    addr.address2 || '',
          country:     addr.country,
        },
        paymentMethod:  method,
        couponCode:     cart.couponCode || undefined,
        idempotencyKey: idempotencyKey.current,
      });

      // COD flow
      if (method === 'cod') {
        dispatch(clearCart());
        toast.success(`Order placed! ${order.orderId}`);
        navigate(`/order/success/${order._id}`);
        return;
      }

      // Razorpay flow
      if (!payment) throw new Error('Payment session not created');
      await openRazorpay({
        payment,
        order,
        user,
        onSuccess: async (rzpResponse) => {
          try {
            await ordersApi.verifyRazorpay(order._id, {
              razorpay_order_id:   rzpResponse.razorpay_order_id,
              razorpay_payment_id: rzpResponse.razorpay_payment_id,
              razorpay_signature:  rzpResponse.razorpay_signature,
            });
            dispatch(clearCart());
            navigate(`/order/success/${order._id}`);
          } catch (e) {
            toast.error(e.message || 'Payment verification failed');
          }
        },
        onFailure: (err) => toast.error(err?.description || err?.message || 'Payment failed'),
      });
    } catch (e) {
      toast.error(e.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container-x py-6 md:py-10">
      <Seo title="Checkout" />
      <Breadcrumbs items={[{ label: 'Bag', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="font-serif text-3xl md:text-5xl mt-6 mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-10">

          {/* Address */}
          <section>
            <h2 className="font-serif text-xl mb-4">Shipping Address</h2>
            {!adding && addresses.length > 0 && (
              <div className="space-y-3">
                {addresses.map((a) => (
                  <label
                    key={a._id}
                    className={`block p-4 border cursor-pointer rounded-lg transition-colors ${
                      selectedAddrId === a._id
                        ? 'border-brand-maroon bg-brand-maroon/5'
                        : 'border-brand-cream hover:border-brand-maroon/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="addr"
                      checked={selectedAddrId === a._id}
                      onChange={() => setSelectedAddrId(a._id)}
                      className="sr-only"
                    />
                    <p className="font-medium">
                      {a.fullName}
                      <span className="font-normal text-brand-muted text-sm"> · {a.phoneNumber}</span>
                    </p>
                    <p className="text-sm text-brand-muted mt-1">
                      {a.address1}{a.address2 && `, ${a.address2}`}, {a.city}, {a.state} {a.zipCode}, {a.country}
                    </p>
                  </label>
                ))}
                <button onClick={() => setAdding(true)} className="text-sm underline text-brand-maroon">
                  + Add new address
                </button>
              </div>
            )}
            {adding && (
              <div className="p-6 border border-brand-cream rounded-lg">
                <AddressForm onSubmit={saveAddress} submitLabel="Use this address" />
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="font-serif text-xl mb-4">Payment Method</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`block p-4 border cursor-pointer rounded-lg transition-colors ${
                    method === m.id
                      ? 'border-brand-maroon bg-brand-maroon/5'
                      : 'border-brand-cream hover:border-brand-maroon/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="font-medium">{m.label}</p>
                      <p className="text-sm text-brand-muted">{m.desc}</p>
                    </div>
                    {method === m.id && (
                      <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>

          <button
            onClick={placeOrder}
            disabled={placing || !selectedAddrId}
            className="btn-primary w-full lg:w-auto lg:px-12 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {placing ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Placing order…
              </span>
            ) : `Place Order`}
          </button>

        </div>
        <CartSummary showCheckoutButton={false} />
      </div>
    </div>
  );
}