import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Shield, ShieldOff, Ban, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '@/api/admin.api';
import { Loader } from '@/components/common/Loader';
import { Pagination } from '@/components/common/Pagination';
import { useDebounce } from '@/hooks/useDebounce';

export default function CustomersAdmin() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [role, setRole] = useState('');
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 400);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', page, role, debouncedQ],
    queryFn: () => adminApi.listUsers({
      page, limit: 20,
      ...(role && { role }),
      ...(debouncedQ && { search: debouncedQ }),
    }),
  });

  const setActiveMutation = useMutation({
    mutationFn: ({ id, isActive }) =>
      // Modular backend exposes /admin/users/:id/active — flat backend uses different path; we try the standard one.
      fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}/active`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken') || 'null')}` },
        credentials: 'include',
        body: JSON.stringify({ isActive }),
      }).then((r) => r.json()),
    onSuccess: () => {
      toast.success('Updated');
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });

  const items = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Customers</h1>
        <p className="text-sm text-brand-muted mt-1">
          {meta ? `${meta.total} users` : 'Loading…'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            className="input-luxe pl-10"
            placeholder="Search by name, email, phone…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
          />
        </div>
        <select className="input-luxe max-w-xs"
          value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }}>
          <option value="">All roles</option>
          <option value="user">Customers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-cream shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-cream/40 text-brand-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3 hidden sm:table-cell">Contact</th>
              <th className="text-left p-3 hidden md:table-cell">Joined</th>
              <th className="text-center p-3">Role</th>
              <th className="text-center p-3">Status</th>
              <th className="p-3 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6}><Loader /></td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="p-10 text-center text-brand-muted">No customers found</td></tr>
            ) : (
              items.map((u) => (
                <tr key={u._id} className="border-t border-brand-cream hover:bg-brand-cream/20">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-cream rounded-full flex items-center justify-center text-xs font-medium">
                        {u.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        {u.phoneVerified && <p className="text-xs text-emerald-700">✓ Phone verified</p>}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    {u.email && <div className="text-xs">{u.email}</div>}
                    {u.phone && <div className="text-xs text-brand-muted">+91 {u.phone}</div>}
                  </td>
                  <td className="p-3 hidden md:table-cell text-xs">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`text-xs px-2 py-0.5 ${u.role === 'admin' ? 'bg-brand-maroon text-white' : 'bg-brand-cream text-brand-charcoal'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {u.isActive
                      ? <CheckCircle2 size={16} className="text-emerald-600 inline" />
                      : <Ban size={16} className="text-red-600 inline" />}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setActiveMutation.mutate({ id: u._id, isActive: !u.isActive })}
                      className="btn-ghost text-xs"
                      disabled={u.role === 'admin'}
                      title={u.role === 'admin' ? 'Cannot disable admins from here' : ''}
                    >
                      {u.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && <Pagination page={page} totalPages={meta.totalPages} onChange={setPage} />}
    </div>
  );
}
