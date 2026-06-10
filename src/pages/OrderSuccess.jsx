import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2 } from 'lucide-react';
import { ordersApi } from '@/api/orders.api';
import { Loader } from '@/components/common/Loader';
import { Seo } from '@/components/common/Seo';
import { formatPrice } from '@/utils/formatPrice';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersApi.byId(orderId),
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (isLoading) return <Loader />;
  const order = data?.data;

  return (
    <div className="container-x py-16 md:py-24 max-w-xl mx-auto text-center">
      <Seo title="Order Confirmed" />
      <CheckCircle2 className="mx-auto text-emerald-600 mb-6" size={64} strokeWidth={1.25} />
      <h1 className="font-serif text-3xl md:text-4xl">Thank you for your order</h1>
      <p className="text-brand-muted mt-3">A confirmation has been sent to your email.</p>

      {order && (
        <div className="bg-white border border-brand-cream p-6 mt-10 text-left">
          <div className="flex justify-between py-2 border-b border-brand-cream">
            <span className="text-brand-muted">Order ID</span>
            <span className="font-mono text-sm">{order._id}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-cream">
            <span className="text-brand-muted">Items</span>
            <span>{order.products?.length}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-brand-cream">
            <span className="text-brand-muted">Payment</span>
            <span className="capitalize">{order.paymentMethod}{order.isPaid ? ' · Paid' : ''}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-brand-muted">Total</span>
            <span className="font-serif text-xl">{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-10 justify-center">
        <Link to={`/account/orders`} className="btn-outline">View My Orders</Link>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
