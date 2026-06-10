import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth.api';
import { AddressForm } from '@/components/checkout/AddressForm';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { MapPin, Pencil, Trash } from 'lucide-react';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | address object

  const load = async () => {
    setLoading(true);
    try {
      const res = await authApi.me();
      setAddresses(res.data?.address || []);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const save = async (payload) => {
    try {
      if (editing && editing !== 'new') {
        await authApi.updateAddress(editing._id, payload);
        toast.success('Address updated');
      } else {
        await authApi.addAddress(payload);
        toast.success('Address added');
      }
      setEditing(null);
      load();
    } catch (e) { toast.error(e.message); }
  };

  const remove = async (id) => {
    if (!confirm('Remove this address?')) return;
    try { await authApi.removeAddress(id); load(); toast.success('Removed'); }
    catch (e) { toast.error(e.message); }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl">Addresses</h1>
        <button onClick={() => setEditing('new')} className="btn-outline text-sm py-2">+ Add address</button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No addresses saved"
          message="Add a shipping address to make checkout faster."
          action={<button onClick={() => setEditing('new')} className="btn-primary">Add address</button>}
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((a) => (
            <div key={a._id} className="border border-brand-cream p-5 bg-white">
              <div className="flex justify-between items-start">
                <p className="font-medium">{a.fullName}</p>
                {a.isDefault && <span className="text-xs text-brand-gold uppercase tracking-wider">Default</span>}
              </div>
              <p className="text-sm text-brand-muted mt-2">{a.phoneNumber}</p>
              <p className="text-sm mt-2">{a.address1}{a.address2 && `, ${a.address2}`}</p>
              <p className="text-sm">{a.city}, {a.state} {a.zipCode}</p>
              <p className="text-sm">{a.country}</p>
              <div className="flex gap-3 mt-4 text-sm">
                <button onClick={() => setEditing(a)} className="flex items-center gap-1 hover:text-brand-maroon"><Pencil size={14} /> Edit</button>
                <button onClick={() => remove(a._id)} className="flex items-center gap-1 hover:text-brand-maroon"><Trash size={14} /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add Address' : 'Edit Address'} maxWidth="max-w-2xl">
        <AddressForm
          defaultValues={editing && editing !== 'new' ? editing : { country: 'India' }}
          onSubmit={save}
          submitLabel="Save"
        />
      </Modal>
    </div>
  );
}
