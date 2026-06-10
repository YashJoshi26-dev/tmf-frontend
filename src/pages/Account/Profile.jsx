import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth.api';
import { selectUser, fetchMe } from '@/features/auth/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const onSubmit = async (data) => {
    try {
      await authApi.updateProfile({ name: data.name });
      await dispatch(fetchMe());
      toast.success('Profile updated');
    } catch (e) { toast.error(e.message); }
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl mb-6">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Full name" {...register('name', { required: 'Required' })} error={errors.name?.message} />
        <Input label="Email" disabled {...register('email')} hint="Email cannot be changed" />
        <Button type="submit" disabled={isSubmitting}>Save Changes</Button>
      </form>
    </div>
  );
}
