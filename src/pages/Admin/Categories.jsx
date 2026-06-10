import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { categoriesApi } from '@/api/categories.api';
import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/Button';

export default function CategoriesAdmin() {
  const qc = useQueryClient();
  const [newName, setNewName] = useState('');
  const [newParent, setNewParent] = useState('');

  const { data: tree, isLoading } = useQuery({
    queryKey: ['admin', 'categories-tree'],
    queryFn: () => categoriesApi.tree().then((r) => r.data),
  });

  const { data: flat } = useQuery({
    queryKey: ['admin', 'categories-flat'],
    queryFn: () => categoriesApi.list().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data) => categoriesApi.create(data),
    onSuccess: () => {
      toast.success('Category added');
      setNewName(''); setNewParent('');
      qc.invalidateQueries({ queryKey: ['admin', 'categories-tree'] });
      qc.invalidateQueries({ queryKey: ['admin', 'categories-flat'] });
    },
    onError: (e) => toast.error(e.message || 'Failed to add category'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => categoriesApi.remove(id),
    onSuccess: () => {
      toast.success('Category deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'categories-tree'] });
      qc.invalidateQueries({ queryKey: ['admin', 'categories-flat'] });
    },
    onError: (e) => toast.error(e.message || 'Failed to delete'),
  });

  const submit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createMutation.mutate({ name: newName.trim(), parent: newParent || null });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Categories</h1>
        <p className="text-sm text-brand-muted mt-1">Organize your catalog with categories and sub-categories.</p>
      </div>

      {/* Add new */}
      <form onSubmit={submit} className="bg-white border border-brand-cream p-5 shadow-soft">
        <h2 className="font-serif text-xl mb-4">Add Category</h2>
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
          <input
            className="input-luxe"
            placeholder="Category name (e.g. Banarasi)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <select
            className="input-luxe"
            value={newParent}
            onChange={(e) => setNewParent(e.target.value)}
          >
            <option value="">— Root category (no parent) —</option>
            {flat?.filter((c) => !c.parent).map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <Button type="submit" disabled={createMutation.isPending}>
            <Plus size={14} className="mr-1" /> Add
          </Button>
        </div>
      </form>

      {/* Tree */}
      <div className="bg-white border border-brand-cream p-5 shadow-soft">
        <h2 className="font-serif text-xl mb-4">Catalog Tree</h2>
        {isLoading
          ? <Loader />
          : !tree?.length
            ? <p className="text-sm text-brand-muted py-6 text-center">No categories yet — add your first one above.</p>
            : (
              <ul className="space-y-1">
                {tree.map((root) => (
                  <CatNode key={root._id} node={root} onDelete={(id) => deleteMutation.mutate(id)} />
                ))}
              </ul>
            )}
      </div>
    </div>
  );
}

const CatNode = ({ node, depth = 0, onDelete }) => (
  <li>
    <div
      className="flex items-center justify-between py-2 px-2 hover:bg-brand-cream/40 rounded"
      style={{ paddingLeft: `${depth * 20 + 8}px` }}
    >
      <div className="flex items-center gap-2">
        {node.children?.length > 0 && <ChevronRight size={12} className="text-brand-muted" />}
        <span className="text-sm">{node.name}</span>
        {!node.isActive && <span className="text-xs text-brand-muted">(inactive)</span>}
      </div>
      <button
        onClick={() => {
          if (window.confirm(`Delete "${node.name}"? This fails if any products use it.`)) onDelete(node._id);
        }}
        className="text-brand-muted hover:text-red-600 p-1"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
    {node.children?.length > 0 && (
      <ul>
        {node.children.map((child) => (
          <CatNode key={child._id} node={child} depth={depth + 1} onDelete={onDelete} />
        ))}
      </ul>
    )}
  </li>
);
