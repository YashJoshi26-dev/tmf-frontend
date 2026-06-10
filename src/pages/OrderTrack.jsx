import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { ordersApi } from '@/api/orders.api';
import { Loader } from '@/components/common/Loader';
import { formatPrice } from '@/utils/formatPrice';
import { Seo } from '@/components/common/Seo';
import { cn } from '@/utils/cn';

const STEPS = ['Not Processed', 'Processing', 'Dispatched', 'Completed'];

export default function OrderTrack() {
  const { orderId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersApi.byId(orderId),
  });

  if (isLoading) return <Loader />;
  const order = data?.data;
  if (!order) return <div className="container-x py-20 text-center">Order not found</div>;

  const currentIdx = STEPS.indexOf(order.status);

  return (
    <div className="container-x py-10 max-w-3xl mx-auto">
      <Seo title={`Track Order · ${order._id}`} />
      <h1 className="font-serif text-3xl md:text-4xl">Track Order</h1>
      <p className="text-brand-muted text-sm mt-2 font-mono">{order._id}</p>

      {/* Progress */}
      <div className="mt-10 flex justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-px bg-brand-cream" />
        <div
          className="absolute top-4 left-0 h-px bg-brand-maroon transition-all"
          style={{ width: `${Math.max(0, currentIdx) / (STEPS.length - 1) * 100}%` }}
        />
        {STEPS.map((s, i) => {
          const done = i <= currentIdx && order.status !== 'Cancelled';
          return (
            <div key={s} className="relative flex flex-col items-center w-1/4">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                done ? 'bg-brand-maroon text-white' : 'bg-brand-cream text-brand-muted'
              )}>
                {done ? <Check size={16} /> : <span className="text-xs">{i + 1}</span>}
              </div>
              <p className="text-xs mt-2 text-center">{s}</p>
            </div>
          );
        })}
      </div>

      {order.status === 'Cancelled' && (
        <p className="text-center mt-6 text-red-700">This order was cancelled.</p>
      )}

      {/* Items + summary */}
      <div className="mt-12 bg-white border border-brand-cream p-6">
        <h2 className="font-serif text-xl mb-4">Items</h2>
        {order.products?.map((p, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-brand-cream last:border-0">
            <img src={p.image} alt={p.name} className="w-16 h-20 object-cover" />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-brand-muted">Size {p.size} · Qty {p.qty}</p>
            </div>
            <p className="font-serif">{formatPrice(p.price * p.qty)}</p>
          </div>
        ))}
        <div className="flex justify-between mt-4 pt-4 border-t border-brand-cream">
          <span className="font-medium">Total</span>
          <span className="font-serif text-xl">{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
