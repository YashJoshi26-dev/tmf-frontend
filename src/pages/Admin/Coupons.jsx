import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { adminApi } from '@/api/admin.api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/common/Loader';

export default function AdminCoupons() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-coupons'],
    queryFn: () => adminApi.listCoupons(),
  });

  const create = useMutation({
    mutationFn: (payload) => adminApi.createCoupon(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-coupons'] });
      setOpen(false); reset();
      toast.success('Coupon created');
    },
    onError: (e) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id) => adminApi.deleteCoupon(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-coupons'] }); toast.success('Removed'); },
  });

  const onSubmit = (data) => {
    create.mutate({
      coupon: data.coupon,
      discount: Number(data.discount),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  };

  if (isLoading) return <Loader />;
  const coupons = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl">Coupons</h1>
        <Button onClick={() => setOpen(true)}>+ Add Coupon</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-cream text-left">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Valid From</th>
              <th className="p-3">Valid Until</th>
              <th className="p-3">Used</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-cream">
            {coupons.map((c) => (
              <tr key={c._id}>
                <td className="p-3 font-medium">{c.coupon}</td>
                <td className="p-3">{c.discount}%</td>
                <td className="p-3">{new Date(c.startDate).toLocaleDateString('en-IN')}</td>
                <td className="p-3">{new Date(c.endDate).toLocaleDateString('en-IN')}</td>
                <td className="p-3">{c.usedCount || 0}</td>
                <td className="p-3">
                  <button onClick={() => remove.mutate(c._id)} className="text-brand-muted hover:text-brand-maroon"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Coupon">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Code" placeholder="WELCOME10" {...register('coupon', { required: 'Required' })} error={errors.coupon?.message} />
          <Input label="Discount %" type="number" min={1} max={100} {...register('discount', { required: 'Required' })} error={errors.discount?.message} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start date" type="date" {...register('startDate', { required: 'Required' })} error={errors.startDate?.message} />
            <Input label="End date"   type="date" {...register('endDate',   { required: 'Required' })} error={errors.endDate?.message} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
