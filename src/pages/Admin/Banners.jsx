import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { bannersApi } from '@/api/banners.api';
import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/Button';

const POSITIONS = ['hero', 'mid', 'category', 'footer'];

export default function BannersAdmin() {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    position: 'hero', title: '', subtitle: '', cta: '', link: '', image: '', order: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'banners'],
    queryFn: () => bannersApi.listAll().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data) => bannersApi.create(data),
    onSuccess: () => {
      toast.success('Banner created');
      setForm({ position: 'hero', title: '', subtitle: '', cta: '', link: '', image: '', order: 0 });
      qc.invalidateQueries({ queryKey: ['admin', 'banners'] });
    },
    onError: (e) => toast.error(e.message || 'Failed'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }) => bannersApi.update(id, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'banners'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => bannersApi.remove(id),
    onSuccess: () => {
      toast.success('Banner deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'banners'] });
    },
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.image) return toast.error('Image URL required');
    createMutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Banners</h1>
        <p className="text-sm text-brand-muted mt-1">Hero slides, mid-page banners, and category headers.</p>
      </div>

      {/* New banner form */}
      <form onSubmit={submit} className="bg-white border border-brand-cream p-5 shadow-soft space-y-3">
        <h2 className="font-serif text-xl">Add Banner</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <select className="input-luxe" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input className="input-luxe" placeholder="Order (lower = earlier)"
            type="number" value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          <input className="input-luxe" placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="input-luxe" placeholder="Subtitle" value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <input className="input-luxe" placeholder="Button label (CTA)" value={form.cta}
            onChange={(e) => setForm({ ...form, cta: e.target.value })} />
          <input className="input-luxe" placeholder="Link URL (e.g. /bridal)" value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>
        <input className="input-luxe" placeholder="Image URL (Cloudinary)" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <Button type="submit" disabled={createMutation.isPending}>
          <Plus size={14} className="mr-1" /> Create Banner
        </Button>
      </form>

      {/* List */}
      <div className="bg-white border border-brand-cream p-5 shadow-soft">
        <h2 className="font-serif text-xl mb-4">All Banners</h2>
        {isLoading
          ? <Loader />
          : !data?.length
            ? <p className="text-sm text-brand-muted py-6 text-center">No banners yet.</p>
            : (
              <ul className="space-y-3">
                {data.map((b) => (
                  <li key={b._id} className="flex items-center gap-4 p-3 border border-brand-cream">
                    <img src={b.image} alt="" className="w-24 h-16 object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-brand-cream uppercase tracking-wider">{b.position}</span>
                        {!b.isActive && <span className="text-xs text-brand-muted">(hidden)</span>}
                      </div>
                      <p className="text-sm font-medium mt-1">{b.title || <em className="text-brand-muted">No title</em>}</p>
                      <p className="text-xs text-brand-muted truncate">{b.link}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => toggleMutation.mutate({ id: b._id, isActive: !b.isActive })}
                        className="p-2 hover:bg-brand-cream" title={b.isActive ? 'Hide' : 'Show'}>
                        {b.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button onClick={() => {
                        if (window.confirm('Delete this banner?')) deleteMutation.mutate(b._id);
                      }} className="p-2 hover:bg-red-50 text-red-600" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
      </div>
    </div>
  );
}
