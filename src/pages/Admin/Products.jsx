import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Edit2, Eye } from 'lucide-react';
import { productsApi } from '@/api/products.api';
import { Loader } from '@/components/common/Loader';
import { Pagination } from '@/components/common/Pagination';
import { formatPrice, discountPct } from '@/utils/formatPrice';
import { useDebounce } from '@/hooks/useDebounce';

export default function ProductsAdmin() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 400);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'products', page, debouncedQ],
    queryFn: () => productsApi.list({ page, limit: 20, search: debouncedQ || undefined }).then((r) => r),
 refetchInterval: 30000,
 });

  const items = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-3xl">Products</h1>
          <p className="text-sm text-brand-muted mt-1">
            {meta ? `${meta.total} products` : 'Loading…'}
          </p>
        </div>
        <Link to="/admin/sync" className="btn-primary text-sm">
          + Upload CSV
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          className="input-luxe pl-10"
          placeholder="Search by name, brand, fabric…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-cream shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-cream/40 text-brand-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3 hidden md:table-cell">Brand</th>
              <th className="text-left p-3 hidden lg:table-cell">Category</th>
              <th className="text-right p-3">Price</th>
              <th className="text-right p-3 hidden md:table-cell">Stock</th>
              <th className="text-center p-3">Status</th>
              <th className="p-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}><Loader /></td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="p-10 text-center text-brand-muted">
                No products found {q && `for "${q}"`}
              </td></tr>
            ) : (
              items.map((p) => {
                const sub = p.subProducts?.[0];
                const sizeRow = sub?.sizes?.[0];
                const price = sizeRow ? sizeRow.price - (sizeRow.price * (sub.discount || 0)) / 100 : 0;
                const totalStock = p.subProducts?.reduce(
                  (s, sp) => s + sp.sizes.reduce((ss, sz) => ss + sz.qty, 0), 0
                );
                const img = sub?.images?.[0]?.url;
                return (
                  <tr key={p._id} className="border-t border-brand-cream hover:bg-brand-cream/20">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {img
                          ? <img src={img} alt="" className="w-12 h-14 object-cover" />
                          : <div className="w-12 h-14 bg-brand-cream" />}
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-xs">{p.name}</p>
                          <p className="text-xs text-brand-muted">{sub?.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{p.brand || '—'}</td>
                    <td className="p-3 hidden lg:table-cell">{p.category?.name || '—'}</td>
                    <td className="p-3 text-right">
                      <div className="font-medium">{formatPrice(price)}</div>
                      {sub?.discount > 0 && (
                        <div className="text-xs text-emerald-700">{sub.discount}% off</div>
                      )}
                    </td>
                    <td className={`p-3 text-right hidden md:table-cell ${totalStock === 0 ? 'text-red-600 font-medium' : totalStock < 5 ? 'text-amber-700' : ''}`}>
                      {totalStock}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-xs px-2 py-0.5 ${p.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1 justify-end">
                        <Link to={`/product/${p.slug || p._id}`} target="_blank"
                              className="p-1.5 hover:bg-brand-cream rounded" title="View on store">
                          <Eye size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {meta && <Pagination page={page} totalPages={meta.totalPages} onChange={setPage} />}

      <p className="text-xs text-brand-muted">
        Note — full product editing happens via the CSV / Google Sheet flow.
        Visit <Link to="/admin/sync" className="underline">CSV / Sync</Link> to bulk-update.
      </p>
    </div>
  );
}
