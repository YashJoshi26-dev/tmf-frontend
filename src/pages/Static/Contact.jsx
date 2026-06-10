import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/common/Seo';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    // Wire to /contact endpoint when available
    console.log('contact', data);
    toast.success('We\'ll get back to you shortly');
    reset();
  };
  return (
    <div className="container-x py-16">
      <Seo title="Contact" />
      <h1 className="font-serif text-3xl md:text-5xl text-center">Get in Touch</h1>
      <p className="text-center text-brand-muted mt-3">We'd love to hear from you</p>

      <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <Card icon={Phone} title="Call"  text="+91 99999 99999" />
        <Card icon={Mail}  title="Email" text="hello@sareeshowroom.com" />
        <Card icon={MapPin}title="Visit" text="C-21 Mall, Indore, MP" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-16 space-y-5">
        <Input label="Name"    {...register('name',    { required: 'Required' })} error={errors.name?.message} />
        <Input label="Email"   type="email" {...register('email',   { required: 'Required' })} error={errors.email?.message} />
        <Input label="Subject" {...register('subject')} />
        <label className="block">
          <span className="block text-sm text-brand-muted mb-1">Message</span>
          <textarea rows={5} {...register('message', { required: 'Required' })} className="input-luxe resize-none" />
        </label>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}

const Card = ({ icon: Icon, title, text }) => (
  <div className="text-center border border-brand-cream p-6">
    <Icon size={20} className="mx-auto text-brand-gold mb-3" />
    <p className="eyebrow">{title}</p>
    <p className="mt-2">{text}</p>
  </div>
);
