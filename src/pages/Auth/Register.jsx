import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { register as registerThunk, login, fetchMe } from '@/features/auth/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/common/Seo';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(registerThunk({ name: data.name, email: data.email, password: data.password })).unwrap();
      // Auto-login after register
      await dispatch(login({ email: data.email, password: data.password })).unwrap();
      await dispatch(fetchMe());
      toast.success('Account created · check your email to verify');
      navigate('/account');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Could not register');
    } finally { setLoading(false); }
  };

  return (
    <div className="container-x py-16 md:py-24 max-w-md mx-auto">
      <Seo title="Create Account" />
      <h1 className="font-serif text-3xl md:text-4xl text-center">Join Us</h1>
      <p className="text-center text-brand-muted mt-2">Create your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
        <Input label="Full name" {...register('name',  { required: 'Required', minLength: { value: 2, message: 'Too short' } })} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email', { required: 'Required' })} error={errors.email?.message} />
        <Input
          label="Password" type="password"
          hint="Min 8 chars, with uppercase, lowercase and a number"
          {...register('password', {
            required: 'Required',
            minLength: { value: 8, message: 'Min 8 characters' },
            pattern:   { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, message: 'Needs upper, lower & number' },
          })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm password" type="password"
          {...register('confirm', {
            validate: (v) => v === watch('password') || 'Passwords do not match',
          })}
          error={errors.confirm?.message}
        />
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Creating…' : 'Create Account'}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm">
        Already have an account? <Link to="/auth/login" className="text-brand-maroon underline">Sign in</Link>
      </p>
    </div>
  );
}
