import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminApi } from '@/api/admin.api';
import { Loader } from '@/components/common/Loader';
import { formatPrice } from '@/utils/formatPrice';

const STATUSES = ['Not Processed', 'Processing', 'Dispatched', 'Completed', 'Cancelled'];

const STATUS_COLORS = {
  'Not Processed': { bg: '#FFF3CD', color: '#856404', label: 'NOT PROCESSED' },
  'Processing':    { bg: '#CCE5FF', color: '#004085', label: 'PROCESSING' },
  'Dispatched':    { bg: '#D4EDDA', color: '#155724', label: 'DISPATCHED' },
  'Completed':     { bg: '#D4EDDA', color: '#155724', label: 'COMPLETED' },
  'Cancelled':     { bg: '#F8D7DA', color: '#721C24', label: 'CANCELLED' },
};

export default function AdminOrders() {
  const [status, setStatus] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', status],
    queryFn: () => adminApi.listOrders({ ...(status && { status }), limit: 50 }),
  });

  const update = useMutation({
    mutationFn: ({ id, status }) => adminApi.updateStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-orders'] }); toast.success('Status updated'); },
    onError: (e) => toast.error(e.message),
  });

  if (isLoading) return <Loader />;
  const orders = data?.data || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl">Orders</h1>
          <p className="text-xs text-brand-muted mt-1">{orders.length} orders found</p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-transparent border border-brand-cream px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border border-brand-cream">
        <table className="w-full text-sm">
          <thead className="bg-brand-cream text-left">
            <tr>
              <th className="p-3 font-medium">Order ID</th>
              <th className="p-3 font-medium">Customer</th>
              <th className="p-3 font-medium">Items</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium">Payment</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-cream">
            {orders.map((o) => {
              const sc = STATUS_COLORS[o.status] || STATUS_COLORS['Not Processed'];
              const isExpanded = expandedId === o._id;

              return (
                <>
                  <tr
                    key={o._id}
                    className="hover:bg-brand-cream/30 cursor-pointer transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : o._id)}
                  >
                    {/* Order ID */}
                    <td className="p-3">
                      <p className="font-medium text-brand-maroon">
                        {o.orderId || `#${o._id.slice(-6).toUpperCase()}`}
                      </p>
                      {o.invoiceNumber && (
                        <p className="text-xs text-brand-muted">{o.invoiceNumber}</p>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="p-3">
                      <p className="font-medium">{o.user?.name || o.shippingAddress?.fullName || 'N/A'}</p>
                      <p className="text-xs text-brand-muted">{o.user?.email}</p>
                      <p className="text-xs text-brand-muted">{o.shippingAddress?.phoneNumber}</p>
                    </td>

                    {/* Items count */}
                    <td className="p-3">
                      <p>{o.products?.length || 0} item{o.products?.length !== 1 ? 's' : ''}</p>
                    </td>

                    {/* Total */}
                    <td className="p-3 font-serif font-semibold">
                      {formatPrice(o.total)}
                    </td>

                    {/* Payment */}
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        o.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {o.isPaid ? '✓ Paid' : '⏳ Pending'}
                      </span>
                      <p className="text-xs text-brand-muted mt-1 uppercase">{o.paymentMethod}</p>
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className="text-xs px-2 py-1 rounded font-medium"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {sc.label}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-3 text-brand-muted text-xs">
                      {new Date(o.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>

                    {/* Action */}
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        defaultValue=""
                        onChange={(e) => e.target.value && update.mutate({ id: o._id, status: e.target.value })}
                        className="text-xs bg-white border border-brand-cream px-2 py-1.5 rounded"
                      >
                        <option value="">Change…</option>
                        {STATUSES.filter((s) => s !== o.status).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  {/* Expanded row — order details */}
                  {isExpanded && (
                    <tr key={`${o._id}-expanded`} className="bg-brand-cream/20">
                      <td colSpan={8} className="p-4">
                        <div className="grid md:grid-cols-3 gap-6">

                          {/* Products */}
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-brand-muted mb-2">Items Ordered</p>
                            <div className="space-y-2">
                              {o.products?.map((p, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  {p.image && (
                                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                                  )}
                                  <div>
                                    <p className="text-xs font-medium">{p.name}</p>
                                    <p className="text-xs text-brand-muted">
                                      Size: {p.size} · Qty: {p.qty} · {formatPrice(p.price)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-brand-muted mb-2">Shipping Address</p>
                            <div className="text-xs text-brand-charcoal space-y-0.5">
                              <p className="font-medium">{o.shippingAddress?.fullName}</p>
                              <p>{o.shippingAddress?.address1}</p>
                              {o.shippingAddress?.address2 && <p>{o.shippingAddress.address2}</p>}
                              <p>{o.shippingAddress?.city}, {o.shippingAddress?.state} {o.shippingAddress?.zipCode}</p>
                              <p>{o.shippingAddress?.country}</p>
                              <p className="font-medium mt-1">📞 {o.shippingAddress?.phoneNumber}</p>
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-brand-muted mb-2">Order Summary</p>
                            <div className="text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-brand-muted">Subtotal</span>
                                <span>{formatPrice(o.totalBeforeDiscount || o.total)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-brand-muted">Shipping</span>
                                <span>{o.shippingPrice === 0 ? 'Free' : formatPrice(o.shippingPrice)}</span>
                              </div>
                              {o.couponApplied && (
                                <div className="flex justify-between text-green-600">
                                  <span>Coupon ({o.couponApplied})</span>
                                  <span>Applied</span>
                                </div>
                              )}
                              <div className="flex justify-between font-semibold border-t border-brand-cream pt-1 mt-1">
                                <span>Total</span>
                                <span>{formatPrice(o.total)}</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-brand-muted">No orders found</p>
        </div>
      )}
    </div>
  );
}