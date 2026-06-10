import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/utils/formatPrice';
import { Package } from 'lucide-react';

const statusTone = {
  'Not Processed': 'ivory',
  'Processing':    'gold',
  'Dispatched':    'gold',
  'Completed':     'success',
  'Cancelled':     'danger',
};

export default function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => ordersApi.mine(),
  });

  if (isLoading) return <Loader />;
  const orders = data?.data || [];

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        message="Once you place an order it will appear here."
        action={<Link to="/collections" className="btn-primary">Start shopping</Link>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl mb-2">Your Orders</h1>
      {orders.map((o) => (
        <div key={o._id} className="border border-brand-cream p-5 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-wider">Order</p>
              <p className="font-mono text-sm">{o._id}</p>
            </div>
            <Badge tone={statusTone[o.status] || 'ivory'}>{o.status}</Badge>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm">
            <p className="text-brand-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <p>{o.products?.length} items</p>
            <p className="font-serif text-lg">{formatPrice(o.total)}</p>
            <Link to={`/order/track/${o._id}`} className="text-brand-maroon underline">Track</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
