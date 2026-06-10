import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { IndianRupee, ShoppingBag, Users, Package, TrendingUp, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { analyticsApi } from '@/api/analytics.api';
import { ordersApi } from '@/api/orders.api';
import { adminApi } from '@/api/admin.api';
import { KpiTile } from '@/components/admin/KpiTile';
import { Loader } from '@/components/common/Loader';
import { formatPrice } from '@/utils/formatPrice';

const STATUS_TONES = {
  'Not Processed': 'bg-amber-50 text-amber-800',
  'Processing':    'bg-blue-50  text-blue-800',
  'Dispatched':    'bg-purple-50 text-purple-800',
  'Completed':     'bg-emerald-50 text-emerald-800',
  'Cancelled':     'bg-red-50 text-red-800',
};

export default function Dashboard() {
  // 1. KPI summary
  const summary = useQuery({
    queryKey: ['admin', 'summary'],
    queryFn: () => analyticsApi.summary().then((r) => r.data),
  });

  // 2. Day-by-day sales (last 30 days)
  const sales = useQuery({
    queryKey: ['admin', 'sales'],
    queryFn: () => analyticsApi.salesOverTime().then((r) => r.data),
  });

  // 3. Top 5 products
  const topProducts = useQuery({
    queryKey: ['admin', 'top-products'],
    queryFn: () => analyticsApi.topProducts({ limit: 5 }).then((r) => r.data),
  });

  // 4. Recent orders
  const recent = useQuery({
    queryKey: ['admin', 'recent-orders'],
    queryFn: () => ordersApi.listAll({ limit: 8, sort: '-createdAt' }).then((r) => r.data),
  });

  // 5. Status breakdown
  const status = useQuery({
    queryKey: ['admin', 'status'],
    queryFn: () => analyticsApi.statusBreakdown().then((r) => r.data),
  });

  // 6. Last sync log (optional — endpoint only exists on modular backend)
  const lastSync = useQuery({
    queryKey: ['admin', 'last-sync'],
    queryFn: () => adminApi.syncLogs().then((r) => r.data?.[0]),
    retry: false,
  });

  const s = summary.data;
  const maxRevenue = Math.max(...(sales.data || []).map((d) => d.revenue), 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-3xl">Welcome back</h1>
          <p className="text-sm text-brand-muted mt-1">Here's what's happening at the store · Last 30 days</p>
        </div>
        <Link to="/admin/sync" className="btn-outline text-sm">
          <RefreshCw size={14} className="mr-2" /> Sync Inventory
        </Link>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          label="Revenue (30d)" icon={IndianRupee} tone="gold"
          value={s ? formatPrice(s.revenue) : '—'}
          hint={s ? `${s.paidOrders} paid orders` : ''}
          loading={summary.isLoading}
        />
        <KpiTile
          label="Total Orders" icon={ShoppingBag} tone="maroon"
          value={s?.totalOrders ?? '—'}
          hint={s ? `${s.paidOrders} paid · ${s.totalOrders - s.paidOrders} pending` : ''}
          loading={summary.isLoading}
        />
        <KpiTile
          label="New Customers" icon={Users} tone="emerald"
          value={s?.newCustomers ?? '—'}
          hint="Last 30 days"
          loading={summary.isLoading}
        />
        <KpiTile
          label="Active Products" icon={Package} tone="amber"
          value={s?.activeProducts ?? '—'}
          hint="In catalog"
          loading={summary.isLoading}
        />
      </div>

      {/* Sales chart + Status pie */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Sales sparkline (CSS-only bars) */}
        <div className="lg:col-span-2 bg-white border border-brand-cream p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl">Sales — last 30 days</h2>
            <TrendingUp size={16} className="text-brand-gold" />
          </div>
          {sales.isLoading
            ? <Loader />
            : !sales.data?.length
              ? <p className="text-sm text-brand-muted py-10 text-center">No sales yet — once orders are paid they'll appear here.</p>
              : (
                <div className="flex items-end gap-1 h-40">
                  {sales.data.map((d) => (
                    <div key={d._id} className="flex-1 group relative flex flex-col items-center">
                      <div
                        className="w-full bg-brand-maroon hover:bg-brand-gold transition-colors"
                        style={{ height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: 4 }}
                        title={`${d._id}: ${formatPrice(d.revenue)} · ${d.orders} orders`}
                      />
                      <span className="absolute -bottom-5 text-[9px] text-brand-muted opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {d._id.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
        </div>

        {/* Status breakdown */}
        <div className="bg-white border border-brand-cream p-5 shadow-soft">
          <h2 className="font-serif text-xl mb-4">Order Status</h2>
          {status.isLoading
            ? <Loader />
            : !status.data?.length
              ? <p className="text-sm text-brand-muted py-6 text-center">No orders yet</p>
              : (
                <ul className="space-y-3">
                  {status.data.map((s) => (
                    <li key={s._id} className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 text-xs ${STATUS_TONES[s._id] || 'bg-gray-50 text-gray-700'}`}>
                        {s._id}
                      </span>
                      <span className="font-medium">{s.count}</span>
                    </li>
                  ))}
                </ul>
              )}
        </div>
      </div>

      {/* Recent orders + Top products */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent orders */}
        <div className="bg-white border border-brand-cream p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-brand-maroon hover:underline">View all →</Link>
          </div>
          {recent.isLoading
            ? <Loader />
            : !recent.data?.length
              ? <p className="text-sm text-brand-muted py-6 text-center">No orders yet</p>
              : (
                <ul className="divide-y divide-brand-cream">
                  {recent.data.map((o) => (
                    <li key={o._id} className="py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{o.user?.name || 'Guest'}</p>
                        <p className="text-xs text-brand-muted truncate">
                          #{o._id.slice(-6)} · {o.products?.length} item{o.products?.length === 1 ? '' : 's'}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium">{formatPrice(o.total)}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 ${STATUS_TONES[o.status] || ''}`}>
                          {o.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
        </div>

        {/* Top products */}
        <div className="bg-white border border-brand-cream p-5 shadow-soft">
          <h2 className="font-serif text-xl mb-4">Top Products</h2>
          {topProducts.isLoading
            ? <Loader />
            : !topProducts.data?.length
              ? <p className="text-sm text-brand-muted py-6 text-center">No sales data yet</p>
              : (
                <ul className="space-y-3">
                  {topProducts.data.map((p, i) => (
                    <li key={p._id} className="flex items-center gap-3">
                      <span className="font-serif text-2xl text-brand-gold w-6">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-xs text-brand-muted">{p.units} sold</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(p.revenue)}</p>
                    </li>
                  ))}
                </ul>
              )}
        </div>
      </div>

      {/* Last sync card (only on modular backend) */}
      {lastSync.data && (
        <div className="bg-white border border-brand-cream p-5 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl">Last Inventory Sync</h2>
            <Link to="/admin/sync" className="text-xs text-brand-maroon hover:underline">Manage →</Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-brand-muted">
            <div className="flex items-center gap-1.5">
              <Clock size={14} /> {new Date(lastSync.data.finishedAt || lastSync.data.startedAt).toLocaleString()}
            </div>
            <div>Source: <b>{lastSync.data.source}</b></div>
            <div>Inserted: <b>{lastSync.data.inserted}</b></div>
            <div>Updated: <b>{lastSync.data.updated}</b></div>
            {lastSync.data.errorList?.length > 0 && (
              <div className="flex items-center gap-1 text-amber-700">
                <AlertCircle size={14} /> {lastSync.data.errorList.length} errors
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
