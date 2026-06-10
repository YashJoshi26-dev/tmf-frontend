import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const AddressForm = ({ defaultValues = {}, onSubmit, submitLabel = 'Save Address' }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input label="Full name" {...register('fullName',  { required: 'Required' })} error={errors.fullName?.message} />
      <Input label="Phone"     {...register('phoneNumber',{ required: 'Required', pattern: { value: /^\d{10}$/, message: '10-digit number' } })} error={errors.phoneNumber?.message} />
      <Input label="Address line 1" className="md:col-span-2" {...register('address1', { required: 'Required' })} error={errors.address1?.message} />
      <Input label="Address line 2 (optional)" className="md:col-span-2" {...register('address2')} />
      <Input label="City"      {...register('city',    { required: 'Required' })} error={errors.city?.message} />
      <Input label="State"     {...register('state',   { required: 'Required' })} error={errors.state?.message} />
      <Input label="Pincode"   {...register('zipCode', { required: 'Required', pattern: { value: /^\d{6}$/, message: '6-digit pincode' } })} error={errors.zipCode?.message} />
      <Input label="Country"   defaultValue="India" {...register('country',{ required: 'Required' })} error={errors.country?.message} />

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
};
