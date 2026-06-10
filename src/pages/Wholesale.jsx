import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/common/Seo';

export default function Wholesale() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
    // Wire to /wholesale/enquiry endpoint when available
    console.log('wholesale', data);
    toast.success('Enquiry received. Our team will contact you within 24 hours.');
    reset();
  };

  return (
    <div className="container-x py-16 max-w-3xl mx-auto">
      <Seo title="Wholesale Enquiry" />
      <div className="text-center mb-12">
        <p className="eyebrow">For Boutiques & Retailers</p>
        <h1 className="font-serif text-3xl md:text-5xl mt-3">Wholesale Enquiry</h1>
        <p className="text-brand-muted mt-3">Partner with us for bulk orders, exclusive lines and B2B pricing.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-5">
        <Input label="Your name"     {...register('name',     { required: 'Required' })} error={errors.name?.message} />
        <Input label="Business name" {...register('business', { required: 'Required' })} error={errors.business?.message} />
        <Input label="GSTIN (optional)" {...register('gstin')} />
        <Input label="Phone" type="tel" {...register('phone',  { required: 'Required' })} error={errors.phone?.message} />
        <Input label="Email" type="email" className="md:col-span-2" {...register('email', { required: 'Required' })} error={errors.email?.message} />
        <Input label="City" {...register('city', { required: 'Required' })} error={errors.city?.message} />
        <Input label="Estimated monthly volume" placeholder="e.g. 50 pieces" {...register('volume')} />

        <label className="md:col-span-2 block">
          <span className="block text-sm text-brand-muted mb-1">Tell us about your business</span>
          <textarea rows={4} {...register('message')} className="input-luxe resize-none" />
        </label>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>Submit Enquiry</Button>
        </div>
      </form>
    </div>
  );
}
